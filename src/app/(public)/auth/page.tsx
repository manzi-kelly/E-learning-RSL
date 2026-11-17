import type { Metadata } from "next";
import AuthPage from "@/src/features/auth/AuthPage/AuthPage";

export const metadata: Metadata = {
  title: "Account access | RSL-ELP",
  description: "Preview the Rwanda Sign Language E-Learning Platform’s student account and login interfaces.",
};

export default function Page() {
  return <AuthPage />;
}
