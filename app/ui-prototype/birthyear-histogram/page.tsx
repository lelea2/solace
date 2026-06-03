import Link from "next/link";
import BirthYearHistogram from "@/components/ui-prototype/birthyear-histogram/BirthYearHistogram";

export const metadata = {
  title: "Birth Year Histogram — UI Prototype",
  description: "A simple birth year histogram component prototype.",
};

export default function BirthYearHistogramPage() {
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
          UI Prototype · Birth Year Histogram
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Birth Year Histogram</h1>
        <p className="text-slate-400 text-lg mb-16">
          A simple Claude chat component prototype.
        </p>

        <div className="flex justify-center">
          <BirthYearHistogram />
        </div>
      </div>
    </div>
  );
}
