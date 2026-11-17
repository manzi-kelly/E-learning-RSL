import Link from "next/link";
import type { DictionaryEntry } from "../types/dictionary";
import styles from "./EntryDetails.module.css";

export default function EntryDetails({ entry, related }: { entry: DictionaryEntry; related: readonly DictionaryEntry[] }) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <nav className={styles.back} aria-label="Dictionary breadcrumb">
          <Link href="/dictionary"><span aria-hidden="true">←</span> Return to dictionary</Link>
        </nav>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{entry.category} · Sample entry</p>
          <h1>{entry.word}</h1>
          <p>Interface placeholder awaiting review and approval.</p>
        </header>
        <div className={styles.body}>
          <section aria-labelledby="entry-explanation">
            <h2 id="entry-explanation">Written explanation</h2>
            <p>{entry.description}</p>
            <p>The approved explanation will appear here after review.</p>
          </section>
          <figure className={styles.media}>
            <div className={styles.frame} aria-hidden="true">Demonstration video</div>
            <figcaption>Verified Rwanda Sign Language demonstration video awaiting approval.</figcaption>
          </figure>
        </div>
        {related.length > 0 && (
          <section className={styles.related} aria-labelledby="related-vocabulary">
            <h2 id="related-vocabulary">Related vocabulary</h2>
            <p>Browse other sample topics.</p>
            <ul role="list">
              {related.map(item => (
                <li key={item.id}><Link href={`/dictionary/${item.id}`}>{item.word} <span aria-hidden="true">↗</span></Link></li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
