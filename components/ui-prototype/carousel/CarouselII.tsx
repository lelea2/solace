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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  if (images.length === 0) return null;

  const startTransition = (targetIndex: number) => {
    if (isAnimating || nextIndex !== null || targetIndex === currentIndex) {
      return;
    }

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

    setCurrentIndex(nextIndex);

    // Reset immediately after committing the new image.
    setNextIndex(null);
    setIsAnimating(false);
  };

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