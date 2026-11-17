import type { Metadata } from "next";
import ResourcesPage from "@/src/features/resources/ResourcesPage/ResourcesPage";

export const metadata: Metadata = {
  title: "Learning Resources | RSL-ELP",
  description: "Explore planned resources for Rwanda Sign Language learning.",
};

export default function Page() {
  return <ResourcesPage />;
}
