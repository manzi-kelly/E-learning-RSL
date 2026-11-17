import styles from "./AlphabetFilter.module.css";

const letters = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

export default function AlphabetFilter({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <fieldset className={styles.group}>
      <legend>Browse by letter</legend>
      <div className={styles.options}>
        {letters.map(letter => (
          <button type="button" key={letter} aria-pressed={value === letter} onClick={() => onChange(letter)}>{letter}</button>
        ))}
      </div>
    </fieldset>
  );
}
