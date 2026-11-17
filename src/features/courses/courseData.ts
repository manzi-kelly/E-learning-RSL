export const courses = [
  {
    id: "beginner",
    title: "Beginner Rwanda Sign Language",
    level: "Beginner",
    objective: "Build a foundation in everyday expressions and introductory sign language concepts.",
  },
  {
    id: "intermediate",
    title: "Intermediate Rwanda Sign Language",
    level: "Intermediate",
    objective: "Develop vocabulary and conversational confidence through structured practice.",
  },
  {
    id: "advanced",
    title: "Advanced Rwanda Sign Language",
    level: "Advanced",
    objective: "Explore more complex communication situations and advanced learning topics.",
  },
  {
    id: "parents-and-families",
    title: "RSL for Parents and Families",
    level: "Specialized",
    objective: "Support inclusive everyday communication among family members.",
  },
  {
    id: "teachers-and-educators",
    title: "RSL for Teachers and Educators",
    level: "Specialized",
    objective: "Explore communication approaches relevant to inclusive education.",
  },
  {
    id: "professionals",
    title: "RSL for Professionals",
    level: "Specialized",
    objective: "Explore accessible professional communication and workplace vocabulary.",
  },
] as const;

export type Course = (typeof courses)[number];

export function findCourse(id: string) {
  return courses.find((course) => course.id === id);
}
