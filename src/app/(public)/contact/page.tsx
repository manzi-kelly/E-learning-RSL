import type { Metadata } from "next";
import ContactPage from "@/src/features/contact/ContactPage/ContactPage";

export const metadata: Metadata = {
  title: "Contact RSL-ELP",
  description: "Find contact information and preview the RSL-ELP contact form.",
};

export default function Page() {
  return <ContactPage />;
}
