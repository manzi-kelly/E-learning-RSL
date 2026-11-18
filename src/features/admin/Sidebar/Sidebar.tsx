"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const overviewIcon = (
  <Icon>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </Icon>
);

const links: readonly { route: string; label: string; icon: ReactNode }[] = [
  { route: "/admin/users", label: "Users", icon: <Icon><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" /></Icon> },
  { route: "/admin/courses", label: "Courses", icon: <Icon><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" /><path d="M19 19v2H6a2 2 0 0 1-2-2" /></Icon> },
  { route: "/admin/dictionary", label: "Dictionary", icon: <Icon><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" /><path d="M9 8h6M9 12h6" /></Icon> },
  { route: "/admin/interpreting", label: "Interpreting", icon: <Icon><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9.5h8M8 12.5h5" /></Icon> },
  { route: "/admin/payments", label: "Payments", icon: <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></Icon> },
  { route: "/admin/certificates", label: "Certificates", icon: <Icon><circle cx="12" cy="9" r="5" /><path d="m9 13.5-1.5 7L12 18l4.5 2.5-1.5-7" /></Icon> },
  { route: "/admin/content", label: "Content", icon: <Icon><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></Icon> },
  { route: "/admin/reports", label: "Reports", icon: <Icon><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></Icon> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar} aria-label="Administrator workspace">
      {pathname === "/admin" ? (
        <a className={styles.active} href="#admin-overview" aria-current="page">
          {overviewIcon}
          <span>Overview</span>
        </a>
      ) : (
        <Link className={styles.destination} href="/admin">
          {overviewIcon}
          <span>Overview</span>
        </Link>
      )}
      {links.map(({ route, label, icon }) => {
        const active = pathname === route || pathname.startsWith(route + "/");
        return (
          <Link
            key={route}
            className={active ? styles.active : styles.destination}
            href={route}
            aria-current={active ? (pathname === route ? "page" : "location") : undefined}
          >
            {icon}
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}