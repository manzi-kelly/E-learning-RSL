import { serviceCategories } from "@/src/features/interpreting/data/serviceCategories";

export const requests = serviceCategories.map((service, index) => ({
  id: `demo-${service.id}`,
  reference: `Demo ${String(index + 1).padStart(2, "0")}`,
  service: service.label,
  date: `2030-06-${String(index + 10).padStart(2, "0")}`,
  time: "10:00",
  location: `Sample venue ${index + 1}`,
  language: "Rwanda Sign Language (sample request)",
  contact: `request-${index + 1}@example.test`,
}));

export type DemoRequest = (typeof requests)[number];
