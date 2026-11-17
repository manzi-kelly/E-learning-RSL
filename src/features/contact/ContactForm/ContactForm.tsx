"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

const fields = [
  { id: "name", label: "Full name", max: 100, type: "text", autocomplete: "name", requiredError: "Enter your full name." },
  { id: "email", label: "Email address", max: 254, type: "email", autocomplete: "email", requiredError: "Enter your email address." },
  { id: "subject", label: "Subject", max: 150, type: "text", autocomplete: undefined, requiredError: "Enter a subject." },
  { id: "message", label: "Message", max: 2000, type: "textarea", autocomplete: undefined, requiredError: "Enter a message." },
] as const;
type Field = (typeof fields)[number]["id"];

const subscribe = () => () => {};

export default function ContactForm() {
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [complete, setComplete] = useState(false);

  function validate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors: typeof errors = {};
    let firstInvalid: HTMLElement | undefined;
    for (const field of fields) {
      const input = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#contact-${field.id}`);
      if (!input) continue;

      if (!input.value.trim()) nextErrors[field.id] = field.requiredError;
      else if (input.validity.typeMismatch) nextErrors[field.id] = "Enter a valid email address.";
      else if (input.value.length > field.max) nextErrors[field.id] = `Use ${field.max} characters or fewer.`;

      if (nextErrors[field.id]) firstInvalid ??= input;
    }
    setErrors(nextErrors);
    setComplete(!firstInvalid);
    if (firstInvalid) {
      const target = firstInvalid;
      window.requestAnimationFrame(() => target.focus());
    } else {
      form.reset();
    }
  }

  return (
    <section className={styles.section} aria-labelledby="contact-form-title">
      <h2 id="contact-form-title">Message preview</h2>
      <p id="contact-preview-note">Use sample details only. This form checks your entries in the browser. Live messaging is unavailable.</p>
      <form className={styles.form} noValidate onSubmit={validate} aria-describedby="contact-preview-note">
        {fields.map(field => {
          const id = `contact-${field.id}`;
          const error = errors[field.id];
          const props = {
            id,
            required: true,
            maxLength: field.max,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? `${id}-error` : undefined,
            onChange: () => {
              if (error) setErrors(previous => ({ ...previous, [field.id]: undefined }));
              setComplete(false);
            },
          };
          return (
            <div key={field.id}>
              <label htmlFor={id}>{field.label}</label>
              {field.type === "textarea" ? <textarea {...props} rows={5} /> : <input {...props} type={field.type} autoComplete={field.autocomplete} />}
              {error && <p className={styles.error} id={`${id}-error`}>{error}</p>}
            </div>
          );
        })}
        <button type="submit" disabled={!ready}>Check message preview</button>
        <p className={styles.result} role="status">
          {complete ? "Form preview completed. No message has been sent." : Object.keys(errors).some(key => errors[key as Field]) ? "Review the highlighted fields." : ""}
        </p>
      </form>
    </section>
  );
}
