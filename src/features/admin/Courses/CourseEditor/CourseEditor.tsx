"use client";

import type { Course } from "@/src/features/courses/courseData";
import { usePreviewForm } from "../usePreviewForm";
import form from "../PreviewForm.module.css";
import styles from "./CourseEditor.module.css";

export default function CourseEditor({ course }: { course: Course }) {
  const preview = usePreviewForm("Course fields checked. Changes are temporary and have not been saved.");

  return (
    <section id="course-details" tabIndex={-1} className={form.section} aria-labelledby="course-details-title">
      <h2 id="course-details-title">Course Details</h2>
      <p>Edit sample values for this course. Availability, student progress tracking and certificates remain pending configuration.</p>
      <form className={form.form} onSubmit={preview.submit} onChange={preview.change} noValidate>
        <div className={form.fields}>
          <div className={form.wide}>
            <label htmlFor="editor-title">Course title</label>
            <input id="editor-title" required defaultValue={course.title} maxLength={160} />
          </div>
          <div className={form.wide}>
            <label htmlFor="editor-description">Description</label>
            <textarea id="editor-description" rows={3} required maxLength={1000} placeholder="No approved course description is available in the preview data." />
          </div>
          <div className={form.wide}>
            <label htmlFor="editor-objectives">Learning objectives</label>
            <textarea id="editor-objectives" rows={3} defaultValue={course.objective} required maxLength={1200} />
          </div>
          <div className={form.wide}>
            <label htmlFor="editor-structure">Course structure summary</label>
            <textarea id="editor-structure" rows={3} maxLength={1200} />
          </div>
          <div>
            <label htmlFor="editor-availability">Free or paid availability</label>
            <select id="editor-availability" aria-describedby="editor-availability-help">
              <option value="">Unconfirmed</option><option value="free">Free (preview)</option><option value="paid">Paid (preview)</option>
            </select>
            <p id="editor-availability-help" className={styles.help}>Unconfirmed until management decides. Pricing and payment configuration are outside this preview.</p>
          </div>
        </div>
        <button type="submit" disabled={!preview.ready}>Check course details</button>
        <p role="status" className={form.feedback}>{preview.feedback}</p>
      </form>
    </section>
  );
}
