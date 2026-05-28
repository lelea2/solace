import Link from "next/link";
import ClaudeChat from "@/components/ui-prototype/claude-clone-chat/ClaudeChat";

export const metadata = {
  title: "Claude Chat — UI Prototype",
  description: "A simple Claude chat component prototype.",
};

export default function ClaudeChatPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/ui-prototype"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10"
        >
          ← Back to UI Prototype
        </Link>

        <p className="text-slate-400 text-sm font-mono tracking-widest uppercase mb-4">
          UI Prototype · Claude Chat
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Claude Chat</h1>
        <p className="text-slate-400 text-lg mb-16">
          A simple Claude chat component prototype.
        </p>

        <div className="flex justify-center">
          <ClaudeChat />
        </div>
      </div>
    </div>
  );
}
