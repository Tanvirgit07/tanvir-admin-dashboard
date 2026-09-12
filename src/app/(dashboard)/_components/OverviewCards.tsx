import { BookOpen, BriefcaseBusiness, CreditCard, FileText, ListOrdered, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const overview = [
  { label: "Total Users", value: "6,800+", icon: Users },
  { label: "Pending Applications", value: "12", icon: FileText },
  { label: "Active Courses", value: "5", icon: BookOpen },
  { label: "Active Enrollments", value: "2", icon: ListOrdered },
  { label: "Active Projects", value: "3", icon: BriefcaseBusiness },
  { label: "Total Payments", value: "$10,210", icon: CreditCard },
];

export default function OverviewCards() {
  return (
    <section aria-label="Platform overview" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {overview.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="gap-0 rounded-md border-0 bg-white p-3 text-[#003b3b] shadow-[0px_4px_6px_0px_#0000001A]">
          <div className="mb-3 flex size-8 items-center justify-center rounded-sm bg-[#e8eeee]">
            <Icon className="size-[19px]" strokeWidth={1.7} aria-hidden="true" />
          </div>
          <p className="text-2xl font-semibold leading-none tracking-tight">{value}</p>
          <p className="mt-1.5 text-[10px] leading-4 text-[#7a7f7e]">{label}</p>
        </Card>
      ))}
    </section>
  );
}
