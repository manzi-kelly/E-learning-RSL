import type { Ref } from "react";
import { paymentFields, type DemoPayment } from "../data/payments";
import styles from "./PaymentDetails.module.css";

export default function PaymentDetails({ payment, heading }: { payment: DemoPayment; heading: Ref<HTMLHeadingElement> }) {
  return (
    <section className={styles.section} aria-labelledby="payment-details">
      <h2 id="payment-details" tabIndex={-1} ref={heading}>Payment details · {payment.reference}</h2>
      <p>Read-only demonstration. No funds changed hands.</p>
      <dl className={styles.details}>{paymentFields(payment).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </section>
  );
}
