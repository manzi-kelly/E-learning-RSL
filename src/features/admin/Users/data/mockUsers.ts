import type { DemoUser, Role } from "../types/user";

export const mockUsers: readonly DemoUser[] = [
  { id: "demo-student-01", name: "Sample Student 01", email: "student-01@example.test", role: "Student", status: "Active" },
  { id: "demo-student-02", name: "Sample Student 02", email: "student-02@example.test", role: "Student", status: "Inactive" },
  { id: "demo-instructor-01", name: "Sample Instructor 01", email: "instructor-01@example.test", role: "Instructor", status: "Active" },
  { id: "demo-administrator-01", name: "Sample Administrator 01", email: "administrator-01@example.test", role: "Administrator", status: "Active" },
];

export const permissions: Record<Role, readonly string[]> = {
  Student: ["Enroll in available courses", "Access lessons and learning materials", "Complete quizzes", "Track course progress", "View certificates", "View payment history"],
  Instructor: ["Manage assigned courses", "Upload lesson materials", "Prepare quizzes and assessments", "Monitor student learning progress"],
  Administrator: ["Manage users and permissions", "Manage courses and learning content", "Manage digital dictionary entries", "Review interpreting requests", "Assign interpreters", "Manage payments and certificates", "Manage website content", "View reports and activity"],
};

