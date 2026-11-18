import type { VocabularyDraft } from "../data/mockVocabulary";
import styles from "./VocabularyTable.module.css";

export default function VocabularyTable({ entries, selected, onSelect }: {
  entries: readonly VocabularyDraft[];
  selected?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className={styles.section} aria-labelledby="vocabulary-directory">
      <h2 id="vocabulary-directory">Vocabulary entries</h2>
      <p role="status">{entries.length ? `${entries.length} matching vocabulary entries` : "No matching vocabulary entries."}</p>
      {entries.length > 0 && <div className={styles.scroll} role="region" aria-label="Scrollable vocabulary table" tabIndex={0}>
        <table>
          <thead><tr><th scope="col">Word</th><th scope="col">Category</th><th scope="col">Verification</th><th scope="col">Action</th></tr></thead>
          <tbody>{entries.map(entry => <tr key={entry.id}>
            <th scope="row">{entry.word}</th><td>{entry.category}</td><td>Unverified sample</td>
            <td><button className={styles.button} type="button" aria-label={`View details: ${entry.word}`}
              aria-current={selected === entry.id ? "true" : undefined} onClick={() => onSelect(entry.id)}>View details</button></td>
          </tr>)}</tbody>
        </table>
      </div>}
    </section>
  );
}
