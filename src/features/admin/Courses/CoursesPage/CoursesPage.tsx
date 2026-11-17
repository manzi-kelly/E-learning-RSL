import Link from "next/link";
import type { Course } from "@/src/features/courses/courseData";
import AssessmentManager from "../AssessmentManager/AssessmentManager";
import CourseEditor from "../CourseEditor/CourseEditor";
import CourseTable from "../CourseTable/CourseTable";
import { previewNotice } from "../data/mockAdminCourses";
import LessonManager from "../LessonManager/LessonManager";
import MaterialsManager from "../MaterialsManager/MaterialsManager";
import styles from "./CoursesPage.module.css";

export default function CoursesPage({ course }: { course?: Course }) {
  return (
    <div className={styles.page} key={course?.id}>
      <header className={styles.heading}>
        {course && <Link className={styles.back} href="/admin/courses">← Course Management</Link>}
        <h1>{course?.title ?? "Course Management"}</h1>
        {!course && <p>Manage course information, lessons, educational materials and assessments.</p>}
        <p className={styles.notice}>{previewNotice}</p>
      </header>
      {course ? (
        <>
          <nav aria-label="Course editor sections" className={styles.sections}>
            <a href="#course-details">Course Details</a>
            <a href="#course-lessons">Lessons</a>
            <a href="#course-materials">Materials</a>
            <a href="#course-assessments">Assessments</a>
          </nav>
          <CourseEditor course={course} />
          <LessonManager />
          <MaterialsManager />
          <AssessmentManager />
        </>
      ) : <CourseTable />}
    </div>
  );
}
