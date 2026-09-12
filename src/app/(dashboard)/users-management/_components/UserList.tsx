"use client";

import { useState } from "react";
import { Eye, Search, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DeleteModal from "@/components/deleteModal/DeleteModal";
import Pagenation from "@/components/pagenation/Pagenation";
import { cn } from "@/lib/utils";
import ViewUserDetails from "./ViewUserDetails";
import {
  initialUsers,
  initials,
  statusStyles,
  type ManagedUser,
} from "./users";

const filters = ["All", "Bookkeepers", "Business Owners"] as const;
const pageSize = 9;

export default function UserList() {
  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewUser, setViewUser] = useState<ManagedUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<ManagedUser | null>(null);
  const [notice, setNotice] = useState("");
  const filtered = users.filter(
    (user) =>
      (filter === "All" ||
        user.type ===
          (filter === "Bookkeepers" ? "Bookkeeper" : "Business Owner")) &&
      user.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const currentPage = Math.min(
    page,
    Math.max(1, Math.ceil(filtered.length / pageSize)),
  );
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section aria-label="User management" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filter users by type"
          className="flex w-fit max-w-full border-b border-[#D6E0DD]"
        >
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => {
                setFilter(item);
                setPage(1);
              }}
              className={cn(
                "cursor-pointer border-b-2 border-transparent px-4 py-3.5 text-xs text-[#7A8C94] transition-colors hover:text-[#003B3B]",
                filter === item &&
                  "border-[#245858] font-semibold text-[#003B3B]",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:ml-auto sm:w-72 lg:w-80">
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#647478]"
          />
          <Input
            aria-label="Search users by name"
            placeholder="Search by name"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="h-11 rounded-lg border-[#CDDCDA] bg-transparent pl-9 text-sm shadow-[0_2px_5px_#003b3b03] placeholder:text-[#647478] focus-visible:ring-[#7FA6A3]/30"
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-[#E3EAE7] bg-white">
        <table className="w-full min-w-[800px] text-left text-[13px]">
          <thead className="bg-[#E8EEEE] text-xs text-[#354440]">
            <tr>
              {["Name", "User Type", "Email", "Joined", "Status", "Action"].map(
                (heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className={cn(
                      "px-4 py-3.5 font-medium",
                      ["Status", "Action"].includes(heading) && "text-center",
                    )}
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {visible.map((user) => (
              <tr
                key={user.id}
                className="border-t border-[#EDF0EF] hover:bg-[#FAFCFB]"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2 whitespace-nowrap text-[#153237]">
                    <Avatar className="size-9">
                      <AvatarImage
                        src={user.image}
                        alt=""
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-[#E8EEEE] text-xs text-[#245858]">
                        {initials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    {user.name}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[#7A8C94]">{user.type}</td>
                <td className="px-4 py-3.5 text-[#7A8C94]">{user.email}</td>
                <td className="px-4 py-3.5 text-[#7A8C94]">
                  <time dateTime={user.joined}>{user.joined}</time>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-2 py-0.5 text-[10px] leading-4",
                      statusStyles[user.status],
                    )}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="size-9 cursor-pointer rounded-md border border-[#C8DCD6] bg-[#EDF5F2] text-[#00504D] transition-colors hover:border-[#7FA6A3] hover:bg-[#DDEAE6] hover:text-[#003B3B] focus-visible:ring-[#7FA6A3]/40"
                      title="View user details"
                      aria-label={`View ${user.name}`}
                      onClick={() => setViewUser(user)}
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="size-9 cursor-pointer rounded-md border border-red-200 bg-red-50 text-red-600 transition-colors hover:border-red-300 hover:bg-red-100 hover:text-red-700 focus-visible:ring-red-300/40"
                      title="Delete user"
                      aria-label={`Delete ${user.name}`}
                      onClick={() => setDeleteUser(user)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {!visible.length && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-14 text-center text-[#718589]"
                >
                  No users found. Try a different name or user type.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagenation
        currentPage={currentPage}
        totalItems={filtered.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />
      <p role="status" className="sr-only">
        {notice}
      </p>
      <ViewUserDetails
        user={viewUser}
        onOpenChange={(open) => {
          if (!open) setViewUser(null);
        }}
      />
      <DeleteModal
        open={!!deleteUser}
        onOpenChange={(open) => {
          if (!open) setDeleteUser(null);
        }}
        description={`Are you sure you want to delete ${deleteUser?.name ?? "this user"}? This action cannot be undone.`}
        onConfirm={() => {
          if (!deleteUser) return;
          setUsers((previous) =>
            previous.filter((user) => user.id !== deleteUser.id),
          );
          setPage(
            Math.max(
              1,
              Math.min(
                currentPage,
                Math.ceil((filtered.length - 1) / pageSize),
              ),
            ),
          );
          setNotice(`${deleteUser.name} has been deleted.`);
        }}
      />
    </section>
  );
}
