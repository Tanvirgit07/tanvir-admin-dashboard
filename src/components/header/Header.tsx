"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { getPageConfig } from "@/lib/page-config";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const pageInfo = getPageConfig(pathname);

  const { data: session } = useSession();

  const user = session?.user as {
    email?: string | null;
    name?: string | null;
    image?: string | null;
    profileImage?: string | null;
  } | undefined;

  const email = user?.email;
  const profileImage = user?.profileImage || user?.image || undefined;
  const displayName = user?.name?.trim() || email?.split("@")[0] || "Admin User";
  const nameParts = displayName.split(/\s+/);
  const initials = (nameParts.length > 1
    ? nameParts.slice(0, 2).map((part) => part[0]).join("")
    : displayName.slice(0, 2)
  ).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 left-0 z-30 h-[100px] flex items-center justify-between px-4 md:px-6 bg-[#E8EEEE] text-[#003b3b] shadow-[0_2px_8px_rgba(0,59,59,0.05)]">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <button className="cursor-pointer lg:hidden" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>

        <div className="lg:ml-[325px]">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-[#003b3b] md:text-[28px]">
            {pageInfo.title}
          </h1>

          <p className="mt-1.5 hidden md:block text-sm leading-5 text-[#617B7D]">
            {pageInfo.description}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative flex items-center">
        <div
          ref={avatarRef}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="hidden sm:block text-sm text-[#003b3b]">
            {email}
          </span>

          <Avatar className="h-11 w-11 rounded-full border-2 border-[#7FA6A3]">
            <AvatarImage src={profileImage} alt={displayName} className="object-cover" />
            <AvatarFallback className="rounded-full bg-[#DDE9E6] text-sm font-semibold text-[#003b3b]" aria-label={displayName}>
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
