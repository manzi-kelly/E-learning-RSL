export const areas = ["Users", "Courses", "Interpreting", "Certificates", "Payments"] as const;

export type ActivityArea = (typeof areas)[number];
export type DemoActivity = { id: string; area: ActivityArea; date: string; description: string };

export const activity: readonly DemoActivity[] = [
  { id: "DEMO-A01", area: "Users", date: "2026-01-12", description: "Sample user activity record." },
  { id: "DEMO-A02", area: "Courses", date: "2026-01-12", description: "Sample course administration record." },
  { id: "DEMO-A03", area: "Interpreting", date: "2026-01-13", description: "Sample interpreting request review record." },
  { id: "DEMO-A04", area: "Certificates", date: "2026-01-14", description: "Sample certificate oversight record." },
  { id: "DEMO-A05", area: "Payments", date: "2026-01-15", description: "Sample payment oversight record." },
  { id: "DEMO-A06", area: "Courses", date: "2026-01-16", description: "Sample learning material review record." },
];
