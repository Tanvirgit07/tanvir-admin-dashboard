export interface ManagedUser {
  id: string;
  name: string;
  type: "Bookkeeper" | "Business Owner";
  email: string;
  joined: string;
  status: "Active" | "Pending" | "Suspended";
  image?: string;
}

const names = ["Nathan Brooks", "Jessica Wong", "Amelia Grant", "Chris Patel", "Olivia Carter", "James Wilson", "Sophia Lee", "Daniel Harris", "Emma Davis", "Liam Thomas", "Ava Martinez", "Noah Clark"];
export const initialUsers: ManagedUser[] = names.map((name, index) => ({
  id: `user-${index + 1}`,
  name,
  type: index % 3 === 0 ? "Bookkeeper" : "Business Owner",
  email: `${name.toLowerCase().replaceAll(" ", ".")}@email.com`,
  joined: "2025-07-28",
  status: (["Active", "Pending", "Suspended", "Pending"] as const)[index % 4],
}));

export const statusStyles = {
  Active: "border-[#A0CE97] bg-[#EFFFEB] text-[#328335]",
  Pending: "border-[#D4BD7F] bg-[#FFF3C4] text-[#96742A]",
  Suspended: "border-[#FF9F94] bg-[#FFE0DA] text-[#F04438]",
};

export function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}
