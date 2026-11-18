import { requests } from "../data/mockRequests";
import styles from "./RequestsTable.module.css";

export default function RequestsTable({ selected, onSelect }: { selected?: string; onSelect: (id: string) => void }) {
  return (
    <section className={styles.section} aria-labelledby="requests-heading">
      <h2 id="requests-heading">Demonstration requests</h2>
      <p id="requests-table-hint">Scroll the table to see additional columns on narrow screens.</p>
      <div className={styles.scroll} role="region" aria-label="Scrollable request table" aria-describedby="requests-table-hint" tabIndex={0}>
        <table>
          <thead><tr>
            <th scope="col">Request</th><th scope="col">Service type</th><th scope="col">Date</th><th scope="col">Time</th>
            <th scope="col">Location</th><th scope="col">Language needs</th><th scope="col">Contact details</th>
          </tr></thead>
          <tbody>{requests.map(request => <tr key={request.id}>
            <th scope="row"><button type="button" className={styles.button} aria-label={`${request.reference}: Inspect request: ${request.service}`}
              aria-current={request.id === selected ? "true" : undefined} onClick={() => onSelect(request.id)}>
              {request.reference}
            </button></th>
            <td>{request.service}</td><td><time dateTime={request.date}>{request.date}</time></td>
            <td><time dateTime={request.time}>{request.time}</time></td><td>{request.location}</td>
            <td>{request.language}</td><td>{request.contact}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
