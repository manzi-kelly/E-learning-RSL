import type { ReactNode } from "react";
import Header from "@/src/features/landing/Header/Header";
import Footer from "@/src/features/landing/Footer/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </>
  );
}
