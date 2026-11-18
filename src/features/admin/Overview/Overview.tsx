import { overviewAreas } from "../data/adminOverviewData";
import styles from "./Overview.module.css";

export default function Overview() {
  return (
    <div className={styles.overview}>
      <header className={styles.intro}>
        <div className={styles.introTop}>
          <h1 className={styles.title}>Overview</h1>
          <span className={styles.badge}>Preview</span>
        </div>
        <p className={styles.notice}>
          Administrator interface preview — authentication and authorization are not yet connected.
        </p>
      </header>

      <section className={styles.panel} aria-labelledby="admin-management-title">
        <div className={styles.panelHeader}>
          <h2 id="admin-management-title" className={styles.panelTitle}>Planned management areas</h2>
          <span className={styles.count}>{overviewAreas.length} areas</span>
        </div>
        <dl className={styles.areas}>
          {overviewAreas.map(area => (
            <div key={area.title} className={styles.area}>
              <dt className={styles.areaTitle}>{area.title}</dt>
              <dd className={styles.areaText}>{area.description}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}