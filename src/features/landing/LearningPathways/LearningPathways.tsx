import Link from "next/link";
import { courses } from "../../courses/courseData";
import layout from "../Editorial.module.css";
import SectionMotion from "../SectionMotion";
import styles from "./LearningPathways.module.css";


const coreCourses = courses.filter((course) => course.level !== "Specialized");

function CoursePreview({ id, title, level }: { id: string; title: string; level: string }) {
  return (
    <Link
      href={`/courses/${id}`}
      className={styles.item}
    >
      <span className={styles.thumb} aria-hidden="true">RSL</span>
      <span className={styles.meta}>
        <span className={styles.level}>{level}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.action}>
          Explore <span aria-hidden="true">↗</span>
        </span>
      </span>
    </Link>
  );
}

export default function LearningPathways() {
  return (
    <section id="courses" tabIndex={-1} aria-labelledby="courses-title" className={layout.section}>
      <div className={layout.inner}>
        <div className={styles.introRow}>
          <div>
            <p className={layout.kicker}>Learning pathways</p>
            <h2 id="courses-title" className={layout.heading}>Find your starting point.</h2>
          </div>
          <div className={styles.introAside}>
            <p className={styles.intro}>Explore the planned course categories. Enrollment is unavailable.</p>
            <Link className={styles.allLink} href="/courses">View the full catalogue <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <SectionMotion>
          <ul className={styles.previewGrid} role="list">
            {coreCourses.map((course) => (
              <li key={course.id} data-section-reveal>
                <CoursePreview id={course.id} title={course.title} level={course.level} />
              </li>
            ))}
          </ul>
        </SectionMotion>
      </div>
    </section>
  );
}