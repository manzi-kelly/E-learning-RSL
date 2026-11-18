import Link from "next/link";
import type { Course } from "@/src/features/courses/courseData";
import AdminPageShell from "../../AdminPageShell/AdminPageShell";
import AssessmentManager from "../AssessmentManager/AssessmentManager";
import CourseEditor from "../CourseEditor/CourseEditor";
import CourseTable from "../CourseTable/CourseTable";
import { adminCourses, previewNotice } from "../data/mockAdminCourses";
import LessonManager from "../LessonManager/LessonManager";
import MaterialsManager from "../MaterialsManager/MaterialsManager";
import styles from "./CoursesPage.module.css";

export default function CoursesPage({ course }: { course?: Course }) {
  const back = course ? (
    <Link className={styles.back} href="/admin/courses">← Course Management</Link>
  ) : undefined;
  const actions = course ? (
    <nav aria-label="Course editor sections" className={styles.sections}>
      <a href="#course-details">Course Details</a>
      <a href="#course-lessons">Lessons</a>
      <a href="#course-materials">Materials</a>
      <a href="#course-assessments">Assessments</a>
    </nav>
  ) : undefined;

  return (
    <AdminPageShell
      key={course?.id ?? "course-directory"}
      title={course?.title ?? "Course Management"}
      description={course
        ? "Edit sample course details, lessons, materials and assessments."
        : "Manage course information, lessons, educational materials and assessments."}
      notice={previewNotice}
      sectionTitle={course ? "Course editor" : "Courses overview"}
      count={course ? "4 editor sections" : `${adminCourses.length} courses`}
      back={back}
      actions={actions}
      panelId="courses-panel-title"
    >
      {course ? (
        <>
          <CourseEditor course={course} />
          <LessonManager />
          <MaterialsManager />
          <AssessmentManager />
        </>
      ) : <CourseTable />}
    </AdminPageShell>
  );
}
