"use client";

import {
  useState,
  type ChangeEventHandler,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import styles from "./PasswordField.module.css";

type PasswordFieldProps = {
  id: string;
  label: string;
  autoComplete: "current-password" | "new-password";
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Optional extras, all backwards compatible with the old component */
  name?: string;
  value?: string;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  /** Shown on the right of the label, e.g. a "Forgot password?" link */
  labelAction?: ReactNode;
  /** Warn when Caps Lock is on (default: true) */
  capsLockWarning?: boolean;
};

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M4 4l16 16" />}
    </svg>
  );
}

export default function PasswordField({
  id,
  label,
  autoComplete,
  error,
  onChange,
  name,
  value,
  placeholder,
  hint,
  disabled,
  required = true,
  labelAction,
  capsLockWarning = true,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const capsId = `${id}-caps`;
  const describedBy =
    [error ? errorId : "", hint ? hintId : "", capsLock ? capsId : ""].filter(Boolean).join(" ") || undefined;

  function checkCapsLock(event: KeyboardEvent<HTMLInputElement>) {
    if (capsLockWarning) setCapsLock(event.getModifierState("CapsLock"));
  }

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label htmlFor={id}>{label}</label>
        {labelAction}
      </div>

      <div className={styles.control}>
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={onChange}
          onKeyDown={checkCapsLock}
          onKeyUp={checkCapsLock}
          onBlur={() => setCapsLock(false)}
        />
        <button
          type="button"
          className={styles.toggle}
          aria-controls={id}
          aria-pressed={visible}
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          title={visible ? "Hide password" : "Show password"}
          disabled={disabled}
          onClick={() => setVisible((current) => !current)}
        >
          <EyeIcon off={visible} />
        </button>
      </div>

      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {capsLock && (
        <p id={capsId} className={styles.caps}>
          Caps Lock is on.
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}