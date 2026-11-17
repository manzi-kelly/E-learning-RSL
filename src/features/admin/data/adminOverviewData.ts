import type { AdminModule, OverviewArea } from "../types/admin";

export const plannedModules: readonly AdminModule[] = ["Users", "Dictionary", "Interpreting", "Payments", "Certificates", "Content", "Reports"];

export const overviewAreas: readonly OverviewArea[] = [
  { title: "Users and permissions", description: "Manage user accounts and role permissions." },
  { title: "Course administration", description: "Manage courses, lessons, and sign-language videos." },
  { title: "Dictionary management", description: "Manage dictionary entries, explanations, sign demonstrations, and vocabulary suggestions." },
  { title: "Interpreting requests", description: "Review interpreting requests and assign interpreters." },
  { title: "Payments and certificates", description: "Oversee payments and certificates." },
  { title: "Website content", description: "Manage blog posts, news, and website announcements." },
  { title: "Reports and activity", description: "View reports and website activity across the platform." },
];
