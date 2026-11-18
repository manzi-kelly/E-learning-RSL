"use client";

import { useState } from "react";
import AdminPageShell from "../../AdminPageShell/AdminPageShell";
import ActivityTable from "../ActivityTable/ActivityTable";
import ReportSummary from "../ReportSummary/ReportSummary";
import { activity, areas } from "../data/activity";
import styles from "./ReportsPage.module.css";

export default function ReportsPage() {
  const [area, setArea] = useState("");
  const matches = activity.filter(item => !area || item.area === area);
  return (
    <AdminPageShell
      title="Reports & Activity Monitoring"
      description="Review illustrative platform activity and reporting views."
      notice="Illustrative records only. Counts describe the demonstration dataset. Live platform analytics are unavailable."
      sectionTitle="Activity monitoring"
      count={`${matches.length} of ${activity.length} records`}
      panelId="reports-panel-title"
    >
      <ReportSummary />
      <section className={styles.section} aria-labelledby="activity-title">
        <h2 id="activity-title">Demonstration activity</h2>
        <div className={styles.filter}>
          <label htmlFor="activity-area">Activity area<select id="activity-area" value={area} onChange={event => setArea(event.target.value)}>
            <option value="">All areas</option>{areas.map(option => <option key={option}>{option}</option>)}
          </select></label>
        </div>
        <p role="status">{matches.length} matching demonstration {matches.length === 1 ? "record" : "records"}</p>
        <ActivityTable records={matches} />
      </section>
    </AdminPageShell>
  );
}
