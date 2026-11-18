import Link from "next/link";
import { entries } from "../../dictionary/data/dictionaryData";
import { serviceCategories } from "../../interpreting/data/serviceCategories";
import styles from "./WaysToLearnPage.module.css";

const options = [
  { href: "#virtual-lessons", number: "01", label: "Virtual lessons", hint: "Learn by watching" },
  { href: "#dictionary", number: "02", label: "Dictionary", hint: "Look up signs" },
  { href: "#interpreting", number: "03", label: "Interpreting", hint: "Communicate with support" },
];

export default function WaysToLearnPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>RSL-ELP · Learning options</p>
          <h1>
            Three ways to learn <em>Rwanda Sign Language.</em>
          </h1>
          <p className={styles.lead}>
            Choose the option that fits you. Each one uses clear visual communication, written explanations
            in English, and content that works without sound.
          </p>
          <nav className={styles.jump} aria-label="Learning options">
            {options.map((option) => (
              <a key={option.href} href={option.href} className={styles.jumpCard}>
                <span className={styles.jumpNumber}>{option.number}</span>
                <span className={styles.jumpText}>
                  <strong>{option.label}</strong>
                  <small>{option.hint}</small>
                </span>
                <span className={styles.jumpArrow} aria-hidden="true">↓</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className={styles.inner}>
        <section
          id="virtual-lessons"
          tabIndex={-1}
          aria-labelledby="virtual-lessons-title"
          className={styles.option}
        >
          <div className={styles.optionHead}>
            <p className={styles.index}>01 · Learn</p>
            <h2 id="virtual-lessons-title">Virtual lessons</h2>
            <p className={styles.tagline}>Short, captioned video lessons at your own pace.</p>
          </div>
          <div className={styles.optionBody}>
            <p className={styles.intro}>
              Virtual lessons are short, captioned video demonstrations you can follow at your own pace.
              Each lesson shows a sign clearly, repeats it from different angles, and pairs it with a
              written explanation. You learn through what you can see and read, not through audio alone.
            </p>
            <ol className={styles.steps}>
              <li>
                <div>
                  <strong>Watch</strong>
                  <p>See the sign demonstrated on video with captions and a written guide.</p>
                </div>
              </li>
              <li>
                <div>
                  <strong>Practise</strong>
                  <p>Pause, repeat and copy the sign. Short practice tasks help you remember it.</p>
                </div>
              </li>
              <li>
                <div>
                  <strong>Review</strong>
                  <p>Return to any lesson and follow your progress as you move through a course.</p>
                </div>
              </li>
            </ol>
            <p className={styles.note}>
              Courses and enrolment are planned. Approved lesson videos will be published when they are ready.
            </p>
            <Link className={styles.action} href="/courses">
              Browse the courses <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section id="dictionary" tabIndex={-1} aria-labelledby="dictionary-title" className={styles.option}>
          <div className={styles.optionHead}>
            <p className={styles.index}>02 · Vocabulary</p>
            <h2 id="dictionary-title">Dictionary</h2>
            <p className={styles.tagline}>Everyday signs by word, letter or topic.</p>
          </div>
          <div className={styles.optionBody}>
            <p className={styles.intro}>
              The dictionary helps you look up everyday signs by word, letter or topic. Every entry keeps its
              word, category, short explanation and detail page. Approved sign videos are still awaited, but
              no vocabulary has been removed.
            </p>
            <ul className={styles.entries} role="list">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <p className={styles.entryCategory}>{entry.category}</p>
                  <h3>{entry.word}</h3>
                  <p className={styles.entryDescription}>{entry.description}</p>
                  <Link href={`/dictionary/${entry.id}`}>
                    View entry <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link className={styles.action} href="/dictionary">
              Open the full dictionary <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section id="interpreting" tabIndex={-1} aria-labelledby="interpreting-title" className={styles.option}>
          <div className={styles.optionHead}>
            <p className={styles.index}>03 · Communication support</p>
            <h2 id="interpreting-title">Interpreting</h2>
            <p className={styles.tagline}>Accessible conversations between Deaf and hearing people.</p>
          </div>
          <div className={styles.optionBody}>
            <p className={styles.intro}>
              Interpreting makes conversations accessible between Deaf and hearing people. A Rwanda Sign
              Language interpreter supports communication in everyday settings, so everyone can take part
              and be understood.
            </p>
            <ul className={styles.points} role="list">
              {serviceCategories.map((category) => (
                <li key={category.id}>
                  <h3>{category.label}</h3>
                  <p>{category.description}</p>
                </li>
              ))}
            </ul>
            <p className={styles.note}>
              Live requests and interpreter availability are not yet active on this site.
            </p>
            <Link className={styles.action} href="/interpreting">
              Explore interpreting services <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className={styles.next}>
          <div className={styles.nextCard}>
            <h2>Start with the option that fits you.</h2>
            <p>
              You can move between all three. Begin with a lesson, check a word in the dictionary, or learn
              where interpreting support can help.
            </p>
            <Link className={styles.nextAction} href="/courses">
              See the courses <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}