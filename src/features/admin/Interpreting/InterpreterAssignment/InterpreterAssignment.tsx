import { useState } from "react";
import styles from "./InterpreterAssignment.module.css";

export default function InterpreterAssignment() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className={styles.assignment} aria-labelledby="assignment-heading">
      <h3 id="assignment-heading">Interpreter assignment</h3>
      <button className={styles.button} type="button" aria-expanded={expanded} aria-controls="assignment-preview"
        onClick={() => setExpanded(previous => !previous)}>
        {expanded ? "Hide assignment preview" : "Preview interpreter assignment"}
      </button>
      <div id="assignment-preview" hidden={!expanded}>
        <p>In the planned workflow, an administrator reviews the request and checks interpreter availability before assigning someone.</p>
        <p>No interpreter has been assigned. No booking has been confirmed and no notification has been sent.</p>
      </div>
    </section>
  );
}
