import { findCourse } from "@/src/features/courses/courseData";
import type { Assignment, ProgressRecord } from "../types/instructor";

export const instructorName = "Sample Instructor 01";

const assignments = [
  { courseId: "beginner", lessons: ["Sample lesson outline"], assessments: ["Sample accessibility question"] },
  { courseId: "intermediate", lessons: ["Sample lesson outline"], assessments: ["Sample accessibility question"] },
] as const satisfies readonly Assignment[];
export type AssignedCourseId = (typeof assignments)[number]["courseId"];

export const assignedCourses = assignments.map(assignment => {
  const course = findCourse(assignment.courseId);
  if (!course) throw new Error("An instructor preview assignment has an unknown course ID.");
  return { ...assignment, course };
});

export const progressRecords: readonly (ProgressRecord & { courseId: AssignedCourseId })[] = [
  { id: "sample-01", learner: "Sample Learner 01", courseId: "beginner", viewed: 1, total: 3, participated: false },
  { id: "sample-02", learner: "Sample Learner 02", courseId: "intermediate", viewed: 3, total: 3, participated: true },
  { id: "sample-03", learner: "Sample Learner 03", courseId: "beginner", viewed: 2, total: 3, participated: false },
];
