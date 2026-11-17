import { overviewAreas } from "../data/adminOverviewData";
import styles from "./Overview.module.css";

export default function Overview() {
  return (
    <div className={styles.overview}>
      <header className={styles.intro}>
        <h1>Overview</h1>
        <p className={styles.notice}>Administrator interface preview — authentication and authorization are not yet connected.</p>
      </header>
      <section aria-labelledby="admin-management-title">
        <h2 id="admin-management-title">Planned management areas</h2>
        <dl>
          {overviewAreas.map(area => <div key={area.title}><dt>{area.title}</dt><dd>{area.description}</dd></div>)}
        </dl>
      </section>
    </div>
  );
}
