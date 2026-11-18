import type { AssignedCourseId } from "../data/mockInstructorData";
import DraftForm, { type DraftField } from "../DraftForm/DraftForm";
import styles from "./MaterialsManager.module.css";

const fields: readonly DraftField[] = [
  { id: "video", label: "Demonstration video reference" },
  { id: "captions", label: "Caption reference or availability", initial: "Awaiting approval" },
  { id: "written", label: "Written learning material reference" },
  { id: "download", label: "Permitted downloadable file reference" },
];

export default function MaterialsManager({ course }: { course: AssignedCourseId }) {
  return (
    <section className={styles.section} aria-labelledby="materials-heading">
      <header className={styles.header}>
        <div>
          <h2 id="materials-heading" className={styles.title}>Learning materials preview</h2>
          <p className={styles.description}>
            Enter sample references only. Approved videos, captions and files are pending.
            The form does not upload or publish files.
          </p>
        </div>
        <span className={styles.badge}>Pending approval</span>
      </header>
      <DraftForm courseId={course} fields={fields} action="Check materials preview" />
    </section>
  );
}