import Link from "next/link";
import FileExplorer from "@/components/ui-prototype/file-explorer/FileExplorer";

export const metadata = {
  title: "File Explorer — UI Prototype",
  description: "A simple file explorer component prototype.",
};
  
export default function FileExplorerPage() {
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
          UI Prototype · File Explorer
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">File Explorer</h1>
        <p className="text-slate-400 text-lg mb-16">
          Explore your files and folders.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10">
          <FileExplorer />
        </div>
      </div>
    </div>
  );
}
