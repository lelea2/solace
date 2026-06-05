import Link from "next/link";
import Carousel from "@/components/ui-prototype/carousel/Carousel";
import CarouselII from "@/components/ui-prototype/carousel/CarouselII";

export const metadata = {
  title: "Image Carousel — UI Prototype",
  description: "A simple image carousel component prototype.",
};

const images = [
  {
    src: 'https://picsum.photos/id/600/600/400',
    alt: 'Forest',
  },
  {
    src: 'https://picsum.photos/id/100/600/400',
    alt: 'Beach',
  },
  {
    src: 'https://picsum.photos/id/200/600/400',
    alt: 'Yak',
  },
  {
    src: 'https://picsum.photos/id/300/600/400',
    alt: 'Hay',
  },
  {
    src: 'https://picsum.photos/id/400/600/400',
    alt: 'Plants',
  },
  {
    src: 'https://picsum.photos/id/500/600/400',
    alt: 'Building',
  },
];

export default function CarouselPage() {
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
          UI Prototype · Image Carousel
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Image Carousel</h1>
        <p className="text-slate-400 text-lg mb-16">
          A simple image carousel component prototype.
        </p>

        <div className="flex justify-center">
          <Carousel images={images} />
        </div>

         <div className="flex justify-center">
          <CarouselII images={images} />
        </div>
      </div>
    </div>
  );
}
