import type { Metadata } from "next";
import DictionaryPage from "@/src/features/dictionary/DictionaryPage/DictionaryPage";

export const metadata: Metadata = {
  title: "Rwanda Sign Language Digital Dictionary | RSL-ELP",
  description: "Preview the RSL-ELP digital dictionary and browse sample vocabulary by letter and category.",
};

export default function Page() {
  return <DictionaryPage />;
}
