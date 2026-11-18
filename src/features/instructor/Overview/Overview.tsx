import Link from "next/link";
import { assignedCourses, instructorName, progressRecords } from "../data/mockInstructorData";
import ui from "../Workspace.module.css";
import styles from "./Overview.module.css";

export default function Overview() {
  const lessons = assignedCourses.reduce((count, item) => count + item.lessons.length, 0);
  const assessments = assignedCourses.reduce((count, item) => count + item.assessments.length, 0);

  const stats = [
    { label: "Assigned courses", value: assignedCourses.length },
    { label: "Sample lesson outlines", value: lessons },
    { label: "Sample assessment drafts", value: assessments },
    { label: "Sample progress records", value: progressRecords.length },
  ];

  const shortcuts = [
    { href: "/instructor/courses", title: "My Courses", text: "Review your assigned courses." },
    { href: "/instructor/lessons", title: "Lessons & Materials", text: "Outline lessons and material references." },
    { href: "/instructor/assessments", title: "Assessments", text: "Edit a sample assessment question." },
    { href: "/instructor/progress", title: "Student Progress", text: "Inspect illustrative student progress." },
  ];

  return (
    <div className={ui.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Instructor Overview</h1>
          <p className={styles.subtitle}>
            Workspace for {instructorName}, a fictional instructor. The summary covers only the sample assignments.
          </p>
        </div>
        <span className={styles.badge}>Demo data</span>
      </header>

      <dl className={styles.summary}>
        {stats.map(item => (
          <div key={item.label} className={styles.stat}>
            <dt className={styles.statLabel}>{item.label}</dt>
            <dd className={styles.statValue}>{item.value}</dd>
          </div>
        ))}
      </dl>

      <section className={styles.panel} aria-labelledby="work-heading">
        <div className={styles.panelHeader}>
          <div>
            <h2 id="work-heading" className={styles.panelTitle}>Course preparation</h2>
            <p className={styles.panelText}>
              Review assigned courses, outline lessons and materials, edit a sample assessment, or inspect illustrative student progress.
            </p>
          </div>
          <Link className={`${ui.link} ${styles.primary}`} href="/instructor/courses">
            View assigned courses
          </Link>
        </div>

        <ul className={styles.shortcuts}>
          {shortcuts.map(item => (
            <li key={item.href}>
              <Link className={`${ui.link} ${styles.shortcut}`} href={item.href}>
                <span className={styles.shortcutTitle}>{item.title}</span>
                <span className={styles.shortcutText}>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}