"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Users,
  Wallet,
  Calendar,
  RotateCw,
  DollarSign,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getImageUrl } from "@/utils/image";

interface GroupDetailsResponse {
  group?: {
    _id: string;
    name: string;
    status: string;
    visibility: string;
    contributionAmount: number;
    targetPoolAmount: number;
    targetedMembers: number;
    paymentFrequency: string;
    totalCycles: number;
    startDate: string;
    createdAt?: string;
    members?: Array<{
      _id: string;
      fullName?: string;
      email?: string;
      image?: string;
    }>;
    admin?: { _id: string; fullName?: string; email?: string } | string;
    rotationSchedule?: Array<{
      periodNumber: number;
      cycleNumber: number;
      receiverId?: { _id: string; fullName?: string; email?: string } | string;
      payoutDate: string;
      status: string;
    }>;
  };
  currentPeriod?: number;
  currentCycle?: number;
  currentReceiver?: { _id: string; fullName?: string; email?: string };
  progress?: number;
  currentPeriodExpectedAmount?: number;
  currentPeriodCollectedAmount?: number;
  totalPeriods?: number;
}

interface SavingsGroupDetailsProps {
  groupId: string;
  initialDetails?: GroupDetailsResponse;
}

const SavingsGroupDetails: React.FC<SavingsGroupDetailsProps> = ({
  groupId,
  initialDetails,
}) => {
  const updateSearchParams = useUpdateSearchParams();
  const [details, setDetails] = useState<GroupDetailsResponse | undefined>(initialDetails);

  useEffect(() => {
    if (initialDetails) {
      setDetails(initialDetails);
    }
  }, [initialDetails]);

  const group = details?.group;
  const adminName =
    typeof group?.admin === "object"
      ? group.admin?.fullName || group.admin?.email
      : "Admin";

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-8 text-white select-text">
      {/* Back Button */}
      <div>
        <button
          onClick={() => updateSearchParams("groupId", null)}
          className="flex items-center gap-2 bg-[#0b131e]/40 border border-[#1b1e25] text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="size-3.5" /> Back to Savings Groups
        </button>
      </div>

      {/* Header Info Card */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-2xl p-6 shadow-md flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                {group?.name || "Savings Group Details"}
              </h1>
              <span
                className={`px-3 py-0.5 text-[10px] font-extrabold uppercase rounded-full leading-none border ${
                  group?.status === "active"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                    : group?.status === "completed"
                    ? "bg-purple-500/10 text-purple-400 border-purple-500/25"
                    : "bg-[#00ADEF]/10 text-[#00ADEF] border-[#00ADEF]/25"
                }`}
              >
                {group?.status || "Pending"}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium flex-wrap">
              <span>ID: <span className="font-mono text-zinc-300">{group?._id || groupId}</span></span>
              <span>•</span>
              <span>Creator: <span className="text-white font-semibold">{adminName}</span></span>
              <span>•</span>
              <span>Frequency: <span className="text-white font-semibold capitalize">{group?.paymentFrequency || "N/A"}</span></span>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#1b1e25]/60 w-full" />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#07080a] border border-[#1b1e25] p-4 rounded-xl flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="size-3.5 text-[#00ADEF]" /> Contribution
            </span>
            <span className="text-white text-lg font-extrabold mt-1">
              ${group?.contributionAmount?.toLocaleString() || "0"}
            </span>
          </div>

          <div className="bg-[#07080a] border border-[#1b1e25] p-4 rounded-xl flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5">
              <Wallet className="size-3.5 text-emerald-400" /> Target Pool
            </span>
            <span className="text-emerald-400 text-lg font-extrabold mt-1">
              ${group?.targetPoolAmount?.toLocaleString() || "0"}
            </span>
          </div>

          <div className="bg-[#07080a] border border-[#1b1e25] p-4 rounded-xl flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5">
              <Users className="size-3.5 text-purple-400" /> Total Members
            </span>
            <span className="text-white text-lg font-extrabold mt-1">
              {group?.members?.length || 0} {group?.targetedMembers ? `/ ${group.targetedMembers}` : ""}
            </span>
          </div>

          <div className="bg-[#07080a] border border-[#1b1e25] p-4 rounded-xl flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5">
              <RotateCw className="size-3.5 text-amber-400" /> Total Cycles
            </span>
            <span className="text-white text-lg font-extrabold mt-1">
              {group?.totalCycles || 1}
            </span>
          </div>
        </div>
      </div>

      {/* Rotation Schedule Table Section */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-2xl p-6 shadow-md flex flex-col gap-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider select-none leading-none border-b border-[#1b1e25] pb-3 flex items-center gap-2">
          <Calendar className="size-4 text-[#00ADEF]" /> Rotation Schedule ({group?.rotationSchedule?.length || 0})
        </h2>

        {group?.rotationSchedule && group.rotationSchedule.length > 0 ? (
          <div className="rounded-xl border border-[#1b1e25] overflow-hidden">
            <Table>
              <TableHeader className="bg-[#07080a]">
                <TableRow className="border-b border-[#1b1e25] hover:bg-transparent">
                  <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-xs">Period #</TableHead>
                  <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-xs">Cycle #</TableHead>
                  <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-xs">Payout Receiver</TableHead>
                  <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-xs">Payout Date</TableHead>
                  <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.rotationSchedule.map((item, idx) => {
                  const receiver = typeof item.receiverId === "object" ? item.receiverId : null;
                  const receiverName = receiver?.fullName || receiver?.email || "Receiver";

                  return (
                    <TableRow key={idx} className="border-b border-[#1b1e25]/60 hover:bg-[#121520]/40">
                      <TableCell className="py-3 px-4 font-bold text-white text-xs">
                        Period #{item.periodNumber}
                      </TableCell>
                      <TableCell className="py-3 px-4 font-semibold text-zinc-300 text-xs">
                        Cycle #{item.cycleNumber}
                      </TableCell>
                      <TableCell className="py-3 px-4 font-semibold text-[#00ADEF] text-xs">
                        {receiverName}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-zinc-400 text-xs font-medium">
                        {new Date(item.payoutDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-xs select-none">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full border ${
                            item.status === "completed"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center text-[#64748b] font-medium text-sm py-8 bg-[#07080a] rounded-xl border border-[#1b1e25]">
            No rotation schedule generated yet. Rotation will start when the group is full and activated.
          </div>
        )}
      </div>

      {/* Group Members List Section */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-2xl p-6 shadow-md flex flex-col gap-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider select-none leading-none border-b border-[#1b1e25] pb-3 flex items-center gap-2">
          <Users className="size-4 text-purple-400" /> Group Members ({group?.members?.length || 0})
        </h2>

        {group?.members && group.members.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.members.map((member: any, idx: number) => {
              const isObject = typeof member === "object" && member !== null;
              const name = isObject ? member.fullName || member.email : "Member";
              const email = isObject ? member.email || "N/A" : (typeof member === "string" ? `ID: ${member}` : "N/A");
              const avatarImage = isObject ? member.image || member.photo : undefined;
              const memberId = isObject ? member._id : member;

              return (
                <div
                  key={memberId || idx}
                  className="bg-[#07080a] border border-[#1b1e25] p-4 rounded-xl flex items-center gap-3 hover:border-[#00ADEF]/30 transition-all"
                >
                  <div className="size-10 rounded-full bg-purple-600/20 text-[#c084fc] flex items-center justify-center font-extrabold text-sm shrink-0 overflow-hidden border border-purple-500/20">
                    {avatarImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={getImageUrl(avatarImage)} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      getInitials(name !== "Member" ? name : email)
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-white text-xs truncate">
                      {name}
                    </span>
                    <span className="text-[11px] text-zinc-500 truncate">
                      {email}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-[#64748b] font-medium text-sm py-8 bg-[#07080a] rounded-xl border border-[#1b1e25]">
            No members in this group yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsGroupDetails;
