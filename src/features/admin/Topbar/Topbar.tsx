import type { ReactNode, Ref } from "react";
import styles from "./Topbar.module.css";

type Props = {
  brand: ReactNode;
  toggle: Ref<HTMLButtonElement>;
  open: boolean;
  onToggle: () => void;
};

export default function Topbar({ brand, toggle, open, onToggle }: Props) {
  return (
    <header className={styles.topbar}>
      <div className={styles.brandSlot}>{brand}</div>
      <p className={styles.title}>Administrator Dashboard</p>
      <span className={styles.status}>Preview</span>
      <button ref={toggle} type="button" aria-expanded={open} aria-controls="admin-sidebar" onClick={onToggle}>
        {open ? "Close menu" : "Open menu"}
      </button>
    </header>
  );
}
