export type DemoAccount = {
  role: string;
  email: string;
  password: string;
  href: string;
  aliases?: readonly string[];
};

export const demoPassword = "demo1234";

const acceptedPasswords = [demoPassword, "demo 1234"] as const;

export const demoAccounts: readonly DemoAccount[] = [
  { role: "Student", email: "student@rsl.test", password: demoPassword, href: "/student" },
  { role: "Instructor", email: "instructor@rsl.test", password: demoPassword, href: "/instructor" },
  {
    role: "Administrator",
    email: "admin@rsl.test",
    password: demoPassword,
    href: "/admin",
    aliases: ["administrator@rsl.test"],
  },
];

export function findDemoAccount(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  if (!acceptedPasswords.includes(password as (typeof acceptedPasswords)[number])) return undefined;

  return demoAccounts.find(
    account => account.email === normalized || account.aliases?.includes(normalized)
  );
}
