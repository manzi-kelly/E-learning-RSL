import type { Metadata } from "next";
import type { ReactNode } from "react";
import Brand from "@/src/features/landing/Brand";
import StudentLayout from "@/src/features/student/StudentLayout/StudentLayout";

export const metadata: Metadata = {
  title: { default: "Student Dashboard Preview | RSL-ELP", template: "%s | Student Preview · RSL-ELP" },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <StudentLayout brand={<Brand />}>{children}</StudentLayout>;
}
