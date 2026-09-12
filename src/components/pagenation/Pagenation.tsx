"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PagenationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagenation({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PagenationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter(
    (page) =>
      page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1,
  );
  const buttonClass =
    "size-9 cursor-pointer rounded-none border-[#527D7D] bg-transparent p-0 text-sm text-[#245858] hover:bg-[#E8EEEE]";
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 pt-8 text-xs text-[#6F7D7A]">
      <p aria-live="polite">
        Showing {totalItems ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
        {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
      </p>
      <nav aria-label="Pagination" className="flex items-center gap-1.5">
        <Button
          variant="outline"
          className={buttonClass}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </Button>
        {pages.map((page, index) => (
          <span key={page} className="flex items-center gap-1.5">
            {index > 0 && page - pages[index - 1] > 1 && (
              <span className="px-2" aria-hidden="true">
                …
              </span>
            )}
            <Button
              variant="outline"
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              onClick={() => onPageChange(page)}
              className={cn(
                buttonClass,
                currentPage === page &&
                  "border-[#004B49] bg-[#004B49] text-white hover:bg-[#003B3B] hover:text-white",
              )}
            >
              {page}
            </Button>
          </span>
        ))}
        <Button
          variant="outline"
          className={buttonClass}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight />
        </Button>
      </nav>
    </div>
  );
}
