"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { IUser } from "@/types/user";
import DeleteModal from "@/components/modals/DeleteModal";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";

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

  const handleDeleteUser = async (id: string) => {
    toast.loading("Deleting user...", { id: "delete-user" });
    try {
      const res = await myFetch(`/user/${id}`, {
        method: "DELETE",
      });
      if (res?.success) {
        toast.success(res?.message || "User deleted successfully", { id: "delete-user" });
        window.location.reload();
      } else {
        toast.error(res?.message || "Failed to delete user", { id: "delete-user" });
      }
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error("Failed to delete user", { id: "delete-user" });
    }
  };

  return (
    <div className="flex items-center justify-start gap-3 px-1 select-none">
      <button
        onClick={() => updateSearchParams("userId", user._id)}
        className="text-[#00ADEF] hover:text-[#00ADEF]/80 transition-colors cursor-pointer p-1"
        title="View Details"
      >
        <Eye className="size-4.5" />
      </button>
      <DeleteModal
        itemId={user._id}
        title="Are you sure you want to delete this user?"
        triggerBtn={
          <button
            className="text-[#ff3b30] hover:text-[#ff3b30]/80 transition-colors cursor-pointer p-1"
            title="Delete User"
          >
            <Trash2 className="size-4.5" />
          </button>
        }
        action={handleDeleteUser}
      />
    </div>
  );
};

// Map columns to match User schema from the backend
const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const item = row.original;
      const displayName = item?.fullName || item?.email || "User";
      const displayId = `U-48${item?._id || ""}`;

      return (
        <div className="flex items-center gap-3 py-1 text-left">
          {/* Circular initials avatar badge */}
          <div className="size-9 rounded-full bg-[#00ADEF]/10 text-[#00ADEF] flex items-center justify-center font-bold text-xs select-none shrink-0 border border-[#00ADEF]/20">
            {getInitials(displayName)}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-semibold text-white text-[13px] tracking-tight leading-none truncate">
              {displayName}
            </span>
            <span className="text-[10px] text-zinc-550 font-semibold leading-none mt-0.5">
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
      const displayEmail = item?.email;
      const displayPhone = item?.phoneNumber || "N/A";
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
    header: "Country / Location",
    cell: ({ row }) => {
      const item = row.original;
      const location = item?.address || "N/A";
      const isUAE = location.toLowerCase().includes("uae") || location.toLowerCase().includes("dubai");
      const flag = isUAE ? "🇦🇪" : "🇳🇬";
      return (
        <div className="flex items-center gap-1.5 text-zinc-350 select-none text-left">
          <span className="text-base leading-none">{flag}</span>
          <span className="text-[13px] truncate max-w-[120px]">{location}</span>
        </div>
      );
    },
  },
  {
    id: "kyc",
    header: "KYC Status",
    cell: ({ row }) => {
      const item = row.original;
      const rawKyc = item?.kycStatus || "unverified";
      const kycStatus = rawKyc.charAt(0).toUpperCase() + rawKyc.slice(1);

      const colorMap: Record<string, string> = {
        Approved: "text-emerald-500",
        Pending: "text-amber-500",
        Rejected: "text-[#ff3b30]",
        Unverified: "text-zinc-400",
      };

      return (
        <div className="text-left font-semibold text-[13px] select-none">
          <span className={colorMap[kycStatus] || "text-zinc-400"}>{kycStatus}</span>
        </div>
      );
    },
  },
  {
    id: "plan",
    header: "Plan / Role",
    cell: ({ row }) => {
      const item = row.original;
      const isAdmin = item?.role === "admin";
      const planName = isAdmin ? "Admin" : "User";

      const colorMap = {
        Admin: "text-purple-400",
        User: "text-[#64748b]",
      };

      return (
        <div className="text-left font-semibold text-[13px] select-none">
          <span className={colorMap[planName]}>{planName}</span>
        </div>
      );
    },
  },
  {
    id: "contributions",
    header: "Contributions",
    cell: () => {
      return (
        <div className="text-left text-zinc-500 text-[13px] font-semibold select-none">
          N/A
        </div>
      );
    },
  },
  {
    id: "received",
    header: "Received",
    cell: () => {
      return (
        <div className="text-left text-zinc-500 text-[13px] font-semibold select-none">
          N/A
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original;
      const isSuspended = item?.status === "restricted";
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
