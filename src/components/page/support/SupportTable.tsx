"use client";

import * as React from "react";
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
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import supportTableColumns from "@/components/tableColumns/supportTableColumns";
import { ISupportTicket } from "@/types/support";

const SupportTable = ({ tickets = [], meta }) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<ISupportTicket>({
    data: tickets || [],
    columns: supportTableColumns as ColumnDef<ISupportTicket>[],
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
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-6 text-white">
      {/* Header and Subtitles */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Support
        </h1>
        <p className="text-sm font-semibold text-[#9f8b7c] mt-1">
          Manage and process customer request
        </p>
      </div>

      {/* Full-width Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-3.5 text-zinc-500 size-5" />
        <Input
          type="text"
          placeholder="Search here..."
          className="bg-[#0e1015] border border-[#1b1e25] text-white rounded-lg h-12 w-full pl-12 pr-4 placeholder:text-zinc-500 focus-visible:ring-primary/30 text-sm shadow-inner transition-colors"
          onChange={(e) =>
            updateMultiSearchParams({
              searchTerm: e.currentTarget.value || null,
              page: null,
            })
          }
        />
      </div>

      {/* Compact Table and Pagination Card Container */}
      <div className="flex flex-col">
        <DashboardTable table={table} columns={supportTableColumns} />
        <TablePagination table={table} meta={meta} />
      </div>
    </div>
  );
};

export default SupportTable;
