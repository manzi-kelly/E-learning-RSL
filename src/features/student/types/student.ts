import type { Course } from "@/src/features/courses/courseData";

export type SampleEnrollment = {
  courseId: Course["id"];
  completed: number;
  total: number;
  assessment: "Not started" | "Sample attempt recorded";
};
