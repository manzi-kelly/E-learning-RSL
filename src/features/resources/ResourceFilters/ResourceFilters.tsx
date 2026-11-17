import { resourceFormats } from "../data/resourcesData";
import type { ResourceFormat } from "../types/resource";
import styles from "./ResourceFilters.module.css";

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  format: ResourceFormat | "All";
  onFormatChange: (format: ResourceFormat | "All") => void;
};

const formats = ["All", ...resourceFormats] as const;

export default function ResourceFilters({ query, onQueryChange, format, onFormatChange }: Props) {
  return (
    <div className={styles.filters}>
      <div role="search" aria-label="Resource search" className={styles.search}>
        <label htmlFor="resource-search">Search resources</label>
        <div className={styles.controls}>
          <input id="resource-search" type="search" placeholder="Enter a word or topic" value={query} onChange={event => onQueryChange(event.target.value)} />
          <button type="button" disabled={!query} onClick={() => {
            onQueryChange("");
            document.getElementById("resource-search")?.focus();
          }}>Clear search</button>
        </div>
      </div>
      <fieldset className={styles.formats}>
        <legend>Resource format</legend>
        <div className={styles.options}>
          {formats.map(option => (
            <button type="button" key={option} aria-pressed={option === format} onClick={() => onFormatChange(option)}>{option}</button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
