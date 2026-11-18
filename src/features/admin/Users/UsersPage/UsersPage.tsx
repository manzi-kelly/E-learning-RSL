"use client";

import { useEffect, useRef, useState } from "react";
import AdminPageShell from "../../AdminPageShell/AdminPageShell";
import { mockUsers } from "../data/mockUsers";
import type { DemoUser, UserInput } from "../types/user";
import PermissionOverview from "../PermissionOverview/PermissionOverview";
import UserDetails from "../UserDetails/UserDetails";
import UserEditor from "../UserEditor/UserEditor";
import UserFilters from "../UserFilters/UserFilters";
import UserTable from "../UserTable/UserTable";
import styles from "./UsersPage.module.css";

type View = { mode: "directory" | "add" } | { mode: "details" | "edit"; id: string };

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [view, setView] = useState<View>({ mode: "directory" });
  const [feedback, setFeedback] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const didNavigate = useRef(false);
  const sequence = useRef(0);
  const selected = "id" in view ? users.find(user => user.id === view.id) : undefined;
  const term = query.trim().toLowerCase();
  const matches = users.filter(user => (!role || role === user.role) && (!status || status === user.status)
    && [user.name, user.email].some(value => value.toLowerCase().includes(term)));

  useEffect(() => {
    if (didNavigate.current) heading.current?.focus();
  }, [view]);

  function navigate(next: View) {
    didNavigate.current = true;
    setFeedback("");
    setView(next);
  }

  function apply(input: UserInput) {
    const existing = view.mode === "edit" ? selected : undefined;
    const record: DemoUser = existing
      ? { ...existing, ...input }
      : { ...input, id: `local-preview-${++sequence.current}`, status: "Preview" };

    setUsers(previous => existing ? previous.map(user => user.id === record.id ? record : user) : [...previous, record]);
    navigate({ mode: "details", id: record.id });
    setFeedback(existing
      ? "Local preview updated. No account or security permissions were changed."
      : "Local preview record added. No account was created on the platform.");
  }

  return (
    <AdminPageShell
      title="User Management"
      description="Manage platform users and review their assigned roles and permissions."
      notice="Administrator preview — user changes are temporary and are not saved to the platform."
      sectionTitle="User management workspace"
      count={view.mode === "directory" ? `${matches.length} of ${users.length} users` : `${users.length} preview users`}
      panelId="users-panel-title"
    >
      <p className={styles.feedback} role="status">{feedback}</p>
      {view.mode === "directory" && (
        <section className={styles.section} aria-labelledby="users-directory">
          <div className={styles.directoryHeading}>
            <h2 id="users-directory" tabIndex={-1} ref={heading}>User directory</h2>
            <button className={styles.button} type="button" onClick={() => navigate({ mode: "add" })}>Add User Preview</button>
          </div>
          <p>All records below are synthetic. Account statuses are illustrative.</p>
          <UserFilters query={query} role={role} status={status} onQuery={setQuery} onRole={setRole} onStatus={setStatus}
            onClear={() => { setQuery(""); setRole(""); setStatus(""); }} />
          <UserTable users={matches} onSelect={id => navigate({ mode: "details", id })} />
        </section>
      )}
      {view.mode === "details" && selected && (
        <UserDetails user={selected} heading={heading} onBack={() => navigate({ mode: "directory" })}
          onEdit={() => navigate({ mode: "edit", id: selected.id })} />
      )}
      {(view.mode === "add" || (view.mode === "edit" && selected)) && (
        <UserEditor key={selected?.id ?? "new"} user={selected} heading={heading}
          otherEmails={users.filter(user => user.id !== selected?.id).map(user => user.email)}
          onApply={apply} onCancel={() => navigate(selected ? { mode: "details", id: selected.id } : { mode: "directory" })} />
      )}
      <PermissionOverview />
    </AdminPageShell>
  );
}
