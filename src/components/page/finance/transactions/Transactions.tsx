"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Search, ExternalLink, ArrowUpRight, ArrowDownLeft, X } from "lucide-react";

interface ContributionItem {
  _id: string;
  transactionId?: string;
  stripeSessionId?: string;
  amount: number;
  commissionAmount?: number;
  transferAmount?: number;
  periodNumber?: number;
  status: string;
  paymentDate?: string;
  createdAt?: string;
  groupId?: {
    _id?: string;
    name?: string;
    targetPoolAmount?: number;
    paymentFrequency?: string;
    contributionAmount?: number;
  };
  senderId?: {
    _id?: string;
    fullName?: string;
    email?: string;
    image?: string;
  } | string;
  receiverId?: {
    _id?: string;
    fullName?: string;
    email?: string;
    image?: string;
  } | string;
}

interface TransactionsProps {
  initialContributions?: ContributionItem[];
  meta?: {
    page: number;
    totalPage: number;
    total: number;
  };
  initialStats?: {
    totalVolume: number;
    completedCount: number;
    totalCount: number;
  };
}

const Transactions: React.FC<TransactionsProps> = ({
  initialContributions = [],
  meta,
  initialStats,
}) => {
  const [currentDate, setCurrentDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [contributions, setContributions] = useState<ContributionItem[]>(initialContributions);
  const [selectedTxn, setSelectedTxn] = useState<ContributionItem | null>(null);

  useEffect(() => {
    setContributions(initialContributions);
  }, [initialContributions]);

  useEffect(() => {
    const formatted = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formatted);
  }, []);

  const filteredContributions = contributions.filter((txn) => {
    const senderName =
      (typeof txn.senderId === "object"
        ? txn.senderId?.fullName || txn.senderId?.email
        : txn.senderId) || "";
    const receiverName =
      (typeof txn.receiverId === "object"
        ? txn.receiverId?.fullName || txn.receiverId?.email
        : txn.receiverId) || "";
    const groupName = txn.groupId?.name || "";
    const txnId = txn.transactionId || txn._id;

    const matchesSearch =
      txnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receiverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      groupName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      txn.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalVolume = initialStats?.totalVolume || 0;
  const completedCount = initialStats?.completedCount || 0;

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-8 text-white select-text relative">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none">
          Transaction Management
        </h1>
        <span className="text-xs font-semibold text-zinc-500 tracking-wide mt-1 block">
          {currentDate}
        </span>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 select-none">
        {/* Total Volume */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 h-[120px] flex flex-col justify-between hover:border-[#00ADEF]/30 transition-all duration-300 shadow-md">
          <span className="text-[28px] font-extrabold text-[#00ADEF] tracking-tight leading-none">
            ${totalVolume.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Total Volume
          </span>
        </div>
        {/* Completed */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 h-[120px] flex flex-col justify-between hover:border-[#10B981]/30 transition-all duration-300 shadow-md">
          <span className="text-[28px] font-extrabold text-[#10B981] tracking-tight leading-none">
            {completedCount}
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Completed Transactions
          </span>
        </div>
        {/* Total Count */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 h-[120px] flex flex-col justify-between hover:border-[#c084fc]/30 transition-all duration-300 shadow-md">
          <span className="text-[28px] font-extrabold text-[#c084fc] tracking-tight leading-none">
            {meta?.total || contributions.length}
          </span>
          <span className="text-xs font-semibold text-[#64748b] tracking-wide">
            Total Transactions Record
          </span>
        </div>
      </div>

      {/* Search Input and Status Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 select-none w-full">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by Transaction ID, user name, or group..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#08090d] border border-[#1b1e25] text-zinc-200 placeholder-zinc-500 pl-10 pr-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {["all", "paid", "unpaid", "failed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl capitalize transition-all cursor-pointer ${
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

      {/* Main Table */}
      <div className="rounded-xl border border-[#1b1e25]/60 bg-[#07080a]/30 overflow-hidden w-full">
        <Table>
          <TableHeader className="bg-[#0f111a] border-b border-[#1b1e25]/65">
            <TableRow className="hover:bg-transparent border-none h-12">
              <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                Transaction ID
              </TableHead>
              <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                Sender (Payer)
              </TableHead>
              <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                Receiver (Beneficiary)
              </TableHead>
              <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                Group
              </TableHead>
              <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                Amount
              </TableHead>
              <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                Date
              </TableHead>
              <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContributions.length > 0 ? (
              filteredContributions.map((txn) => {
                const senderName =
                  typeof txn.senderId === "object"
                    ? txn.senderId?.fullName || txn.senderId?.email
                    : "N/A";
                const receiverName =
                  typeof txn.receiverId === "object"
                    ? txn.receiverId?.fullName || txn.receiverId?.email
                    : "N/A";
                const dateStr = txn.paymentDate || txn.createdAt;
                const formattedDate = dateStr
                  ? new Date(dateStr).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A";

                return (
                  <TableRow
                    key={txn._id}
                    onClick={() => setSelectedTxn(txn)}
                    className="border-b border-[#1b1e25]/50 hover:bg-[#121520]/25 h-14 transition-colors cursor-pointer"
                  >
                    {/* Transaction ID */}
                    <TableCell className="py-3 px-4 font-semibold text-[#00ADEF] text-left border-none text-[13px] font-mono">
                      {txn.transactionId || txn._id}
                    </TableCell>

                    {/* Sender */}
                    <TableCell className="py-3 px-4 text-left border-none text-[13px] font-semibold text-white">
                      {senderName}
                    </TableCell>

                    {/* Receiver */}
                    <TableCell className="py-3 px-4 text-left border-none text-[13px] font-semibold text-purple-400">
                      {receiverName}
                    </TableCell>

                    {/* Group */}
                    <TableCell className="py-3 px-4 text-left border-none text-[13px] font-medium text-zinc-300">
                      {txn.groupId?.name || "N/A"}
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="py-3 px-4 text-left border-none text-[13px] font-extrabold text-emerald-400">
                      ${txn.amount?.toLocaleString()}
                    </TableCell>

                    {/* Date */}
                    <TableCell className="py-3 px-4 text-zinc-400 font-medium text-left border-none text-[12px]">
                      {formattedDate}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-3 px-4 text-left border-none select-none">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full border ${
                          txn.status === "paid"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                            : txn.status === "failed"
                            ? "bg-red-500/10 text-red-400 border-red-500/25"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/25"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-12 text-center text-zinc-500 font-medium text-sm border-none"
                >
                  No contribution transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Transaction Details Dialog */}
      <Dialog open={!!selectedTxn} onOpenChange={() => setSelectedTxn(null)}>
        <DialogContent className="bg-[#0e1015] border border-[#1b1e25] text-white max-w-lg rounded-2xl p-6">
          <DialogHeader className="border-b border-[#1b1e25] pb-4 flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <DialogTitle className="text-lg font-extrabold text-white">
                Transaction Details
              </DialogTitle>
              <DialogDescription className="text-xs font-mono text-[#00ADEF]">
                ID: {selectedTxn?.transactionId || selectedTxn?._id}
              </DialogDescription>
            </div>
          </DialogHeader>

          {selectedTxn && (
            <div className="flex flex-col gap-4 text-xs font-medium pt-2">
              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400">Amount</span>
                <span className="text-emerald-400 font-extrabold text-base">
                  ${selectedTxn.amount?.toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-[#1b1e25]" />

              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400">Payer (Sender)</span>
                <span className="text-white font-bold">
                  {typeof selectedTxn.senderId === "object"
                    ? selectedTxn.senderId?.fullName || selectedTxn.senderId?.email
                    : "N/A"}
                </span>
              </div>
              <div className="h-px bg-[#1b1e25]" />

              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400">Beneficiary (Receiver)</span>
                <span className="text-purple-400 font-bold">
                  {typeof selectedTxn.receiverId === "object"
                    ? selectedTxn.receiverId?.fullName || selectedTxn.receiverId?.email
                    : "N/A"}
                </span>
              </div>
              <div className="h-px bg-[#1b1e25]" />

              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400">Savings Group</span>
                <span className="text-white font-bold">
                  {selectedTxn.groupId?.name || "N/A"}
                </span>
              </div>
              <div className="h-px bg-[#1b1e25]" />

              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400">Period Number</span>
                <span className="text-zinc-200 font-bold">
                  Period #{selectedTxn.periodNumber || 1}
                </span>
              </div>
              <div className="h-px bg-[#1b1e25]" />

              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400">Status</span>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full border ${
                    selectedTxn.status === "paid"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/25"
                  }`}
                >
                  {selectedTxn.status}
                </span>
              </div>

              {selectedTxn.stripeSessionId && (
                <>
                  <div className="h-px bg-[#1b1e25]" />
                  <div className="flex flex-col gap-1 py-1">
                    <span className="text-zinc-400">Stripe Session ID</span>
                    <span className="text-zinc-300 font-mono text-[11px] break-all select-all bg-[#07080a] p-2 rounded-lg border border-[#1b1e25]">
                      {selectedTxn.stripeSessionId}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transactions;
