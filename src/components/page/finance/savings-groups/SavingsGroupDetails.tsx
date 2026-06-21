"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Users,
  Wallet,
  Calendar,
  RotateCw,
  DollarSign,
  Check,
  X,
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

interface SavingsGroupDetailsProps {
  groupId: string;
}

interface MemberRow {
  position: string;
  name: string;
  id: string;
  initials: string;
  avatarBg: string;
  payment: "Paid" | "Not Paid";
  payout: "Received" | "Pending";
  joined: string;
}

interface TimelineItem {
  round: number;
  name: string;
  date: string;
  amount: string;
  status: "Completed" | "Upcoming";
  isDone: boolean;
}

const mockMembers: MemberRow[] = [
  {
    position: "#1",
    name: "Emeka Eze",
    id: "U-4830",
    initials: "EE",
    avatarBg: "bg-purple-600 text-white",
    payment: "Paid",
    payout: "Received",
    joined: "2025-05-01",
  },
  {
    position: "#2",
    name: "Blessing Nwankwo",
    id: "U-4822",
    initials: "BN",
    avatarBg: "bg-blue-600 text-white",
    payment: "Paid",
    payout: "Pending",
    joined: "2025-05-01",
  },
  {
    position: "#3",
    name: "Amara Okonkwo",
    id: "U-4821",
    initials: "AO",
    avatarBg: "bg-emerald-600 text-white",
    payment: "Paid",
    payout: "Pending",
    joined: "2025-05-01",
  },
  {
    position: "#4",
    name: "James Oduya",
    id: "U-4827",
    initials: "JO",
    avatarBg: "bg-[#d946ef] text-white",
    payment: "Paid",
    payout: "Pending",
    joined: "2025-05-01",
  },
  {
    position: "#5",
    name: "Priya Sharma",
    id: "U-4826",
    initials: "PS",
    avatarBg: "bg-amber-500 text-white",
    payment: "Not Paid",
    payout: "Pending",
    joined: "2025-05-01",
  },
  {
    position: "#6",
    name: "Ana Rodrigues",
    id: "U-4828",
    initials: "AR",
    avatarBg: "bg-cyan-600 text-white",
    payment: "Paid",
    payout: "Pending",
    joined: "2025-05-01",
  },
];

const mockTimeline: TimelineItem[] = [
  {
    round: 1,
    name: "Emeka Eze",
    date: "2025-08-14",
    amount: "$6,000",
    status: "Completed",
    isDone: true,
  },
  {
    round: 2,
    name: "Blessing Nwankwo",
    date: "2025-07-14",
    amount: "$6,000",
    status: "Completed",
    isDone: true,
  },
  {
    round: 3,
    name: "Amara Okonkwo",
    date: "2025-08-14",
    amount: "$6,000",
    status: "Completed",
    isDone: true,
  },
  {
    round: 4,
    name: "James Oduya",
    date: "2025-09-14",
    amount: "$6,000",
    status: "Completed",
    isDone: true,
  },
  {
    round: 5,
    name: "Priya Sharma",
    date: "2025-10-14",
    amount: "$6,000",
    status: "Upcoming",
    isDone: false,
  },
  {
    round: 6,
    name: "Ana Rodrigues",
    date: "2025-11-14",
    amount: "$6,000",
    status: "Upcoming",
    isDone: false,
  },
];

const SavingsGroupDetails: React.FC<SavingsGroupDetailsProps> = ({ groupId }) => {
  const updateSearchParams = useUpdateSearchParams();
  const [activeTab, setActiveTab] = useState<"members" | "timeline">("members");

  const groupMeta = {
    id: groupId,
    name: groupId === "G-1002" ? "Alpha Investment Circle" : groupId === "G-1003" ? "UK Diaspora Fund" : "Lagos Tech Savers",
    flag: groupId === "G-1002" ? "🇦🇪" : groupId === "G-1003" ? "🇬🇧" : "🇳🇬",
    status: "Active",
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-8 text-white select-text">
      {/* Back button action row */}
      <div className="select-none">
        <button
          onClick={() => updateSearchParams("groupId", null)}
          className="flex items-center gap-2 bg-[#0b131e]/40 border border-[#1b1e25] text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="size-3.5" /> Back to Groups
        </button>
      </div>

      {/* Group Title and Code Header */}
      <div className="flex flex-col gap-1 select-none">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl leading-none">{groupMeta.flag}</span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight leading-none">
            {groupMeta.name}
          </h1>
          <span className="bg-emerald-500/10 text-emerald-450 border border-emerald-500/25 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold leading-none">
            {groupMeta.status}
          </span>
        </div>
        <span className="text-[10px] font-bold text-[#00ADEF] tracking-wider uppercase leading-none mt-1">
          {groupMeta.id}
        </span>
      </div>

      {/* Info Stats Cards Grid (6 columns) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 select-none">
        {/* Members */}
        <div className="bg-[#0e1015] border border-[#1b1e25] p-5 rounded-xl flex flex-col gap-2 hover:border-[#00ADEF]/30 transition-all">
          <span className="text-[10px] font-bold text-[#00ADEF] uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <Users className="size-3.5" /> Members
          </span>
          <span className="text-white text-lg font-extrabold leading-none mt-1 block">
            12
          </span>
        </div>

        {/* Contribution/Cycle */}
        <div className="bg-[#0e1015] border border-[#1b1e25] p-5 rounded-xl flex flex-col gap-2 hover:border-[#10B981]/30 transition-all">
          <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <DollarSign className="size-3.5" /> Contribution/Cycle
          </span>
          <span className="text-white text-lg font-extrabold leading-none mt-1 block">
            $500
          </span>
        </div>

        {/* Total Pool */}
        <div className="bg-[#0e1015] border border-[#1b1e25] p-5 rounded-xl flex flex-col gap-2 hover:border-[#00ADEF]/30 transition-all">
          <span className="text-[10px] font-bold text-[#00ADEF] uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <Wallet className="size-3.5" /> Total Pool
          </span>
          <span className="text-white text-lg font-extrabold leading-none mt-1 block">
            $6,000
          </span>
        </div>

        {/* Cycle Type */}
        <div className="bg-[#0e1015] border border-[#1b1e25] p-5 rounded-xl flex flex-col gap-2 hover:border-[#eab308]/30 transition-all">
          <span className="text-[10px] font-bold text-[#eab308] uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <Calendar className="size-3.5" /> Cycle Type
          </span>
          <span className="text-white text-lg font-extrabold leading-none mt-1 block truncate">
            Monthly
          </span>
        </div>

        {/* Total Cycle */}
        <div className="bg-[#0e1015] border border-[#1b1e25] p-5 rounded-xl flex flex-col gap-2 hover:border-[#eab308]/30 transition-all">
          <span className="text-[10px] font-bold text-[#eab308] uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <RotateCw className="size-3.5" /> Total Cycle
          </span>
          <span className="text-white text-lg font-extrabold leading-none mt-1 block">
            3
          </span>
        </div>

        {/* Current Cycle */}
        <div className="bg-[#0e1015] border border-[#1b1e25] p-5 rounded-xl flex flex-col gap-2 hover:border-[#eab308]/30 transition-all">
          <span className="text-[10px] font-bold text-[#eab308] uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <Calendar className="size-3.5" /> Current Cycle
          </span>
          <span className="text-white text-lg font-extrabold leading-none mt-1 block">
            2
          </span>
        </div>
      </div>

      {/* Completion Progress Container */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 w-full">
        {/* Progress bar info */}
        <div className="flex-1 flex flex-col gap-3 w-full">
          <div className="flex justify-between items-center select-none">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Completion Progress
            </span>
            <span className="text-xs font-bold text-[#10B981]">67%</span>
          </div>
          {/* Progress bar background line */}
          <div className="w-full h-2 bg-[#07080a] border border-[#1b1e25] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00ADEF] to-[#10B981]" style={{ width: "67%" }} />
          </div>
        </div>

        {/* Recipient Details Badge */}
        <div className="bg-[#0a201c] border border-[#10b981]/20 px-5 py-3 rounded-xl flex flex-col gap-1 min-w-[220px] select-none w-full md:w-auto">
          <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider leading-none">
            Current Payout Recipient
          </span>
          <span className="text-xs font-extrabold text-[#10B981] truncate mt-0.5 leading-none">
            Emeka Eze
          </span>
        </div>
      </div>

      {/* Tabs Menu selectors */}
      <div className="flex border-b border-[#1b1e25] select-none mt-2">
        <button
          onClick={() => setActiveTab("members")}
          className={`px-6 py-3 text-sm font-semibold cursor-pointer border-b-2 transition-all duration-200 leading-none ${
            activeTab === "members"
              ? "border-[#00ADEF] text-[#00ADEF]"
              : "border-transparent text-[#64748b] hover:text-zinc-200"
          }`}
        >
          Members
        </button>
        <button
          onClick={() => setActiveTab("timeline")}
          className={`px-6 py-3 text-sm font-semibold cursor-pointer border-b-2 transition-all duration-200 leading-none ${
            activeTab === "timeline"
              ? "border-[#00ADEF] text-[#00ADEF]"
              : "border-transparent text-[#64748b] hover:text-zinc-200"
          }`}
        >
          Payout Timeline
        </button>
      </div>

      {/* Tab Panels */}
      <div className="w-full">
        {/* MEMBERS LIST TABLE TAB */}
        {activeTab === "members" && (
          <div className="rounded-xl border border-[#1b1e25]/60 bg-[#07080a]/30 overflow-hidden w-full">
            <Table>
              <TableHeader className="bg-[#0f111a] border-b border-[#1b1e25]/65">
                <TableRow className="hover:bg-transparent border-none h-12">
                  <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                    Position
                  </TableHead>
                  <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                    Member
                  </TableHead>
                  <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                    This Cycle Payment
                  </TableHead>
                  <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                    Payout Received
                  </TableHead>
                  <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                    Joined
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMembers.map((member) => {
                  const isPaid = member.payment === "Paid";
                  const isReceived = member.payout === "Received";
                  return (
                    <TableRow
                      key={member.id}
                      className="border-b border-[#1b1e25]/50 hover:bg-[#121520]/25 h-16 transition-colors"
                    >
                      {/* Position */}
                      <TableCell className="py-3 px-4 font-semibold text-[#00ADEF] text-left border-none">
                        {member.position}
                      </TableCell>

                      {/* Profile details */}
                      <TableCell className="py-3 px-4 text-left border-none">
                        <div className="flex items-center gap-3">
                          <div className={`size-9 rounded-full flex items-center justify-center font-bold text-xs select-none shrink-0 ${member.avatarBg}`}>
                            {member.initials}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-white text-[13px] tracking-tight leading-none">
                              {member.name}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-semibold leading-none mt-0.5 select-none">
                              {member.id}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Payment Status */}
                      <TableCell className="py-3 px-4 text-left border-none select-none">
                        {isPaid ? (
                          <span className="bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit">
                            <Check className="size-3" /> Paid $500
                          </span>
                        ) : (
                          <span className="bg-[#ff3b30]/10 text-[#ff3b30] border border-[#ff3b30]/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit">
                            <X className="size-3" /> Not Paid
                          </span>
                        )}
                      </TableCell>

                      {/* Payout Status */}
                      <TableCell className="py-3 px-4 text-left border-none select-none">
                        {isReceived ? (
                          <span className="bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            Received
                          </span>
                        ) : (
                          <span className="bg-zinc-850/80 text-zinc-500 border border-zinc-800/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            Pending
                          </span>
                        )}
                      </TableCell>

                      {/* Joined Date */}
                      <TableCell className="py-3 px-4 text-zinc-500 font-semibold text-left border-none select-none">
                        {member.joined}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}        {/* TIMELINE ROUNDS LIST TAB */}
        {activeTab === "timeline" && (
          <div className="flex flex-col gap-4 w-full">
            {mockTimeline.map((item) => (
              <div
                key={item.round}
                className="bg-[#0e1015] border border-[#1b1e25] rounded-xl px-6 py-4.5 flex items-center justify-between gap-4 hover:border-zinc-800 transition-colors animate-fadeIn"
              >
                {/* Timeline circle and detail block */}
                <div className="flex items-center gap-4">
                  {/* Round number circle */}
                  <div
                    className={`size-10 rounded-full border flex items-center justify-center font-bold text-sm select-none shrink-0 ${
                      item.isDone
                        ? "bg-[#10B981]/10 border-[#10B981]/20 text-[#10B981]"
                        : "bg-[#00ADEF]/10 border-[#00ADEF]/20 text-[#00ADEF]"
                    }`}
                  >
                    {item.round}
                  </div>
                  {/* Recipient name and target date */}
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-white text-sm tracking-tight leading-none">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium leading-none select-none mt-1.5">
                      Payout Date: {item.date}
                    </span>
                  </div>
                </div>

                {/* Amount and payout state indicator */}
                <div className="flex items-center gap-4 select-none">
                  <span className="text-sm font-bold text-[#10B981]">{item.amount}</span>
                  <span
                    className={`px-3 py-1 text-[10px] font-bold rounded-full border leading-none tracking-wide ${
                      item.isDone
                        ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
                        : "bg-[#00ADEF]/10 text-[#00ADEF] border-[#00ADEF]/20"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsGroupDetails;
