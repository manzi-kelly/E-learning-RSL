import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rwanda Sign Language E-Learning Platform",
  description: "Learn Rwanda Sign Language and support inclusive communication between Deaf and hearing people.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
