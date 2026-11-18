"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const destinations = [
  ["/student", "Overview"],
  ["/student/courses", "My Courses"],
  ["/student/progress", "Learning Progress"],
  ["/student/certificates", "Certificates"],
  ["/student/payments", "Payment History"],
] as const;

export default function Sidebar({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Student workspace" className={styles.navigation}>
      {destinations.map(([href, label]) => (
        <Link key={href} href={href} className={styles.link}
          aria-current={pathname === href ? "page" : undefined}
          onClick={() => {
            onNavigate();
            if (pathname === href) document.getElementById("student-main")?.focus();
          }}>{label}</Link>
      ))}
    </nav>
  );
}
