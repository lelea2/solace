import Link from "next/link";
import WhackAMole from "@/components/ui-prototype/whack-a-mole/WhackAMole";

export const metadata = {
  title: "Whack-a-Mole — UI Prototype",
  description: "A simple whack-a-mole game component prototype.",
};
  
export default function WhackAMolePage() {
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
          UI Prototype · Whack-a-Mole
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Whack-a-Mole</h1>
        <p className="text-slate-400 text-lg mb-16">
          A simple whack-a-mole game.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10">
          <WhackAMole />
        </div>
      </div>
    </div>
  );
}

