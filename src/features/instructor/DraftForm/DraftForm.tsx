"use client";

import { useId, useState, useSyncExternalStore, type FormEvent } from "react";
import type { AssignedCourseId } from "../data/mockInstructorData";
import styles from "./DraftForm.module.css";

export type DraftField = {
  id: string;
  label: string;
  required?: boolean;
  type?: "number" | "textarea";
  initial?: string;
  options?: readonly [string, string][];
};

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export default function DraftForm({ courseId, fields, action }: {
  courseId: AssignedCourseId; fields: readonly DraftField[]; action: string;
}) {
  const prefix = useId();
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [drafts, setDrafts] = useState<Partial<Record<AssignedCourseId, Record<string, string>>>>({});
  const [feedback, setFeedback] = useState<{ courseId: AssignedCourseId; text: string; field?: string }>();
  const current = feedback?.courseId === courseId ? feedback : undefined;
  const valueFor = (field: DraftField) => drafts[courseId]?.[field.id] ?? field.initial ?? "";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const field of fields) {
      const value = valueFor(field).trim();
      const message = field.required && !value ? `Enter or select ${field.label.toLowerCase()}.`
        : field.type === "number" && value && (!Number.isInteger(Number(value)) || Number(value) < 1)
          ? "Use a whole number of at least 1." : "";
      if (message) {
        setFeedback({ courseId, text: message, field: field.id });
        const control = form.querySelector<HTMLElement>(`[data-field="${field.id}"]`);
        requestAnimationFrame(() => control?.focus());
        return;
      }
    }
    setFeedback({ courseId, text: "Preview checked. Changes remain in this page and have not been saved or published." });
  }

  return (
    <form className={styles.form} noValidate onSubmit={submit}>
      {fields.map(field => {
        const id = `${prefix}-${field.id}`;
        const invalid = current?.field === field.id;
        const props = {
          id,
          required: field.required,
          value: valueFor(field),
          "data-field": field.id,
          "aria-invalid": invalid || undefined,
          "aria-describedby": invalid ? `${prefix}-feedback` : undefined,
          className: `${styles.control} ${invalid ? styles.invalid : ""}`.trim(),
          onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const value = event.target.value;
            setDrafts(previous => ({ ...previous, [courseId]: { ...previous[courseId], [field.id]: value } }));
            setFeedback(undefined);
          },
        };
        return (
          <label htmlFor={id} key={field.id} className={styles.field}>
            <span className={styles.labelText}>
              {field.label}
              {field.required && <span className={styles.required} aria-hidden="true"> *</span>}
            </span>
            {field.options ? (
              <select {...props}>
                {field.options.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
              </select>
            ) : field.type === "textarea" ? (
              <textarea {...props} rows={3} maxLength={1500} />
            ) : (
              <input {...props} type={field.type ?? "text"} min={field.type === "number" ? 1 : undefined} maxLength={180} />
            )}
          </label>
        );
      })}
      <div className={styles.actions}>
        <button type="submit" className={styles.button} disabled={!ready}>{action}</button>
      </div>
      <p
        id={`${prefix}-feedback`}
        role="status"
        className={`${styles.feedback} ${current?.field ? styles.error : ""}`.trim()}
      >
        {current?.text}
      </p>
    </form>
  );
}