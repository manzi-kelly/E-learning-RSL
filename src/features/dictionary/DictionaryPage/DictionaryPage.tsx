import VocabularySuggestion from "../Suggestions/VocabularySuggestion";
import DictionaryBrowser from "./DictionaryBrowser";
import styles from "./DictionaryPage.module.css";

export default function DictionaryPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>RSL-ELP · Vocabulary</p>
          <h1>Rwanda Sign Language <em>Digital Dictionary</em></h1>
          <p>Search vocabulary or browse by letter and category. The entries below are interface samples awaiting approved explanations and sign demonstrations.</p>
          <a href="#suggest-vocabulary">Suggest vocabulary <span aria-hidden="true">↓</span></a>
        </header>
        <DictionaryBrowser />
        <VocabularySuggestion />
      </div>
    </div>
  );
}
