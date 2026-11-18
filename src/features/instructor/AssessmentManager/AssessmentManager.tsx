"use client";

import { useState } from "react";
import CoursePicker from "../CoursePicker/CoursePicker";
import { assignedCourses, type AssignedCourseId } from "../data/mockInstructorData";
import DraftForm, { type DraftField } from "../DraftForm/DraftForm";
import ui from "../Workspace.module.css";
import styles from "./AssessmentManager.module.css";

const fields: readonly DraftField[] = [
  { id: "question", label: "Question text", type: "textarea", required: true, initial: "How can you follow a lesson without relying on audio?" },
  { id: "option-a", label: "Option A", required: true, initial: "Use captions and written explanations." },
  { id: "option-b", label: "Option B", required: true, initial: "Use spoken instructions only." },
  { id: "correct", label: "Correct answer", required: true, options: [["", "Choose an option"], ["a", "Option A"], ["b", "Option B"]] },
];

const summary = [
  { label: "Question type", value: "Multiple choice" },
  { label: "Options", value: String(fields.filter(f => f.id.startsWith("option")).length) },
  { label: "Status", value: "Draft preview" },
] as const;

export default function AssessmentManager() {
  const [course, setCourse] = useState<AssignedCourseId>(assignedCourses[0].courseId);

  return (
    <div className={ui.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Assessments</h1>
          <p className={styles.subtitle}>
            Edit a neutral platform-usage question. This preview has no grading or publication rules.
          </p>
        </div>
        <div className={styles.picker}>
          <CoursePicker value={course} onChange={id => { if (id) setCourse(id); }} />
        </div>
      </header>

      <ul className={styles.stats} aria-label="Assessment summary">
        {summary.map(item => (
          <li key={item.label} className={styles.card}>
            <span className={styles.cardLabel}>{item.label}</span>
            <strong className={styles.cardValue}>{item.value}</strong>
          </li>
        ))}
      </ul>

      <div className={styles.layout}>
        <section className={styles.section} aria-labelledby="assessment-heading">
          <h2 id="assessment-heading" className={styles.sectionTitle}>Sample assessment editor</h2>
          <DraftForm courseId={course} fields={fields} action="Check assessment preview" />
        </section>

        <aside className={styles.side} aria-labelledby="notes-heading">
          <h2 id="notes-heading" className={styles.sectionTitle}>Notes</h2>
          <ul className={styles.notes}>
            <li>Applies to the selected course only.</li>
            <li>Nothing is graded or published from this screen.</li>
            <li>Choose a correct answer before checking the preview.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}