import Link from "next/link";
import { adminCourses } from "../data/mockAdminCourses";
import styles from "./CourseTable.module.css";

export default function CourseTable() {
  return (
    <section aria-labelledby="admin-course-directory" className={styles.directory}>
      <h2 id="admin-course-directory">Course directory</h2>
      <p className={styles.summary}>Readiness reflects only the approved course details in this preview. No lesson, video, material or assessment mock content is available yet.</p>
      <p className={styles.instructions}>Scroll horizontally to see all columns.</p>
      <div className={styles.scroll} role="region" aria-label="Scrollable course directory" tabIndex={0}>
        <table>
          <thead>
            <tr><th scope="col">Course title</th><th scope="col">Level or audience</th><th scope="col">Content readiness</th><th scope="col">Action</th></tr>
          </thead>
          <tbody>
            {adminCourses.map(({ course, readiness }) => (
              <tr key={course.id}>
                <th scope="row">{course.title}</th>
                <td>{course.level}</td>
                <td>{readiness}</td>
                <td><Link href={`/admin/courses/${course.id}`} aria-label={`Edit preview: ${course.title}`}>Edit preview <span aria-hidden="true">↗</span></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
