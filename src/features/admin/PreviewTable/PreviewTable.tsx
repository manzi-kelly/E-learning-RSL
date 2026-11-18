import type { ReactNode } from "react";
import styles from "./PreviewTable.module.css";

export default function PreviewTable({ title, columns, rows }: {
  title: string;
  columns: readonly string[];
  rows: readonly { id: string; cells: readonly ReactNode[] }[];
}) {
  return (
    <div className={styles.scroll} role="region" aria-label={title} tabIndex={0}>
      <table aria-label={title}>
        <thead><tr>{columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
        <tbody>{rows.map(({ id, cells }) => (
          <tr key={id}>
            <th scope="row">{cells[0]}</th>
            {cells.slice(1).map((cell, index) => <td key={columns[index + 1]}>{cell}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
