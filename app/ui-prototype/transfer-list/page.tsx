import Link from "next/link";
import TransferList from "@/components/ui-prototype/transfer-list/TransferList";

export const metadata = {
  title: "Transfer List — UI Prototype",
  description: "A simple transfer list form component prototype.",
};
  
export default function TransferListPage() {
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
          UI Prototype · Transfer List
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Transfer List</h1>
        <p className="text-slate-400 text-lg mb-16">
          Transfer items between lists.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10">
          <TransferList />
        </div>
      </div>
    </div>
  );
}

