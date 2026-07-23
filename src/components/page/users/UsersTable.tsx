"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import userTableColumns from "@/components/tableColumns/userTableColumn";
import { IUser } from "@/types/user";

interface UsersTableProps {
  users?: IUser[];
  meta?: {
    page: number;
    totalPage: number;
    total: number;
  };
  totalUsers?: number;
  activeUsers?: number;
  suspendedUsers?: number;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users = [],
  meta,
  totalUsers = 0,
  activeUsers = 0,
  suspendedUsers = 0,
}) => {
  const searchParams = useSearchParams();
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [searchValue, setSearchValue] = React.useState(searchParams.get("searchTerm") || "");
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isMounted) return;
    const delayDebounceFn = setTimeout(() => {
      const currentParam = searchParams.get("searchTerm") || "";
      if (searchValue !== currentParam) {
        updateMultiSearchParams({
          searchTerm: searchValue || null,
          page: null,
        });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, updateMultiSearchParams, isMounted, searchParams]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<IUser>({
    data: users || [],
    columns: userTableColumns as ColumnDef<IUser>[],
    manualFiltering: true,
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-6 text-white select-text">
      {/* Grid of 3 stats cards matching mockup 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 select-none">
        {/* Total Users */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 h-[120px] flex flex-col justify-between hover:border-[#00ADEF]/30 transition-all duration-300 shadow-md">
          <span className="text-[28px] font-extrabold text-[#00ADEF] tracking-tight leading-none">
            {totalUsers.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Total Users
          </span>
        </div>
        {/* Active Users */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 h-[120px] flex flex-col justify-between hover:border-[#10B981]/30 transition-all duration-300 shadow-md">
          <span className="text-[28px] font-extrabold text-[#10B981] tracking-tight leading-none">
            {activeUsers.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Active
          </span>
        </div>
        {/* Suspended Users */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 h-[120px] flex flex-col justify-between hover:border-[#f59e0b]/30 transition-all duration-300 shadow-md">
          <span className="text-[28px] font-extrabold text-[#f59e0b] tracking-tight leading-none">
            {suspendedUsers.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Suspended
          </span>
        </div>
      </div>

      {/* Main Table Container Card */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-6">
        {/* Search and Filters Toolbar Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between">
          {/* Search Field */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-4 top-3.5 text-zinc-500 size-4.5" />
            <Input
              type="text"
              placeholder="Search users by name or email..."
              className="bg-[#07080a] border border-[#1b1e25] text-white rounded-xl h-11 w-full pl-11 pr-4 placeholder:text-[#64748b] focus-visible:ring-[#00ADEF]/20 text-xs transition-colors"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          {/* Action Filter Buttons */}
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button className="flex-1 sm:flex-initial bg-[#0b131e]/40 border border-[#00ADEF]/30 text-[#00ADEF] hover:bg-[#00ADEF]/10 px-5 h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95">
              <SlidersHorizontal className="size-3.5" /> Status
            </button>
            <button className="flex-1 sm:flex-initial bg-[#0b131e]/40 border border-[#00ADEF]/30 text-[#00ADEF] hover:bg-[#00ADEF]/10 px-5 h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95">
              <SlidersHorizontal className="size-3.5" /> KYC Status
            </button>
          </div>
        </div>

        {/* TanStack Table Grid */}
        <div className="flex flex-col w-full overflow-x-auto">
          <DashboardTable table={table} columns={userTableColumns} />
          <TablePagination table={table} meta={meta} />
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
