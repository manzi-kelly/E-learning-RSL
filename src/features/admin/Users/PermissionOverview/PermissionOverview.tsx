import { permissions } from "../data/mockUsers";
import { roles } from "../types/user";
import styles from "./PermissionOverview.module.css";

export default function PermissionOverview() {
  return (
    <section className={styles.section} aria-labelledby="permissions-overview">
      <h2 id="permissions-overview">Role &amp; permission overview</h2>
      <p>These responsibilities are informational. Actual role-based access control requires backend implementation.</p>
      {roles.map(role => (
        <div className={styles.row} key={role}>
          <h3>{role}</h3>
          <ul>{permissions[role].map(permission => <li key={permission}>{permission}</li>)}</ul>
        </div>
      ))}
    </section>
  );
}

