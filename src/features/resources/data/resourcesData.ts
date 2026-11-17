import type { PlannedResource, ResourceFormat } from "../types/resource";

export const resourceFormats: readonly ResourceFormat[] = ["Guides", "Videos", "Practice materials"];

export const resources: readonly PlannedResource[] = [
  {
    id: "guides",
    title: "Learning guides and written lesson references",
    format: "Guides",
    description: "Written references and study notes to support review and practice alongside lessons.",
    availability: "awaiting-publication",
  },
  {
    id: "videos",
    title: "Captioned sign-language demonstration videos",
    format: "Videos",
    description: "Rwanda Sign Language demonstrations planned with captions and accompanying written explanations.",
    availability: "awaiting-publication",
  },
  {
    id: "practice",
    title: "Practice materials and downloadable learning support",
    format: "Practice materials",
    description: "Worksheets and supporting study materials for independent practice. Downloads depend on publication permission.",
    availability: "awaiting-publication",
  },
];

export const availabilityLabels: Record<PlannedResource["availability"], string> = {
  "awaiting-publication": "Learning material awaiting approval and publication.",
};
