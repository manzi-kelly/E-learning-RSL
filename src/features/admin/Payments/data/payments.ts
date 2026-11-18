import { courses } from "@/src/features/courses/courseData";

export const statuses = ["Pending", "Completed", "Failed"] as const;
export type PaymentStatus = (typeof statuses)[number];

export type DemoPayment = {
  reference: string; student: string; course: string; amount: number; currency: "RWF";
  method: string; status: PaymentStatus; date: string;
};

export const payments: readonly DemoPayment[] = [
  { reference: "DEMO-P01", student: "Sample Student 01", course: courses[0].title, amount: 5000, currency: "RWF", method: "Mobile money (sample)", status: "Pending", date: "2026-01-10" },
  { reference: "DEMO-P02", student: "Sample Student 02", course: courses[1].title, amount: 7500, currency: "RWF", method: "Card (sample)", status: "Completed", date: "2026-01-11" },
  { reference: "DEMO-P03", student: "Sample Student 03", course: courses[2].title, amount: 9000, currency: "RWF", method: "Mobile money (sample)", status: "Failed", date: "2026-01-12" },
];

export function paymentFields(payment: DemoPayment) {
  return [
    ["Payment reference", payment.reference], ["Student", payment.student], ["Course", payment.course],
    ["Amount", `${payment.currency} ${payment.amount.toLocaleString("en-US")}`],
    ["Method", payment.method], ["Status", payment.status], ["Payment date", payment.date],
  ] as const;
}
