import { activity, areas } from "../data/activity";
import styles from "./ReportSummary.module.css";

export default function ReportSummary() {
  return (
    <section className={styles.section} aria-labelledby="sample-summary">
      <h2 id="sample-summary">Sample dataset summary</h2>
      <dl className={styles.summary}>
        {areas.map(area => <div key={area}><dt>{area}</dt><dd>{activity.filter(item => item.area === area).length}</dd></div>)}
      </dl>
    </section>
  );
}
