import { useState } from "react";
import { suggestions } from "../data/mockVocabulary";
import styles from "./SuggestionReview.module.css";

export default function SuggestionReview() {
  const [inspected, setInspected] = useState<string>();
  return (
    <section className={styles.section} aria-labelledby="suggestion-review">
      <h2 id="suggestion-review">Vocabulary suggestions</h2>
      <p>Synthetic review examples. Inspection does not approve a suggestion.</p>
      <ul role="list" className={styles.rows}>
        {suggestions.map(suggestion => <li key={suggestion.id}>
          <h3>{suggestion.word}</h3>
          <p>{suggestion.description}</p>
          <button className={styles.button} type="button" aria-pressed={inspected === suggestion.id}
            onClick={() => setInspected(suggestion.id)}>Inspect {suggestion.word}</button>
        </li>)}
      </ul>
      <p role="status">{inspected && `${suggestions.find(item => item.id === inspected)?.word} selected for local review. No decision has been recorded.`}</p>
    </section>
  );
}
