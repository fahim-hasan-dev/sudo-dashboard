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
import { Download, Search, CheckCircle2 } from "lucide-react";

interface Transaction {
  id: string;
  user: string;
  group: string;
  amount: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
  isGreen?: boolean;
  paymentMethod?: string;
  description?: string;
}

const initialTransactions: Transaction[] = [
  {
    id: "TXN-98421",
    user: "Amara Okonkwo",
    group: "G-1001",
    amount: "$500",
    date: "2026-06-10 09:14",
    status: "Completed",
    paymentMethod: "Bank Transfer (GTBank)",
    description: "Cycle 2 contribution for Lagos Tech Savers",
  },
  {
    id: "TXN-98422",
    user: "Fatima Al-Rashid",
    group: "G-1002",
    amount: "$2,400",
    date: "2026-06-10 08:42",
    status: "Completed",
    isGreen: true,
    paymentMethod: "Card (Visa *4321)",
    description: "Cycle 2 contribution for Alpha Investment Circle",
  },
  {
    id: "TXN-98423",
    user: "Marcus Chen",
    group: "G-1003",
    amount: "$200",
    date: "2026-06-10 07:58",
    status: "Completed",
    paymentMethod: "Card (Mastercard *8812)",
    description: "Cycle 1 contribution for UK Diaspora Fund",
  },
  {
    id: "TXN-98424",
    user: "Priya Sharma",
    group: "G-1005",
    amount: "$750",
    date: "2026-06-09 23:41",
    status: "Completed",
    paymentMethod: "UPI Payment",
    description: "Cycle 2 contribution for UAE Diaspora Fund",
  },
  {
    id: "TXN-98425",
    user: "James Oduya",
    group: "G-1001",
    amount: "$500",
    date: "2026-06-09 21:10",
    status: "Completed",
    paymentMethod: "Card (Visa *0987)",
    description: "Cycle 2 contribution for Lagos Tech Savers",
  },
  {
    id: "TXN-98426",
    user: "Blessing Nwankwo",
    group: "G-1001",
    amount: "$6,000",
    date: "2026-06-09 18:04",
    status: "Completed",
    isGreen: true,
    paymentMethod: "Bank Transfer (Access Bank)",
    description: "Group pool pay-out release for Lagos Tech Savers",
  },
  {
    id: "TXN-98428",
    user: "Ana Rodrigues",
    group: "G-1003",
    amount: "$200",
    date: "2026-06-09 14:55",
    status: "Completed",
    paymentMethod: "Card (Visa *2234)",
    description: "Cycle 1 contribution for UK Diaspora Fund",
  },
  {
    id: "TXN-98429",
    user: "Yemi Adeyemi",
    group: "G-1006",
    amount: "$900",
    date: "2026-06-09 11:30",
    status: "Completed",
    isGreen: true,
    paymentMethod: "Card (Mastercard *5432)",
    description: "Cycle 3 contribution for UK Diaspora Fund",
  },
  {
    id: "TXN-98430",
    user: "Emeka Eze",
    group: "G-1001",
    amount: "$500",
    date: "2026-06-09 09:00",
    status: "Completed",
    paymentMethod: "Card (Visa *1111)",
    description: "Cycle 2 contribution for Lagos Tech Savers",
  },
  {
    id: "TXN-98427",
    user: "Unknown User",
    group: "G-1007",
    amount: "$500",
    date: "2026-06-09 16:22",
    status: "Completed",
    paymentMethod: "Mobile Money",
    description: "Ad-hoc savings cycle contribution",
  },
];

const Transactions = () => {
  const [currentDate, setCurrentDate] = useState("Wednesday, June 10, 2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const formatted = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formatted);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleExport = () => {
    showToast("Transactions exported successfully as CSV!");
  };

  const filteredTransactions = initialTransactions.filter(
    (txn) =>
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-8 text-white select-text relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#0a201c] border border-emerald-500/30 text-[#10B981] px-4 py-3 rounded-xl flex items-center gap-2.5 shadow-2xl z-50 animate-slideIn">
          <CheckCircle2 className="size-4" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none">
          Transaction Management
        </h1>
        <span className="text-xs font-semibold text-zinc-550 tracking-wide mt-1 block">
          {currentDate}
        </span>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 select-none">
        {/* Total Volume */}
        <div className="bg-[#0e1015]/60 border border-[#1b1e25] rounded-2xl p-5 flex flex-col gap-1.5 hover:border-[#00ADEF]/30 transition-all duration-300 shadow-md">
          <span className="text-2xl font-extrabold text-[#00ADEF] tracking-tight leading-none">
            $12,450
          </span>
          <span className="text-xs font-semibold text-zinc-500 tracking-wide mt-1">
            Total Volume
          </span>
        </div>
        {/* Completed */}
        <div className="bg-[#0e1015]/60 border border-[#1b1e25] rounded-2xl p-5 flex flex-col gap-1.5 hover:border-[#10B981]/30 transition-all duration-300 shadow-md">
          <span className="text-2xl font-extrabold text-[#10B981] tracking-tight leading-none">
            5
          </span>
          <span className="text-xs font-semibold text-zinc-500 tracking-wide mt-1">
            Completed
          </span>
        </div>
      </div>

      {/* Search Input and Export Area */}
      <div className="flex items-center gap-4 select-none w-full">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by TXN ID or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#08090d] border border-[#1b1e25] text-zinc-200 placeholder-zinc-500 pl-10 pr-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
          />
        </div>
        {/* Export Button */}
        <button
          onClick={handleExport}
          className="bg-emerald-500/10 hover:bg-[#10B981]/20 border border-[#10B981]/20 text-emerald-450 hover:text-[#10B981] px-4.5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all duration-200 cursor-pointer select-none active:scale-95 shrink-0"
        >
          <Download className="size-3.5" />
          Export
        </button>
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
                User
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
            {filteredTransactions.map((txn) => (
              <TableRow
                key={txn.id}
                onClick={() => setSelectedTxn(txn)}
                className="border-b border-[#1b1e25]/50 hover:bg-[#121520]/25 h-14 transition-colors cursor-pointer"
              >
                {/* Transaction ID */}
                <TableCell className="py-3 px-4 font-semibold text-[#00ADEF] text-left border-none text-[13px]">
                  {txn.id}
                </TableCell>

                {/* User */}
                <TableCell className="py-3 px-4 text-left border-none text-[13px] font-semibold text-white">
                  {txn.user}
                </TableCell>

                {/* Group */}
                <TableCell className="py-3 px-4 text-left border-none text-[13px] font-medium text-zinc-400">
                  {txn.group}
                </TableCell>

                {/* Amount */}
                <TableCell
                  className={`py-3 px-4 text-left border-none text-[13px] font-bold ${
                    txn.isGreen ? "text-[#10B981]" : "text-white"
                  }`}
                >
                  {txn.amount}
                </TableCell>

                {/* Date */}
                <TableCell className="py-3 px-4 text-zinc-500 font-semibold text-left border-none text-[12px]">
                  {txn.date}
                </TableCell>

                {/* Status */}
                <TableCell className="py-3 px-4 text-left border-none select-none">
                  <span className="bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {txn.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}

            {filteredTransactions.length === 0 && (
              <TableRow className="border-none hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-zinc-500 font-semibold border-none"
                >
                  No transactions found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Footer Note */}
        <div className="py-3 border-t border-[#1b1e25]/40 text-center text-[10px] text-zinc-550 font-bold uppercase tracking-wider select-none bg-[#07080a]/10">
          Click any row to view transaction details - {filteredTransactions.length} transactions shown
        </div>
      </div>

      {/* Transaction Details Modal/Drawer utilizing standard Dialog */}
      <Dialog open={selectedTxn !== null} onOpenChange={(open) => { if (!open) setSelectedTxn(null); }}>
        <DialogContent className="bg-[#0b0d13] border border-[#1b1e25] rounded-2xl max-w-md p-6 text-white shadow-2xl">
          <DialogHeader className="flex flex-col gap-1 border-b border-[#1b1e25] pb-4">
            <DialogTitle className="text-base font-extrabold text-white text-left">Transaction Details</DialogTitle>
            <DialogDescription className="text-[10px] text-[#00ADEF] font-bold uppercase tracking-wider text-left leading-none mt-1">
              {selectedTxn?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedTxn && (
            <div className="flex flex-col gap-5 mt-4">
              {/* Grid of Attributes */}
              <div className="flex flex-col gap-4">
                {/* User */}
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-500 uppercase tracking-wide">User</span>
                  <span className="font-bold text-white">{selectedTxn.user}</span>
                </div>
                {/* Group */}
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-500 uppercase tracking-wide">Group</span>
                  <span className="font-bold text-zinc-300">{selectedTxn.group}</span>
                </div>
                {/* Amount */}
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-500 uppercase tracking-wide">Amount</span>
                  <span
                    className={`font-extrabold text-sm ${
                      selectedTxn.isGreen ? "text-[#10B981]" : "text-white"
                    }`}
                  >
                    {selectedTxn.amount}
                  </span>
                </div>
                {/* Date */}
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-500 uppercase tracking-wide">Date</span>
                  <span className="font-bold text-zinc-400">{selectedTxn.date}</span>
                </div>
                {/* Method */}
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-500 uppercase tracking-wide">Payment Method</span>
                  <span className="font-bold text-zinc-300">{selectedTxn.paymentMethod}</span>
                </div>
                {/* Status */}
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-500 uppercase tracking-wide">Status</span>
                  <span className="bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {selectedTxn.status}
                  </span>
                </div>
                {/* Description */}
                <div className="flex flex-col gap-1.5 mt-2 bg-[#06070a] border border-[#1b1e25]/60 p-3 rounded-xl">
                  <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-wider">
                    Description
                  </span>
                  <p className="text-zinc-400 text-xs font-medium leading-relaxed text-left">
                    {selectedTxn.description}
                  </p>
                </div>
              </div>

              {/* Close Action Button */}
              <button
                onClick={() => setSelectedTxn(null)}
                className="w-full bg-[#0b131e]/50 hover:bg-zinc-800 border border-zinc-800 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer select-none active:scale-[0.98] mt-2"
              >
                Close Details
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transactions;
