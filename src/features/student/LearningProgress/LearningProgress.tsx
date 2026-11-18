import Link from "next/link";
import { learningRecords } from "../data/mockStudentData";
import ui from "../LearningContent.module.css";
import styles from "./LearningProgress.module.css";

const percent = (completed: number, total: number) =>
  total > 0 ? Math.round((completed / total) * 100) : 0;

export default function LearningProgress() {
  const totalSteps = learningRecords.reduce((sum, r) => sum + r.total, 0);
  const completedSteps = learningRecords.reduce((sum, r) => sum + r.completed, 0);
  const remainingSteps = totalSteps - completedSteps;
  const overall = percent(completedSteps, totalSteps);

  return (
    <div className={ui.page}>
      <header className={styles.header}>
        <h1>Learning Progress</h1>
        <p className={styles.intro}>
          These sample records are fixed. Interactions in the classroom preview reset on reload and
          do not update this summary.
        </p>
      </header>

      <section aria-labelledby="progress-summary" className={styles.summary}>
        <h2 id="progress-summary" className={styles.visuallyHidden}>
          Overall summary
        </h2>
        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Overall completion</dt>
            <dd className={styles.statValue}>{overall}%</dd>
          </div>
          <div className={styles.stat}>
            <dt>Courses in progress</dt>
            <dd className={styles.statValue}>{learningRecords.length}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Steps completed</dt>
            <dd className={styles.statValue}>
              {completedSteps} <span className={styles.statOf}>of {totalSteps}</span>
            </dd>
          </div>
          <div className={styles.stat}>
            <dt>Steps remaining</dt>
            <dd className={styles.statValue}>{remainingSteps}</dd>
          </div>
        </dl>
      </section>

      <ul role="list" className={`${ui.rows} ${styles.list}`}>
        {learningRecords.map(record => {
          const pct = percent(record.completed, record.total);
          const remaining = record.total - record.completed;
          const isDone = remaining === 0;
          const progressId = `student-progress-${record.courseId}`;

          return (
            <li key={record.courseId} className={styles.record}>
              <div className={styles.recordHead}>
                <h2>{record.course.title}</h2>
                <span className={`${styles.badge} ${isDone ? styles.badgeDone : ""}`}>
                  {isDone ? "Completed" : "In progress"}
                </span>
              </div>

              <div className={styles.progressBlock}>
                <label htmlFor={progressId}>
                  {record.completed} of {record.total} sample steps completed
                </label>
                <div className={styles.progressRow}>
                  <progress
                    id={progressId}
                    className={`${ui.progress} ${styles.bar}`}
                    value={record.completed}
                    max={record.total}
                  />
                  <span className={styles.pct} aria-hidden="true">
                    {pct}%
                  </span>
                </div>
              </div>

              <dl className={styles.meta}>
                <div>
                  <dt>Remaining</dt>
                  <dd>{remaining} sample steps</dd>
                </div>
                <div>
                  <dt>Assessment</dt>
                  <dd>{record.assessment}</dd>
                </div>
              </dl>

              <Link
                className={`${ui.link} ${styles.action}`}
                href={`/courses/${record.courseId}/learn`}
                aria-label={`Open assessment preview in classroom: ${record.course.title}`}
              >
                Open assessment preview in classroom
              </Link>
            </li>
          );
        })}
      </ul>

      <p className={styles.hint}>
        In the classroom, select <strong>Review and assessment</strong> to try the sample question.
        Use Back to return here.
      </p>
    </div>
  );
}