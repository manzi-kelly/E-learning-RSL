"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import styles from "./StudentLayout.module.css";

export default function StudentLayout({ children, brand }: { children: ReactNode; brand: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const close = () => setOpen(false);
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (open) sidebar.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <div className={styles.shell} onKeyDown={event => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
        toggle.current?.focus();
      }
    }}>
      <a className={styles.skip} href="#student-main">Skip to main content</a>
      <Topbar brand={brand} open={open} toggle={toggle} onToggle={() => setOpen(previous => !previous)} />
      <div className={styles.workspace}>
        <div className={styles.sidebar} id="student-sidebar" data-open={open} ref={sidebar}>
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>
        <main id="student-main" tabIndex={-1} className={styles.main}>
          <div className={styles.content}>
            <p className={styles.notice}>Student dashboard preview — learning records are demonstration data.</p>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}