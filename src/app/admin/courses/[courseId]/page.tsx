import { notFound } from "next/navigation";
import { courses, findCourse } from "@/src/features/courses/courseData";
import CoursesPage from "@/src/features/admin/Courses/CoursesPage/CoursesPage";

export function generateStaticParams() {
  return courses.map(({ id }) => ({ courseId: id }));
}

export async function generateMetadata({ params }: PageProps<"/admin/courses/[courseId]">) {
  const course = findCourse((await params).courseId);
  return { title: course ? `${course.title} · Admin preview | RSL-ELP` : "Course not found · Admin preview | RSL-ELP" };
}

export default async function Page({ params }: PageProps<"/admin/courses/[courseId]">) {
  const course = findCourse((await params).courseId);
  if (!course) notFound();
  return <CoursesPage course={course} />;
}
