import type { ReactNode } from "react";
import { courses } from "@/src/features/courses/courseData";

export function generateStaticParams() {
  return courses.map(course => ({ courseId: course.id }));
}

export default function CourseLayout({ children }: { children: ReactNode }) {
  return children;
}
