import ContactDetails from "../ContactDetails/ContactDetails";
import ContactForm from "../ContactForm/ContactForm";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div className={styles.inner}>
          <h1>Contact <em>RSL-ELP</em></h1>
          <p>Get in touch with RSL-ELP Management for information about Rwanda Sign Language learning and platform services.</p>
        </div>
      </header>
      <div className={`${styles.inner} ${styles.columns}`}>
        <ContactDetails />
        <ContactForm />
      </div>
    </div>
  );
}
