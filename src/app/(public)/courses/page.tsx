import type { Metadata } from "next";
import { Catalogue } from "@/src/features/courses/platform";

export const metadata: Metadata = { title: "Courses | RSL-ELP" };

export default function CoursesPage() {
  return <Catalogue />;
}
