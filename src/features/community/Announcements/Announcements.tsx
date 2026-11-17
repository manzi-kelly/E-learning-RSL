import styles from "./Announcements.module.css";

export default function Announcements() {
  return (
    <section className={styles.section} aria-labelledby="community-announcements">
      <h2 id="community-announcements">Announcements</h2>
      <p>Community announcements will appear here when published by RSL-ELP Management.</p>
    </section>
  );
}
