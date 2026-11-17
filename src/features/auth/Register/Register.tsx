"use client";

import { useState, type FormEvent } from "react";
import PasswordField from "../PasswordField";
import usePreviewReady from "../usePreviewReady";
import form from "../AuthForm.module.css";
import styles from "./Register.module.css";

export default function Register() {
  const ready = usePreviewReady();
  const [mismatch, setMismatch] = useState(false);
  const [checked, setChecked] = useState(false);

  function clearFeedback() {
    setMismatch(false);
    setChecked(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = event.currentTarget.querySelector<HTMLInputElement>("#register-password");
    const confirmation = event.currentTarget.querySelector<HTMLInputElement>("#register-confirmation");
    if (!password || !confirmation) return;

    if (password.value !== confirmation.value) {
      setMismatch(true);
      confirmation.focus();
      return;
    }

    event.currentTarget.reset();
    setChecked(true);
  }

  return (
    <form className={form.form} onSubmit={submit} aria-describedby="auth-preview-note">
      <div className={form.field}>
        <label htmlFor="register-name">Full name</label>
        <input id="register-name" autoComplete="name" required onChange={clearFeedback} />
      </div>
      <div className={form.field}>
        <label htmlFor="register-email">Email address</label>
        <input id="register-email" type="email" autoComplete="email" required onChange={clearFeedback} />
      </div>
      <PasswordField id="register-password" label="Password" autoComplete="new-password" onChange={clearFeedback} />
      <PasswordField id="register-confirmation" label="Confirm password" autoComplete="new-password" onChange={clearFeedback}
        error={mismatch ? "Passwords do not match." : undefined} />
      <p className={styles.student}>Public registration will be for student accounts.</p>
      <button className={form.submit} type="submit" disabled={!ready}>Check Create Account form</button>
      <p className={form.feedback} role="status">{checked ? "Preview validation complete. No account was created." : ""}</p>
    </form>
  );
}
