"use client";

import React, { useState, useEffect } from "react";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import {
  ArrowLeft,
  Trash2,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  UserCheck,
  UserX,
  ExternalLink,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Building2,
  Calendar,
  Eye,
  X
} from "lucide-react";
import { IUser, IUserGroup, IUserTransaction } from "@/types/user";
import DeleteModal from "@/components/modals/DeleteModal";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { getImageUrl } from "@/utils/image";

interface UserDetailsProps {
  user?: IUser;
  userId?: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user: initialUser }) => {
  const updateSearchParams = useUpdateSearchParams();
  const [user, setUser] = useState<IUser | undefined>(initialUser);
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "groups" | "kyc">("overview");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  // Helper to compute initials from full name
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleDeleteUser = async (id: string) => {
    toast.loading("Deleting user...", { id: "delete-user" });
    try {
      const res = await myFetch(`/user/${id}`, {
        method: "DELETE",
      });
      if (res?.success) {
        toast.success(res?.message || "User deleted successfully", { id: "delete-user" });
        updateSearchParams("userId", null);
        window.location.reload();
      } else {
        toast.error(res?.message || "Failed to delete user", { id: "delete-user" });
      }
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error("Failed to delete user", { id: "delete-user" });
    }
  };

  const handleUpdateStatus = async (newStatus: "active" | "restricted") => {
    if (!user?._id) return;
    setIsUpdatingStatus(true);
    toast.loading("Updating user status...", { id: "user-status" });
    try {
      const res = await myFetch(`/user/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res?.success) {
        toast.success(`User status updated to ${newStatus}`, { id: "user-status" });
        setUser((prev) => (prev ? { ...prev, status: newStatus } : prev));
      } else {
        toast.error(res?.message || "Failed to update status", { id: "user-status" });
      }
    } catch (error) {
      console.error("Update status error:", error);
      toast.error("Failed to update user status", { id: "user-status" });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleUpdateKycStatus = async (newKycStatus: "approved" | "rejected" | "pending" | "unverified") => {
    if (!user?._id) return;
    toast.loading("Updating KYC status...", { id: "kyc-status" });
    try {
      const res = await myFetch(`/user/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kycStatus: newKycStatus }),
      });

      if (res?.success) {
        toast.success(`KYC status updated to ${newKycStatus}`, { id: "kyc-status" });
        setUser((prev) => (prev ? { ...prev, kycStatus: newKycStatus } : prev));
      } else {
        toast.error(res?.message || "Failed to update KYC status", { id: "kyc-status" });
      }
    } catch (error) {
      console.error("Update KYC error:", error);
      toast.error("Failed to update KYC status", { id: "kyc-status" });
    }
  };

  // Derived fields
  const displayName = user?.fullName || user?.email || "User";
  const displayEmail = user?.email || "N/A";
  const displayId = user?._id || "N/A";
  const phone = user?.phoneNumber || "N/A";
  const location = user?.address || "N/A";

  const isUAE = location.toLowerCase().includes("uae") || location.toLowerCase().includes("dubai");
  const flag = isUAE ? "🇦🇪" : "🇳🇬";
  const country = location;

  const isSuspended = user?.status === "restricted";
  const isVerified = user?.verified || user?.kycStatus === "approved";
  const rawKyc = user?.kycStatus || "unverified";
  const kycStatus = rawKyc.charAt(0).toUpperCase() + rawKyc.slice(1);

  // Format dates
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-8 text-white select-text">
      {/* Back button action row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => updateSearchParams("userId", null)}
          className="flex items-center gap-2 bg-[#0b131e]/40 border border-[#1b1e25] text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
        >
          <ArrowLeft className="size-3.5" /> Back to Users
        </button>
      </div>

      {/* Profile summary card */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-6">
        {/* Top Details & Action Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Initials / Profile Avatar */}
            <div className="size-16 rounded-full bg-purple-600/20 text-[#c084fc] flex items-center justify-center font-extrabold text-2xl select-none shrink-0 border border-purple-500/20 shadow-inner overflow-hidden relative">
              {user?.image || user?.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getImageUrl(user.image || user.photo)}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(displayName)
              )}
            </div>
            {/* Identity details block */}
            <div className="flex flex-col gap-2 min-w-0">
              <div className="flex items-center flex-wrap gap-2.5">
                <h2 className="text-2xl font-extrabold text-white tracking-tight leading-none truncate">
                  {displayName}
                </h2>
                <div className="flex items-center gap-1.5 select-none">
                  <span
                    className={`border px-2.5 py-0.5 rounded-full text-[10px] font-extrabold leading-none ${
                      isVerified
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700/25"
                    }`}
                  >
                    {isVerified ? "Verified" : "Unverified"}
                  </span>
                  <span
                    className={`border px-2.5 py-0.5 rounded-full text-[10px] font-extrabold leading-none ${
                      isSuspended
                        ? "bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]/25"
                        : "bg-[#00ADEF]/10 text-[#00ADEF] border-[#00ADEF]/25"
                    }`}
                  >
                    {isSuspended ? "Suspended" : "Active"}
                  </span>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-400 font-medium">
                <span className="truncate">{displayEmail}</span>
                <span className="text-[#1b1e25] select-none hidden md:inline">|</span>
                <span>{phone}</span>
                <span className="text-[#1b1e25] select-none hidden md:inline">|</span>
                <span className="flex items-center gap-1">
                  <span>{flag}</span>
                  <span>{country}</span>
                </span>
                <span className="text-[#1b1e25] select-none hidden md:inline">|</span>
                <span className="text-zinc-500 font-mono text-[11px]">ID: {displayId}</span>
              </div>
            </div>
          </div>

          {/* Action buttons on far right */}
          <div className="flex items-center flex-wrap gap-3 shrink-0 select-none">
            {/* Status Toggle Button */}
            {isSuspended ? (
              <button
                disabled={isUpdatingStatus}
                onClick={() => handleUpdateStatus("active")}
                className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <UserCheck className="size-3.5" /> Activate Account
              </button>
            ) : (
              <button
                disabled={isUpdatingStatus}
                onClick={() => handleUpdateStatus("restricted")}
                className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <UserX className="size-3.5" /> Suspend Account
              </button>
            )}

            {/* Delete User */}
            {user?._id && (
              <DeleteModal
                itemId={user._id}
                title="Are you sure you want to delete this user?"
                triggerBtn={
                  <button className="bg-[#ff3b30]/5 hover:bg-[#ff3b30]/10 border border-[#ff3b30]/30 text-[#ff3b30] font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95">
                    <Trash2 className="size-3.5" /> Delete User
                  </button>
                }
                action={handleDeleteUser}
              />
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-[#1b1e25]/60 w-full" />

        {/* Outlined Statistics cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Contributions */}
          <div className="bg-[#07080a] border border-[#1b1e25] p-5 rounded-xl flex-1 flex flex-col gap-2 hover:border-[#00ADEF]/30 transition-all duration-200">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest leading-none flex items-center justify-between">
              Total Contributions
              <DollarSign className="size-3.5 text-[#00ADEF]" />
            </span>
            <span
              className={`text-[22px] font-extrabold mt-1 tracking-tight leading-none ${
                user?.stats?.totalContribution ? "text-[#00ADEF]" : "text-[#64748b]"
              }`}
            >
              ${user?.stats?.totalContribution?.toLocaleString() || "0"}
            </span>
          </div>
          {/* Received */}
          <div className="bg-[#07080a] border border-[#1b1e25] p-5 rounded-xl flex-1 flex flex-col gap-2 hover:border-[#10B981]/30 transition-all duration-200">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest leading-none flex items-center justify-between">
              Total Received
              <CreditCard className="size-3.5 text-emerald-400" />
            </span>
            <span
              className={`text-[22px] font-extrabold mt-1 tracking-tight leading-none ${
                user?.stats?.totalSavings ? "text-[#10B981]" : "text-[#64748b]"
              }`}
            >
              ${user?.stats?.totalSavings?.toLocaleString() || "0"}
            </span>
          </div>
          {/* KYC Status */}
          <div className="bg-[#07080a] border border-[#1b1e25] p-5 rounded-xl flex-1 flex flex-col gap-2 hover:border-purple-500/30 transition-all duration-200">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest leading-none flex items-center justify-between">
              KYC Status
              <ShieldAlert className="size-3.5 text-purple-400" />
            </span>
            <span
              className={`text-[22px] font-extrabold mt-1 tracking-tight leading-none ${
                rawKyc === "approved"
                  ? "text-emerald-400"
                  : rawKyc === "pending"
                  ? "text-amber-400"
                  : rawKyc === "rejected"
                  ? "text-red-400"
                  : "text-[#64748b]"
              }`}
            >
              {kycStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs navigation row */}
      <div className="flex border-b border-[#1b1e25] select-none gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-all duration-200 leading-none ${
            activeTab === "overview"
              ? "border-[#00ADEF] text-[#00ADEF]"
              : "border-transparent text-[#64748b] hover:text-zinc-200"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-all duration-200 leading-none flex items-center gap-2 ${
            activeTab === "transactions"
              ? "border-[#00ADEF] text-[#00ADEF]"
              : "border-transparent text-[#64748b] hover:text-zinc-200"
          }`}
        >
          Transactions
          {user?.transactions && user.transactions.length > 0 && (
            <span className="bg-[#1b1e25] text-zinc-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
              {user.transactions.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("groups")}
          className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-all duration-200 leading-none flex items-center gap-2 ${
            activeTab === "groups"
              ? "border-[#00ADEF] text-[#00ADEF]"
              : "border-transparent text-[#64748b] hover:text-zinc-200"
          }`}
        >
          Groups
          {user?.groups && user.groups.length > 0 && (
            <span className="bg-[#1b1e25] text-zinc-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
              {user.groups.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("kyc")}
          className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-all duration-200 leading-none ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Details Box */}
            <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider select-none leading-none border-b border-[#1b1e25] pb-3 flex items-center gap-2">
                <Building2 className="size-4 text-[#00ADEF]" /> Account Overview
              </h3>
              <div className="flex flex-col gap-3.5 text-xs font-medium text-zinc-300">
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#64748b]">Member Since</span>
                  <span className="text-zinc-100 font-semibold">{memberSince}</span>
                </div>
                <div className="h-px bg-[#1b1e25]/60 w-full" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#64748b]">Total Groups Joined</span>
                  <span className="text-zinc-100 font-semibold">{user?.stats?.totalGroupsJoined || "0"}</span>
                </div>
                <div className="h-px bg-[#1b1e25]/60 w-full" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#64748b]">Plan / Role</span>
                  <span className="text-purple-400 font-bold uppercase text-[11px]">{user?.role === "admin" ? "Admin" : "User"}</span>
                </div>
                <div className="h-px bg-[#1b1e25]/60 w-full" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#64748b]">Account Status</span>
                  <span className={`font-bold capitalize ${isSuspended ? "text-red-400" : "text-emerald-400"}`}>
                    {user?.status || "active"}
                  </span>
                </div>
                <div className="h-px bg-[#1b1e25]/60 w-full" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#64748b]">Stripe Account</span>
                  <span className={`font-semibold ${user?.stripeConnected ? "text-emerald-400" : "text-zinc-400"}`}>
                    {user?.stripeConnected ? `Connected (${user.stripeAccountId || "Yes"})` : "Not Connected"}
                  </span>
                </div>
              </div>
            </div>

            {/* Personal Details Box */}
            <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider select-none leading-none border-b border-[#1b1e25] pb-3 flex items-center gap-2">
                <Users className="size-4 text-purple-400" /> Personal Details
              </h3>
              <div className="flex flex-col gap-3.5 text-xs font-medium text-zinc-300">
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#64748b]">Full Name</span>
                  <span className="text-zinc-100 font-semibold">{displayName}</span>
                </div>
                <div className="h-px bg-[#1b1e25]/60 w-full" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#64748b]">Email Address</span>
                  <span className="text-zinc-100 font-semibold">{displayEmail}</span>
                </div>
                <div className="h-px bg-[#1b1e25]/60 w-full" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#64748b]">Phone Number</span>
                  <span className="text-zinc-100 font-semibold">{phone}</span>
                </div>
                <div className="h-px bg-[#1b1e25]/60 w-full" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#64748b]">Location / Address</span>
                  <span className="text-zinc-100 font-semibold truncate max-w-[200px]" title={location}>
                    {location}
                  </span>
                </div>
                <div className="h-px bg-[#1b1e25]/60 w-full" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#64748b]">KYC Verification</span>
                  <span className={`font-bold capitalize ${
                    rawKyc === "approved" ? "text-emerald-400" : rawKyc === "pending" ? "text-amber-400" : "text-red-400"
                  }`}>
                    {rawKyc}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRANSACTIONS TAB */}
        {activeTab === "transactions" && (
          <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider select-none leading-none border-b border-[#1b1e25] pb-3 flex items-center gap-2">
              <CreditCard className="size-4 text-[#00ADEF]" /> Recent Transactions ({user?.transactions?.length || 0})
            </h3>
            {user?.transactions && user.transactions.length > 0 ? (
              <div className="flex flex-col gap-3">
                {user.transactions.map((txn: IUserTransaction, idx: number) => {
                  const senderIdStr = (typeof txn.senderId === "object" ? txn.senderId?._id : txn.senderId)?.toString();
                  const receiverIdStr = (typeof txn.receiverId === "object" ? txn.receiverId?._id : txn.receiverId)?.toString();
                  const currentUserIdStr = user?._id?.toString();

                  const isSender = senderIdStr ? senderIdStr === currentUserIdStr : receiverIdStr !== currentUserIdStr;
                  const amt = (isSender ? txn.amount : txn.transferAmount) || txn.amount || txn.transferAmount || 0;
                  const senderName = typeof txn.senderId === "object" ? txn.senderId?.fullName || txn.senderId?.email : "User";
                  const receiverName = typeof txn.receiverId === "object" ? txn.receiverId?.fullName || txn.receiverId?.email : "User";

                  return (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#07080a] border border-[#1b1e25] rounded-xl p-4 gap-4 hover:border-[#00ADEF]/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-10 rounded-full flex items-center justify-center shrink-0 border ${
                            isSender
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}
                        >
                          {isSender ? <ArrowUpRight className="size-5" /> : <ArrowDownLeft className="size-5" />}
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-sm">
                              {isSender ? "Sent Contribution" : "Received Payout"}
                            </span>
                            {txn.groupId?.name && (
                              <span className="text-xs text-[#00ADEF] bg-[#00ADEF]/10 border border-[#00ADEF]/20 px-2 py-0.5 rounded-full font-semibold">
                                {txn.groupId.name}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium flex-wrap">
                            <span>ID: <span className="font-mono text-zinc-300">{txn.transactionId || "N/A"}</span></span>
                            <span>•</span>
                            <span>{isSender ? `To: ${receiverName}` : `From: ${senderName}`}</span>
                            {txn.periodNumber && (
                              <>
                                <span>•</span>
                                <span>Period #{txn.periodNumber}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0 gap-1">
                        <span className={`text-base font-extrabold ${isSender ? "text-amber-400" : "text-emerald-400"}`}>
                          ${amt?.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full border ${
                              txn.status === "paid"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : txn.status === "failed"
                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            }`}
                          >
                            {txn.status || "paid"}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-medium">
                            {txn.paymentDate
                              ? new Date(txn.paymentDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-[#64748b] font-medium text-sm py-12 bg-[#07080a] rounded-xl border border-[#1b1e25]">
                No recent transactions found for this user.
              </div>
            )}
          </div>
        )}

        {/* GROUPS TAB */}
        {activeTab === "groups" && (
          <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider select-none leading-none border-b border-[#1b1e25] pb-3 flex items-center gap-2">
              <Users className="size-4 text-[#00ADEF]" /> Joined Groups ({user?.groups?.length || 0})
            </h3>
            {user?.groups && user.groups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.groups.map((group: IUserGroup, idx: number) => {
                  const adminName = typeof group.admin === "object" ? group.admin?.fullName || group.admin?.email : "N/A";
                  const membersCount = group.members?.length || 0;

                  return (
                    <div
                      key={idx}
                      className="bg-[#07080a] border border-[#1b1e25] rounded-xl p-5 flex flex-col gap-4 hover:border-[#00ADEF]/40 transition-all duration-200"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex flex-col gap-1">
                          <h4 className="font-extrabold text-white text-base leading-snug">{group.name}</h4>
                          <span className="text-xs text-zinc-400 font-medium">
                            Admin: <span className="text-zinc-200">{adminName}</span>
                          </span>
                        </div>
                        <span
                          className={`text-[9px] uppercase font-extrabold px-2.5 py-1 rounded-full border ${
                            group.status === "active"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                              : group.status === "completed"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/25"
                              : "bg-zinc-800 text-zinc-400 border-zinc-700/25"
                          }`}
                        >
                          {group.status}
                        </span>
                      </div>

                      <div className="h-px bg-[#1b1e25] w-full" />

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-[#64748b] font-bold uppercase">Target Pool</span>
                          <span className="text-white font-extrabold">${group.targetPoolAmount?.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-[#64748b] font-bold uppercase">Contribution</span>
                          <span className="text-[#00ADEF] font-extrabold">${group.contributionAmount?.toLocaleString() || "N/A"}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-[#64748b] font-bold uppercase">Frequency</span>
                          <span className="text-zinc-300 font-semibold capitalize">{group.paymentFrequency}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-[#64748b] font-bold uppercase">Members</span>
                          <span className="text-zinc-300 font-semibold">
                            {membersCount} {group.targetedMembers ? `/ ${group.targetedMembers}` : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-[#64748b] font-medium text-sm py-12 bg-[#07080a] rounded-xl border border-[#1b1e25]">
                This user has not joined any groups yet.
              </div>
            )}
          </div>
        )}

        {/* KYC DOCUMENTS TAB */}
        {activeTab === "kyc" && (
          <div className="flex flex-col gap-6">
            {/* Documents Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ID Front */}
              <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-5 shadow-md flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-[#64748b] font-bold uppercase tracking-wider border-b border-[#1b1e25] pb-3">
                  <span className="flex items-center gap-2 text-white">
                    <FileText className="size-4 text-[#00ADEF]" /> ID Document Front
                  </span>
                  {user?.idDocumentFront && (
                    <a
                      href={getImageUrl(user.idDocumentFront)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00ADEF] hover:underline flex items-center gap-1 text-[11px] font-semibold lowercase"
                    >
                      <ExternalLink className="size-3" /> View Full
                    </a>
                  )}
                </div>
                {user?.idDocumentFront ? (
                  <div className="flex flex-col gap-3">
                    <div
                      onClick={() =>
                        setPreviewImage({
                          url: getImageUrl(user.idDocumentFront),
                          title: "ID Document Front",
                        })
                      }
                      className="aspect-[16/9] rounded-xl overflow-hidden bg-[#07080a] border border-[#1b1e25] relative group cursor-pointer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getImageUrl(user.idDocumentFront)}
                        alt="ID Document Front"
                        className="object-contain w-full h-full p-2 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                        <Eye className="size-4" /> Click to Expand
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 bg-[#07080a] border border-[#1b1e25] p-2.5 rounded-lg text-xs font-mono text-zinc-400 break-all select-all">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase select-none">Full Document URL:</span>
                      <a
                        href={getImageUrl(user.idDocumentFront)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00ADEF] hover:underline text-[11px] truncate flex items-center gap-1.5"
                      >
                        <ExternalLink className="size-3 shrink-0" />
                        <span className="truncate">{getImageUrl(user.idDocumentFront)}</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[16/9] rounded-xl bg-[#07080a] border border-dashed border-[#1b1e25] flex flex-col items-center justify-center gap-2 text-zinc-500 text-xs">
                    <FileText className="size-8 opacity-40" />
                    <span>Not Uploaded Yet</span>
                  </div>
                )}
              </div>

              {/* ID Back */}
              <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-5 shadow-md flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-[#64748b] font-bold uppercase tracking-wider border-b border-[#1b1e25] pb-3">
                  <span className="flex items-center gap-2 text-white">
                    <FileText className="size-4 text-[#00ADEF]" /> ID Document Back
                  </span>
                  {user?.idDocumentBack && (
                    <a
                      href={getImageUrl(user.idDocumentBack)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00ADEF] hover:underline flex items-center gap-1 text-[11px] font-semibold lowercase"
                    >
                      <ExternalLink className="size-3" /> View Full
                    </a>
                  )}
                </div>
                {user?.idDocumentBack ? (
                  <div className="flex flex-col gap-3">
                    <div
                      onClick={() =>
                        setPreviewImage({
                          url: getImageUrl(user.idDocumentBack),
                          title: "ID Document Back",
                        })
                      }
                      className="aspect-[16/9] rounded-xl overflow-hidden bg-[#07080a] border border-[#1b1e25] relative group cursor-pointer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getImageUrl(user.idDocumentBack)}
                        alt="ID Document Back"
                        className="object-contain w-full h-full p-2 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                        <Eye className="size-4" /> Click to Expand
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 bg-[#07080a] border border-[#1b1e25] p-2.5 rounded-lg text-xs font-mono text-zinc-400 break-all select-all">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase select-none">Full Document URL:</span>
                      <a
                        href={getImageUrl(user.idDocumentBack)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00ADEF] hover:underline text-[11px] truncate flex items-center gap-1.5"
                      >
                        <ExternalLink className="size-3 shrink-0" />
                        <span className="truncate">{getImageUrl(user.idDocumentBack)}</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[16/9] rounded-xl bg-[#07080a] border border-dashed border-[#1b1e25] flex flex-col items-center justify-center gap-2 text-zinc-500 text-xs">
                    <FileText className="size-8 opacity-40" />
                    <span>Not Uploaded Yet</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1015] border border-[#1b1e25] rounded-2xl max-w-3xl w-full p-6 flex flex-col gap-4 relative animate-scaleIn shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1b1e25] pb-3">
              <h3 className="text-base font-extrabold text-white">{previewImage.title}</h3>
              <button
                onClick={() => setPreviewImage(null)}
                className="size-8 rounded-full bg-[#1b1e25] hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-[#07080a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[68vh] w-auto object-contain rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <a
                href={previewImage.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00ADEF] hover:bg-[#00adef]/80 text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all"
              >
                <ExternalLink className="size-3.5" /> Open Full Image
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
