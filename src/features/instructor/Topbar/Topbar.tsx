import type { ReactNode, Ref } from "react";
import styles from "./Topbar.module.css";

export default function Topbar({ brand, open, toggle, onToggle }: {
  brand: ReactNode; open: boolean; toggle: Ref<HTMLButtonElement>; onToggle: () => void;
}) {
  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>{brand}</div>
      <p className={styles.title}>Instructor Dashboard</p>
      <button
        ref={toggle}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="instructor-sidebar"
        onClick={onToggle}
      >
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
        <span>{open ? "Close menu" : "Open menu"}</span>
      </button>
    </header>
  );
}