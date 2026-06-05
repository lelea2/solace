import Link from "next/link";
import HoligrailLayout from "@/components/ui-prototype/holigrail-layout/HoligrailLayout";

export const metadata = {
  title: "HoligrailLayout — UI Prototype",
  description: "A simple holigrail layout component prototype.",
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
          UI Prototype · HoligrailLayout
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10">
          <HoligrailLayout />
        </div>
      </div>
    </div>
  );
}
