import BookingForm from "../BookingForm/BookingForm";
import BookingGuide from "../BookingGuide/BookingGuide";
import ServiceList from "../ServiceList/ServiceList";
import styles from "./InterpretingPage.module.css";

export default function InterpretingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>RSL-ELP · Communication support</p>
          <h1>Rwanda Sign Language <em>Interpreting Services</em></h1>
          <p className={styles.lead}>Explore the settings for Rwanda Sign Language interpreting assistance and preview how to request support. Live requests and interpreter availability are currently unavailable through this site.</p>
          <a className={styles.action} href="#booking-preview">Preview the request form <span aria-hidden="true">↓</span></a>
        </div>
      </header>
      <div className={styles.inner}>
        <ServiceList />
        <BookingGuide />
        <BookingForm />
      </div>
    </div>
  );
}
