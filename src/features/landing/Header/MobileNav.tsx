"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useActiveSection from "./useActiveSection";
import { navigation } from "../navigation";
import styles from "./Header.module.css";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const landingSection = useActiveSection(isLanding);
  const currentRoute = navigation.find(
    item => "route" in item && (pathname === item.route || pathname.startsWith(item.route + "/"))
  );
  const active = currentRoute?.id ?? landingSection;
  const toggle = useRef<HTMLButtonElement>(null);
  const region = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 64rem)");
    const close = () => setOpen(false);
    const handlePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !region.current?.contains(event.target)) close();
    };

    desktop.addEventListener("change", close);
    document.addEventListener("pointerdown", handlePointer);
    return () => {
      desktop.removeEventListener("change", close);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [open]);

  return (
    <>
      <div
        ref={region}
        className={styles.navigation}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
        onBlur={(event) => {
          if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        <button
          ref={toggle}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"} <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav id="primary-navigation" aria-label="Primary" className={styles.nav} data-open={open}>
          {navigation.map(item => {
            const { id, label } = item;
            const close = () => setOpen(false);
            if ("route" in item) {
              return (
                <Link
                  key={id}
                  href={item.route}
                  aria-current={active === id ? (pathname === item.route ? "page" : "location") : undefined}
                  onClick={close}
                >
                  {label}
                </Link>
              );
            }

            return (
              <a
                key={id}
                href={`${isLanding ? "" : "/"}#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={close}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>
      <Link className={styles.cta} href="/auth" aria-current={pathname === "/auth" ? "page" : undefined} onClick={() => setOpen(false)}>
        Get Started
      </Link>
    </>
  );
}
