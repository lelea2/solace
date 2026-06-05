"use client";

import { useEffect, useState } from "react";
import styles from "./App.module.css";

type Light = "red" | "yellow" | "green";

const DURATIONS: Record<Light, number> = {
  red: 4000,
  yellow: 500,
  green: 3000,
};

const NEXT_LIGHT: Record<Light, Light> = {
  red: "green",
  green: "yellow",
  yellow: "red",
};

export default function App() {
  const [activeLight, setActiveLight] =
    useState<Light>("red");

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveLight(
        (current) => NEXT_LIGHT[current]
      );
    }, DURATIONS[activeLight]);

    return () => clearTimeout(timer);
  }, [activeLight]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.trafficLight}>
        <div
          className={`${styles.light} ${
            activeLight === "red" ? styles.redOn : ""
          }`}
        />

        <div
          className={`${styles.light} ${
            activeLight === "yellow"
              ? styles.yellowOn
              : ""
          }`}
        />

        <div
          className={`${styles.light} ${
            activeLight === "green"
              ? styles.greenOn
              : ""
          }`}
        />
      </div>

      <div className={styles.label}>
        {activeLight.toUpperCase()}
      </div>
    </div>
  );
}