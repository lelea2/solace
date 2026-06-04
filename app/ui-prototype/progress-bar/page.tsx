import Link from "next/link";
import ProgressBar from "@/components/ui-prototype/progress-bar/ProgressBar";
import ProgressBarII from "@/components/ui-prototype/progress-bar/ProgressBarII";
import ProgressBarIII from "@/components/ui-prototype/progress-bar/ProgressBarIII";
import ProgressBarIV from "@/components/ui-prototype/progress-bar/ProgressBarIV";

export const metadata = {
  title: "Progress Bar — UI Prototype",
  description: "A simple progress bar component prototype.",
};
  
export default function ProgressBarPage() {
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
          UI Prototype · Progress Bar
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Progress Bar</h1>
        <p className="text-slate-400 text-lg mb-16">
          A simple progress bar component.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10">
          <p>Progress Bar execute independently</p>
          <ProgressBar />
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 mt-10">
          <p>Progress Bar execute one after another</p>
          <ProgressBarII />
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 mt-10">
          <p>Progress Bar execute in a sequence, only 3 progress bars at a time</p>
          <ProgressBarIII />
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 mt-10">
          <p>Progress Bar execute in a sequence, only 3 progress bars at a time</p>
          <ProgressBarIV />
        </div>
      </div>
    </div>
  );
}
