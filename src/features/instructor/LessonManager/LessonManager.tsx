"use client";

import { useState } from "react";
import CoursePicker from "../CoursePicker/CoursePicker";
import { assignedCourses, type AssignedCourseId } from "../data/mockInstructorData";
import DraftForm, { type DraftField } from "../DraftForm/DraftForm";
import MaterialsManager from "../MaterialsManager/MaterialsManager";
import ui from "../Workspace.module.css";
import styles from "./LessonManager.module.css";

const fields: readonly DraftField[] = [
  { id: "title", label: "Lesson title", required: true, initial: assignedCourses[0].lessons[0] },
  { id: "order", label: "Lesson order", type: "number", initial: "1", required: true },
  { id: "description", label: "Lesson description", type: "textarea", required: true },
  { id: "explanation", label: "Written explanation", type: "textarea" },
  { id: "video", label: "Lesson video reference" },
];

export default function LessonManager() {
  const [course, setCourse] = useState<AssignedCourseId>(assignedCourses[0].courseId);
  const selected = assignedCourses.find(item => item.courseId === course) ?? assignedCourses[0];

  const summary = [
    { label: "Lessons in course", value: String(selected.lessons.length) },
    { label: "Form fields", value: String(fields.length) },
    { label: "Status", value: "Draft preview" },
  ];

  return (
    <div className={ui.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Lessons &amp; Materials</h1>
          <p className={styles.subtitle}>
            Use sample text to try a lesson outline and material references for an assigned course.
          </p>
        </div>
        <div className={styles.picker}>
          <CoursePicker value={course} onChange={id => { if (id) setCourse(id); }} />
        </div>
      </header>

      <ul className={styles.stats} aria-label="Lesson summary">
        {summary.map(item => (
          <li key={item.label} className={styles.card}>
            <span className={styles.cardLabel}>{item.label}</span>
            <strong className={styles.cardValue}>{item.value}</strong>
          </li>
        ))}
      </ul>

      <div className={styles.layout}>
        <section className={styles.section} aria-labelledby="lesson-heading">
          <h2 id="lesson-heading" className={styles.sectionTitle}>Lesson outline preview</h2>
          <DraftForm courseId={course} fields={fields} action="Check lesson preview" />
        </section>

        <aside className={styles.side} aria-labelledby="lesson-notes-heading">
          <h2 id="lesson-notes-heading" className={styles.sectionTitle}>Notes</h2>
          <ul className={styles.notes}>
            <li>Applies to the selected course only.</li>
            <li>Lesson order must be a whole number of at least 1.</li>
            <li>Nothing is saved or published from this screen.</li>
          </ul>
        </aside>
      </div>

      <div className={styles.materials}>
        <MaterialsManager course={course} />
      </div>
    </div>
  );
}