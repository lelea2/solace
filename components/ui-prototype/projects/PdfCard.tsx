export default function PdfCard({
  title,
  href,
  thumbnail,
  description,
}: {
  title: string;
  href: string;
  thumbnail: string;
  description: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden hover:border-slate-600 transition-colors"
    >
      <div
        className="relative w-full bg-slate-800 overflow-hidden"
        style={{ aspectRatio: "16 / 9" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={`First page of ${title}`}
          className="w-full h-full"
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
        <span className="absolute bottom-3 right-3 text-[10px] font-mono tracking-widest uppercase text-slate-200 bg-slate-950/80 border border-slate-700 rounded px-2 py-0.5">
          PDF
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-white group-hover:text-slate-100 mb-2">
          {title} ↗
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </a>
  );
}
