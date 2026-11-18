import { useState, type FormEvent, type Ref } from "react";
import { categories } from "@/src/features/dictionary/types/dictionary";
import type { VocabularyDraft } from "../data/mockVocabulary";
import styles from "./VocabularyEditor.module.css";

export default function VocabularyEditor({ entry, entries, heading, onUpdate }: {
  entry: VocabularyDraft;
  entries: readonly VocabularyDraft[];
  heading: Ref<HTMLHeadingElement>;
  onUpdate: (draft: VocabularyDraft) => void;
}) {
  const [feedback, setFeedback] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const word = String(values.get("word") ?? "").trim();
    const description = String(values.get("description") ?? "").trim();
    const category = categories.find(value => value === values.get("category"));
    if (!word || !description) {
      const field = event.currentTarget.elements.namedItem(!word ? "word" : "description");
      if (field instanceof HTMLElement) field.focus();
      setFeedback("Enter a word and a description using more than whitespace.");
      return;
    }
    if (!category) return;
    onUpdate({ ...entry, word, description, category,
      videoReference: String(values.get("videoReference") ?? "").trim(),
      relatedIds: values.getAll("related").map(String),
    });
    setFeedback("Local preview updated. No entry was verified or published.");
  }

  return (
    <section className={styles.section} aria-labelledby="vocabulary-editor">
      <h2 id="vocabulary-editor" ref={heading} tabIndex={-1}>Vocabulary details</h2>
      <p>Verification status: unverified sample. Video references are plain text previews.</p>
      <form className={styles.form} onSubmit={submit} onChange={() => setFeedback("")}>
        <label>Vocabulary word<input name="word" required maxLength={100} defaultValue={entry.word} /></label>
        <label>Description<textarea name="description" required maxLength={1000} rows={3} defaultValue={entry.description} /></label>
        <label>Vocabulary category<select name="category" defaultValue={entry.category}>
          {categories.map(category => <option key={category}>{category}</option>)}
        </select></label>
        <label>Video reference<input name="videoReference" maxLength={200} defaultValue={entry.videoReference} /></label>
        <fieldset className={styles.related}>
          <legend>Related vocabulary</legend>
          {entries.filter(item => item.id !== entry.id).map(item =>
            <label key={item.id}><input name="related" type="checkbox" value={item.id} defaultChecked={entry.relatedIds.includes(item.id)} />{item.word}</label>,
          )}
        </fieldset>
        <button className={styles.button} type="submit">Apply preview edits</button>
        <p role="status">{feedback}</p>
      </form>
    </section>
  );
}
