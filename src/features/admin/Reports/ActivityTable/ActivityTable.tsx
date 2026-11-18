import PreviewTable from "../../PreviewTable/PreviewTable";
import type { DemoActivity } from "../data/activity";
import styles from "./ActivityTable.module.css";

export default function ActivityTable({ records }: { records: readonly DemoActivity[] }) {
  return (
    <div className={styles.activity}>
      <PreviewTable title="Demonstration activity records" columns={["Reference", "Area", "Sample date", "Description"]}
        rows={records.map(record => ({ id: record.id, cells: [record.id, record.area, <time key="date" dateTime={record.date}>{record.date}</time>, record.description] }))} />
    </div>
  );
}
