"use client";

import { useRef, useEffect, useState } from "react";
import AdminPageShell from "../../AdminPageShell/AdminPageShell";
import PreviewTable from "../../PreviewTable/PreviewTable";
import { payments, paymentFields, statuses, type DemoPayment } from "../data/payments";
import PaymentDetails from "../PaymentDetails/PaymentDetails";
import styles from "./PaymentsPage.module.css";

export default function PaymentsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<DemoPayment>();
  const heading = useRef<HTMLHeadingElement>(null);
  const matches = payments.filter(payment => (!status || status === payment.status) &&
    [payment.reference, payment.student, payment.course].some(text => text.toLowerCase().includes(query.trim().toLowerCase())));
  useEffect(() => { if (selected) heading.current?.focus(); }, [selected]);

  return (
    <AdminPageShell
      title="Payments Management"
      description="Review sample payment records, amounts and statuses."
      notice="Demonstration records only. Amounts, dates, and statuses are illustrative. No payment processing is connected."
      sectionTitle="Payments workspace"
      count={`${matches.length} of ${payments.length} records`}
      panelId="payments-panel-title"
    >
      <section className={styles.section} aria-labelledby="payment-records">
        <h2 id="payment-records">Payment records</h2>
        <div className={styles.filters}>
          <label htmlFor="payment-search">Search payments<input id="payment-search" type="search" value={query} onChange={event => setQuery(event.target.value)} /></label>
          <label htmlFor="payment-status">Payment status<select id="payment-status" value={status} onChange={event => setStatus(event.target.value)}>
            <option value="">All statuses</option>{statuses.map(value => <option key={value}>{value}</option>)}
          </select></label>
        </div>
        <p role="status">{matches.length ? `${matches.length} matching payment records` : "No matching payments."}</p>
        {matches.length > 0 && <PreviewTable title="Demonstration payments" columns={[...paymentFields(payments[0]).map(([label]) => label), "Action"]}
          rows={matches.map(payment => ({ id: payment.reference, cells: [...paymentFields(payment).map(([, value]) => value),
            <button key="action" className={styles.button} type="button" aria-label={`View details: ${payment.reference}`} onClick={() => {
              if (selected === payment) heading.current?.focus(); else setSelected(payment);
            }}>View details</button>,
          ] }))} />}
      </section>
      {selected && <PaymentDetails payment={selected} heading={heading} />}
    </AdminPageShell>
  );
}
