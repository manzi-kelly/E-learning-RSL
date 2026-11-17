import type { ServiceCategory } from "../types/interpreting";

export const serviceCategories = [
  { id: "education", label: "Education", description: "Interpreting needs in classrooms, training, and other learning settings." },
  { id: "healthcare", label: "Healthcare", description: "Communication during healthcare visits and discussions." },
  { id: "legal", label: "Legal services", description: "Communication in legal appointments and proceedings." },
  { id: "conferences", label: "Conferences and meetings", description: "Communication in presentations, meetings, and group discussions." },
  { id: "community", label: "Churches and community activities", description: "Communication during worship, gatherings, and community activities." },
  { id: "workplaces", label: "Workplaces and public services", description: "Communication in workplace discussions and public service interactions." },
] as const satisfies readonly ServiceCategory[];
