"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Topbar from "../Topbar/Topbar";
import styles from "./AdminLayout.module.css";

export default function AdminNavigation({ brand, sidebar, children }: { brand: ReactNode; sidebar: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const sidebarRegion = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) toggle.current?.focus();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnResize = () => close(false);
    desktop.addEventListener("change", closeOnResize);
    return () => desktop.removeEventListener("change", closeOnResize);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    sidebarRegion.current?.querySelector<HTMLElement>("a, button, [tabindex]:not([tabindex='-1'])")?.focus();
  }, [open]);

  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#admin-overview">Skip to main content</a>
      <Topbar brand={brand} toggle={toggle} open={open} onToggle={() => setOpen(previous => !previous)} />
      <div className={styles.workspace}>
        <div
          ref={sidebarRegion}
          className={styles.sidebar}
          id="admin-sidebar"
          data-open={open}
          onClick={event => {
            if (event.target instanceof Element && event.target.closest("a")) close(false);
          }}
        >
          {sidebar}
        </div>
        <main id="admin-overview" tabIndex={-1} className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
