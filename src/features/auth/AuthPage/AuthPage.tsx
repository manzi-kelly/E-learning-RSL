"use client";

import { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
  const [mode, setMode] = useState<"register" | "login">("register");

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Rwanda Sign Language E-Learning Platform</p>
          <h1>Your learning <em>starts here.</em></h1>
          <p className={styles.description}>Preview how students will create an account and sign in to learn Rwanda Sign Language.</p>
        </header>
        <section className={styles.account} aria-labelledby="account-mode-title">
          <div className={styles.modes} role="group" aria-label="Account mode">
            <button type="button" aria-pressed={mode === "register"} onClick={() => setMode("register")}>Create Account</button>
            <button type="button" aria-pressed={mode === "login"} onClick={() => setMode("login")}>Login</button>
          </div>
          <h2 id="account-mode-title">{mode === "register" ? "Create Account" : "Login"}</h2>
          <p className={styles.notice} id="auth-preview-note">Frontend preview. Use sample details only. This form cannot create an account or sign you in.</p>
          {mode === "register" ? <Register /> : <Login />}
        </section>
      </div>
    </div>
  );
}
