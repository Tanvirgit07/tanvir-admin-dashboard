"use client";

import { CalendarDays, Globe2, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { initials, statusStyles, type ManagedUser } from "./users";

const dummyDetails = {
  specialty: "E-commerce Specialist",
  country: "Australia",
  lastActive: "2025-08-08",
  platformStatus: [
    { label: "Application", value: "Approved" },
    { label: "Assessment", value: "Passed" },
    { label: "Training", value: "Completed" },
    { label: "Certification", value: "Certified" },
    { label: "Marketplace", value: "Active" },
  ],
  skills: ["QuickBooks", "Xero", "E-commerce", "GST/BAS"],
};

export default function ViewUserDetails({ user, onOpenChange }: {
  user: ManagedUser | null;
  onOpenChange: (open: boolean) => void;
}) {
  const information = user ? [
    { label: "Country", value: dummyDetails.country, icon: Globe2 },
    { label: "Email", value: user.email, icon: Mail },
    { label: "Last Active", value: dummyDetails.lastActive, icon: CalendarDays },
    { label: "Joined", value: user.joined, icon: CalendarDays },
  ] : [];

  return (
    <Dialog open={!!user} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-h-[90dvh] gap-0 overflow-y-auto rounded-lg border-0 bg-[#F8F8F8] p-4 text-[#172B2B] sm:max-w-[575px]">
        <DialogTitle className="sr-only">User details: {user?.name}</DialogTitle>
        <DialogDescription className="sr-only">Profile information, platform status and skills.</DialogDescription>
        {user && <>
          <div className="flex items-center gap-3 border-b border-[#CCD2D1] pb-4">
            <Avatar className="size-[52px] shrink-0">
              <AvatarImage src={user.image} alt={user.name} className="object-cover" />
              <AvatarFallback className="bg-[#DDE9E6] font-semibold text-[#003B3B]">{initials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="mt-1 text-[11px] text-[#8A999C]">{user.type} · {dummyDetails.specialty}</p>
              <span className={cn("mt-1.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-[11px] leading-4", statusStyles[user.status])}>
                <span className="size-1 rounded-full bg-current" aria-hidden="true" />{user.status}
              </span>
            </div>
          </div>

          <dl className="mt-5 grid grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2">
            {information.map(({ label, value, icon: Icon }) => <div key={label} className="min-w-0 rounded-lg bg-white px-3.5 py-2.5 shadow-[2px_4px_7px_#0000000d]">
              <dt className="flex items-center gap-1 text-[11px] text-[#8A999C]"><Icon className="size-3" aria-hidden="true" />{label}</dt>
              <dd className="mt-0.5 break-words text-sm font-medium text-[#222727]">{value}</dd>
            </div>)}
          </dl>

          <section aria-labelledby="platform-status-heading" className="mt-6">
            <h3 id="platform-status-heading" className="text-base font-medium text-[#8A999C]">PLATFORM STATUS</h3>
            <dl className="mt-5 grid grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2">
              {dummyDetails.platformStatus.map(({ label, value }) => <div key={label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-3 shadow-[2px_4px_7px_#0000000d]">
                <dt className="text-[13px] text-[#8A999C]">{label}</dt>
                <dd className="rounded-full border border-[#A0CE97] bg-[#EFFFEB] px-2.5 py-0.5 text-[11px] leading-4 text-[#328335]">{value}</dd>
              </div>)}
            </dl>
          </section>

          <section aria-labelledby="skills-heading" className="mt-6">
            <h3 id="skills-heading" className="text-base font-medium text-[#8A999C]">SKILLS</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {dummyDetails.skills.map((skill) => <li key={skill} className="rounded-sm bg-[#E1E7E7] px-3 py-2 text-[11px] text-[#4D5353]">{skill}</li>)}
            </ul>
          </section>

          <div className="mt-6 flex justify-end">
            <DialogClose asChild>
              <Button className="h-11 min-w-[125px] cursor-pointer rounded-sm bg-[#003B3B] text-sm font-medium text-white hover:bg-[#00504D]">Close</Button>
            </DialogClose>
          </div>
        </>}
      </DialogContent>
    </Dialog>
  );
}
