import { useState, type FormEvent, type Ref } from "react";
import { roles, type DemoUser, type UserInput } from "../types/user";
import styles from "./UserEditor.module.css";

type Field = keyof UserInput;
type Props = {
  user?: DemoUser;
  heading: Ref<HTMLHeadingElement>;
  otherEmails: readonly string[];
  onApply: (input: UserInput) => void;
  onCancel: () => void;
};

export default function UserEditor({ user, heading, otherEmails, onApply, onCancel }: Props) {
  const [error, setError] = useState<{ field: Field; message: string }>();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nameField = form.querySelector<HTMLInputElement>("#preview-user-name");
    const emailField = form.querySelector<HTMLInputElement>("#preview-user-email");
    const roleField = form.querySelector<HTMLSelectElement>("#preview-user-role");
    if (!nameField || !emailField || !roleField) return;
    const name = nameField.value.trim();
    const email = emailField.value.trim().toLowerCase();
    const role = roles.find(value => value === roleField.value);

    function invalid(field: Field, message: string, control: HTMLElement) {
      setError({ field, message });
      requestAnimationFrame(() => control.focus());
    }

    if (!name || name.length > 100) return invalid("name", "Enter a sample full name of up to 100 characters.", nameField);
    if (!email || emailField.validity.typeMismatch || email.length > 254) {
      return invalid("email", "Enter a valid sample email address.", emailField);
    }
    if (!email.endsWith("@example.test")) return invalid("email", "Use an example.test address for this preview.", emailField);
    if (otherEmails.some(existing => existing.toLowerCase() === email)) {
      return invalid("email", "This sample email is already in the preview directory.", emailField);
    }
    if (!role) return invalid("role", "Choose a role.", roleField);
    onApply({ name, email, role });
  }

  return (
    <section className={styles.section} aria-labelledby="user-editor-title">
      <h2 id="user-editor-title" ref={heading} tabIndex={-1}>{user ? "Edit User Preview" : "Add User Preview"}</h2>
      <p>Use fictional details and an <strong>example.test</strong> address. This local preview does not create an account on the platform or change security permissions.</p>
      <form className={styles.form} onSubmit={submit} noValidate onChange={() => setError(undefined)}>
        <label htmlFor="preview-user-name">Full name
          <input id="preview-user-name" defaultValue={user?.name} required maxLength={100}
            aria-invalid={error?.field === "name" || undefined} aria-describedby={error?.field === "name" ? "user-editor-error" : undefined} />
        </label>
        <label htmlFor="preview-user-email">Email address
          <input id="preview-user-email" type="email" defaultValue={user?.email} required maxLength={254}
            aria-invalid={error?.field === "email" || undefined} aria-describedby={error?.field === "email" ? "user-editor-error" : undefined} />
        </label>
        <label htmlFor="preview-user-role">Assigned role
          <select id="preview-user-role" defaultValue={user?.role ?? ""} required
            aria-invalid={error?.field === "role" || undefined} aria-describedby={error?.field === "role" ? "user-editor-error" : undefined}>
            <option value="">Choose a role</option>{roles.map(role => <option key={role}>{role}</option>)}
          </select>
        </label>
        <p id="user-editor-error" className={styles.error} role="alert">{error?.message}</p>
        <div className={styles.actions}>
          <button className={styles.button} type="submit">Apply user preview</button>
          <button className={styles.cancel} type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </section>
  );
}

