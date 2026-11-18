import { entries } from "@/src/features/dictionary/data/dictionaryData";
import type { DictionaryEntry } from "@/src/features/dictionary/types/dictionary";

export type VocabularyDraft = DictionaryEntry & { videoReference: string };

export const vocabulary: readonly VocabularyDraft[] = entries.map(entry => ({ ...entry, videoReference: "" }));

export const suggestions = [
  { id: "s1", word: "Library", description: "Synthetic suggestion for a topic about learning spaces." },
  { id: "s2", word: "Appointment", description: "Synthetic suggestion for a topic about arranging a visit." },
] as const;
