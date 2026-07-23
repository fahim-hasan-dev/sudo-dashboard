"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Wallet,
  Calendar,
  RotateCw,
  Activity,
  DollarSign,
  Search,
} from "lucide-react";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

interface GroupItem {
  _id: string;
  name: string;
  status: string;
  visibility: string;
  targetPoolAmount: number;
  contributionAmount: number;
  paymentFrequency: string;
  targetedMembers: number;
  members?: any[];
  admin?: { fullName?: string; email?: string } | string;
  totalCycles: number;
  progress?: number;
  targetedTotalPullAmount?: number;
  totalCollectedAmount?: number;
  createdAt: string;
}

interface SavingsGroupsListProps {
  initialGroups?: GroupItem[];
  meta?: {
    page: number;
    totalPage: number;
    total: number;
  };
}

const SavingsGroupsList: React.FC<SavingsGroupsListProps> = ({
  initialGroups = [],
  meta,
}) => {
  const updateSearchParams = useUpdateSearchParams();
  const [currentDate, setCurrentDate] = useState("");
  const [groups, setGroups] = useState<GroupItem[]>(initialGroups);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    setGroups(initialGroups);
  }, [initialGroups]);

  useEffect(() => {
    const formatted = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formatted);
  }, []);

  // Filter groups
  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group._id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      group.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Calculate high level stats
  const totalGroups = meta?.total || groups.length;
  const activeCount = groups.filter((g) => g.status === "active").length;
  const completedCount = groups.filter((g) => g.status === "completed").length;

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-8 text-white select-text">
      {/* Title Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none">
          Saving Groups
        </h1>
        <span className="text-xs font-semibold text-zinc-500 tracking-wide mt-1 block">
          {currentDate}
        </span>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 select-none">
        {/* Total Groups */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 h-[120px] flex flex-col justify-between hover:border-[#00ADEF]/30 transition-all duration-300 shadow-md">
          <span className="text-[28px] font-extrabold text-[#00ADEF] tracking-tight leading-none">
            {totalGroups}
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Total Groups
          </span>
        </div>
        {/* Active Groups */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 h-[120px] flex flex-col justify-between hover:border-[#10B981]/30 transition-all duration-300 shadow-md">
          <span className="text-[28px] font-extrabold text-[#10B981] tracking-tight leading-none">
            {activeCount}
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Active
          </span>
        </div>
        {/* Completed Groups */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 h-[120px] flex flex-col justify-between hover:border-[#c084fc]/30 transition-all duration-300 shadow-md">
          <span className="text-[28px] font-extrabold text-[#c084fc] tracking-tight leading-none">
            {completedCount}
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Completed
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by group name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#08090d] border border-[#1b1e25] text-zinc-200 placeholder-zinc-500 pl-10 pr-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto select-none">
          {["all", "active", "pending", "paused", "completed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 text-xs font-bold rounded-xl capitalize transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#00ADEF] text-black shadow-md"
                  : "bg-[#0e1015] border border-[#1b1e25] text-zinc-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* All Savings Groups Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xs font-bold text-[#64748b] uppercase tracking-wider select-none">
          All Savings Groups ({filteredGroups.length})
        </h2>

        {/* Groups Grid */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => {
              const isActive = group.status === "active";
              const membersCount = group.members?.length || 0;
              const adminName =
                typeof group.admin === "object"
                  ? group.admin?.fullName || group.admin?.email
                  : "Admin";

              return (
                <div
                  key={group._id}
                  className="bg-[#0e1015] border border-[#1b1e25] rounded-2xl p-6 shadow-lg hover:border-zinc-800 transition-all duration-300 flex flex-col gap-5"
                >
                  {/* Card Title Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <h3 className="font-extrabold text-white text-base truncate leading-snug">
                        {group.name}
                      </h3>
                      <span className="text-[10px] text-zinc-500 font-mono select-none truncate">
                        ID: {group._id}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full select-none leading-none border shrink-0 ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : group.status === "completed"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : "bg-[#00ADEF]/10 text-[#00ADEF] border-[#00ADEF]/20"
                      }`}
                    >
                      {group.status}
                    </span>
                  </div>

                  {/* Sub-cards Info Grid */}
                  <div className="grid grid-cols-2 gap-3 select-none">
                    {/* Members */}
                    <div className="bg-[#07080a] border border-[#1b1e25] p-3 rounded-xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                        <Users className="size-3 text-zinc-500" /> Members
                      </span>
                      <span className="text-white text-xs font-bold mt-1 block">
                        {membersCount} {group.targetedMembers ? `/ ${group.targetedMembers}` : ""}
                      </span>
                    </div>

                    {/* Contribution */}
                    <div className="bg-[#07080a] border border-[#1b1e25] p-3 rounded-xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                        <DollarSign className="size-3 text-zinc-500" /> Contribution
                      </span>
                      <span className="text-[#00ADEF] text-xs font-bold mt-1 block">
                        ${group.contributionAmount?.toLocaleString()}
                      </span>
                    </div>

                    {/* Target Pool */}
                    <div className="bg-[#07080a] border border-[#1b1e25] p-3 rounded-xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                        <Wallet className="size-3 text-zinc-500" /> Target Pool
                      </span>
                      <span className="text-emerald-400 text-xs font-bold mt-1 block">
                        ${group.targetPoolAmount?.toLocaleString()}
                      </span>
                    </div>

                    {/* Frequency */}
                    <div className="bg-[#07080a] border border-[#1b1e25] p-3 rounded-xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                        <Calendar className="size-3 text-zinc-500" /> Frequency
                      </span>
                      <span className="text-white text-xs font-bold capitalize mt-1 block">
                        {group.paymentFrequency}
                      </span>
                    </div>

                    {/* Total Cycles */}
                    <div className="bg-[#07080a] border border-[#1b1e25] p-3 rounded-xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                        <RotateCw className="size-3 text-zinc-500" /> Cycles
                      </span>
                      <span className="text-white text-xs font-bold mt-1 block">
                        {group.totalCycles || 1}
                      </span>
                    </div>

                    {/* Admin */}
                    <div className="bg-[#07080a] border border-[#1b1e25] p-3 rounded-xl flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                        <Activity className="size-3 text-zinc-500" /> Creator
                      </span>
                      <span className="text-zinc-300 text-xs font-semibold truncate mt-1 block" title={adminName}>
                        {adminName}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => updateSearchParams("groupId", group._id)}
                    className="w-full bg-[#0b131e]/50 hover:bg-[#00ADEF]/10 border border-[#00ADEF]/20 text-[#00ADEF] font-bold py-3 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer select-none active:scale-[0.98] mt-1"
                  >
                    View Details
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-[#64748b] font-medium text-sm py-16 bg-[#0e1015] rounded-xl border border-[#1b1e25]">
            No savings groups found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsGroupsList;
