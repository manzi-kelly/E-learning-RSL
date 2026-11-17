"use client";

import { usePreviewForm } from "../usePreviewForm";
import form from "../PreviewForm.module.css";
import styles from "./LessonManager.module.css";

export default function LessonManager() {
  const preview = usePreviewForm("Lesson outline checked. No lesson has been saved.");

  return (
    <section id="course-lessons" tabIndex={-1} className={form.section} aria-labelledby="course-lessons-title">
      <h2 id="course-lessons-title">Lessons</h2>
      <p>Try the fields for one sample lesson outline. Approved teaching content is pending.</p>
      <form className={form.form} onSubmit={preview.submit} onChange={preview.change} noValidate>
        <div className={form.fields}>
          <div>
            <label htmlFor="lesson-title">Lesson title</label>
            <input id="lesson-title" required maxLength={160} defaultValue="Sample lesson outline" />
          </div>
          <div className={styles.sequence}>
            <label htmlFor="lesson-sequence">Lesson sequence</label>
            <input id="lesson-sequence" type="number" min={1} step={1} defaultValue={1} required />
          </div>
          <div className={form.wide}>
            <label htmlFor="lesson-topic">Topic</label>
            <input id="lesson-topic" required maxLength={160} />
          </div>
          <div className={form.wide}>
            <label htmlFor="lesson-explanation">Written explanation</label>
            <textarea id="lesson-explanation" rows={3} maxLength={1500} />
          </div>
          <div className={form.wide}>
            <label htmlFor="lesson-video">Video association (optional preview reference)</label>
            <input id="lesson-video" maxLength={180} />
          </div>
        </div>
        <button type="submit" disabled={!preview.ready}>Check lesson outline</button>
        <p role="status" className={form.feedback}>{preview.feedback}</p>
      </form>
    </section>
  );
}
