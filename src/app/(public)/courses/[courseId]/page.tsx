import { notFound } from "next/navigation";
import { findCourse } from "@/src/features/courses/courseData";
import { CourseDetails } from "@/src/features/courses/platform";

export async function generateMetadata({ params }: PageProps<"/courses/[courseId]">) {
  const course = findCourse((await params).courseId);
  if (!course) notFound();
  return { title: `${course.title} | RSL-ELP` };
}

export default async function CoursePage({ params }: PageProps<"/courses/[courseId]">) {
  const course = findCourse((await params).courseId);
  if (!course) notFound();
  return <CourseDetails course={course} />;
}
