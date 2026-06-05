"use client";

import { ChangeEvent, ClipboardEvent, KeyboardEvent, useRef, useState } from "react";
import styles from "./AuthCodeInput.module.css";

const OTP_LENGTH = 6;

export default function AuthCodeInput() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isComplete = otp.every(Boolean);
  const isEmpty = otp.every((digit) => digit === "");

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const updateDigit = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    if (value && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
      // Typing into a filled cell produces `existingDigit + newDigit` (e.g. "53").
      // Only replace the current cell instead of refilling from index 0.
      if (digits.length === 2 && digits[0] === otp[index]) {
        updateDigit(index, digits[1]);
        return;
      }
      fillOtpFromString(digits);
      return;
    }

    updateDigit(index, value);
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Backspace") return;

    event.preventDefault();

    const nextOtp = [...otp];

    if (nextOtp[index]) {
      nextOtp[index] = "";
      setOtp(nextOtp);
      return;
    }

    if (index > 0) {
      nextOtp[index - 1] = "";
      setOtp(nextOtp);
      focusInput(index - 1);
    }
  };

  const fillOtpFromString = (value: string) => {
    const nextOtp = Array(OTP_LENGTH).fill("");

    for (let i = 0; i < value.length; i++) {
      nextOtp[i] = value[i];
    }

    setOtp(nextOtp);
    focusInput(Math.min(value.length, OTP_LENGTH - 1));
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    fillOtpFromString(pastedValue);
  };

  const handleReset = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    focusInput(0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isComplete) return;

    try {
      const response = await fetch(
        "https://questions.greatfrontend.com/api/questions/auth-code-input",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: otp.join("") }),
        }
      );

      if (response.status === 204) {
        alert("Success!");
      } else {
        alert("Invalid code.");
      }
    } catch {
      alert("Network error. Please try again.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Enter authorization code</h1>

      <div className={styles.inputs}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            className={styles.input}
            value={digit}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            aria-label={`Digit ${index + 1}`}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
          />
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.button} type="submit" disabled={!isComplete}>
          Submit
        </button>

        <button
          className={styles.button}
          type="button"
          disabled={isEmpty}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
}