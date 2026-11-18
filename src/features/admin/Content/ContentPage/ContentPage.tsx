"use client";

import { useEffect, useRef, useState } from "react";
import AdminPageShell from "../../AdminPageShell/AdminPageShell";
import PreviewTable from "../../PreviewTable/PreviewTable";
import ContentEditor from "../ContentEditor/ContentEditor";
import { drafts, type ContentDraft } from "../data/content";
import styles from "./ContentPage.module.css";

export default function ContentPage() {
  const [records, setRecords] = useState(drafts);
  const [selected, setSelected] = useState<string>();
  const heading = useRef<HTMLHeadingElement>(null);
  const current = records.find(record => record.id === selected);
  useEffect(() => { if (selected) heading.current?.focus(); }, [selected]);

  function update(draft: ContentDraft) {
    setRecords(previous => previous.map(record => record.id === draft.id ? draft : record));
  }

  return (
    <AdminPageShell
      title="Website Content Management"
      description="Review draft content and check the editing experience for public pages."
      notice="Synthetic drafts for preview only. Edits reset on reload. Public pages are unaffected."
      sectionTitle="Content workspace"
      count={`${records.length} drafts`}
      panelId="content-panel-title"
    >
      <section className={styles.section} aria-labelledby="content-directory">
        <h2 id="content-directory">Content directory</h2>
        <PreviewTable title="Demonstration content drafts" columns={["Title", "Type", "Status", "Action"]}
          rows={records.map(record => ({ id: record.id, cells: [record.title, record.type, record.status,
            <button key="action" className={styles.button} type="button" aria-label={`Edit preview: ${record.title}`} onClick={() => {
              if (selected === record.id) heading.current?.focus(); else setSelected(record.id);
            }}>Edit preview</button>,
          ] }))} />
      </section>
      {current && <ContentEditor key={current.id} draft={current} heading={heading} onUpdate={update} />}
    </AdminPageShell>
  );
}
