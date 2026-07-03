"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

export default function VideoCard({
  title,
  description,
  src,
}: {
  title: string;
  description: ReactNode;
  src: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlay() {
    setIsPlaying(true);
    videoRef.current?.play();
  }

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      <div
        className="relative w-full bg-slate-800 overflow-hidden"
        style={{ aspectRatio: "16 / 9" }}
      >
        <video
          ref={videoRef}
          src={src}
          preload="metadata"
          controls={isPlaying}
          playsInline
          className="w-full h-full"
          style={{ objectFit: "cover" }}
          onClick={!isPlaying ? handlePlay : undefined}
          onEnded={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play ${title} video`}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-slate-900 text-2xl">
              ▶
            </span>
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
