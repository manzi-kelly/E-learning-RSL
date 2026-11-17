"use client";

import { useState, type FormEvent } from "react";
import styles from "./VocabularySuggestion.module.css";

const previewNotice = "This is a demonstration form. Submission will become available when the platform backend is connected.";

export default function VocabularySuggestion() {
  const [word, setWord] = useState("");
  const [explanation, setExplanation] = useState("");
  const [feedback, setFeedback] = useState("");

  function checkSuggestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(previewNotice);
  }

  return (
    <section id="suggest-vocabulary" tabIndex={-1} className={styles.section} aria-labelledby="suggest-vocabulary-title">
      <div>
        <h2 id="suggest-vocabulary-title">Suggest vocabulary</h2>
        <p id="suggest-vocabulary-note">{previewNotice}</p>
      </div>
      <form className={styles.form} onSubmit={checkSuggestion} aria-describedby="suggest-vocabulary-note">
        <label htmlFor="suggested-word">Suggested word or topic</label>
        <input id="suggested-word" required maxLength={80} pattern={String.raw`.*\S.*`} title="Enter a word or topic with at least one non-space character."
          value={word} onChange={event => { setWord(event.target.value); setFeedback(""); }} />
        <label htmlFor="suggested-explanation">Explanation (optional)</label>
        <textarea id="suggested-explanation" rows={4} maxLength={500} value={explanation}
          onChange={event => { setExplanation(event.target.value); setFeedback(""); }} />
        <button type="submit">Check suggestion</button>
        <p className={styles.feedback} role="status">{feedback}</p>
      </form>
    </section>
  );
}
