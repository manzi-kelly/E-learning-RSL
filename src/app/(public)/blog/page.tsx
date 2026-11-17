import type { Metadata } from "next";
import BlogPage from "@/src/features/blog/BlogPage/BlogPage";

export const metadata: Metadata = {
  title: "Blog & News | RSL-ELP",
  description: "Find planned educational articles, platform news, and community updates from RSL-ELP.",
};

export default function Page() {
  return <BlogPage />;
}
