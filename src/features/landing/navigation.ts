export const navigation = [
  { id: "home", label: "Home" },
  { id: "platform", label: "Platform" },
  { id: "courses", label: "Courses", route: "/courses" },
  { id: "dictionary", label: "Dictionary", route: "/dictionary" },
  { id: "interpreting", label: "Interpreting", route: "/interpreting" },
  { id: "learning-journey", label: "Learning Journey" },
  { id: "accessibility", label: "Accessibility" },
] as const;

export type LandingSection = (typeof navigation)[number]["id"];
