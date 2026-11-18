"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import AdminPageShell from "../../AdminPageShell/AdminPageShell";
import PreviewTable from "../../PreviewTable/PreviewTable";
import CertificateDetails from "../CertificateDetails/CertificateDetails";
import { certificates, type DemoCertificate } from "../data/certificates";
import styles from "./CertificatesPage.module.css";

export default function CertificatesPage({ logo }: { logo: ReactNode }) {
  const [selected, setSelected] = useState<DemoCertificate>();
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (selected) heading.current?.focus(); }, [selected]);

  return (
    <AdminPageShell
      title="Certificates Management"
      description="Review sample certificate records and preview the certificate layout."
      notice="Fictional records for layout review. These previews have no validity as certificates."
      sectionTitle="Certificate workspace"
      count={`${certificates.length} records`}
      panelId="certificates-panel-title"
    >
      <section className={styles.section} aria-labelledby="certificate-records">
        <h2 id="certificate-records">Certificate records</h2>
        <PreviewTable title="Demonstration certificates" columns={["Certificate identifier", "Student", "Course", "Completion date", "Action"]}
          rows={certificates.map(record => ({ id: record.id, cells: [record.id, record.student, record.course,
            <time key="completion" dateTime={record.completed}>{record.completed}</time>,
            <button key="action" type="button" className={styles.button} aria-label={`View preview: ${record.id}`} onClick={() => {
              if (selected === record) heading.current?.focus(); else setSelected(record);
            }}>View preview</button>,
          ] }))} />
      </section>
      {selected && <CertificateDetails record={selected} logo={logo} heading={heading} />}
    </AdminPageShell>
  );
}
