"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { serviceCategories } from "../data/serviceCategories";
import type { BookingField } from "../types/interpreting";
import styles from "./BookingForm.module.css";

const fields: readonly { id: BookingField; label: string }[] = [
  { id: "service", label: "Service type" },
  { id: "date", label: "Requested date" },
  { id: "time", label: "Requested time" },
  { id: "location", label: "Location" },
  { id: "language", label: "Language needs" },
  { id: "contact", label: "Contact details" },
];

const dateFormatter = new Intl.DateTimeFormat("sv-SE", { timeZone: "Africa/Kigali", year: "numeric", month: "2-digit", day: "2-digit" });
const currentDate = () => dateFormatter.format(new Date());
const subscribe = (refresh: () => void) => {
  window.addEventListener("focus", refresh);
  return () => window.removeEventListener("focus", refresh);
};
const noServerDate = () => "";
const idFor = (id: BookingField) => `interpreting-${id}`;

export default function BookingForm() {
  const minimumDate = useSyncExternalStore(subscribe, currentDate, noServerDate);
  const [errors, setErrors] = useState<Partial<Record<BookingField, string>>>({});
  const [completed, setCompleted] = useState(false);

  function validate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors: typeof errors = {};
    let firstInvalid: HTMLElement | undefined;

    for (const { id, label } of fields) {
      const control = form.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`#${idFor(id)}`);
      if (!control) continue;
      const value = control.value.trim();
      if (!value) {
        nextErrors[id] = id === "service" ? "Choose a service type." : `Enter ${label.toLowerCase()}.`;
      } else if (id === "date" && value < currentDate()) {
        nextErrors[id] = "Choose today or a future date in Rwanda.";
      } else if (control.validity.badInput || control.validity.stepMismatch || control.validity.tooLong) {
        nextErrors[id] = `Check the ${label.toLowerCase()}.`;
      }
      if (nextErrors[id]) firstInvalid ??= control;
    }

    setErrors(nextErrors);
    setCompleted(!firstInvalid);
    if (firstInvalid) {
      const target = firstInvalid;
      window.requestAnimationFrame(() => target.focus());
      return;
    }
    form.reset();
  }

  return (
    <section id="booking-preview" tabIndex={-1} className={styles.section} aria-labelledby="booking-title">
      <div className={styles.intro}>
        <h2 id="booking-title">Preview an interpreting request</h2>
        <p id="booking-note">Use sample details only. This demonstration checks the form in your browser. Contact details can be an email address or another preferred way to reach you.</p>
      </div>
      <form noValidate onSubmit={validate} aria-describedby="booking-note" className={styles.form}>
        <div className={styles.fields}>
          {fields.map(({ id, label }) => {
            const fieldId = idFor(id);
            const error = errors[id];
            const props = {
              id: fieldId,
              required: true,
              "aria-invalid": error ? true : undefined,
              "aria-describedby": error ? `${fieldId}-error` : undefined,
              onChange: () => {
                if (error) setErrors(previous => ({ ...previous, [id]: undefined }));
                setCompleted(false);
              },
            };
            return (
              <div key={id} className={id === "language" || id === "contact" ? styles.wide : undefined}>
                <label htmlFor={fieldId}>{label}</label>
                {id === "service" ? (
                  <select {...props} defaultValue="">
                    <option value="">Choose a service type</option>
                    {serviceCategories.map(service => <option key={service.id} value={service.id}>{service.label}</option>)}
                  </select>
                ) : id === "language" ? (
                  <textarea {...props} rows={3} maxLength={500} />
                ) : (
                  <input {...props} type={id === "date" || id === "time" ? id : "text"}
                    min={id === "date" ? minimumDate || undefined : undefined}
                    maxLength={id === "location" || id === "contact" ? 160 : undefined} />
                )}
                {error && <p className={styles.error} id={`${fieldId}-error`}>{error}</p>}
              </div>
            );
          })}
        </div>
        <button type="submit" disabled={!minimumDate}>Check request preview</button>
        <p className={styles.result} role="status">{completed ? "Form preview completed. No booking has been submitted." : ""}</p>
      </form>
    </section>
  );
}
