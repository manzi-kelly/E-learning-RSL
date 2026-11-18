export const roles = ["Student", "Instructor", "Administrator"] as const;
export const statuses = ["Active", "Inactive", "Preview"] as const;

export type Role = (typeof roles)[number];
export type Status = (typeof statuses)[number];
export type DemoUser = { id: string; name: string; email: string; role: Role; status: Status };
export type UserInput = Pick<DemoUser, "name" | "email" | "role">;

