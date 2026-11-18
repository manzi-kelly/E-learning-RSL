import type { Ref } from "react";
import type { DemoRequest } from "../data/mockRequests";
import InterpreterAssignment from "../InterpreterAssignment/InterpreterAssignment";
import styles from "./RequestDetails.module.css";

export default function RequestDetails({ request, heading }: { request: DemoRequest; heading: Ref<HTMLHeadingElement> }) {
  return (
    <section className={styles.section} aria-labelledby="request-details-heading">
      <h2 id="request-details-heading" ref={heading} tabIndex={-1}>Request details · {request.reference}</h2>
      <dl className={styles.details}>
        <div><dt>Service type</dt><dd>{request.service}</dd></div>
        <div><dt>Requested date</dt><dd><time dateTime={request.date}>{request.date}</time></dd></div>
        <div><dt>Requested time</dt><dd><time dateTime={request.time}>{request.time}</time></dd></div>
        <div><dt>Location</dt><dd>{request.location}</dd></div>
        <div><dt>Language needs</dt><dd>{request.language}</dd></div>
        <div><dt>Contact details</dt><dd>{request.contact}</dd></div>
      </dl>
      <InterpreterAssignment />
    </section>
  );
}
