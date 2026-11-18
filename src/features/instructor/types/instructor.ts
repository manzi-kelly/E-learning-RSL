import type { Course } from "@/src/features/courses/courseData";

export type Assignment = { courseId: Course["id"]; lessons: readonly string[]; assessments: readonly string[] };
export type ProgressRecord = { id: string; learner: string; courseId: Course["id"]; viewed: number; total: number; participated: boolean };
