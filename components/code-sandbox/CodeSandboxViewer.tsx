"use client";

import { useRef, useState } from "react";
import styles from "./CodeSandbox.module.css";

export type SandboxFile = {
  path: string;
  language: string;
  lineCount: number;
  /** Highlighted markup generated at build time from this repo's own source. */
  html: string;
};

type CodeSandboxViewerProps = {
  folder: string;
  entry: string;
  files: SandboxFile[];
};

const LANGUAGE_BADGES: Record<string, { label: string; color: string }> = {
  tsx: { label: "TSX", color: "text-sky-400" },
  ts: { label: "TS", color: "text-blue-400" },
  jsx: { label: "JSX", color: "text-yellow-300" },
  js: { label: "JS", color: "text-yellow-300" },
  css: { label: "CSS", color: "text-fuchsia-400" },
};

function fileName(filePath: string) {
  return filePath.slice(filePath.lastIndexOf("/") + 1);
}

function directoryName(filePath: string) {
  return filePath.includes("/") ? filePath.slice(0, filePath.lastIndexOf("/")) : "";
}

function LanguageBadge({ language }: { language: string }) {
  const { label, color } = LANGUAGE_BADGES[language];
  return (
    <span aria-hidden className={`w-7 shrink-0 text-[10px] font-semibold ${color}`}>
      {label}
    </span>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
      <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7H4a1.5 1.5 0 0 0-1.5 1.5v5A1.5 1.5 0 0 0 4 15h8a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12 7h-.5V4.5A3.5 3.5 0 0 0 8 1Zm2 6H6V4.5a2 2 0 1 1 4 0V7Z" />
    </svg>
  );
}

export default function CodeSandboxViewer({ folder, entry, files }: CodeSandboxViewerProps) {
  const [activePath, setActivePath] = useState(entry);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  const activeFile = files.find((file) => file.path === activePath) ?? files[0];
  const isCopied = copiedPath === activeFile.path;

  async function copyActiveFile() {
    const code = codeRef.current?.querySelector("code")?.textContent;
    if (code == null) return;
    await navigator.clipboard.writeText(code);
    setCopiedPath(activeFile.path);
    setTimeout(() => setCopiedPath(null), 1500);
  }

  return (
    <section
      aria-label={`Source code for ${folder}`}
      className={`mt-12 overflow-hidden rounded-xl border border-slate-800 bg-[#0d1117] text-left font-mono text-white shadow-2xl ${styles.sandbox}`}
    >
      <header className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-slate-700" />
          <span className="h-3 w-3 rounded-full bg-slate-700" />
          <span className="h-3 w-3 rounded-full bg-slate-700" />
        </span>
        <h2 className="min-w-0 truncate text-xs font-medium text-slate-300">{folder}</h2>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-700 px-2 py-0.5 text-[11px] text-slate-400">
          <LockIcon />
          Read-only
        </span>
      </header>

      <div className="flex h-[32rem]">
        <nav
          aria-label="Files"
          className="hidden w-52 shrink-0 overflow-y-auto border-r border-slate-800 bg-slate-950/60 py-2 md:block"
        >
          <p className="px-4 pb-2 pt-1 text-[10px] uppercase tracking-widest text-slate-500">
            Files
          </p>
          <ul>
            {files.map((file, index) => {
              const directory = directoryName(file.path);
              const startsDirectory =
                directory !== "" &&
                (index === 0 || directoryName(files[index - 1].path) !== directory);
              const isActive = file.path === activeFile.path;

              return (
                <li key={file.path}>
                  {startsDirectory && (
                    <p className="px-4 py-1 text-xs text-slate-400">▾ {directory}</p>
                  )}
                  <button
                    type="button"
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setActivePath(file.path)}
                    className={`flex w-full items-center gap-1.5 py-1 pr-3 text-left transition-colors ${
                      directory ? "pl-7" : "pl-4"
                    } ${
                      isActive
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    }`}
                  >
                    <LanguageBadge language={file.language} />
                    <span className="truncate">{fileName(file.path)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-stretch border-b border-slate-800 bg-slate-900/60">
            <div className="flex min-w-0 flex-1 overflow-x-auto">
              {files.map((file) => {
                const isActive = file.path === activeFile.path;
                return (
                  <button
                    key={file.path}
                    type="button"
                    aria-current={isActive ? "true" : undefined}
                    title={file.path}
                    onClick={() => setActivePath(file.path)}
                    className={`flex shrink-0 items-center gap-1 border-r border-t-2 border-r-slate-800 px-3 py-2 transition-colors ${
                      isActive
                        ? "border-t-sky-400 bg-[#0d1117] text-white"
                        : "border-t-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <LanguageBadge language={file.language} />
                    {fileName(file.path)}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={copyActiveFile}
              className="shrink-0 border-l border-slate-800 px-3 text-slate-400 transition-colors hover:text-white"
            >
              <span aria-live="polite">{isCopied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div
            key={activeFile.path}
            ref={codeRef}
            tabIndex={0}
            role="region"
            aria-label={`Contents of ${activeFile.path}`}
            className={`min-h-0 flex-1 ${styles.code}`}
            dangerouslySetInnerHTML={{ __html: activeFile.html }}
          />

          <footer className="flex items-center justify-between gap-4 border-t border-slate-800 bg-slate-900 px-4 py-1.5 text-[11px] text-slate-500">
            <span className="truncate">
              components/ui-prototype/{folder}/{activeFile.path}
            </span>
            <span className="shrink-0">
              {activeFile.language.toUpperCase()} · {activeFile.lineCount} lines
            </span>
          </footer>
        </div>
      </div>
    </section>
  );
}
