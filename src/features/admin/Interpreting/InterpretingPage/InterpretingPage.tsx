"use client";

import { useEffect, useRef, useState } from "react";
import AdminPageShell from "../../AdminPageShell/AdminPageShell";
import { requests } from "../data/mockRequests";
import RequestsTable from "../RequestsTable/RequestsTable";
import RequestDetails from "../RequestDetails/RequestDetails";

export default function InterpretingPage() {
  const [selected, setSelected] = useState<string>();
  const heading = useRef<HTMLHeadingElement>(null);
  const request = requests.find(item => item.id === selected);

  useEffect(() => {
    if (selected) heading.current?.focus();
  }, [selected]);

  return (
    <AdminPageShell
      title="Interpreting Request Management"
      description="Review sample interpreting requests and assignment details."
      notice="Administrator preview. All request records and contact details are synthetic demonstration data."
      sectionTitle="Interpreting requests"
      count={`${requests.length} requests`}
      panelId="interpreting-panel-title"
    >
      <RequestsTable selected={selected} onSelect={id => {
        if (id === selected) heading.current?.focus();
        else setSelected(id);
      }} />
      {request && <RequestDetails key={request.id} request={request} heading={heading} />}
    </AdminPageShell>
  );
}
