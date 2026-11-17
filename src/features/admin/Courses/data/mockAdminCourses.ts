import { courses } from "@/src/features/courses/courseData";
import type { AdminCourseRow } from "../types/adminCourse";

export const adminCourses: readonly AdminCourseRow[] = courses.map(course => ({
  course,
  readiness: "Course details only · media pending",
}));

export const previewNotice = "Administrator preview — changes are temporary and are not saved to the platform.";
