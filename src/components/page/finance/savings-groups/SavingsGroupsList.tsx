"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Wallet,
  Calendar,
  RotateCw,
  Activity,
  DollarSign,
} from "lucide-react";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

interface SavingsGroup {
  id: string;
  name: string;
  flag: string;
  status: "Active" | "Completed";
  members: number;
  contribution: number;
  poolAmount: number;
  cycle: string;
  totalCycle: number;
  currentCycle: number;
}

const mockGroups: SavingsGroup[] = [
  {
    id: "G-1001",
    name: "Lagos Tech Savers",
    flag: "🇳🇬",
    status: "Active",
    members: 12,
    contribution: 500,
    poolAmount: 6000,
    cycle: "Monthly",
    totalCycle: 5,
    currentCycle: 2,
  },
  {
    id: "G-1002",
    name: "Alpha Investment Circle",
    flag: "🇦🇪",
    status: "Active",
    members: 12,
    contribution: 500,
    poolAmount: 6000,
    cycle: "Monthly",
    totalCycle: 5,
    currentCycle: 2,
  },
  {
    id: "G-1003",
    name: "UK Diaspora Fund",
    flag: "🇬🇧",
    status: "Active",
    members: 12,
    contribution: 500,
    poolAmount: 6000,
    cycle: "Monthly",
    totalCycle: 5,
    currentCycle: 2,
  },
  {
    id: "G-1004",
    name: "Lagos Tech Savers",
    flag: "🇳🇬",
    status: "Completed",
    members: 12,
    contribution: 500,
    poolAmount: 6000,
    cycle: "Monthly",
    totalCycle: 5,
    currentCycle: 2,
  },
  {
    id: "G-1005",
    name: "Alpha Investment Circle",
    flag: "🇦🇪",
    status: "Active",
    members: 12,
    contribution: 500,
    poolAmount: 6000,
    cycle: "Monthly",
    totalCycle: 5,
    currentCycle: 2,
  },
  {
    id: "G-1006",
    name: "UK Diaspora Fund",
    flag: "🇬🇧",
    status: "Active",
    members: 12,
    contribution: 500,
    poolAmount: 6000,
    cycle: "Monthly",
    totalCycle: 5,
    currentCycle: 2,
  },
];

const SavingsGroupsList = () => {
  const updateSearchParams = useUpdateSearchParams();
  const [currentDate, setCurrentDate] = useState("Wednesday, June 10, 2026");

  useEffect(() => {
    const formatted = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formatted);
  }, []);

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
            4,821
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Total Groups
          </span>
        </div>
        {/* Active Groups */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 h-[120px] flex flex-col justify-between hover:border-[#10B981]/30 transition-all duration-300 shadow-md">
          <span className="text-[28px] font-extrabold text-[#10B981] tracking-tight leading-none">
            5
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Active
          </span>
        </div>
        {/* Completed Groups */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 h-[120px] flex flex-col justify-between hover:border-[#c084fc]/30 transition-all duration-300 shadow-md">
          <span className="text-[28px] font-extrabold text-[#c084fc] tracking-tight leading-none">
            1
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Completed
          </span>
        </div>
      </div>

      {/* All Savings Groups Heading */}
      <div className="flex flex-col gap-4 mt-2">
        <h2 className="text-xs font-bold text-[#64748b] uppercase tracking-wider select-none">
          All Savings Groups
        </h2>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGroups.map((group) => {
            const isActive = group.status === "Active";
            return (
              <div
                key={group.id}
                className={`bg-[#0e1015] border border-[#1b1e25] rounded-2xl p-6 shadow-lg hover:border-zinc-800 transition-all duration-300 flex flex-col gap-5`}
              >
                {/* Card Title Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none select-none">{group.flag}</span>
                      <h3 className="font-extrabold text-white text-[15px] truncate leading-none">
                        {group.name}
                      </h3>
                    </div>
                    <span className="text-[10px] text-zinc-550 font-bold select-none uppercase tracking-wider mt-0.5">
                      {group.id}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full select-none leading-none border ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-450 border-emerald-500/20"
                        : "bg-[#00ADEF]/10 text-[#00ADEF] border-[#00ADEF]/20"
                    }`}
                  >
                    {group.status}
                  </span>
                </div>

                {/* Sub-cards Info Grid */}
                <div className="grid grid-cols-2 gap-3 select-none">
                  {/* Members */}
                  <div className="bg-[#07080a] border border-[#1b1e25] p-3.5 rounded-xl flex flex-col gap-1 hover:border-zinc-800 transition-colors">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                      <Users className="size-3 text-zinc-500" /> Members
                    </span>
                    <span className="text-white text-xs font-bold mt-1 block">
                      {group.members} people
                    </span>
                  </div>

                  {/* Contribution */}
                  <div className="bg-[#07080a] border border-[#1b1e25] p-3.5 rounded-xl flex flex-col gap-1 hover:border-zinc-800 transition-colors">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                      <DollarSign className="size-3 text-zinc-500" /> Contribution
                    </span>
                    <span className="text-white text-xs font-bold mt-1 block">
                      ${group.contribution}
                    </span>
                  </div>

                  {/* Pool Amount */}
                  <div className="bg-[#07080a] border border-[#1b1e25] p-3.5 rounded-xl flex flex-col gap-1 hover:border-zinc-800 transition-colors">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                      <Wallet className="size-3 text-zinc-500" /> Pool Amount
                    </span>
                    <span className="text-white text-xs font-bold mt-1 block">
                      ${group.poolAmount.toLocaleString()}
                    </span>
                  </div>

                  {/* Cycle */}
                  <div className="bg-[#07080a] border border-[#1b1e25] p-3.5 rounded-xl flex flex-col gap-1 hover:border-zinc-800 transition-colors">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                      <Calendar className="size-3 text-zinc-500" /> Cycle
                    </span>
                    <span className="text-white text-xs font-bold mt-1 block">
                      {group.cycle}
                    </span>
                  </div>

                  {/* Total Cycle */}
                  <div className="bg-[#07080a] border border-[#1b1e25] p-3.5 rounded-xl flex flex-col gap-1 hover:border-zinc-800 transition-colors">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                      <RotateCw className="size-3 text-zinc-500" /> Total Cycle
                    </span>
                    <span className="text-white text-xs font-bold mt-1 block">
                      {group.totalCycle}
                    </span>
                  </div>

                  {/* Current Cycle */}
                  <div className="bg-[#07080a] border border-[#1b1e25] p-3.5 rounded-xl flex flex-col gap-1 hover:border-zinc-800 transition-colors">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5 leading-none">
                      <Activity className="size-3 text-zinc-500" /> Current Cycle
                    </span>
                    <span className="text-white text-xs font-bold mt-1 block">
                      {group.currentCycle}
                    </span>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => updateSearchParams("groupId", group.id)}
                  className="w-full bg-[#0b131e]/50 hover:bg-[#00ADEF]/10 border border-[#00ADEF]/20 text-[#00ADEF] font-bold py-3.5 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer select-none active:scale-[0.98] mt-1"
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavingsGroupsList;
