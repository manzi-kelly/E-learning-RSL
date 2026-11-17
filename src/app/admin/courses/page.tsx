import type { Metadata } from "next";
import CoursesPage from "@/src/features/admin/Courses/CoursesPage/CoursesPage";

export const metadata: Metadata = { title: "Course Management Preview | RSL-ELP" };

export default function Page() {
  return <CoursesPage />;
}
