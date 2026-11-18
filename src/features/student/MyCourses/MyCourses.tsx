import Link from "next/link";
import { learningRecords } from "../data/mockStudentData";
import ui from "../LearningContent.module.css";
import styles from "./MyCourses.module.css";

const percent = (completed: number, total: number) =>
  total > 0 ? Math.round((completed / total) * 100) : 0;

export default function MyCourses() {
  return (
    <div className={ui.page}>
      <header className={styles.header}>
        <h1>My Courses</h1>
        <p className={styles.intro}>
          Browse the sample enrollments and open the existing classroom preview.
        </p>
      </header>

      {learningRecords.length === 0 ? (
        <div className={styles.empty}>
          <h2>No courses yet</h2>
          <p>No sample courses are enrolled.</p>
          <Link className={`${ui.link} ${styles.primary}`} href="/courses">
            Browse the full catalogue
          </Link>
        </div>
      ) : (
        <ul role="list" className={`${ui.rows} ${styles.grid}`}>
          {learningRecords.map(record => {
            const pct = percent(record.completed, record.total);
            const isDone = record.total > 0 && record.completed >= record.total;
            const progressId = `course-progress-${record.courseId}`;

            return (
              <li key={record.courseId} className={styles.course}>
                <div className={styles.body}>
                  <div className={styles.titleRow}>
                    <h2>{record.course.title}</h2>
                    <span className={`${styles.badge} ${isDone ? styles.badgeDone : ""}`}>
                      {isDone ? "Completed" : "In progress"}
                    </span>
                  </div>

                  <p className={styles.objective}>{record.course.objective}</p>
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

                <div className={`${ui.actions} ${styles.actions}`}>
                  <Link
                    className={`${ui.link} ${styles.primary}`}
                    href={`/courses/${record.courseId}/learn`}
                    aria-label={`Continue Learning: ${record.course.title}`}
                  >
                    Continue Learning
                  </Link>
                  <Link
                    className={`${ui.link} ${styles.secondary}`}
                    href={`/courses/${record.courseId}`}
                    aria-label={`Course overview: ${record.course.title}`}
                  >
                    Course overview
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <nav aria-label="More learning" className={`${ui.actions} ${styles.footer}`}>
        <Link className={ui.link} href="/courses">
          Browse the full catalogue
        </Link>
        <Link className={ui.link} href="/resources">
          View planned learning materials
        </Link>
      </nav>
    </div>
  );
}