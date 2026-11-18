import type { Metadata } from "next";
import AboutUsPage from "@/src/features/about-us/AboutUsPage/AboutUsPage";

export const metadata: Metadata = {
  title: "About us | RSL-ELP",
  description:
    "Learn about RSL-ELP, how the platform works, our terms of use, privacy policy and how to contact us.",
};

export default function Page() {
  return <AboutUsPage />;
}
