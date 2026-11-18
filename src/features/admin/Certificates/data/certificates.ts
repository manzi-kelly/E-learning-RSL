import { courses } from "@/src/features/courses/courseData";

export type DemoCertificate = { id: string; student: string; course: string; completed: string };

export const certificates: readonly DemoCertificate[] = [
  { id: "DEMO-C01", student: "Sample Student 01", course: courses[0].title, completed: "2026-01-15" },
  { id: "DEMO-C02", student: "Sample Student 02", course: courses[1].title, completed: "2026-01-18" },
];
