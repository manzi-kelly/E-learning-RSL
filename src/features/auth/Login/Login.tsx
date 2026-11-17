"use client";

import { useState, type FormEvent } from "react";
import PasswordField from "../PasswordField";
import usePreviewReady from "../usePreviewReady";
import form from "../AuthForm.module.css";
import styles from "./Login.module.css";

export default function Login() {
  const ready = usePreviewReady();
  const [checked, setChecked] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setChecked(true);
  }

  return (
    <form className={form.form} onSubmit={submit} aria-describedby="auth-preview-note">
      <div className={form.field}>
        <label htmlFor="login-email">Email address</label>
        <input id="login-email" type="email" autoComplete="username" required onChange={() => setChecked(false)} />
      </div>
      <PasswordField id="login-password" label="Password" autoComplete="current-password" onChange={() => setChecked(false)} />
      <p className={styles.recovery}>Forgot password? Password reset is unavailable in this preview.</p>
      <button className={form.submit} type="submit" disabled={!ready}>Check Login form</button>
      <p className={form.feedback} role="status">{checked ? "Preview validation complete. You were not signed in." : ""}</p>
    </form>
  );
}
