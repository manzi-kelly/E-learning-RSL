export const categories = ["Everyday", "People", "Education", "Healthcare", "Professional"] as const;

export type Category = (typeof categories)[number];
export type DictionaryEntry = {
  id: string;
  word: string;
  category: Category;
  description: string;
  relatedIds: readonly string[];
  reviewStatus: "interface-placeholder";
  videoStatus: "awaiting-approval";
};
