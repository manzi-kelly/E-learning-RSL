"use client";

import { useState } from "react";
import AlphabetFilter from "../Alphabet/AlphabetFilter";
import CategoryFilter from "../Categories/CategoryFilter";
import { filterEntries } from "../data/dictionaryData";
import VocabularyList from "../Entries/VocabularyList";
import DictionarySearch from "../Search/DictionarySearch";
import type { Category } from "../types/dictionary";
import styles from "./DictionaryPage.module.css";

export default function DictionaryBrowser() {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("All");
  const [category, setCategory] = useState<Category | "All">("All");

  return (
    <>
      <div className={styles.filters}>
        <DictionarySearch query={query} onChange={setQuery} />
        <AlphabetFilter value={letter} onChange={setLetter} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>
      <VocabularyList entries={filterEntries(query, letter, category)} />
    </>
  );
}
