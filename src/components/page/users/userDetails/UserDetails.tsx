"use client";

import React, { useState } from "react";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { ArrowLeft, Ban, FileText } from "lucide-react";
import { IUser } from "@/types/user";

interface UserDetailsProps {
  user?: IUser;
  userId?: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const updateSearchParams = useUpdateSearchParams();
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "groups" | "kyc">("overview");

  // Helper to compute initials from full name
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Mock static data to match the mockup screens perfectly (Amara Okonkwo details)
  const baseUserData = {
    name: "Amara Okonkwo",
    email: "amara.o@gmail.com",
    phone: "+234 801 234 5678",
    country: "Nigeria",
    id: "U-4821",
    totalContributions: "$12,400",
    totalReceived: "$9,800",
    kycStatus: "Approved",
    accountDetails: {
      memberSince: "March 15, 2025",
      lastLogin: "2026-06-10 09:02",
      groupsJoined: 3,
      groupsCompleted: 1,
      subscription: "Plus",
    },
    transactions: [
      { id: "TXN-98421", amount: "$500", group: "Lagos Tech Savers", date: "2026-06-10", status: "completed", isGreen: false },
      { id: "TXN-97841", amount: "$6,000", group: "Lagos Tech Savers", date: "2026-05-14", status: "completed", isGreen: true },
      { id: "TXN-96210", amount: "$500", group: "Lagos Tech Savers", date: "2026-05-10", status: "completed", isGreen: false },
      { id: "TXN-94801", amount: "$500", group: "Lagos Tech Savers", date: "2026-04-10", status: "completed", isGreen: false },
    ],
    groups: [
      { id: "G-1001", name: "Lagos Tech Savers", status: "active", role: "Member", contribution: "$500/mo", position: "Cycle 8", joined: "2025-05-01" },
      { id: "G-1002", name: "Alpha Investment", status: "active", role: "Member", contribution: "$1,000/mo", position: "Cycle 3", joined: "2025-08-15" },
      { id: "G-1003", name: "UK Diaspora Fund", status: "completed", role: "Admin", contribution: "$200/wk", position: "Completed", joined: "2024-12-01" },
    ],
    kycDocuments: [
      { name: "Passport", status: "Approved", date: "2025-03-10" },
      { name: "Selfie Verification", status: "Approved", date: "2025-03-10" },
      { name: "Address Proof", status: "Approved", date: "2025-03-10" },
    ]
  };

  // Merge static mockup fields with user object when user exists
  const isDemoAmara = !user || user._id === "01";
  const name = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : baseUserData.name;
  const email = user?.email || baseUserData.email;
  const id = user?._id ? `U-48${user._id}` : baseUserData.id;
  const phone = baseUserData.phone;
  const location = user?.location || "Nigeria";
  const isUAE = location.toLowerCase().includes("uae") || location.toLowerCase().includes("dubai") || location.toLowerCase().includes("abu dhabi") || location.toLowerCase().includes("sharjah") || location.toLowerCase().includes("ajman") || location.toLowerCase().includes("fujairah") || location.toLowerCase().includes("ras al khaimah") || location.toLowerCase().includes("umm al quwain");
  const flag = isUAE ? "🇦🇪" : "🇳🇬";
  const country = isUAE ? "UAE" : "Nigeria";
  const isSuspended = user?.isBlocked || false;

  const userData = {
    ...baseUserData,
    name,
    email,
    id,
    phone,
    country,
    kycStatus: isDemoAmara ? "Approved" : (!isSuspended ? "Pending" : "Rejected"),
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-8 text-white select-text">
      {/* Back button action row */}
      <div>
        <button
          onClick={() => updateSearchParams("userId", null)}
          className="flex items-center gap-2 bg-[#0b131e]/40 border border-[#1b1e25] text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="size-3.5" /> Back to Users
        </button>
      </div>

      {/* Profile summary card */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-6">
        {/* Top Details & Suspend Actions row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Initials Avatar */}
            <div className="size-14 rounded-full bg-purple-600/20 text-[#c084fc] flex items-center justify-center font-extrabold text-xl select-none shrink-0 border border-purple-500/20 shadow-inner">
              {getInitials(userData.name)}
            </div>
            {/* Identity details block */}
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="flex items-center flex-wrap gap-2.5">
                <h2 className="text-xl font-extrabold text-white tracking-tight leading-none truncate">
                  {userData.name}
                </h2>
                <div className="flex items-center gap-1.5 select-none">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full text-[9px] font-extrabold leading-none">
                    Verified
                  </span>
                  <span className={`border px-2 py-0.5 rounded-full text-[9px] font-extrabold leading-none ${
                    isSuspended
                      ? "bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]/25"
                      : "bg-[#00ADEF]/10 text-[#00ADEF] border-[#00ADEF]/25"
                  }`}>
                    {isSuspended ? "Suspended" : "Active"}
                  </span>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-400 font-medium">
                <span className="truncate">{userData.email}</span>
                <span className="text-[#1b1e25] select-none hidden md:inline">|</span>
                <span>{userData.phone}</span>
                <span className="text-[#1b1e25] select-none hidden md:inline">|</span>
                <span className="flex items-center gap-1">
                  <span>{flag}</span>
                  <span>{userData.country}</span>
                </span>
                <span className="text-[#1b1e25] select-none hidden md:inline">|</span>
                <span className="text-zinc-500 font-semibold">{userData.id}</span>
              </div>
            </div>
          </div>
          {/* Action button on far right */}
          <div className="shrink-0 w-full sm:w-auto mt-2 sm:mt-0 select-none">
            <button className="w-full sm:w-auto bg-[#ff3b30]/5 hover:bg-[#ff3b30]/10 border border-[#ff3b30]/30 text-[#ff3b30] font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95">
              <Ban className="size-3.5" /> Suspend
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-[#1b1e25]/60 w-full" />

        {/* 3 Outlined Statistics cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Contributions */}
          <div className="bg-[#07080a] border border-[#1b1e25] p-5 rounded-xl flex-1 flex flex-col gap-2 hover:border-[#00ADEF]/30 transition-all duration-200">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest leading-none">
              Total Contributions
            </span>
            <span className="text-[20px] font-extrabold text-[#00ADEF] mt-1.5 tracking-tight leading-none">
              {userData.totalContributions}
            </span>
          </div>
          {/* Received */}
          <div className="bg-[#07080a] border border-[#1b1e25] p-5 rounded-xl flex-1 flex flex-col gap-2 hover:border-[#10B981]/30 transition-all duration-200">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest leading-none">
              Total Received
            </span>
            <span className="text-[20px] font-extrabold text-[#10B981] mt-1.5 tracking-tight leading-none">
              {userData.totalReceived}
            </span>
          </div>
          {/* KYC Status */}
          <div className="bg-[#07080a] border border-[#1b1e25] p-5 rounded-xl flex-1 flex flex-col gap-2 hover:border-[#10B981]/30 transition-all duration-200">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest leading-none">
              KYC Status
            </span>
            <span className="text-[20px] font-extrabold text-[#10B981] mt-1.5 tracking-tight leading-none">
              {userData.kycStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs navigation row */}
      <div className="flex border-b border-[#1b1e25] select-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-6 py-3 text-sm font-semibold cursor-pointer border-b-2 transition-all duration-200 leading-none ${
            activeTab === "overview"
              ? "border-[#00ADEF] text-[#00ADEF]"
              : "border-transparent text-[#64748b] hover:text-zinc-200"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-6 py-3 text-sm font-semibold cursor-pointer border-b-2 transition-all duration-200 leading-none ${
            activeTab === "transactions"
              ? "border-[#00ADEF] text-[#00ADEF]"
              : "border-transparent text-[#64748b] hover:text-zinc-200"
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab("groups")}
          className={`px-6 py-3 text-sm font-semibold cursor-pointer border-b-2 transition-all duration-200 leading-none ${
            activeTab === "groups"
              ? "border-[#00ADEF] text-[#00ADEF]"
              : "border-transparent text-[#64748b] hover:text-zinc-200"
          }`}
        >
          Groups
        </button>
        <button
          onClick={() => setActiveTab("kyc")}
          className={`px-6 py-3 text-sm font-semibold cursor-pointer border-b-2 transition-all duration-200 leading-none ${
            activeTab === "kyc"
              ? "border-[#00ADEF] text-[#00ADEF]"
              : "border-transparent text-[#64748b] hover:text-zinc-200"
          }`}
        >
          KYC Documents
        </button>
      </div>

      {/* Tab Contents */}
      <div className="w-full">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider select-none leading-none border-b border-[#1b1e25] pb-3">
              Account Details
            </h3>
            <div className="flex flex-col gap-4 text-xs font-medium text-zinc-300">
              <div className="flex justify-between items-center py-1">
                <span className="text-[#64748b]">Member Since</span>
                <span className="text-zinc-100">{userData.accountDetails.memberSince}</span>
              </div>
              <div className="h-px bg-[#1b1e25]/60 w-full" />
              <div className="flex justify-between items-center py-1">
                <span className="text-[#64748b]">Last Login</span>
                <span className="text-zinc-100">{userData.accountDetails.lastLogin}</span>
              </div>
              <div className="h-px bg-[#1b1e25]/60 w-full" />
              <div className="flex justify-between items-center py-1">
                <span className="text-[#64748b]">Total Groups Joined</span>
                <span className="text-zinc-100">{userData.accountDetails.groupsJoined}</span>
              </div>
              <div className="h-px bg-[#1b1e25]/60 w-full" />
              <div className="flex justify-between items-center py-1">
                <span className="text-[#64748b]">Groups Completed</span>
                <span className="text-zinc-100">{userData.accountDetails.groupsCompleted}</span>
              </div>
              <div className="h-px bg-[#1b1e25]/60 w-full" />
              <div className="flex justify-between items-center py-1">
                <span className="text-[#64748b]">Subscription</span>
                <span className="text-purple-400 font-semibold">{userData.accountDetails.subscription}</span>
              </div>
            </div>
          </div>
        )}

        {/* TRANSACTIONS TAB */}
        {activeTab === "transactions" && (
          <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md overflow-x-auto w-full">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-[#64748b] font-bold border-b border-[#1b1e25] pb-2 select-none uppercase tracking-wider text-[10px] h-10">
                  <th className="py-2 pr-3">TXN ID</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Group</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 pl-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300 font-medium">
                {userData.transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-[#1b1e25]/60 hover:bg-[#121520]/20 h-14">
                    <td className="py-2 pr-3 font-semibold text-[#00ADEF]">{txn.id}</td>
                    <td className={`py-2 px-3 font-extrabold ${txn.isGreen ? "text-emerald-400" : "text-white"}`}>
                      {txn.amount}
                    </td>
                    <td className="py-2 px-3">{txn.group}</td>
                    <td className="py-2 px-3 text-[#64748b] font-semibold select-none">{txn.date}</td>
                    <td className="py-2 pl-3 select-none">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold lowercase">
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* GROUPS TAB */}
        {activeTab === "groups" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userData.groups.map((group) => (
              <div
                key={group.id}
                className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-4"
              >
                {/* Title & Badge */}
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-extrabold text-white text-[15px] truncate leading-none">
                    {group.name}
                  </h4>
                  <span className={`px-2.5 py-0.5 text-[9px] font-extrabold rounded-full select-none leading-none border ${
                    group.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-[#00ADEF]/10 text-[#00ADEF] border-[#00ADEF]/20"
                  }`}>
                    {group.status}
                  </span>
                </div>
                {/* Separator */}
                <div className="h-px bg-[#1b1e25]/60 w-full" />
                {/* Details list */}
                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748b] font-medium">Group ID</span>
                    <span className="text-zinc-300 font-semibold">{group.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748b] font-medium">Role</span>
                    <span className="text-zinc-300 font-semibold">{group.role}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748b] font-medium">Contribution</span>
                    <span className="text-white font-bold">{group.contribution}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748b] font-medium">Payout Position</span>
                    <span className="text-zinc-300 font-semibold">{group.position}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748b] font-medium">Joined</span>
                    <span className="text-[#64748b] font-semibold select-none">{group.joined}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KYC DOCUMENTS TAB */}
        {activeTab === "kyc" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userData.kycDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00ADEF]/10 text-[#00ADEF] flex items-center justify-center shrink-0 border border-[#00ADEF]/20 shadow-inner">
                    <FileText className="size-5" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="font-bold text-white text-[13px] leading-tight">
                      {doc.name}
                    </h4>
                    <span className="text-[10px] text-[#64748b] font-semibold leading-none select-none mt-1">
                      Uploaded {doc.date}
                    </span>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold select-none leading-none">
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
