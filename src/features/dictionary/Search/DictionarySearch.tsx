import styles from "./DictionarySearch.module.css";

export default function DictionarySearch({ query, onChange }: { query: string; onChange: (value: string) => void }) {
  return (
    <div className={styles.search} role="search" aria-label="Dictionary search">
      <label htmlFor="dictionary-search">Search vocabulary</label>
      <div className={styles.controls}>
        <input id="dictionary-search" type="search" value={query} onChange={event => onChange(event.target.value)} placeholder="Enter a word or topic" />
        <button type="button" aria-disabled={!query} onClick={() => onChange("")}>Clear search</button>
      </div>
    </div>
  );
}
