import Link from "next/link";
import StarRating from "@/components/ui-prototype/star-rating/StarRating";

export const metadata = {
  title: "Star Rating — UI Prototype",
  description: "A simple star rating component prototype.",
};
  
export default function StarRatingPage() {
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
          UI Prototype · Star Rating
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Star Rating</h1>
        <p className="text-slate-400 text-lg mb-16">
          Rate your experience with a simple star rating.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10">
          <StarRating />
          <StarRating maxStars={5} initialRating={3} />
          <StarRating maxStars={10} initialRating={6} />
        </div>
      </div>
    </div>
  );
}
