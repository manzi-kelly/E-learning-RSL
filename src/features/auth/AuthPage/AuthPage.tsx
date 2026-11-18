"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Login, { type LoginValues } from "../Login/Login";
import Register from "../Register/Register";
import { demoAccounts, demoPassword, findDemoAccount, type DemoAccount } from "../demoAccounts";
import styles from "./AuthPage.module.css";

type Mode = "login" | "register";
type Credentials = { email: string; password: string };

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  function switchMode(next: Mode) {
    setCredentials(null);
    setMode(next);
  }

  function fillDemo(account: DemoAccount) {
    setCredentials({ email: account.email, password: account.password });
    setMode("login");
  }

  async function signIn(values: LoginValues) {
    const account = findDemoAccount(values.email, values.password);
    if (!account) {
      throw new Error("Those details do not match a demo account. Use one of the accounts below.");
    }
    router.push(account.href);
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Rwanda Sign Language E-Learning Platform</p>
          <h1>Your learning <em>starts here.</em></h1>
          <p className={styles.description}>
            Sign in with a demo account to preview the dashboards, or preview how students will create an
            account.
          </p>
        </header>
        <section className={styles.account} aria-labelledby="account-mode-title">
          <div className={styles.modes} role="group" aria-label="Account mode">
            <button type="button" aria-pressed={mode === "login"} onClick={() => switchMode("login")}>Login</button>
            <button type="button" aria-pressed={mode === "register"} onClick={() => switchMode("register")}>Create Account</button>
          </div>
          <h2 id="account-mode-title">{mode === "login" ? "Login" : "Create Account"}</h2>
          <p className={styles.notice} id="auth-preview-note">
            {mode === "login"
              ? "Mock sign-in opens the dashboard preview. Use one of the demo accounts below."
              : "Frontend preview only. This form cannot create a real account."}
          </p>

          {mode === "login" ? (
            <>
              <Login
                key={credentials ? `${credentials.email}:${credentials.password}` : "blank"}
                defaultEmail={credentials?.email}
                defaultPassword={credentials?.password}
                onSubmit={signIn}
                onRegister={() => switchMode("register")}
                forgotPasswordHref="/about-us#contact"
              />
              <section className={styles.demo} aria-labelledby="demo-accounts-title">
                <h3 id="demo-accounts-title">Demo accounts</h3>
                <p>
                  Use these mock logins to preview the dashboard designs. Password:{" "}
                  <strong>{demoPassword}</strong>
                </p>
                <ul role="list">
                  {demoAccounts.map((account) => (
                    <li key={account.email}>
                      <div>
                        <p className={styles.demoRole}>{account.role}</p>
                        <p className={styles.demoEmail}>{account.email}</p>
                      </div>
                      <button type="button" onClick={() => fillDemo(account)}>Use</button>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <Register
              onLogin={() => switchMode("login")}
              termsHref="/about-us#terms"
              privacyHref="/about-us#privacy"
            />
          )}
        </section>
      </div>
    </div>
  );
}
