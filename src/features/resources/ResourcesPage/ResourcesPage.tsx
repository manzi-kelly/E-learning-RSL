import ResourceLibrary from "../ResourceLibrary/ResourceLibrary";
import styles from "./ResourcesPage.module.css";

export default function ResourcesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>RSL-ELP · Study materials</p>
          <h1>Learning <em>Resources</em></h1>
          <p className={styles.lead}>Explore educational materials designed to support Rwanda Sign Language learning.</p>
          <p className={styles.notice}>This library lists planned materials. Previews and downloads will appear when approved resources are published.</p>
        </div>
      </header>
      <div className={styles.inner}>
        <ResourceLibrary />
      </div>
    </div>
  );
}
