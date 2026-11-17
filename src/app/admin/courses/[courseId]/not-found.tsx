import Link from "next/link";
import styles from "@/src/features/admin/Courses/CoursesPage/CoursesPage.module.css";

export default function CourseNotFound() {
  return (
    <div className={styles.page}>
      <h1>Course not found</h1>
      <p>Choose one of the six courses in the preview directory.</p>
      <Link className={styles.back} href="/admin/courses">Return to Course Management</Link>
    </div>
  );
}
