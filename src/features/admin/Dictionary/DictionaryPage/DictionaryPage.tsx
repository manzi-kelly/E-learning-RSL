"use client";

import { useEffect, useState, useRef } from "react";
import { categories } from "@/src/features/dictionary/types/dictionary";
import AdminPageShell from "../../AdminPageShell/AdminPageShell";
import { vocabulary, type VocabularyDraft } from "../data/mockVocabulary";
import VocabularyTable from "../VocabularyTable/VocabularyTable";
import VocabularyEditor from "../VocabularyEditor/VocabularyEditor";
import SuggestionReview from "../SuggestionReview/SuggestionReview";
import styles from "./DictionaryPage.module.css";

export default function DictionaryPage() {
  const [entries, setEntries] = useState(vocabulary);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState<string>();
  const editor = useRef<HTMLHeadingElement>(null);
  const entry = entries.find(item => item.id === selected);
  const term = query.trim().toLowerCase();
  const matches = entries.filter(item =>
    (!category || item.category === category) &&
    [item.word, item.description].some(text => text.toLowerCase().includes(term)),
  );

  useEffect(() => {
    if (selected) editor.current?.focus();
  }, [selected]);

  function update(draft: VocabularyDraft) {
    setEntries(previous => previous.map(item => item.id === draft.id ? draft : item));
  }

  return (
    <AdminPageShell
      title="Dictionary Management"
      description="Review and edit sample vocabulary entries used in the digital dictionary."
      notice="Administrator preview. All vocabulary is unverified demonstration data. Edits are temporary."
      sectionTitle="Vocabulary workspace"
      count={`${entries.length} entries`}
      panelId="dictionary-panel-title"
    >
      <section className={styles.section} aria-labelledby="dictionary-entries-title">
        <h2 id="dictionary-entries-title">Vocabulary entries</h2>
        <div className={styles.filters}>
          <label>Search vocabulary<input type="search" value={query} onChange={event => setQuery(event.target.value)} /></label>
          <label>Category<select value={category} onChange={event => setCategory(event.target.value)}>
            <option value="">All categories</option>
            {categories.map(value => <option key={value}>{value}</option>)}
          </select></label>
        </div>
        <VocabularyTable entries={matches} selected={selected} onSelect={id => {
          if (id === selected) editor.current?.focus();
          else setSelected(id);
        }} />
      </section>
      {entry && <VocabularyEditor key={entry.id} entry={entry} entries={entries} heading={editor} onUpdate={update} />}
      <SuggestionReview />
    </AdminPageShell>
  );
}
