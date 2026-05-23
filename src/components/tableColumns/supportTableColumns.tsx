"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ISupportTicket } from "@/types/support";
import DeleteModal from "../modals/DeleteModal";

// handle support ticket delete action
const handleDelete = async () => {
  // perform delete action here...
};

// handle support ticket solve action
const handleSolve = async () => {
  // perform solve action here...
};

// Table columns mapping the exact Support mockup:
// PROFILE & NAME | CONTACT | MESSAGE CONTEXT | MESSAGE DATE | ACTIONS
const supportTableColumns: ColumnDef<ISupportTicket>[] = [
  {
    accessorKey: "user",
    header: "PROFILE & NAME",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      // Derive a nice name from email or default to Felix Vance
      const namePart = item?.user ? item.user.split("@")[0] : "felix";
      const fullName = namePart.charAt(0).toUpperCase() + namePart.slice(1) + " Vance";
      const photo = `https://randomuser.me/api/portraits/men/${item?._id || 1}.jpg`;
      
      return (
        <div className="flex items-center gap-3 py-1 text-left px-2">
          <Avatar className="size-9 rounded-full border border-zinc-800">
            <AvatarImage src={photo} alt={fullName} className="rounded-full object-cover" />
            <AvatarFallback className="rounded-full bg-zinc-800 text-xs">US</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-white text-sm tracking-tight leading-none">
              {fullName}
            </span>
            <span className="text-[10px] text-zinc-500 font-semibold leading-none">
              ID: SN-88{item?._id ? String(item._id).padStart(3, "0") : "219"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "CONTACT",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return (
        <div className="flex flex-col gap-0.5 text-left px-2">
          <span className="text-zinc-200 text-sm tracking-tight leading-none truncate max-w-[180px]">
            {item?.user}
          </span>
          <span className="text-[11px] text-zinc-500 font-semibold leading-none">
            +1 (555) 012-3456
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "message",
    header: "MESSAGE CONTEXT",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return (
        <div className="text-left px-2 max-w-[240px]">
          <p className="text-zinc-300 text-xs font-medium truncate">
            {item?.message}
          </p>
        </div>
      );
    },
  },
  {
    id: "messageDate",
    header: "MESSAGE DATE",
    cell: () => {
      return (
        <div className="text-left px-2 text-zinc-200 text-xs font-semibold">
          Oct 12, 2023
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "ACTIONS",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      
      return (
        <div className="flex items-center justify-start gap-2.5 px-2">
          {/* Solve Button */}
          <button
            onClick={handleSolve}
            className="bg-[#0a2f1d] text-[#00ff88] border border-[#00ff88]/20 hover:bg-[#0a2f1d]/80 px-3.5 py-1.5 rounded-lg text-xs font-bold select-none cursor-pointer transition-all active:scale-[0.98] leading-none"
          >
            Solve
          </button>

          {/* Delete Modal Trigger Button */}
          <DeleteModal
            triggerBtn={
              <button
                className="bg-[#2d0d0d] text-[#ff3b30] border border-[#ff3b30]/20 hover:bg-[#2d0d0d]/80 px-3.5 py-1.5 rounded-lg text-xs font-bold select-none cursor-pointer transition-all active:scale-[0.98] leading-none"
              >
                Delete
              </button>
            }
            itemId={String(item?._id)}
            action={handleDelete}
          />
        </div>
      );
    },
  },
];

export default supportTableColumns;
