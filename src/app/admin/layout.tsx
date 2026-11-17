import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminLayout from "@/src/features/admin/AdminLayout/AdminLayout";

export const metadata: Metadata = {
  title: "Administrator Dashboard Preview | RSL-ELP",
  description: "Preview the RSL-ELP administrator workspace.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
