export const navigation = [
  { id: "home", label: "Home" },
  { id: "platform", label: "Platform" },
  { id: "courses", label: "Courses" },
  { id: "learning-journey", label: "Learning Journey" },
  { id: "accessibility", label: "Accessibility" },
  { id: "about", label: "About us", route: "/about-us" },
] as const;

export type LandingSection = (typeof navigation)[number]["id"];
