import type { Metadata } from "next";
import InterpretingPage from "@/src/features/interpreting/InterpretingPage/InterpretingPage";

export const metadata: Metadata = {
  title: "Rwanda Sign Language Interpreting Services | RSL-ELP",
  description: "Explore interpreting service settings and preview the RSL-ELP request process.",
};

export default function Page() {
  return <InterpretingPage />;
}
