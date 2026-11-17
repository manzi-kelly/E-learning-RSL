import styles from "./BookingGuide.module.css";

const steps = [
  "Select the interpreting service type.",
  "Provide the requested date, time, and location.",
  "Specify your language needs and contact details.",
  "An administrator reviews the request and assigns an interpreter when one is available.",
];

export default function BookingGuide() {
  return (
    <section className={styles.guide} aria-labelledby="booking-guide">
      <div>
        <h2 id="booking-guide">How requests will work</h2>
        <p>This process is planned for when live booking becomes available. Assignment depends on administrator review and interpreter availability.</p>
      </div>
      <ol>{steps.map(step => <li key={step}>{step}</li>)}</ol>
    </section>
  );
}
