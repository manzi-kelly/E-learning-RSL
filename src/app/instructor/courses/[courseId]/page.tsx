import { assignedCourses } from "@/src/features/instructor/data/mockInstructorData";
import { AssignedCourseDetails } from "@/src/features/instructor/MyCourses/MyCourses";

export const metadata = { title: "Course preparation" };

export function generateStaticParams() {
  return assignedCourses.map(({ courseId }) => ({ courseId }));
}

export default async function Page({ params }: PageProps<"/instructor/courses/[courseId]">) {
  return <AssignedCourseDetails id={(await params).courseId} />;
}
