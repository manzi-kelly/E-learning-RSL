"use client";

import { useState, type ChangeEventHandler } from "react";
import styles from "./AuthForm.module.css";

type PasswordFieldProps = {
  id: string;
  label: string;
  autoComplete: "current-password" | "new-password";
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function PasswordField({ id, label, autoComplete, error, onChange }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.passwordRow}>
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={onChange}
          required
        />
        <button type="button" aria-controls={id} aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`} onClick={() => setVisible(!visible)}>
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {error && <p id={`${id}-error`} className={styles.error} role="alert">{error}</p>}
    </div>
  );
}
