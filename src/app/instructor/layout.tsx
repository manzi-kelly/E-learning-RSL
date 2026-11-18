import type { Metadata } from "next";
import type { ReactNode } from "react";
import Brand from "@/src/features/landing/Brand";
import InstructorLayout from "@/src/features/instructor/InstructorLayout/InstructorLayout";

export const metadata: Metadata = {
  title: { default: "Instructor Dashboard Preview | RSL-ELP", template: "%s | Instructor Preview · RSL-ELP" },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <InstructorLayout brand={<Brand />}>{children}</InstructorLayout>;
}
