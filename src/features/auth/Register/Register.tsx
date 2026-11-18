"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import styles from "./Register.module.css";

export type RegisterValues = {
  name: string;
  email: string;
  password: string;
  terms: boolean;
};

type Props = {
  /** Connect your real sign-up here. Throw an Error to show its message on the form. */
  onSubmit?: (values: RegisterValues) => Promise<void>;
  loginHref?: string;
  termsHref?: string;
  privacyHref?: string;
  onLogin?: () => void;
};

type FieldName = "name" | "email" | "password" | "confirmation" | "terms";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules = [
  { id: "length", label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { id: "case", label: "Upper and lower case letters", test: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { id: "number", label: "At least one number", test: (value: string) => /\d/.test(value) },
];

const strengthLabels = ["Too weak", "Weak", "Fair", "Strong"];

function PasswordInput({
  id,
  name,
  value,
  placeholder,
  autoComplete,
  invalid,
  describedBy,
  disabled,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  invalid: boolean;
  describedBy?: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.passwordWrap}>
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        disabled={disabled}
        required
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setVisible((current) => !current)}
        aria-pressed={visible}
        aria-label={visible ? "Hide password" : "Show password"}
        disabled={disabled}
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export default function Register({
  onSubmit,
  loginHref = "/login",
  termsHref = "/terms",
  privacyHref = "/privacy",
  onLogin,
}: Props) {
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    password: `${uid}-password`,
    confirmation: `${uid}-confirmation`,
    terms: `${uid}-terms`,
    rules: `${uid}-rules`,
  };

  const [values, setValues] = useState({ name: "", email: "", password: "", confirmation: "", terms: false });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);

  const passed = rules.filter((rule) => rule.test(values.password)).length;
  const strength = values.password ? passed : -1;
  const passwordsMatch = values.confirmation.length > 0 && values.password === values.confirmation;

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus(null);
  }

  function validate(): Errors {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name.";
    if (!values.email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = "Enter a valid email address, like name@example.com.";
    if (!values.password) next.password = "Create a password.";
    else if (passed < rules.length) next.password = "Your password does not meet all the requirements below.";
    if (!values.confirmation) next.confirmation = "Confirm your password.";
    else if (values.password !== values.confirmation) next.confirmation = "Passwords do not match.";
    if (!values.terms) next.terms = "You must accept the terms to create an account.";
    return next;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    const firstInvalid = (["name", "email", "password", "confirmation", "terms"] as FieldName[]).find(
      (field) => nextErrors[field],
    );
    if (firstInvalid) {
      setStatus({ type: "error", message: "Please fix the highlighted fields and try again." });
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      if (onSubmit) {
        await onSubmit({
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
          terms: values.terms,
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900));
        setStatus({ type: "success", message: "Preview validation complete. No account was created." });
        setValues({ name: "", email: "", password: "", confirmation: "", terms: false });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "We could not create your account. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate aria-busy={loading}>
      <header className={styles.header}>
        <h1>Create your account</h1>
        <p>Join Rwanda Sign Language learning in a few quick steps.</p>
      </header>

      <p className={styles.student}>Public registration will be for student accounts.</p>

      <div
        className={`${styles.alert} ${status ? styles[status.type] : ""}`}
        role={status?.type === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {status?.message}
      </div>

      <div className={styles.field}>
        <label htmlFor={ids.name}>Full name</label>
        <input
          id={ids.name}
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${ids.name}-error` : undefined}
          disabled={loading}
          required
        />
        {errors.name && <p id={`${ids.name}-error`} className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor={ids.email}>Email address</label>
        <input
          id={ids.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${ids.email}-error` : undefined}
          disabled={loading}
          required
        />
        {errors.email && <p id={`${ids.email}-error`} className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor={ids.password}>Password</label>
        <PasswordInput
          id={ids.password}
          name="password"
          value={values.password}
          placeholder="Create a password"
          autoComplete="new-password"
          invalid={Boolean(errors.password)}
          describedBy={[errors.password ? `${ids.password}-error` : "", ids.rules].filter(Boolean).join(" ")}
          disabled={loading}
          onChange={(value) => update("password", value)}
        />
        {errors.password && <p id={`${ids.password}-error`} className={styles.error}>{errors.password}</p>}

        <div className={styles.strength} data-level={strength}>
          <div className={styles.meter} aria-hidden="true">
            <span /><span /><span />
          </div>
          <p className={styles.strengthLabel}>
            Password strength: <strong>{strength < 0 ? "Not set" : strengthLabels[strength]}</strong>
          </p>
        </div>

        <ul id={ids.rules} className={styles.rules} role="list">
          {rules.map((rule) => {
            const met = rule.test(values.password);
            return (
              <li key={rule.id} className={met ? styles.met : undefined}>
                <span className={styles.tick} aria-hidden="true">{met ? "✓" : ""}</span>
                {rule.label}
                <span className={styles.srOnly}>{met ? " (met)" : " (not met)"}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.field}>
        <label htmlFor={ids.confirmation}>Confirm password</label>
        <PasswordInput
          id={ids.confirmation}
          name="confirmation"
          value={values.confirmation}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          invalid={Boolean(errors.confirmation)}
          describedBy={errors.confirmation ? `${ids.confirmation}-error` : undefined}
          disabled={loading}
          onChange={(value) => update("confirmation", value)}
        />
        {errors.confirmation && (
          <p id={`${ids.confirmation}-error`} className={styles.error}>{errors.confirmation}</p>
        )}
        {!errors.confirmation && passwordsMatch && <p className={styles.ok}>Passwords match.</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.terms}>
          <input
            id={ids.terms}
            type="checkbox"
            name="terms"
            checked={values.terms}
            onChange={(event) => update("terms", event.target.checked)}
            aria-invalid={Boolean(errors.terms)}
            aria-describedby={errors.terms ? `${ids.terms}-error` : undefined}
            disabled={loading}
          />
          <span>
            I agree to the <Link href={termsHref}>Terms of Use</Link> and{" "}
            <Link href={privacyHref}>Privacy Policy</Link>.
          </span>
        </label>
        {errors.terms && <p id={`${ids.terms}-error`} className={styles.error}>{errors.terms}</p>}
      </div>

      <button className={styles.submit} type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className={styles.spinner} aria-hidden="true" />
            Creating account…
          </>
        ) : (
          "Create account"
        )}
      </button>

      <p className={styles.switch}>
        Already have an account?{" "}
        {onLogin ? (
          <button type="button" onClick={onLogin}>Sign in</button>
        ) : (
          <Link href={loginHref}>Sign in</Link>
        )}
      </p>
    </form>
  );
}