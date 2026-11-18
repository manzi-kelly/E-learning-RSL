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

const links = [
  ["/instructor", "Overview", <Icon key="i"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></Icon>],
  ["/instructor/courses", "My Courses", <Icon key="i"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" /><path d="M19 19v2H6a2 2 0 0 1-2-2" /></Icon>],
  ["/instructor/lessons", "Lessons & Materials", <Icon key="i"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></Icon>],
  ["/instructor/assessments", "Assessments", <Icon key="i"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="m8.5 12.5 2.5 2.5 4.5-5" /></Icon>],
  ["/instructor/progress", "Student Progress", <Icon key="i"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></Icon>],
] as const;

export default function Sidebar({ onNavigate }: { onNavigate: () => void }) {
  const path = usePathname();
  return (
    <nav className={styles.nav} aria-label="Instructor workspace">
      {links.map(([href, label, icon]) => (
        <Link
          key={href}
          href={href}
          className={styles.link}
          aria-current={
            path === href
              ? "page"
              : href === "/instructor/courses" && path.startsWith(href + "/")
                ? "location"
                : undefined
          }
          onClick={() => {
            onNavigate();
            if (path === href) document.getElementById("instructor-main")?.focus();
          }}
        >
          {icon}
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}