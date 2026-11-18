import PreviewTable from "../../PreviewTable/PreviewTable";
import type { DemoUser } from "../types/user";
import styles from "./UserTable.module.css";

export default function UserTable({ users, onSelect }: { users: readonly DemoUser[]; onSelect: (id: string) => void }) {
  return (
    <div className={styles.table}>
      <p role="status">{users.length ? `${users.length} matching ${users.length === 1 ? "user" : "users"}` : "No matching users. Change or clear the filters."}</p>
      {users.length > 0 && (
        <PreviewTable title="Demonstration user records" columns={["Full name", "Email address", "Assigned role", "Account status", "Action"]}
          rows={users.map(user => ({ id: user.id, cells: [user.name, user.email, user.role, user.status,
            <button className={styles.button} key="action" type="button" aria-label={`View details: ${user.name}, ${user.email}`}
              onClick={() => onSelect(user.id)}>View details</button>,
          ] }))} />
      )}
    </div>
  );
}

