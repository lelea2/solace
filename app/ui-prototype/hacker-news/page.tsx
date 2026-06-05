import Link from "next/link";
import HackerNews from "@/components/ui-prototype/hacker-news/HackerNews";
import JobBoard from "@/components/ui-prototype/hacker-news/JobBoard";


export const metadata = {
  title: "Hacker News — UI Prototype",
  description: "A simple hacker news component prototype.",
};
  
export default function HackerNewsPage() {
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
          UI Prototype · Hacker News
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Hacker News</h1>
        <p className="text-slate-400 text-lg mb-16">
          View the latest news from the hacker community.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10">
          <HackerNews />
        </div>

        <div className="rounded-2xl border p-10 border-slate-800 bg-slate-900">
          <JobBoard />
        </div>
      </div>
    </div>
  );
}
