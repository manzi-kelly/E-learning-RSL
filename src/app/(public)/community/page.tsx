import type { Metadata } from "next";
import CommunityPage from "@/src/features/community/CommunityPage/CommunityPage";

export const metadata: Metadata = {
  title: "RSL-ELP Community",
  description: "Explore plans for shared Rwanda Sign Language learning and accessible communication.",
};

export default function Page() {
  return <CommunityPage />;
}
