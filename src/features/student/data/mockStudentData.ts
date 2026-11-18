import { courses } from "@/src/features/courses/courseData";
import { certificates } from "@/src/features/admin/Certificates/data/certificates";
import { payments } from "@/src/features/admin/Payments/data/payments";
import type { SampleEnrollment } from "../types/student";

export const studentName = "Sample Student 02";
const enrollments: readonly SampleEnrollment[] = [
  { courseId: "beginner", completed: 1, total: 3, assessment: "Not started" },
  { courseId: "intermediate", completed: 3, total: 3, assessment: "Sample attempt recorded" },
];

export const learningRecords = enrollments.flatMap(record => {
  const course = courses.find(item => item.id === record.courseId);
  return course ? [{ ...record, course }] : [];
});
export const certificateRecords = certificates.filter(record => record.student === studentName);
export const paymentRecords = payments.filter(record => record.student === studentName);
