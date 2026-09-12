"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Pagenation from "@/components/pagenation/Pagenation";
import { useReviews } from "../review-store";
import { applications, badgeClass } from "../data";
export default function ApplicationList() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const reviews = useReviews();
  const rows = applications
    .map((a) => ({ ...a, status: reviews[a.id]?.status || a.status }))
    .filter(
      (a) =>
        (tab === "All" || a.status === tab) &&
        `${a.name} ${a.email}`.toLowerCase().includes(search.toLowerCase()),
    );
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 size-4 text-[#718589]" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            aria-label="Search applicants"
            placeholder="Search by applicant name"
            className="h-11 border-[#CDDCDA] pl-9"
          />
        </div>
        <Select
          value={tab}
          onValueChange={(value) => {
            setTab(value);
            setPage(1);
          }}
        >
          <SelectTrigger
            aria-label="Filter by application status"
            className="h-11! w-full cursor-pointer border-[#CDDCDA] text-[#003B3B] sm:w-[180px]"
          >
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            {["All", "Pending", "Under Review", "Approved", "Rejected"].map(
              (status) => (
                <SelectItem
                  key={status}
                  value={status}
                  className="cursor-pointer"
                >
                  {status === "All" ? "All statuses" : status}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto rounded-lg border border-[#E3EAE7] bg-white">
        <table className="w-full min-w-[800px] text-left text-[13px]">
          <thead className="bg-[#E8EEEE] text-xs text-[#354440]">
            <tr>
              {[
                "Applicant",
                "Date",
                "Experience",
                "Assessment",
                "Vetting Status",
                "Action",
              ].map((h) => (
                <th key={h} className="px-4 py-3.5 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice((page - 1) * 9, page * 9).map((a) => (
              <tr
                key={a.id}
                className="border-t border-[#EDF0EF] hover:bg-[#FAFCFB]"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-9">
                      <AvatarFallback className="bg-[#E8EEEE] text-xs text-[#245858]">
                        {a.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-[#153237]">
                      {a.name}
                      <p className="text-[11px] text-[#718589]">{a.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[#718589]">{a.date}</td>
                <td className="px-4 py-3.5 text-[#718589]">{a.experience}</td>
                {[a.assessment, a.status].map((v, i) => (
                  <td key={i} className="px-4 py-3.5">
                    <span
                      className={`rounded-full border px-2 py-1 text-[11px] ${badgeClass(v)}`}
                    >
                      {v}
                    </span>
                  </td>
                ))}
                <td className="px-4 py-3.5">
                  <Link
                    href={`/applications/${a.id}`}
                    aria-label={`View ${a.name}'s application`}
                    className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-[#C8DCD6] bg-[#EDF5F2] text-[#00504D] hover:bg-[#DDEAE6]"
                  >
                    <Eye className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={6} className="p-12 text-center text-[#718589]">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagenation
        currentPage={page}
        totalItems={rows.length}
        pageSize={9}
        onPageChange={setPage}
      />
    </section>
  );
}
