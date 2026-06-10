"use client";

import { useState } from 'react';
import styles from './ImageCarouselII.module.css';

type CarouselImage = {
  src: string;
  alt: string;
};

type Props = {
  images: CarouselImage[];
};

export default function ImageCarousel({ images }: Props) {
  // Three-state model: currentIndex = visible slot, nextIndex = incoming slot, isAnimating = CSS transition in flight.
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  if (images.length === 0) return null;

  const startTransition = (targetIndex: number) => {
    // Guard: reject if already animating, next slot already claimed, or target is the current slide.
    if (isAnimating || nextIndex !== null || targetIndex === currentIndex) {
      return;
    }

    // Mount the incoming image first, then trigger animation in the next frame.
    // Without rAF the browser hasn't painted the second image yet, so the CSS translate would skip.
    setNextIndex(targetIndex);

    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
  };

  const goPrev = () => {
    const targetIndex =
      currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    // Still animate right-to-left.
    startTransition(targetIndex);
  };

  const goNext = () => {
    const targetIndex =
      currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    startTransition(targetIndex);
  };

  const handleTransitionEnd = () => {
    if (nextIndex === null) return;

    // Commit state only after the CSS transition finishes — more reliable than setTimeout(duration).
    setCurrentIndex(nextIndex);
    setNextIndex(null);
    setIsAnimating(false);
  };

  // Two-slot technique: track holds [current, incoming] side by side; CSS translateX(-50%) slides to reveal incoming.
  const activeImage = images[currentIndex];
  const incomingImage = nextIndex !== null ? images[nextIndex] : null;

  return (
    <section className={styles.carousel} aria-label="Image carousel">
      <div className={styles.viewport}>
        <div
          className={`${styles.track} ${
            isAnimating ? styles.trackSliding : ''
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          <img
            className={styles.image}
            src={activeImage.src}
            alt={activeImage.alt}
          />

          {incomingImage && (
            <img
              className={styles.image}
              src={incomingImage.src}
              alt={incomingImage.alt}
            />
          )}
        </div>
      </div>

      {/* disabled during animation so clicks can't queue a second transition mid-flight. */}
      <button
        type="button"
        className={`${styles.navButton} ${styles.leftButton}`}
        onClick={goPrev}
        disabled={isAnimating}
      >
        ‹
      </button>

      <button
        type="button"
        className={`${styles.navButton} ${styles.rightButton}`}
        onClick={goNext}
        disabled={isAnimating}
      >
        ›
      </button>

      <div className={styles.pageButtons}>
        {/* key on src — not index — so React tracks identity correctly if the images array is reordered. */}
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`${styles.pageButton} ${
              index === currentIndex ? styles.activePageButton : ''
            }`}
            onClick={() => startTransition(index)}
            disabled={isAnimating}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}