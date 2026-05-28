'use client';

import { useState, useRef, useEffect } from "react";
import {ClaudeIcon, UserIcon, SendIcon, StopIcon, NewChatIcon} from "./icon";

const SYSTEM_PROMPT = `You are Claude, an AI assistant made by Anthropic. You are helpful, harmless, and honest. You have a warm, thoughtful personality. You give clear, well-structured responses and are genuinely curious about the people you talk with.`;

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "#D4956A", opacity: 0.7,
          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }}/>
      ))}
    </div>
  );
}

function Message({ msg }: { msg: { role: string; content: string; error?: string } }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      flexDirection: isUser ? "row-reverse" : "row",
      gap: "12px",
      alignItems: "flex-start",
      padding: "4px 0",
      animation: "fadeSlideIn 0.25s ease forwards",
    }}>
      {/* Avatar */}
      <div style={{
        flexShrink: 0,
        width: "34px", height: "34px",
        borderRadius: isUser ? "10px" : "50%",
        background: isUser ? "#2D2D2D" : "#FDF0E6",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: isUser ? "#C8C8C8" : "#D4956A",
        border: isUser ? "1px solid #3A3A3A" : "1.5px solid #D4956A33",
        marginTop: "2px",
      }}>
        {isUser ? <UserIcon /> : <ClaudeIcon />}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: "72%",
        background: isUser ? "#1C1C1E" : "#141414",
        border: isUser ? "1px solid #2D2D2D" : "1px solid #1F1F1F",
        borderRadius: isUser ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
        padding: "12px 16px",
        color: isUser ? "#E8E8E8" : "#D4D4D4",
        fontSize: "14px",
        lineHeight: "1.65",
        fontFamily: "'Georgia', serif",
        letterSpacing: "0.01em",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        boxShadow: isUser ? "none" : "0 1px 12px rgba(0,0,0,0.3)",
      }}>
        {msg.content === "__typing__" ? <TypingIndicator /> : msg.content}
        {msg.error && (
          <div style={{ color: "#E05A5A", fontSize: "12px", marginTop: "6px", fontFamily: "monospace" }}>
            ⚠ {msg.error}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [conversations, setConversations] = useState([
    { id: 1, title: "New conversation", messages: [] }
  ]);
  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const abortRef = useRef(null);
  const nextId = useRef(2);

  const activeConvo = conversations.find(c => c.id === activeId);
  const messages = activeConvo?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  function updateConvo(id, updater) {
    setConversations(prev => prev.map(c => c.id === id ? updater(c) : c));
  }

  function newChat() {
    const id = nextId.current++;
    setConversations(prev => [...prev, { id, title: "New conversation", messages: [] }]);
    setActiveId(id);
    setInput("");
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg = { role: "user", content: text };
    const typingMsg = { role: "assistant", content: "__typing__", id: "typing" };

    // Update title from first message
    const isFirst = messages.length === 0;
    updateConvo(activeId, c => ({
      ...c,
      title: isFirst ? text.slice(0, 40) + (text.length > 40 ? "…" : "") : c.title,
      messages: [...c.messages, userMsg, typingMsg],
    }));

    setLoading(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    history.push({ role: "user", content: text });

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      });

      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "No response.";
      const assistantMsg = { role: "assistant", content: reply };

      updateConvo(activeId, c => ({
        ...c,
        messages: [...c.messages.filter(m => m.id !== "typing"), assistantMsg],
      }));
    } catch (err) {
      if (err.name === "AbortError") {
        updateConvo(activeId, c => ({
          ...c,
          messages: c.messages.filter(m => m.id !== "typing"),
        }));
      } else {
        updateConvo(activeId, c => ({
          ...c,
          messages: [...c.messages.filter(m => m.id !== "typing"),
            { role: "assistant", content: "", error: err.message }],
        }));
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  function stop() {
    abortRef.current?.abort();
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const suggestions = [
    "Explain feature drift in ML systems",
    "How does ML observability differ from traditional monitoring?",
    "What's the difference between PSI and KS test?",
    "Help me prep for a Google Staff Engineer interview",
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      <div style={{
        display: "flex", height: "100vh", width: "100%",
        fontFamily: "'Lora', Georgia, serif",
        background: "#0A0A0A", color: "#D4D4D4",
        overflow: "hidden",
      }}>

        {/* Sidebar */}
        {sidebarOpen && (
          <div style={{
            width: "240px", flexShrink: 0,
            background: "#0F0F0F",
            borderRight: "1px solid #1A1A1A",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>
            {/* Sidebar header */}
            <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #1A1A1A" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <ClaudeIcon />
                <span style={{ fontSize: "15px", fontWeight: "500", color: "#E0E0E0", letterSpacing: "-0.01em" }}>Claude</span>
              </div>
              <button className="new-chat-btn" onClick={newChat} style={{
                width: "100%", display: "flex", alignItems: "center", gap: "8px",
                padding: "8px 10px", borderRadius: "8px",
                color: "#999", fontSize: "13px", transition: "background 0.15s",
              }}>
                <NewChatIcon /> New conversation
              </button>
            </div>

            {/* Conversation list */}
            <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
              {conversations.slice().reverse().map(c => (
                <button key={c.id} className="sidebar-item" onClick={() => setActiveId(c.id)} style={{
                  width: "100%", textAlign: "left",
                  padding: "9px 10px", borderRadius: "8px",
                  fontSize: "13px", fontFamily: "'Lora', serif",
                  color: c.id === activeId ? "#E0E0E0" : "#777",
                  background: c.id === activeId ? "#1A1A1A" : "transparent",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  borderLeft: c.id === activeId ? "2px solid #D4956A" : "2px solid transparent",
                }}>
                  {c.title}
                </button>
              ))}
            </div>

            {/* Model badge */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #1A1A1A" }}>
              <div style={{
                fontSize: "11px", color: "#444", fontFamily: "'DM Mono', monospace",
                background: "#141414", padding: "6px 10px", borderRadius: "6px",
              }}>
                claude-sonnet-4
              </div>
            </div>
          </div>
        )}

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative" }}>

          {/* Top bar */}
          <div style={{
            height: "52px", flexShrink: 0,
            borderBottom: "1px solid #161616",
            display: "flex", alignItems: "center", gap: "10px",
            padding: "0 16px",
            background: "#0A0A0A",
          }}>
            <button onClick={() => setSidebarOpen(v => !v)} style={{
              color: "#555", padding: "6px", borderRadius: "6px",
              fontSize: "18px", lineHeight: 1, transition: "color 0.15s",
            }}>☰</button>
            <span style={{ fontSize: "13px", color: "#555", fontFamily: "'DM Mono', monospace" }}>
              {activeConvo?.title || "New conversation"}
            </span>
            {loading && (
              <div style={{
                marginLeft: "auto", fontSize: "11px", color: "#D4956A",
                fontFamily: "'DM Mono', monospace",
                animation: "pulse 1.5s ease-in-out infinite",
              }}>● thinking</div>
            )}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 0" }}>
            <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 20px" }}>

              {messages.length === 0 ? (
                <div style={{ paddingTop: "60px", animation: "fadeSlideIn 0.4s ease" }}>
                  {/* Welcome */}
                  <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{
                      width: "52px", height: "52px", borderRadius: "50%",
                      background: "#FDF0E6", border: "2px solid #D4956A44",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 16px",
                    }}>
                      <ClaudeIcon />
                    </div>
                    <h1 style={{ fontSize: "22px", fontWeight: "400", color: "#D0D0D0", marginBottom: "6px" }}>
                      Good to see you
                    </h1>
                    <p style={{ fontSize: "14px", color: "#555", fontStyle: "italic" }}>
                      What's on your mind today?
                    </p>
                  </div>

                  {/* Suggestions */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {suggestions.map((s, i) => (
                      <button key={i} className="suggestion-btn" onClick={() => setInput(s)} style={{
                        textAlign: "left", padding: "12px 14px",
                        background: "#111", border: "1px solid #222",
                        borderRadius: "10px", color: "#888",
                        fontSize: "13px", fontFamily: "'Lora', serif",
                        lineHeight: "1.5", transition: "all 0.15s",
                      }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {messages.map((msg, i) => <Message key={i} msg={msg} />)}
                </div>
              )}

              <div ref={messagesEndRef} style={{ height: "8px" }} />
            </div>
          </div>

          {/* Input area */}
          <div style={{ flexShrink: 0, padding: "16px 20px 20px", background: "#0A0A0A" }}>
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
              <div style={{
                display: "flex", alignItems: "flex-end", gap: "10px",
                background: "#111",
                border: "1px solid #222",
                borderRadius: "14px",
                padding: "12px 14px",
                transition: "border-color 0.2s",
                boxShadow: "0 0 0 1px #00000040, 0 4px 20px rgba(0,0,0,0.4)",
              }}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Message Claude…"
                  rows={1}
                  style={{
                    flex: 1, fontSize: "14px", color: "#D4D4D4",
                    fontFamily: "'Lora', Georgia, serif",
                    lineHeight: "1.6", minHeight: "24px", maxHeight: "160px",
                  }}
                />
                {loading ? (
                  <button onClick={stop} style={{
                    flexShrink: 0, width: "32px", height: "32px",
                    borderRadius: "8px", background: "#2A2A2A",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#888", transition: "all 0.15s",
                  }}>
                    <StopIcon />
                  </button>
                ) : (
                  <button className="send-btn" onClick={send} disabled={!input.trim()} style={{
                    flexShrink: 0, width: "32px", height: "32px",
                    borderRadius: "8px",
                    background: input.trim() ? "#D4956A" : "#1C1C1C",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: input.trim() ? "#fff" : "#444",
                    transition: "all 0.15s",
                  }}>
                    <SendIcon />
                  </button>
                )}
              </div>
              <p style={{ textAlign: "center", fontSize: "11px", color: "#333", marginTop: "10px", fontFamily: "'DM Mono', monospace" }}>
                Shift + Enter for new line · Enter to send
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
