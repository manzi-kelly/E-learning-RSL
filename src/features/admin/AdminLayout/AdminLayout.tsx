import type { ReactNode } from "react";
import Brand from "../../landing/Brand";
import Sidebar from "../Sidebar/Sidebar";
import AdminNavigation from "./AdminNavigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminNavigation brand={<Brand />} sidebar={<Sidebar />}>{children}</AdminNavigation>;
}
