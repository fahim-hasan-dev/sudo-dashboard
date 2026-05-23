"use client";

import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface TablePaginationProps {
  table?: unknown;
  meta?: {
    page: number;
    totalPage: number;
    total: number;
    type?: string;
  };
}

const TablePagination: React.FC<TablePaginationProps> = ({ meta }) => {
  const updateSearchParams = useUpdateSearchParams();
  const pathname = usePathname();
  const page = Number(meta?.page || 1);
  const totalPage = Number(meta?.totalPage || 1);
  const total = Number(meta?.total || 0);

  // Derive the context name (e.g. users, problems, products) from path
  const getContextName = () => {
    if (meta?.type) return meta.type;
    if (pathname.includes("support")) return "problems";
    if (pathname.includes("products")) return "products";
    if (pathname.includes("messaging")) return "notifications";
    return "users";
  };

  const contextName = getContextName();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 pb-2 text-zinc-400 select-none w-full">
      {/* Left section: Shows row counts dynamically */}
      <div className="text-xs font-semibold text-zinc-500">
        Showing 1-{Math.min(7, total)} of {total.toLocaleString()} {contextName}
      </div>

      {/* Right section: Styled compact pagination controls */}
      <div className="flex items-center gap-1">
        {/* Double Left Jump */}
        <button
          onClick={() => updateSearchParams("page", "1")}
          disabled={page <= 1}
          className="size-8 rounded-lg flex items-center justify-center border border-transparent text-zinc-500 hover:text-white hover:bg-zinc-800/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          <ChevronsLeft className="size-4" />
        </button>

        {/* Single Left */}
        <button
          onClick={() => updateSearchParams("page", String(Math.max(1, page - 1)))}
          disabled={page <= 1}
          className="size-8 rounded-lg flex items-center justify-center border border-transparent text-zinc-500 hover:text-white hover:bg-zinc-800/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Page Buttons */}
        {Array.from({ length: totalPage }).map((_, index) => {
          const pageNum = index + 1;
          const isActive = page === pageNum;

          // Render only up to first 3 and the last page with ellipsis to look clean on massive counts
          if (totalPage > 5 && pageNum > 3 && pageNum < totalPage) {
            if (pageNum === 4) {
              return (
                <span key="ellipsis" className="size-8 flex items-center justify-center text-zinc-600 font-bold select-none text-xs leading-none">
                  ...
                </span>
              );
            }
            return null;
          }

          return (
            <button
              key={pageNum}
              onClick={() => updateSearchParams("page", String(pageNum))}
              className={`size-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all active:scale-95 leading-none ${
                isActive
                  ? "bg-primary text-black shadow-md shadow-primary/10"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Single Right */}
        <button
          onClick={() => updateSearchParams("page", String(Math.min(totalPage, page + 1)))}
          disabled={page >= totalPage}
          className="size-8 rounded-lg flex items-center justify-center border border-transparent text-zinc-500 hover:text-white hover:bg-zinc-800/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          <ChevronRight className="size-4" />
        </button>

        {/* Double Right Jump */}
        <button
          onClick={() => updateSearchParams("page", String(totalPage))}
          disabled={page >= totalPage}
          className="size-8 rounded-lg flex items-center justify-center border border-transparent text-zinc-500 hover:text-white hover:bg-zinc-800/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          <ChevronsRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
