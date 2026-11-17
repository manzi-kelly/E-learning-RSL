import Link from "next/link";
import type { DictionaryEntry } from "../types/dictionary";
import styles from "./VocabularyList.module.css";

export default function VocabularyList({ entries }: { entries: readonly DictionaryEntry[] }) {
  return (
    <section className={styles.results} aria-labelledby="dictionary-results">
      <div className={styles.heading}>
        <h2 id="dictionary-results">Vocabulary results</h2>
        <p role="status" aria-atomic="true">
          {entries.length === 0 ? "No matching entries. Try a different term or change the filters." : `${entries.length} ${entries.length === 1 ? "entry" : "entries"}`}
        </p>
      </div>
      {entries.length > 0 && (
        <ul className={styles.rows} role="list">
          {entries.map(entry => (
            <li key={entry.id} className={styles.row}>
              <div>
                <p className={styles.category}>{entry.category}</p>
                <h3>{entry.word}</h3>
              </div>
              <div>
                <p>{entry.description}</p>
                <p className={styles.availability}>Video awaiting approval</p>
              </div>
              <Link aria-label={`View Details: ${entry.word}`} href={`/dictionary/${entry.id}`}>View Details <span aria-hidden="true">↗</span></Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
