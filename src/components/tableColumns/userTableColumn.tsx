"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Ban } from "lucide-react";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { IUser } from "@/types/user";

// Helper to compute initials from full name
const getInitials = (name: string) => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Custom Action Cell component to handle query parameter updates dynamically
const ActionCell = ({ user }: { user: IUser }) => {
  const updateSearchParams = useUpdateSearchParams();
  return (
    <div className="flex items-center justify-start gap-3 px-1 select-none">
      <button
        onClick={() => updateSearchParams("userId", user._id)}
        className="text-[#00ADEF] hover:text-[#00ADEF]/80 transition-colors cursor-pointer p-1"
        title="View Details"
      >
        <Eye className="size-4.5" />
      </button>
      <button
        className="text-[#ff3b30] hover:text-[#ff3b30]/80 transition-colors cursor-pointer p-1"
        title="Suspend User"
      >
        <Ban className="size-4.5" />
      </button>
    </div>
  );
};

// Map extended columns from User Management mockup
const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const item = row.original;
      const isDemo = item?.email?.includes("example.com") || !item?.email;
      const fullName = `${item?.firstName || ""} ${item?.lastName || ""}`.trim() || "User";
      // In mockup 1, names are Amara Okonkwo, UAE location is Nigeria, id SN-88219 is U-4821
      const displayName = isDemo ? "Amara Okonkwo" : fullName;
      const displayId = isDemo ? "U-4821" : `U-48${item?._id || ""}`;

      return (
        <div className="flex items-center gap-3 py-1 text-left">
          {/* Circular avatar badge */}
          <div className="size-9 rounded-full bg-[#00ADEF]/10 text-[#00ADEF] flex items-center justify-center font-bold text-xs select-none shrink-0 border border-[#00ADEF]/20">
            {getInitials(displayName)}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-semibold text-white text-[13px] tracking-tight leading-none truncate">
              {displayName}
            </span>
            <span className="text-[10px] text-zinc-500 font-semibold leading-none mt-0.5">
              {displayId}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Contact",
    cell: ({ row }) => {
      const item = row.original;
      const isDemo = item?.email?.includes("example.com") || !item?.email;
      const displayEmail = isDemo ? "amara.o@gmail.com" : item?.email;
      const displayPhone = isDemo ? "+234 801 234 5678" : "+234 801 234 5678";
      return (
        <div className="flex flex-col gap-0.5 text-left text-zinc-350">
          <span className="text-[13px] tracking-tight leading-none">
            {displayEmail}
          </span>
          <span className="text-[10px] text-zinc-550 font-semibold leading-none mt-0.5">
            {displayPhone}
          </span>
        </div>
      );
    },
  },
  {
    id: "country",
    header: "Country",
    cell: ({ row }) => {
      const item = row.original;
      const isDemo = item?.email?.includes("example.com") || !item?.email;
      const location = isDemo ? "Nigeria" : (item?.location || "Nigeria");
      const isUAE = location.toLowerCase().includes("uae") || location.toLowerCase().includes("dubai") || location.toLowerCase().includes("abu dhabi") || location.toLowerCase().includes("sharjah") || location.toLowerCase().includes("ajman") || location.toLowerCase().includes("fujairah") || location.toLowerCase().includes("ras al khaimah") || location.toLowerCase().includes("umm al quwain");
      const flag = isUAE ? "🇦🇪" : "🇳🇬";
      const countryName = isUAE ? "UAE" : "Nigeria";
      return (
        <div className="flex items-center gap-1.5 text-zinc-350 select-none text-left">
          <span className="text-base leading-none">{flag}</span>
          <span className="text-[13px]">{countryName}</span>
        </div>
      );
    },
  },
  {
    id: "kyc",
    header: "KYC",
    cell: ({ row }) => {
      const index = row.index;
      const item = row.original;
      const isDemo = item?.email?.includes("example.com") || !item?.email;

      let kycStatus: "Approved" | "Pending" | "Rejected" = "Approved";
      if (isDemo) {
        if (index === 1 || index === 4) kycStatus = "Pending";
        else if (index === 7 || index >= 9) kycStatus = "Rejected";
      } else {
        kycStatus = item?.isVerified ? "Approved" : "Pending";
      }

      const colorMap = {
        Approved: "text-emerald-500",
        Pending: "text-amber-500",
        Rejected: "text-[#ff3b30]",
      };

      return (
        <div className="text-left font-semibold text-[13px] select-none">
          <span className={colorMap[kycStatus]}>{kycStatus}</span>
        </div>
      );
    },
  },
  {
    id: "plan",
    header: "Plan",
    cell: ({ row }) => {
      const index = row.index;
      const item = row.original;
      const isDemo = item?.email?.includes("example.com") || !item?.email;

      let plan: "Plus" | "Free" | "Family" | "Community" = "Plus";
      if (isDemo) {
        if (index === 1 || index === 4) plan = "Free";
        else if (index === 2 || index === 5 || index === 6 || index === 8) plan = "Family";
        else if (index === 7 || index >= 9) plan = "Community";
      } else {
        plan = item?.role === "Admin" ? "Plus" : "Free";
      }

      const colorMap = {
        Plus: "text-purple-400",
        Free: "text-[#64748b]",
        Family: "text-blue-400",
        Community: "text-cyan-400",
      };

      return (
        <div className="text-left font-semibold text-[13px] select-none">
          <span className={colorMap[plan]}>{plan}</span>
        </div>
      );
    },
  },
  {
    id: "contributions",
    header: "Contributions",
    cell: () => {
      return (
        <div className="text-left text-zinc-300 text-[13px] font-semibold select-none">
          $12,400
        </div>
      );
    },
  },
  {
    id: "received",
    header: "Received",
    cell: () => {
      return (
        <div className="text-left text-emerald-400 text-[13px] font-bold select-none">
          $9,800
        </div>
      );
    },
  },
  {
    accessorKey: "isBlocked",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original;
      const index = row.index;
      const isDemo = item?.email?.includes("example.com") || !item?.email;

      let isSuspended = item?.isBlocked;
      if (isDemo) {
        isSuspended = index === 5 || index === 8;
      }
      const statusText = isSuspended ? "Suspended" : "Active";

      return (
        <div className="text-left font-semibold text-[13px] select-none">
          <span className={isSuspended ? "text-amber-500" : "text-emerald-500"}>
            {statusText}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;
      return <ActionCell user={item} />;
    },
  },
];

export default columns;
