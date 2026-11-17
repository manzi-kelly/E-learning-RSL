import layout from "../Editorial.module.css";
import styles from "./Accessibility.module.css";

export default function Accessibility() {
  return (
    <section id="accessibility" tabIndex={-1} aria-labelledby="accessibility-title" className={`${layout.section} ${layout.dark} ${styles.section}`}>
      <div className={`${layout.inner} ${layout.split}`}>
        <div>
          <p className={layout.kicker}>Inclusion by design</p>
          <h2 id="accessibility-title" className={layout.heading}>Because communication belongs to <em>everyone.</em></h2>
          <p className={styles.intro}>RSL-ELP is designed for Deaf and hearing learners, with clear visual communication and keyboard access.</p>
        </div>
        <ul className={`${layout.rows} ${styles.principles}`}>
          <li>Visual Rwanda Sign Language learning</li>
          <li>Captions and written explanations for learning videos</li>
          <li>Keyboard access and readable navigation</li>
          <li>Essential information available without sound or motion</li>
        </ul>
      </div>
    </section>
  );
}
