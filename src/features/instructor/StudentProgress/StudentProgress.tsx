"use client";

import { useState } from "react";
import PreviewTable from "@/src/features/admin/PreviewTable/PreviewTable";
import CoursePicker from "../CoursePicker/CoursePicker";
import { assignedCourses, progressRecords, type AssignedCourseId } from "../data/mockInstructorData";
import ui from "../Workspace.module.css";
import styles from "./StudentProgress.module.css";

export default function StudentProgress() {
  const [course, setCourse] = useState<AssignedCourseId | "">("");
  const matches = progressRecords.filter(item => !course || item.courseId === course);

  const totalViewed = matches.reduce((sum, item) => sum + item.viewed, 0);
  const totalSteps = matches.reduce((sum, item) => sum + item.total, 0);
  const average = totalSteps ? Math.round((totalViewed * 100) / totalSteps) : 0;
  const participated = matches.filter(item => item.participated).length;

  const summary = [
    { label: "Sample learners", value: String(matches.length) },
    { label: "Average completion", value: `${average}%` },
    { label: "Assessment attempts", value: `${participated} of ${matches.length}` },
  ];

  return (
    <div className={ui.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Student Progress</h1>
          <p className={styles.subtitle}>
            Fictional records for the assigned courses. The numbers represent sample step completion and assessment participation.
          </p>
        </div>
        <div className={styles.picker}>
          <CoursePicker value={course} onChange={setCourse} allowAll />
        </div>
      </header>

      <ul className={styles.stats} aria-label="Progress summary">
        {summary.map(item => (
          <li key={item.label} className={styles.stat}>
            <span className={styles.statLabel}>{item.label}</span>
            <strong className={styles.statValue}>{item.value}</strong>
          </li>
        ))}
      </ul>

      <section className={styles.panel} aria-labelledby="progress-heading">
        <div className={styles.panelHeader}>
          <h2 id="progress-heading" className={styles.panelTitle}>Sample student progress</h2>
          <p role="status" className={styles.count}>
            {matches.length} matching sample {matches.length === 1 ? "record" : "records"}
          </p>
        </div>
        <div className={styles.table}>
          <PreviewTable
            title="Sample student progress"
            columns={["Fictional learner", "Assigned course", "Sample completion", "Assessment participation"]}
            rows={matches.map(item => ({
              id: item.id,
              cells: [
                item.learner,
                assignedCourses.find(entry => entry.courseId === item.courseId)?.course.title,
                <span key="progress" className={styles.completion}>
                  <progress aria-label={`Sample completion for ${item.learner}`} max={item.total} value={item.viewed} />
                  <span>{item.viewed} of {item.total} steps · {Math.round((item.viewed * 100) / item.total)}%</span>
                </span>,
                item.participated ? "Sample attempt recorded" : "Not started",
              ],
            }))}
          />
        </div>
      </section>
    </div>
  );
}