"use client";

import { useId, useState } from 'react';
import styles from './Toggle.module.css';

type ToggleSize = 'small' | 'medium';

type ToggleProps = {
  /**
   * Accessible label for screen readers.
   * Example: "Enable dark mode"
   */
  label: string;

  /**
   * Visual size of the toggle.
   */
  size?: ToggleSize;

  /**
   * Controlled checked state.
   */
  checked?: boolean;

  /**
   * Initial value for uncontrolled usage.
   */
  defaultChecked?: boolean;

  /**
   * Disable user interaction.
   */
  disabled?: boolean;

  /**
   * Called whenever toggle value changes.
   */
  onChange?: (checked: boolean) => void;

  /**
   * Optional visible label next to the toggle.
   */
  showLabel?: boolean;
};

export function Toggle({
  label,
  size = 'medium',
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  showLabel = false,
}: ToggleProps) {
  const id = useId();

  /**
   * If `checked` is provided, the component is controlled.
   * Otherwise, it manages its own internal state.
   */
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isChecked = isControlled ? checked : internalChecked;

  function handleToggle() {
    if (disabled) return;

    const nextChecked = !isChecked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onChange?.(nextChecked);
  }

  return (
    <div className={styles.wrapper}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={label}
        disabled={disabled}
        className={[
          styles.toggle,
          styles[size],
          isChecked ? styles.checked : styles.unchecked,
        ].join(' ')}
        onClick={handleToggle}
      >
        <span className={styles.thumb} />
      </button>

      {showLabel && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
}