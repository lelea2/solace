"use client";

import { useState } from "react";
import styles from "./styles.module.css"

const CELLS = Array.from({ length: 9 }, (_, i) => i).filter((i) => i !== 4);

export default function App() {
  const [activeCells, setActiveCells] = useState<number[]>([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  function handleClick(index: number) {
    if (isDeactivating || activeCells.includes(index)) return;

    const nextActiveCells = [...activeCells, index];
    setActiveCells(nextActiveCells);

    if (nextActiveCells.length === CELLS.length) {
      deactivateCells(nextActiveCells);
    }
  }

  function deactivateCells(cells: number[]) {
    setIsDeactivating(true);

    cells
      .slice()
      .reverse()
      .forEach((cell, i) => {
        setTimeout(() => {
          setActiveCells((prev) => prev.filter((item) => item !== cell));

          if (i === cells.length - 1) {
            setIsDeactivating(false);
          }
        }, (i + 1) * 300);
      });
  }

  return (
    <div className={styles.grid}>
      {Array.from({ length: 9 }, (_, index) => {
        if (index === 4) {
          return <div key={index} className={styles.cell} />;
        }

        const isActive = activeCells.includes(index);

        return (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={[
              styles.cell,
              // "w-80 h-80 rounded-lg border transition-colors duration-200",
              isActive
                ? "bg-orange-500 border-orange-400"
                : styles.inactive_cell,
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}