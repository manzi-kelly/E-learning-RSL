import { useState, type FormEvent, type Ref } from "react";
import type { ContentDraft } from "../data/content";
import styles from "./ContentEditor.module.css";

export default function ContentEditor({ draft, heading, onUpdate }: { draft: ContentDraft; heading: Ref<HTMLHeadingElement>; onUpdate: (draft: ContentDraft) => void }) {
  const [title, setTitle] = useState(draft.title);
  const [body, setBody] = useState(draft.body);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState<"title" | "body">();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const invalid = !title.trim() ? "title" : !body.trim() ? "body" : undefined;
    setError(invalid);
    if (invalid) {
      const field = event.currentTarget.querySelector<HTMLElement>(`#draft-${invalid}`);
      requestAnimationFrame(() => field?.focus());
      setFeedback("Enter a title and body using more than whitespace.");
      return;
    }
    onUpdate({ ...draft, title: title.trim(), body: body.trim() });
    setFeedback("Local draft preview updated. Nothing has been published.");
  }

  return (
    <section className={styles.section} aria-labelledby="content-editor">
      <h2 id="content-editor" tabIndex={-1} ref={heading}>Edit draft preview</h2>
      <p>{draft.type} · {draft.status}</p>
      <form className={styles.form} onSubmit={submit} noValidate onChange={() => { setError(undefined); setFeedback(""); }}>
        <label htmlFor="draft-title">Content title<input id="draft-title" required maxLength={150} value={title} onChange={event => setTitle(event.target.value)} aria-invalid={error === "title" || undefined} aria-describedby={error === "title" ? "draft-feedback" : undefined} /></label>
        <label htmlFor="draft-body">Content body<textarea id="draft-body" required rows={6} maxLength={4000} value={body} onChange={event => setBody(event.target.value)} aria-invalid={error === "body" || undefined} aria-describedby={error === "body" ? "draft-feedback" : undefined} /></label>
        <button type="submit" className={styles.button}>Apply draft preview</button>
        <p id="draft-feedback" role="status" className={error ? styles.error : undefined}>{feedback}</p>
      </form>
    </section>
  );
}
