import Link from "next/link";
import { assignedCourses, instructorName } from "../data/mockInstructorData";
import ui from "../Workspace.module.css";
import styles from "./MyCourses.module.css";

export default function MyCourses() {
  return (
    <div className={ui.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>My Assigned Courses</h1>
          <p className={styles.subtitle}>Sample assignments for {instructorName}.</p>
        </div>
        <span className={styles.badge}>
          {assignedCourses.length} {assignedCourses.length === 1 ? "course" : "courses"}
        </span>
      </header>

      <ul className={styles.rows} role="list">
        {assignedCourses.map(({ courseId, course, lessons }) => (
          <li key={courseId} className={styles.card}>
            <h2 className={styles.cardTitle}>{course.title}</h2>
            <p className={styles.cardText}>{course.objective}</p>
            <p className={styles.meta}>
              {lessons.length} sample outline · Approved lesson materials pending
            </p>
            <Link
              className={`${ui.link} ${styles.cardLink}`}
              href={`/instructor/courses/${courseId}`}
              aria-label={`View Course: ${course.title}`}
            >
              View Course →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AssignedCourseDetails({ id }: { id: string }) {
  const item = assignedCourses.find(record => record.courseId === id);
  return (
    <div className={ui.page}>
      <Link className={`${ui.link} ${styles.back}`} href="/instructor/courses">← Back to assigned courses</Link>
      {item ? (
        <>
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>{item.course.title}</h1>
              <p className={styles.subtitle}>{item.course.objective}</p>
              <p className={styles.meta}>Sample assignment for {instructorName}.</p>
            </div>
            <span className={styles.badge}>Draft preview</span>
          </header>

          <ul className={styles.stats} aria-label="Course summary">
            <li className={styles.stat}>
              <span className={styles.statLabel}>Sample lessons</span>
              <strong className={styles.statValue}>{item.lessons.length}</strong>
            </li>
            <li className={styles.stat}>
              <span className={styles.statLabel}>Assessment drafts</span>
              <strong className={styles.statValue}>{item.assessments.length}</strong>
            </li>
            <li className={styles.stat}>
              <span className={styles.statLabel}>Teaching materials</span>
              <strong className={styles.statValue}>Pending</strong>
            </li>
          </ul>

          <div className={styles.layout}>
            <section className={styles.panel} aria-labelledby="course-prep">
              <h2 id="course-prep" className={styles.panelTitle}>Course preparation preview</h2>
              <ul className={styles.lessons}>
                {item.lessons.map(lesson => <li key={lesson}>{lesson}</li>)}
              </ul>
              <p className={styles.meta}>
                {item.assessments.length} sample assessment draft. Approved teaching materials are pending.
              </p>
              <p className={styles.meta}>
                Choose this course in the workspace’s course selector to view its preview.
              </p>
            </section>

            <aside className={styles.panel} aria-labelledby="course-actions">
              <h2 id="course-actions" className={styles.panelTitle}>Next steps</h2>
              <nav className={styles.actions} aria-label="Course preparation">
                <Link className={`${ui.link} ${styles.action}`} href="/instructor/lessons">Lessons &amp; Materials</Link>
                <Link className={`${ui.link} ${styles.action}`} href="/instructor/assessments">Assessments</Link>
                <Link className={`${ui.link} ${styles.action}`} href="/instructor/progress">Student Progress</Link>
              </nav>
            </aside>
          </div>
        </>
      ) : (
        <section className={styles.panel}>
          <h1 className={styles.title}>Course unavailable in this preview</h1>
          <p className={styles.subtitle}>
            This course is outside the sample assignment. Only the courses listed in My Courses have instructor controls in this preview.
          </p>
        </section>
      )}
    </div>
  );
}