import type { Category, DictionaryEntry } from "../types/dictionary";

const samples = [
  { id: "family", word: "Family", category: "People", description: "Sample topic about family relationships and everyday communication.", relatedIds: ["greeting"] },
  { id: "greeting", word: "Greeting", category: "Everyday", description: "Sample topic about starting an everyday conversation.", relatedIds: ["thank-you", "family"] },
  { id: "health", word: "Health", category: "Healthcare", description: "Sample topic about communicating in healthcare settings.", relatedIds: ["greeting"] },
  { id: "school", word: "School", category: "Education", description: "Sample topic about places and activities connected with education.", relatedIds: ["work"] },
  { id: "thank-you", word: "Thank you", category: "Everyday", description: "Sample topic about expressing appreciation in everyday communication.", relatedIds: ["greeting"] },
  { id: "work", word: "Work", category: "Professional", description: "Sample topic about workplace communication.", relatedIds: ["school", "greeting"] },
] as const satisfies readonly Omit<DictionaryEntry, "reviewStatus" | "videoStatus">[];

export const entries: readonly DictionaryEntry[] = samples.map(sample => ({
  ...sample,
  reviewStatus: "interface-placeholder",
  videoStatus: "awaiting-approval",
}));

export function findEntry(id: string) {
  return entries.find(entry => entry.id === id);
}

export function filterEntries(query: string, letter: string, category: Category | "All") {
  const term = query.trim().toLowerCase();
  return entries.filter(entry =>
    (letter === "All" || entry.word[0]?.toUpperCase() === letter) &&
    (category === "All" || entry.category === category) &&
    (entry.word.toLowerCase().includes(term) || entry.description.toLowerCase().includes(term)),
  );
}
