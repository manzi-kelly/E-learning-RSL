import styles from "./Discussions.module.css";

export default function Discussions() {
  return (
    <section className={styles.section} aria-labelledby="community-discussions">
      <h2 id="community-discussions">Community discussions</h2>
      <div>
        <p>A planned space for learners to exchange questions and ideas about Rwanda Sign Language.</p>
        <p className={styles.status}>Discussion features are awaiting Management approval and backend implementation.</p>
      </div>
    </section>
  );
}
