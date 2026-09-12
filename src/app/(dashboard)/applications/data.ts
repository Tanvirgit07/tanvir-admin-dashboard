export const applications = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1), name: ["Nathan Brooks", "Jessica Wong", "Amelia Grant", "Chris Patel"][i % 4],
  email: ["nathan.brooks", "jessica.wong", "amelia.grant", "chris.patel"][i % 4] + "@email.com",
  date: "2025-07-28", experience: "5 years",
  assessment: ["Passed", "Pending", "Failed", "Failed"][i % 4],
  status: ["Approved", "Under Review", "Rejected", "Pending"][i % 4],
}));
export const badgeClass = (value: string) => value === "Approved" || value === "Passed" ? "border-green-300 bg-green-50 text-green-700" : value === "Rejected" || value === "Failed" ? "border-red-300 bg-red-50 text-red-600" : value === "Under Review" ? "border-sky-300 bg-sky-50 text-sky-700" : "border-amber-300 bg-amber-50 text-amber-700";
