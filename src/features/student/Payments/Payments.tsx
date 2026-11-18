import { paymentRecords } from "../data/mockStudentData";
import ui from "../LearningContent.module.css";
import styles from "./Payments.module.css";

const formatAmount = (currency: string, amount: number) =>
  `${currency} ${amount.toLocaleString("en-US")}`;

function statusTone(status: string) {
  const value = status.toLowerCase();
  if (/(paid|complete|success|confirm)/.test(value)) return styles.statusSuccess;
  if (/(pending|process|await)/.test(value)) return styles.statusPending;
  if (/(fail|declin|refund|cancel|overdue)/.test(value)) return styles.statusAlert;
  return "";
}

export default function Payments() {
  const totalsByCurrency = paymentRecords.reduce<Record<string, number>>((acc, record) => {
    acc[record.currency] = (acc[record.currency] ?? 0) + record.amount;
    return acc;
  }, {});

  return (
    <div className={ui.page}>
      <header className={styles.header}>
        <h1>Payment History</h1>
        <p className={styles.intro}>
          Sample transactions for the fictional learner. Amounts and statuses are illustrative.
        </p>
      </header>

      {paymentRecords.length === 0 ? (
        <div className={styles.empty}>
          <h2>No transactions yet</h2>
          <p>No sample transactions are available.</p>
        </div>
      ) : (
        <>
          <dl className={styles.summary}>
            <div>
              <dt>Sample transactions</dt>
              <dd>{paymentRecords.length}</dd>
            </div>
            <div>
              <dt>Sample amount total</dt>
              <dd>
                {Object.entries(totalsByCurrency).map(([currency, amount]) => (
                  <span key={currency} className={styles.total}>
                    {formatAmount(currency, amount)}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <ul role="list" className={`${ui.rows} ${styles.list}`}>
            {paymentRecords.map(record => (
              <li key={record.reference} className={styles.record}>
                <h2>{record.course}</h2>
                <dl className={styles.details}>
                  <div>
                    <dt>Payment reference</dt>
                    <dd className={styles.reference}>{record.reference}</dd>
                  </div>
                  <div>
                    <dt>Amount</dt>
                    <dd className={styles.amount}>
                      {formatAmount(record.currency, record.amount)}
                    </dd>
                  </div>
                  <div>
                    <dt>Method</dt>
                    <dd>{record.method}</dd>
                  </div>
                  <div>
                    <dt>Sample payment date</dt>
                    <dd>
                      <time dateTime={record.date}>{record.date}</time>
                    </dd>
                  </div>
                  <div>
                    <dt>Sample status</dt>
                    <dd>
                      <span className={`${styles.status} ${statusTone(record.status)}`}>
                        {record.status}
                      </span>
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}