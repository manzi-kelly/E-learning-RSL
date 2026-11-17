"use client";

import { usePreviewForm } from "../usePreviewForm";
import form from "../PreviewForm.module.css";
import styles from "./AssessmentManager.module.css";

const options = [
  { id: "a", label: "Option A", sample: "Captions and written explanations." },
  { id: "b", label: "Option B", sample: "Spoken instructions only." },
];

export default function AssessmentManager() {
  const preview = usePreviewForm("Sample assessment checked. No assessment has been saved.");

  return (
    <section id="course-assessments" tabIndex={-1} className={form.section} aria-labelledby="course-assessments-title">
      <h2 id="course-assessments-title">Assessments</h2>
      <p>Preview a question about using the platform. The question and answers are editable.</p>
      <form className={form.form} onSubmit={preview.submit} onChange={preview.change} noValidate>
        <label htmlFor="assessment-question">Question text</label>
        <textarea id="assessment-question" rows={3} required maxLength={500} defaultValue="What can help you follow a lesson without relying on audio?" />
        <fieldset className={styles.answers}>
          <legend>Answer options</legend>
          {options.map(option => (
            <div key={option.id}>
              <label htmlFor={`assessment-option-${option.id}`}>{option.label}</label>
              <input id={`assessment-option-${option.id}`} required maxLength={220} defaultValue={option.sample} />
            </div>
          ))}
        </fieldset>
        <label htmlFor="assessment-correct">Correct answer</label>
        <select id="assessment-correct" defaultValue="" required>
          <option value="">Choose the correct option</option>
          {options.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select>
        <button type="submit" disabled={!preview.ready}>Check assessment</button>
        <p role="status" className={form.feedback}>{preview.feedback}</p>
      </form>
    </section>
  );
}
