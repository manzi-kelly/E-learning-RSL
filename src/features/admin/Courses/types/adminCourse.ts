import type { Course } from "@/src/features/courses/courseData";

export type AdminCourseRow = {
  course: Course;
  readiness: "Course details only · media pending";
};
