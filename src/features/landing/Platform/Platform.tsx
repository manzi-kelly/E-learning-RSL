import Link from "next/link";
import layout from "../Editorial.module.css";
import styles from "./Platform.module.css";
import PlatformMedia from "./PlatformMedia";
import { platformLessons } from "./platformLessonData";

export default function Platform() {
  return (
    <section id="platform" tabIndex={-1} aria-labelledby="platform-title" className={`${layout.section} ${layout.light}`}>
      <div className={layout.inner}>
        <div className={styles.intro}>
          <div>
            <p className={layout.kicker}>Our platform</p>
            <h2 id="platform-title" className={layout.heading}>
              What our platform <em>covers.</em>
            </h2>
          </div>
          <div className={styles.introSide}>
            <p className={layout.copy}>One inclusive space for learning and communicating in Rwanda Sign Language.</p>
            <Link href="/ways-to-learn" className={styles.link}>
              Explore courses <span aria-hidden="true">↘</span>
            </Link>
          </div>
        </div>

        <div className={styles.features}>
          <article className={styles.feature} aria-labelledby="learn-title">
            <PlatformMedia lessons={platformLessons} />
            <h3 id="learn-title">Learn</h3>
            <p>Planned courses built around visual lessons, clear written explanations and practice, so you can learn Rwanda Sign Language step by step.</p>
            <Link href="/ways-to-learn#virtual-lessons" className={styles.link}>Explore Virtual <span aria-hidden="true">↘</span></Link>
          </article>

          <article id="dictionary" tabIndex={-1} className={styles.feature} aria-labelledby="dictionary-title">
            <div className={styles.art} aria-hidden="true"><span className={styles.dictionaryArt}>Aa</span></div>
            <h3 id="dictionary-title">Dictionary</h3>
            <p>Search and browse sample vocabulary by category or alphabet. Verified videos and explanations are awaiting approval.</p>
            <Link href="/ways-to-learn#dictionary" className={styles.link}>Explore Dictionary <span aria-hidden="true">↘</span></Link>
          </article>

          <article id="interpreting" tabIndex={-1} className={styles.feature} aria-labelledby="interpreting-title">
            <div className={styles.art} aria-hidden="true"><span className={styles.interpretingArt} /></div>
            <h3 id="interpreting-title">Interpreting</h3>
            <p>Planned interpreting support for education, healthcare, legal services, events, community activities and workplaces.</p>
            <Link href="/ways-to-learn#interpreting" className={styles.link}>Explore Interpreting <span aria-hidden="true">↘</span></Link>
          </article>
        </div>
      </div>
    </section>
  );
}