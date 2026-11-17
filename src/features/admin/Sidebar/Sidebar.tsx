"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { plannedModules } from "../data/adminOverviewData";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();
  const coursesActive = pathname === "/admin/courses" || pathname.startsWith("/admin/courses/");

  return (
    <nav className={styles.sidebar} aria-label="Administrator workspace">
      {pathname === "/admin" ? (
        <a className={styles.active} href="#admin-overview" aria-current="page">Overview</a>
      ) : <Link className={styles.destination} href="/admin">Overview</Link>}
      <Link className={coursesActive ? styles.active : styles.destination} href="/admin/courses"
        aria-current={coursesActive ? (pathname === "/admin/courses" ? "page" : "location") : undefined}>Courses</Link>
      <p id="admin-planned-modules">Coming in a later phase</p>
      <ul role="list" aria-labelledby="admin-planned-modules">
        {plannedModules.map(module => (
          <li key={module} className={styles.item}>
            <span>{module}</span>
            <span className={styles.tag} aria-hidden="true">Planned</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
