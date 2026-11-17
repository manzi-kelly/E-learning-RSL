import Link from "next/link";
import layout from "../Editorial.module.css";
import styles from "./FinalCTA.module.css";

export default function FinalCTA() {
  return (
    <section id="get-started" tabIndex={-1} aria-labelledby="final-cta-title" className={`${layout.section} ${layout.light} ${styles.section}`}>
      <div className={layout.inner}>
        <h2 id="final-cta-title" className={layout.heading}>A more connected future starts with <em>one sign.</em></h2>
        <div className={styles.actions}>
          <Link href="/courses">Start exploring <span aria-hidden="true">↗</span></Link>
          <Link href="/interpreting">Interpreting services</Link>
        </div>
      </div>
    </section>
  );
}
