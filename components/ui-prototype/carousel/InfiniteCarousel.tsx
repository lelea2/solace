"use client";

import { useState } from "react";
import styles from "./InfiniteCarousel.module.css";

const puppies = [
  "https://frontendeval.com/images/puppy-1.jpeg",
  "https://frontendeval.com/images/puppy-2.jpeg",
  "https://frontendeval.com/images/puppy-3.jpeg",
  "https://frontendeval.com/images/puppy-4.jpeg",
  "https://frontendeval.com/images/puppy-5.jpeg",
  "https://frontendeval.com/images/puppy-6.jpeg",
  "https://frontendeval.com/images/puppy-7.jpeg",
  "https://frontendeval.com/images/puppy-8.jpeg",
  "https://frontendeval.com/images/puppy-9.jpeg",
  "https://frontendeval.com/images/puppy-10.jpeg",
  "https://frontendeval.com/images/puppy-11.jpeg",
  "https://frontendeval.com/images/puppy-12.jpeg",
];

const kittens = [
  "https://frontendeval.com/images/kitten-1.jpeg",
  "https://frontendeval.com/images/kitten-2.jpeg",
  "https://frontendeval.com/images/kitten-3.jpeg",
  "https://frontendeval.com/images/kitten-4.jpeg",
  "https://frontendeval.com/images/kitten-5.jpeg",
  "https://frontendeval.com/images/kitten-6.jpeg",
  "https://frontendeval.com/images/kitten-7.jpeg",
  "https://frontendeval.com/images/kitten-8.jpeg",
  "https://frontendeval.com/images/kitten-9.jpeg",
  "https://frontendeval.com/images/kitten-10.jpeg",
  "https://frontendeval.com/images/kitten-11.jpeg",
  "https://frontendeval.com/images/kitten-12.jpeg",
];

type InfiniteRowProps = {
  images: string[];
  speed: number;
  paused: boolean;
  label: string;
  onSelect: (src: string) => void;
};

function InfiniteRow({
  images,
  speed,
  paused,
  label,
  onSelect,
}: InfiniteRowProps) {
  const imageWidth = 180;
  const gap = 16;

  const scrollDistance = images.length * (imageWidth + gap);
  const duration = scrollDistance / speed;

  const duplicatedImages = [...images, ...images];

  return (
    <section className={styles.rowSection} aria-label={label}>
      <h2>{label}</h2>

      <div
        className={styles.viewport}
        style={
          {
            "--duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        <div className={`${styles.track} ${paused ? styles.paused : ""}`}>
          {duplicatedImages.map((src, index) => (
            <button
              className={styles.imageButton}
              key={`${src}-${index}`}
              onClick={() => onSelect(src)}
              aria-label={`Select ${label} image ${(index % images.length) + 1}`}
            >
              <img src={src} alt={`${label} ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <h1>Puppies and Kittens</h1>

        <button
          className={styles.pauseButton}
          onClick={() => setPaused((prev) => !prev)}
        >
          {paused ? "Play" : "Paws"}
        </button>
      </header>

      <InfiniteRow
        label="Puppies"
        images={puppies}
        speed={20}
        paused={paused}
        onSelect={setSelectedImage}
      />

      <InfiniteRow
        label="Kittens"
        images={kittens}
        speed={10}
        paused={paused}
        onSelect={setSelectedImage}
      />

      <section className={styles.selectedSection}>
        <h2>Selected Image</h2>

        {selectedImage ? (
          <img
            className={styles.selectedImage}
            src={selectedImage}
            alt="Selected animal"
          />
        ) : (
          <p>Click an image to display it here.</p>
        )}
      </section>
    </main>
  );
}