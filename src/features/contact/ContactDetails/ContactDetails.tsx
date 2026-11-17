import styles from "./ContactDetails.module.css";

const details = [
  ["Location", "Rwanda"],
  ["Official email", "Awaiting Management confirmation"],
  ["Official telephone", "Awaiting Management confirmation"],
  ["Operating hours", "Awaiting Management confirmation"],
];

export default function ContactDetails() {
  return (
    <section className={styles.details} aria-labelledby="contact-details-title">
      <h2 id="contact-details-title">Contact details</h2>
      <dl>
        {details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
    </section>
  );
}
