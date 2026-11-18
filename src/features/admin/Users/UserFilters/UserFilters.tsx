import { roles, statuses } from "../types/user";
import styles from "./UserFilters.module.css";

type Props = {
  query: string; role: string; status: string;
  onQuery: (value: string) => void;
  onRole: (value: string) => void;
  onStatus: (value: string) => void;
  onClear: () => void;
};

export default function UserFilters({ query, role, status, onQuery, onRole, onStatus, onClear }: Props) {
  return (
    <div className={styles.filters} role="search" aria-label="User directory filters">
      <label htmlFor="users-search">Search by name or email
        <input id="users-search" type="search" value={query} onChange={event => onQuery(event.target.value)} />
      </label>
      <label htmlFor="users-role-filter">Role filter
        <select id="users-role-filter" value={role} onChange={event => onRole(event.target.value)}>
          <option value="">All roles</option>{roles.map(item => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label htmlFor="users-status-filter">Account status filter
        <select id="users-status-filter" value={status} onChange={event => onStatus(event.target.value)}>
          <option value="">All statuses</option>{statuses.map(item => <option key={item}>{item}</option>)}
        </select>
      </label>
      <button className={styles.button} type="button" onClick={onClear}>Clear filters</button>
    </div>
  );
}

