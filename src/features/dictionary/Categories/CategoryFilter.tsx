import { categories, type Category } from "../types/dictionary";
import styles from "./CategoryFilter.module.css";

const options = ["All", ...categories] as const;

export default function CategoryFilter({ value, onChange }: { value: Category | "All"; onChange: (value: Category | "All") => void }) {
  return (
    <div className={styles.category}>
      <label htmlFor="dictionary-category">Vocabulary category</label>
      <select id="dictionary-category" value={value} onChange={event => {
        const option = options.find(option => option === event.target.value);
        if (option) onChange(option);
      }}>
        {options.map(option => <option key={option} value={option}>{option === "All" ? "All categories" : option}</option>)}
      </select>
    </div>
  );
}
