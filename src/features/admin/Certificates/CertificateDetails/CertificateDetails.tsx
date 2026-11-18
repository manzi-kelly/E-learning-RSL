import type { ReactNode, Ref } from "react";
import type { DemoCertificate } from "../data/certificates";
import styles from "./CertificateDetails.module.css";

export default function CertificateDetails({ record, logo, heading }: { record: DemoCertificate; logo: ReactNode; heading: Ref<HTMLHeadingElement> }) {
  return (
    <section className={styles.section} aria-labelledby="certificate-details">
      <h2 id="certificate-details" tabIndex={-1} ref={heading}>Certificate preview · {record.id}</h2>
      <p className={styles.notice}>Demonstration only. No certificate was issued.</p>
      <div className={styles.brand}>{logo}</div>
      <dl className={styles.details}>
        <div><dt>Student name</dt><dd>{record.student}</dd></div>
        <div><dt>Course name</dt><dd>{record.course}</dd></div>
        <div><dt>Completion date</dt><dd><time dateTime={record.completed}>{record.completed}</time></dd></div>
        <div><dt>Certificate identifier</dt><dd>{record.id}</dd></div>
      </dl>
    </section>
  );
}
