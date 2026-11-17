import Link from "next/link";
import styles from "@/src/features/dictionary/EntryDetails/EntryDetails.module.css";

export default function EntryNotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.intro}>
          <h1>Entry not found</h1>
          <p>This vocabulary entry is unavailable. Return to the dictionary to browse available samples.</p>
        </header>
        <Link className={styles.return} href="/dictionary">Return to dictionary</Link>
      </div>
    </div>
  );
}
