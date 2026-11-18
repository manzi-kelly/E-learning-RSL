import type { Metadata } from "next";
import WaysToLearnPage from "@/src/features/ways-to-learn/WaysToLearnPage/WaysToLearnPage";

export const metadata: Metadata = {
  title: "Ways to Learn | RSL-ELP",
  description:
    "Explore three ways to learn Rwanda Sign Language: virtual lessons, the digital dictionary, and interpreting support.",
};

export default function Page() {
  return <WaysToLearnPage />;
}
