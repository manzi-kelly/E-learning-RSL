import layout from "../Editorial.module.css";
import SectionMotion from "../SectionMotion";
import styles from "./LearningJourney.module.css";

const steps = [
  ["Create your learning account", "Registration is planned. Accounts are unavailable."],
  ["Choose a course", "Pick a pathway based on your experience and what you want to learn."],
  ["Watch, practise and assess", "The planned lessons pair captioned videos and written explanations with quizzes and progress tracking."],
  ["Celebrate what you've learned", "Certificates are planned for successful completion of eligible courses."],
];

export default function LearningJourney() {
  return (
    <section id="learning-journey" tabIndex={-1} aria-labelledby="journey-title" className={`${layout.section} ${layout.light}`}>
      <div className={`${layout.inner} ${layout.split}`}>
        <div>
          <p className={layout.kicker}>How it works</p>
          <h2 id="journey-title" className={layout.heading}>Learn in a way that works for you.</h2>
          <p className={styles.intro}>See how the planned learning experience takes you from choosing a course to completing it.</p>
        </div>
        <SectionMotion>
          <ol className={styles.steps} role="list">
            {steps.map(([title, description], index) => (
              <li key={title} data-section-reveal>
                <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </SectionMotion>
      </div>
    </section>
  );
}
