"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type KeyboardEvent } from "react";
import styles from "./Login.module.css";

export type LoginValues = {
  email: string;
  password: string;
  remember: boolean;
};

type Props = {
  /** Connect your real sign-in here. Throw an Error to show its message on the form. */
  onSubmit?: (values: LoginValues) => Promise<void>;
  forgotPasswordHref?: string;
  registerHref?: string;
  onRegister?: () => void;
  defaultEmail?: string;
  defaultPassword?: string;
};

type Errors = Partial<Record<"email" | "password", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: LoginValues): Errors {
  const errors: Errors = {};
  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address, like name@example.com.";
  }
  if (!values.password) {
    errors.password = "Enter your password.";
  } else if (values.password.length < 8) {
    errors.password = "Your password must be at least 8 characters.";
  }
  return errors;
}

export default function Login({
  onSubmit,
  forgotPasswordHref = "/forgot-password",
  registerHref = "/register",
  onRegister,
  defaultEmail = "",
  defaultPassword = "",
}: Props) {
  const uid = useId();
  const emailId = `${uid}-email`;
  const passwordId = `${uid}-password`;

  const [values, setValues] = useState<LoginValues>({ email: defaultEmail, password: defaultPassword, remember: true });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);

  function update<K extends keyof LoginValues>(key: K, value: LoginValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (key === "email" || key === "password") {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
    setStatus(null);
  }

  function checkCapsLock(event: KeyboardEvent<HTMLInputElement>) {
    setCapsLock(event.getModifierState("CapsLock"));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) {
      setStatus({ type: "error", message: "Please fix the highlighted fields and try again." });
      document.getElementById(nextErrors.email ? emailId : passwordId)?.focus();
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      if (onSubmit) {
        await onSubmit({ ...values, email: values.email.trim() });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900));
        setStatus({
          type: "success",
          message: "Preview validation complete. You were not signed in.",
        });
        setValues((current) => ({ ...current, password: "" }));
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "We could not sign you in. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate aria-busy={loading}>
      <header className={styles.header}>
        <h1>Welcome back</h1>
        <p>Sign in to continue your Rwanda Sign Language learning.</p>
      </header>

      <div
        className={`${styles.alert} ${status ? styles[status.type] : ""}`}
        role={status?.type === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {status?.message}
      </div>

      <div className={styles.field}>
        <label htmlFor={emailId}>Email address</label>
        <input
          id={emailId}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="username"
          placeholder="name@example.com"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          disabled={loading}
          required
        />
        {errors.email && (
          <p id={`${emailId}-error`} className={styles.error}>
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor={passwordId}>Password</label>
          <Link className={styles.recovery} href={forgotPasswordHref}>
            Forgot password?
          </Link>
        </div>
        <div className={styles.passwordWrap}>
          <input
            id={passwordId}
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={values.password}
            onChange={(event) => update("password", event.target.value)}
            onKeyUp={checkCapsLock}
            onKeyDown={checkCapsLock}
            onBlur={() => setCapsLock(false)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              [errors.password ? `${passwordId}-error` : "", capsLock ? `${passwordId}-caps` : ""]
                .filter(Boolean)
                .join(" ") || undefined
            }
            disabled={loading}
            required
          />
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowPassword((visible) => !visible)}
            aria-pressed={showPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={loading}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {capsLock && (
          <p id={`${passwordId}-caps`} className={styles.hint}>
            Caps Lock is on.
          </p>
        )}
        {errors.password && (
          <p id={`${passwordId}-error`} className={styles.error}>
            {errors.password}
          </p>
        )}
      </div>

      <label className={styles.remember}>
        <input
          type="checkbox"
          name="remember"
          checked={values.remember}
          onChange={(event) => update("remember", event.target.checked)}
          disabled={loading}
        />
        <span>Keep me signed in on this device</span>
      </label>

      <button className={styles.submit} type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className={styles.spinner} aria-hidden="true" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </button>

      <p className={styles.switch}>
        New to Rwanda Sign Language?{" "}
        {onRegister ? (
          <button type="button" onClick={onRegister}>Create an account</button>
        ) : (
          <Link href={registerHref}>Create an account</Link>
        )}
      </p>
    </form>
  );
}