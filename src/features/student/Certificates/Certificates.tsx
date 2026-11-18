import Image from "next/image";
import { certificateRecords } from "../data/mockStudentData";
import ui from "../LearningContent.module.css";
import styles from "./Certificates.module.css";

export default function Certificates() {
  return (
    <div className={ui.page}>
      <h1>My Certificates</h1>
      <p>Synthetic records for this fictional learner. These previews have no validity as certificates.</p>
      {certificateRecords.length === 0 ? <p>No sample certificates are available.</p> : (
        <ul role="list" className={ui.rows}>
          {certificateRecords.map(record => (
            <li key={record.id}>
              <div className={styles.heading}>
                <Image src="/logo.jpeg" alt="RSL-ELP platform logo" width={52} height={52} />
                <h2>{record.course}</h2>
              </div>
              <dl className={styles.details}>
                <div><dt>Student name</dt><dd>{record.student}</dd></div>
                <div><dt>Sample completion date</dt><dd><time dateTime={record.completed}>{record.completed}</time></dd></div>
                <div><dt>Illustrative identifier</dt><dd>{record.id}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
