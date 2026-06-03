"use client";

import { useState, useEffect } from "react";
import './ProgressBar.css';

const MAX_CONCURRENT = 3;
function ProgressBar({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const id = requestAnimationFrame(() => {
      setFilled(true);
    });
    return () => cancelAnimationFrame(id);
  }, [isActive]);

  
  return (
    <div className="progress">
      <div
        className={`progress-fill ${filled ? "filled" : ""}`}
        onTransitionEnd={onComplete}
      />
    </div>
  );
}

export default function App() {
  const [bars, setBars] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  function addProgressBar() {
    setBars((prev: string[]) => [...prev, crypto.randomUUID()]);
  }

  function handleComplete(index: number) {
    if (index === activeIndex - MAX_CONCURRENT) {
      return;
    }
    setActiveIndex((prev) => Math.min(prev + 1, bars.length));
  }

  return (
    <div>
      <p className="text-slate-400 text-sm mb-4">
        Wait for the animation to complete before adding a new one.
      </p>
      <button onClick={addProgressBar}>Add</button>

      <div className="bars">
        {bars.map((id, index) => (
          <ProgressBar
            key={id}
            isActive={index <= activeIndex}
            onComplete={() => handleComplete(index)}
          />
        ))}
      </div>
    </div>
  );
}