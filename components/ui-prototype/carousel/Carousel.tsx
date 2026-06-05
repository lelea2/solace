"use client";

import { useState } from 'react';
import styles from './ImageCarousel.module.css';

type CarouselImage = {
  src: string;
  alt: string;
};

type ImageCarouselProps = {
  images: CarouselImage[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.carousel} aria-label="Image carousel">
      <button
        type="button"
        className={`${styles.navButton} ${styles.leftButton}`}
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        ‹
      </button>

      {/* 
        Important interview point:
        Only ONE <img> exists in the DOM.
        We update its src/alt based on currentIndex instead of rendering all images.
      */}
      <img
        className={styles.image}
        src={currentImage.src}
        alt={currentImage.alt}
      />

      <button
        type="button"
        className={`${styles.navButton} ${styles.rightButton}`}
        onClick={goToNext}
        aria-label="Next image"
      >
        ›
      </button>

      <div className={styles.pageButtons} aria-label="Carousel pagination">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`${styles.pageButton} ${
              index === currentIndex ? styles.activePageButton : ''
            }`}
            onClick={() => goToImage(index)}
            aria-label={`Go to image ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}