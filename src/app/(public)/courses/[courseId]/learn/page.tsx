import { notFound } from "next/navigation";
import { findCourse } from "@/src/features/courses/courseData";
import { Classroom } from "@/src/features/courses/platform";

export async function generateMetadata({ params }: PageProps<"/courses/[courseId]/learn">) {
  const course = findCourse((await params).courseId);
  if (!course) notFound();
  return { title: `Classroom preview · ${course.title} | RSL-ELP` };
}

export default async function LearnPage({ params }: PageProps<"/courses/[courseId]/learn">) {
  const course = findCourse((await params).courseId);
  if (!course) notFound();
  return <Classroom key={course.id} course={course} />;
}
