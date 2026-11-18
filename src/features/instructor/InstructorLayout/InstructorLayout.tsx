"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import styles from "./InstructorLayout.module.css";

export default function InstructorLayout({ brand, children }: { brand: ReactNode; children: ReactNode }) {
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
    <div
      className={styles.shell}
      onKeyDown={event => {
        if (open && event.key === "Escape") {
          event.preventDefault();
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <a href="#instructor-main" className={styles.skip}>Skip to main content</a>

      <div className={styles.header}>
        <Topbar brand={brand} open={open} toggle={toggle} onToggle={() => setOpen(previous => !previous)} />
      </div>

      <div className={styles.workspace}>
        {open && <div className={styles.backdrop} aria-hidden="true" onClick={() => setOpen(false)} />}

        <div id="instructor-sidebar" ref={sidebar} data-open={open} className={styles.sidebar}>
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>

        <main id="instructor-main" tabIndex={-1} className={styles.main}>
          <div className={styles.content}>
            <p className={styles.notice}>
              Instructor dashboard preview — course and student records are demonstration data.
            </p>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}