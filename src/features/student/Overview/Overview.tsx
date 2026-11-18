import Link from "next/link";
import { learningRecords, studentName } from "../data/mockStudentData";
import ui from "../LearningContent.module.css";
import styles from "./Overview.module.css";

const percent = (completed: number, total: number) =>
  total > 0 ? Math.round((completed / total) * 100) : 0;

export default function Overview() {
  const next = learningRecords.find(record => record.completed < record.total);
  const completed = learningRecords.reduce((sum, record) => sum + record.completed, 0);
  const total = learningRecords.reduce((sum, record) => sum + record.total, 0);
  const overall = percent(completed, total);

  return (
    <div className={ui.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Your learning</p>
        <h1>Welcome, {studentName}</h1>
        <p className={styles.intro}>You’re viewing a fictional learner’s dashboard.</p>
      </header>

      <dl className={styles.summary}>
        <div>
          <dt>Sample course enrollments</dt>
          <dd>{learningRecords.length}</dd>
        </div>
        <div>
          <dt>Sample lesson steps completed</dt>
          <dd>
            {completed} of {total}
          </dd>
        </div>
      </dl>

      <div className={styles.overall}>
        <label htmlFor="overall-progress">Overall progress across sample courses</label>
        <div className={styles.progressRow}>
          <progress
            id="overall-progress"
            className={`${ui.progress} ${styles.bar}`}
            value={completed}
            max={total}
          />
          <span className={styles.pct} aria-hidden="true">
            {overall}%
          </span>
        </div>
      </div>

      <section className={`${ui.section} ${styles.continue}`} aria-labelledby="continue-heading">
        <h2 id="continue-heading">Continue learning</h2>
        {next ? (
          <div className={styles.next}>
            <div className={styles.nextBody}>
              <h3>{next.course.title}</h3>
              <p>{next.total - next.completed} sample steps remaining.</p>
              <label htmlFor="next-progress">
                {next.completed} of {next.total} sample steps completed
              </label>
              <progress
                id="next-progress"
                className={`${ui.progress} ${styles.bar}`}
                value={next.completed}
                max={next.total}
              />
            </div>
            <Link
              className={`${ui.link} ${styles.primary}`}
              href={`/courses/${next.courseId}/learn`}
            >
              Open classroom preview <span aria-hidden="true">↗</span>
            </Link>
          </div>
        ) : (
          <p className={styles.empty}>No unfinished sample courses.</p>
        )}
      </section>

      <nav aria-label="Student pages" className={styles.shortcuts}>
        <Link className={`${ui.link} ${styles.shortcut}`} href="/student/courses">
          <span className={styles.shortcutTitle}>View My Courses</span>
          <span className={styles.shortcutText}>Browse sample enrollments and open a course.</span>
        </Link>
        <Link className={`${ui.link} ${styles.shortcut}`} href="/student/progress">
          <span className={styles.shortcutTitle}>View Learning Progress</span>
          <span className={styles.shortcutText}>See steps completed and assessment status.</span>
        </Link>
      </nav>
    </div>
  );
}