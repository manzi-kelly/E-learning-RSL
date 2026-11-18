import type { Ref } from "react";
import { permissions } from "../data/mockUsers";
import type { DemoUser } from "../types/user";
import styles from "./UserDetails.module.css";

export default function UserDetails({ user, heading, onBack, onEdit }: {
  user: DemoUser; heading: Ref<HTMLHeadingElement>; onBack: () => void; onEdit: () => void;
}) {
  return (
    <section className={styles.section} aria-labelledby="user-details">
      <h2 id="user-details" tabIndex={-1} ref={heading}>User details</h2>
      <p>Demonstration record. Account status and role are illustrative.</p>
      <dl className={styles.details}>
        <div><dt>Full name</dt><dd>{user.name}</dd></div>
        <div><dt>Email address</dt><dd>{user.email}</dd></div>
        <div><dt>Assigned role</dt><dd>{user.role}</dd></div>
        <div><dt>Account status</dt><dd>{user.status}</dd></div>
      </dl>
      <h3>{user.role} responsibilities</h3>
      <ul>{permissions[user.role].map(permission => <li key={permission}>{permission}</li>)}</ul>
      <div className={styles.actions}>
        <button className={styles.button} type="button" onClick={onEdit}>Edit User Preview</button>
        <button className={styles.back} type="button" onClick={onBack}>Return to user directory</button>
      </div>
    </section>
  );
}

