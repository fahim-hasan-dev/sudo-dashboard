"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Modal from "../modals/Modal";
import UserDetails from "../page/users/userDetails/UserDetails";
import { IUser } from "@/types/user";

// Table columns mapping the exact User Management mockup:
// PROFILE & NAME | CONTACT | REG. DATE | STATUS | ACTIONS
const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "PROFILE & NAME",
    cell: ({ row }) => {
      const item = row.original as IUser;
      const fullName = `${item?.firstName} ${item?.lastName}`;
      const photo = item?.photo || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000";
      
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
              ID: SN-{item?._id || "88219"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "CONTACT",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <div className="flex flex-col gap-0.5 text-left px-2">
          <span className="text-zinc-200 text-sm tracking-tight leading-none">
            {item?.email}
          </span>
          <span className="text-[11px] text-zinc-500 font-semibold leading-none">
            +1 (555) 012-3456
          </span>
        </div>
      );
    },
  },
  {
    id: "regDate",
    header: "REG. DATE",
    cell: () => {
      return (
        <div className="flex flex-col gap-0.5 text-left px-2">
          <span className="text-zinc-200 text-sm tracking-tight leading-none">
            Oct 12, 2023
          </span>
          <span className="text-[11px] text-zinc-500 font-semibold leading-none">
            14:22 UTC
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "isBlocked",
    header: "STATUS",
    cell: ({ row }) => {
      const item = row.original as IUser;
      const isActive = !item?.isBlocked;
      
      return (
        <div className="text-left px-2">
          <span
            className={`inline-flex items-center justify-center text-[10px] font-bold px-2.5 py-0.5 rounded-full border leading-none select-none ${
              isActive
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-zinc-800 text-zinc-400 border-zinc-700"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "ACTIONS",
    cell: ({ row }) => {
      const item = row.original as IUser;
      
      return (
        <div className="flex items-center justify-start gap-1 px-4">
          <Modal
            dialogTrigger={
              <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/5 rounded-full size-8">
                <Eye className="size-4" />
              </Button>
            }
            dialogTitle="User Details"
            className="max-w-md bg-[#0a0b0d] border border-[#1b1e25] p-6 rounded-xl"
          >
            <UserDetails user={item} />
          </Modal>
        </div>
      );
    },
  },
];

export default columns;
