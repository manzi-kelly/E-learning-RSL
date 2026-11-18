import type { ReactNode, Ref } from "react";
import styles from "./Topbar.module.css";

export default function Topbar({ brand, open, toggle, onToggle }: { brand: ReactNode; open: boolean; toggle: Ref<HTMLButtonElement>; onToggle: () => void }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.brandSlot}>{brand}</div>
      <p className={styles.title}>Student Dashboard</p>
      <span className={styles.status}>Preview</span>
      <button ref={toggle} type="button" aria-expanded={open} aria-controls="student-sidebar" onClick={onToggle}>
        {open ? "Close menu" : "Open menu"}
      </button>
    </header>
  );
}
