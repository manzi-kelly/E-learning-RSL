export type ResourceFormat = "Guides" | "Videos" | "Practice materials";

export type PlannedResource = {
  id: string;
  title: string;
  format: ResourceFormat;
  description: string;
  availability: "awaiting-publication";
};
