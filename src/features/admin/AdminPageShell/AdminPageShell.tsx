import type { ReactNode } from "react";
import styles from "./AdminPageShell.module.css";

type Props = {
  title: string;
  notice: string;
  sectionTitle: string;
  count?: string;
  description?: string;
  back?: ReactNode;
  actions?: ReactNode;
  panelId?: string;
  children: ReactNode;
};

export default function AdminPageShell({
  title,
  notice,
  sectionTitle,
  count,
  description,
  back,
  actions,
  panelId = "admin-page-panel-title",
  children,
}: Props) {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        {back && <div className={styles.back}>{back}</div>}
        <div className={styles.introTop}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.badge}>Preview</span>
        </div>
        {description && <p className={styles.description}>{description}</p>}
        <p className={styles.notice}>{notice}</p>
      </header>

      <section className={styles.panel} aria-labelledby={panelId}>
        <div className={styles.panelHeader}>
          <h2 id={panelId} className={styles.panelTitle}>{sectionTitle}</h2>
          {count && <span className={styles.count}>{count}</span>}
        </div>
        {actions && <div className={styles.panelActions}>{actions}</div>}
        <div className={styles.panelBody}>{children}</div>
      </section>
    </div>
  );
}
