"use client";

import { useState } from "react";
import styles from "./App.module.css";

const MIN_DICE = 1;
const MAX_DICE = 12;

export default function App() {
  const [count, setCount] = useState<number>(1);
  const [results, setResults] = useState<number[]>([]);

  const rollDice = () => {
    const rolls = Array.from(
      { length: count },
      () => Math.floor(Math.random() * 6) + 1
    );

    setResults(rolls);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (Number.isNaN(value)) return;

    setCount(
      Math.min(MAX_DICE, Math.max(MIN_DICE, value))
    );
  };

  return (
    <div className={styles.container}>
      <h1>Dice Roller</h1>

      <div className={styles.controls}>
        <label htmlFor="diceCount">Number of Dice</label>

        <input
          id="diceCount"
          type="number"
          min={MIN_DICE}
          max={MAX_DICE}
          value={count}
          onChange={handleChange}
        />

        <button onClick={rollDice}>Roll</button>
      </div>

      {results.length > 0 && (
        <div className={styles.grid}>
          {results.map((value, index) => (
            <div key={index} className={styles.die}>
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}