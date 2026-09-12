"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const applications = [
  {
    name: "Jessica Wong",
    initials: "JW",
    type: "Bookkeeper",
    date: "2025-07-28",
    status: "Under Review",
  },
  {
    name: "Nathan Brooks",
    initials: "NB",
    type: "Bookkeeper",
    date: "2025-07-25",
    status: "Pending",
  },
  {
    name: "Amelia Grant",
    initials: "AG",
    type: "Bookkeeper",
    date: "2025-07-22",
    status: "Approved",
  },
  {
    name: "Chris Patel",
    initials: "CP",
    type: "Bookkeeper",
    date: "2025-07-20",
    status: "Rejected",
  },
] as const;

const statusStyles = {
  "Under Review": "border-orange-300 bg-orange-50 text-orange-600",
  Pending: "border-orange-300 bg-amber-50 text-orange-600",
  Approved: "border-green-300 bg-[#efffeb] text-green-700",
  Rejected: "border-red-300 bg-red-50 text-red-600",
};

export default function RecentApplication() {
  return (
    <Card className="gap-4 rounded-md border-0 bg-white p-3 shadow-[0px_4px_6px_0px_#0000001A]">
      <h2 className="text-lg font-semibold text-[#171c1b]">
        Recent Applications
      </h2>
      <div className="overflow-x-auto rounded-xl border border-[#e8eceb]">
        <table className="w-full min-w-[650px] border-collapse text-left text-xs">
          <thead className="border-b border-[#C8D9D6] bg-[#DDE9E6] text-[11px] font-semibold text-[#003B3B]">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Applicant
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Type
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Submitted Date
              </th>
              <th scope="col" className="px-4 py-3 text-center font-semibold">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr
                key={application.name}
                className="border-t border-[#edf0ef] hover:bg-[#fafcfb]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-[#153237]">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-[#e8eeee] text-[10px] text-[#003b3b]">
                        {application.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span>{application.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#7a8c94]">{application.type}</td>
                <td className="px-4 py-3 text-[#7a8c94]">
                  <time dateTime={application.date}>{application.date}</time>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={cn(
                      "inline-flex min-w-[82px] items-center justify-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[9px] leading-3",
                      statusStyles[application.status],
                    )}
                  >
                    {application.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-xs font-semibold text-[#003b3b] underline cursor-pointer"
                        aria-label={`See more about ${application.name}`}
                      >
                        See more
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{application.name}</DialogTitle>
                        <DialogDescription>
                          Application details
                        </DialogDescription>
                      </DialogHeader>
                      <dl className="grid grid-cols-2 gap-4 text-sm">
                        <dt className="text-muted-foreground">Type</dt>
                        <dd>{application.type}</dd>
                        <dt className="text-muted-foreground">
                          Submitted date
                        </dt>
                        <dd>{application.date}</dd>
                        <dt className="text-muted-foreground">Status</dt>
                        <dd>{application.status}</dd>
                      </dl>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
