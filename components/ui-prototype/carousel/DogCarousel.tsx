"use client";

import { useEffect, useState } from "react";
import { Dog, getDogs } from "./dogapi";
import styles from "./DogCarousel.module.css";

type FetchState = "loading" | "success" | "error" | "empty";

const DOG_LIMIT = 10;

export default function DogCarousel() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fetchState, setFetchState] = useState<FetchState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const totalDogs = dogs.length;
  const currentDog = dogs[currentIndex];

  const goToSlide = (index: number) => {
    if (totalDogs === 0) return;

    // Wrap around:
    // - index after last goes back to first
    // - index before first goes to last
    const nextIndex = (index + totalDogs) % totalDogs;

    setCurrentIndex(nextIndex);
  };

  const goToPrevious = () => {
    goToSlide(currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadDogs() {
      try {
        setFetchState("loading");
        setErrorMessage("");

        const dogResults = await getDogs(DOG_LIMIT);

        if (!isMounted) return;

        setDogs(dogResults);
        setCurrentIndex(0);
        setFetchState(dogResults.length > 0 ? "success" : "empty");
      } catch (error) {
        if (!isMounted) return;

        setFetchState("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading dogs."
        );
      }
    }

    loadDogs();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, totalDogs]);

  if (fetchState === "loading") {
    return (
      <main className={styles.page}>
        <section className={styles.carouselCard}>
          <p className={styles.statusText}>Loading cute dogs...</p>
        </section>
      </main>
    );
  }

  if (fetchState === "error") {
    return (
      <main className={styles.page}>
        <section className={styles.carouselCard}>
          <h1 className={styles.title}>Could not load dogs</h1>
          <p className={styles.statusText}>{errorMessage}</p>
        </section>
      </main>
    );
  }

  if (fetchState === "empty") {
    return (
      <main className={styles.page}>
        <section className={styles.carouselCard}>
          <h1 className={styles.title}>No dogs found</h1>
          <p className={styles.statusText}>Please try again later.</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section
        className={styles.carouselCard}
        aria-label="Dogs with jobs slideshow"
        aria-roledescription="carousel"
      >
        <header className={styles.carouselHeader}>
          <div>
            <p className={styles.eyebrow}>/r/dogswithjobs</p>
            <h1 className={styles.title}>Top Dogs With Jobs</h1>
          </div>

          <p className={styles.counter}>
            {currentIndex + 1} / {totalDogs}
          </p>
        </header>

        <div className={styles.carousel}>
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            aria-label="Previous dog"
            onClick={goToPrevious}
          >
            ‹
          </button>

          <figure className={styles.slide}>
            <img
              className={styles.slideImage}
              src={currentDog.url}
              alt={currentDog.title}
            />

            <figcaption className={styles.caption}>
              <h2>{currentDog.title}</h2>
              <p>Use the arrow buttons, keyboard arrows, or dots to navigate.</p>
            </figcaption>
          </figure>

          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonRight}`}
            aria-label="Next dog"
            onClick={goToNext}
          >
            ›
          </button>
        </div>

        <div className={styles.dots} aria-label="Carousel pagination">
          {dogs.map((dog, index) => (
            <button
              key={`${dog.title}-${dog.url}`}
              type="button"
              className={
                index === currentIndex
                  ? `${styles.dot} ${styles.dotActive}`
                  : styles.dot
              }
              aria-label={`Go to dog ${index + 1}`}
              aria-current={index === currentIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}