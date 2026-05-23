"use client";

import React, { useState, useMemo } from "react";
import { Search, Plus, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart configuration for dual-line graph matching the mockup
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2ac5f4",
  },
  projected: {
    label: "Projected",
    color: "#ff8f23",
  },
};

// 12-month performance analysis data mimicking the glowing curve rising organically
const revenueChartData = [
  { month: "Jan", revenue: 20, projected: 15 },
  { month: "Feb", revenue: 25, projected: 18 },
  { month: "Mar", revenue: 22, projected: 20 },
  { month: "Apr", revenue: 26, projected: 21 },
  { month: "May", revenue: 35, projected: 28 },
  { month: "Jun", revenue: 56, projected: 38 },
  { month: "Jul", revenue: 50, projected: 48 },
  { month: "Aug", revenue: 48, projected: 45 },
  { month: "Sep", revenue: 65, projected: 55 },
  { month: "Oct", revenue: 88, projected: 68 },
  { month: "Nov", revenue: 84, projected: 78 },
  { month: "Dec", revenue: 78, projected: 90 },
];

interface Transaction {
  id: string;
  txnId: string;
  initials: string;
  name: string;
  email: string;
  date: string;
  planName: string;
  amount: string;
  status: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    txnId: "#TXN-882104",
    initials: "JD",
    name: "John Doe",
    email: "john@enterprise.io",
    date: "Oct 24, 2023",
    planName: "Free",
    amount: "$299.00",
    status: "COMPLETED",
  },
  {
    id: "2",
    txnId: "#TXN-882103",
    initials: "AM",
    name: "Alice Morgan",
    email: "alice@studio.tech",
    date: "Oct 23, 2023",
    planName: "Free",
    amount: "$49.00",
    status: "COMPLETED",
  },
  {
    id: "3",
    txnId: "#TXN-882102",
    initials: "RK",
    name: "Robert King",
    email: "r.king@global.com",
    date: "Oct 22, 2023",
    planName: "Premium",
    amount: "$299.00",
    status: "COMPLETED",
  },
  {
    id: "4",
    txnId: "#TXN-882101",
    initials: "SL",
    name: "Sarah Lawson",
    email: "sarah@lawson.co",
    date: "Oct 21, 2023",
    planName: "Premium",
    amount: "$299.00",
    status: "COMPLETED",
  },
  {
    id: "5",
    txnId: "#TXN-882100",
    initials: "TH",
    name: "Thomas Hill",
    email: "t.hill@ventures.net",
    date: "Oct 20, 2023",
    planName: "Free",
    amount: "$49.00",
    status: "COMPLETED",
  },
];

interface MetricCardProps {
  title: string;
  value: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 relative overflow-hidden shadow-md flex flex-col gap-2 min-h-[125px] justify-between">
      <div className="flex flex-col gap-1.5 z-10">
        <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
          {title}
        </span>
        <span className="text-3xl font-extrabold text-white tracking-tight leading-none">
          {value}
        </span>
      </div>
      {/* Elegant crescent curve background graphics matching the mockup exactly */}
      <div className="absolute right-0 bottom-0 top-0 w-28 overflow-hidden pointer-events-none opacity-40 select-none">
        <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full border-[12px] border-zinc-800/40"></div>
        <div className="absolute -right-16 -bottom-16 w-28 h-28 rounded-full border-[12px] border-zinc-800/10"></div>
      </div>
    </div>
  );
};

const ProductsTable = () => {
  const [transactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Form states for creating new plan
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");

  const handleAddNewPlan = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Plan Added:", { planName, price, features });
    setIsOpen(false);
    setPlanName("");
    setPrice("");
    setFeatures("");
  };

  const handleExportCSV = () => {
    // Generate simple csv file download logs
    const headers = "Transaction ID,User,Email,Date,Plan,Amount,Status\n";
    const rows = transactions
      .map(
        (t) =>
          `"${t.txnId}","${t.name}","${t.email}","${t.date}","${t.planName}","${t.amount}","${t.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "transaction_history.csv");
    a.click();
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.planName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [transactions, searchTerm]);

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-6 text-white">
      {/* Subscriptions & Payments Top Title Block */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Subscriptions & Payments
          </h1>
          <p className="text-sm font-semibold text-[#9f8b7c] mt-1">
            Real-time financial performance and subscription distribution.
          </p>
        </div>

        {/* + Add New Plan Trigger */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary/95 text-black font-extrabold px-5 py-2.5 rounded-lg text-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-md shadow-primary/10 h-11 shrink-0"
        >
          <Plus className="size-4 stroke-[3]" /> Add New Plan
        </button>
      </div>

      {/* Responsive Grid of 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Active Subscriptions" value="12,482" />
        <MetricCard title="Expired" value="842" />
        <MetricCard title="Trial Users" value="3,120" />
        <MetricCard title="Monthly Recurring Revenue" value="$142.5k" />
      </div>

      {/* Revenue Growth Graph Card Container */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Revenue Growth
            </h2>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              Last 12 months performance analysis
            </p>
          </div>

          {/* Active View outline badge */}
          <div className="border border-zinc-800 text-zinc-400 font-bold px-3 py-1 rounded-full text-[11px] bg-zinc-900/20 select-none cursor-default">
            Active View
          </div>
        </div>

        {/* Recharts Area Chart in ChartContainer wrapper */}
        <div className="w-full relative mt-4 h-80">
          <ChartContainer config={chartConfig} className="h-full w-full aspect-auto">
            <AreaChart
              data={revenueChartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="chartCyanGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2ac5f4" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2ac5f4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#1d222b"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                stroke="#6b7280"
                style={{ fontSize: "11px", fontWeight: "600" }}
              />
              <ChartTooltip
                cursor={{ stroke: "#1d222b", strokeWidth: 1 }}
                content={<ChartTooltipContent indicator="line" />}
              />
              {/* Primary Curve (Cyan/Blue Solid area graph) */}
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2ac5f4"
                strokeWidth={3}
                fill="url(#chartCyanGlow)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#2ac5f4",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
              {/* Secondary Curve (Orange Dotted projection line) */}
              <Area
                type="monotone"
                dataKey="projected"
                stroke="#ff8f23"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="none"
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 flex flex-col gap-5 shadow-md">
        <div className="flex justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Transaction History
            </h2>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              A detailed log of all incoming and outgoing payments.
            </p>
          </div>

          {/* Export CSV action button */}
          <button
            onClick={handleExportCSV}
            className="border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 text-zinc-300 font-bold px-4 py-2 rounded-lg text-xs transition-all active:scale-95 flex items-center gap-1.5 h-9 cursor-pointer"
          >
            <Download className="size-3.5" /> Export CSV
          </button>
        </div>

        {/* Full-width search bar inside list card */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-3.5 text-zinc-500 size-5" />
          <Input
            type="text"
            placeholder="Search here..."
            className="bg-[#07080a] border border-[#1b1e25] text-white rounded-lg h-12 w-full pl-12 pr-4 placeholder:text-zinc-500 focus-visible:ring-primary/30 text-sm shadow-inner transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Transaction History Table */}
        <div className="rounded-xl border border-[#1b1e25]/60 bg-[#07080a] overflow-hidden w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-[#64748b] border-b border-[#1b1e25] font-bold uppercase tracking-wider text-[10px] h-12 select-none">
                <th className="py-3.5 px-6">Transaction ID</th>
                <th className="py-3.5 px-6">User / Account</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Plan Name</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300 font-medium">
              {filteredTransactions.length ? (
                filteredTransactions.map((item) => (
                  <tr key={item.id} className="border-b border-[#1b1e25]/60 hover:bg-[#121520]/20 h-16">
                    {/* Txn ID */}
                    <td className="py-3 px-6 font-semibold text-[#2ac5f4] select-all">
                      {item.txnId}
                    </td>
                    
                    {/* User profile capsule with circular initials block */}
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center font-extrabold text-white text-[11px] select-none shrink-0 shadow-inner">
                          {item.initials}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-white leading-none">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-semibold leading-none mt-0.5">
                            {item.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-6 text-zinc-400 font-semibold select-none">
                      {item.date}
                    </td>

                    {/* Plan Badge Capsule */}
                    <td className="py-3 px-6 select-none">
                      <span className={`px-4 py-1 text-[10px] font-extrabold rounded-full ${
                        item.planName === "Premium"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          : "bg-primary/10 text-primary border border-primary/20"
                      }`}>
                        {item.planName}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-6 text-white font-extrabold text-sm select-none">
                      {item.amount}
                    </td>

                    {/* Status Pill Badge with thin outline */}
                    <td className="py-3 px-6 select-none">
                      <span className="border border-zinc-800 text-zinc-400 font-extrabold px-3 py-1 text-[9px] rounded-full uppercase tracking-wider bg-zinc-900/10">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="h-24 text-center text-zinc-500 font-bold select-none">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer totals and arrows */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 text-zinc-400 select-none w-full">
          <div className="text-xs font-semibold text-zinc-500">
            Showing {filteredTransactions.length} of 1,248 transactions
          </div>

          <div className="flex items-center gap-2">
            <button className="size-8 rounded-lg flex items-center justify-center border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-850 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer">
              &lt;
            </button>
            <button className="size-8 rounded-lg flex items-center justify-center border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-850 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer">
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Add New Plan Dialog Form */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#0e1015] border border-[#1b1e25] p-6 max-w-lg rounded-xl flex flex-col gap-6 text-white shadow-2xl">
          <DialogTitle className="hidden">Create New Subscription Plan</DialogTitle>
          
          <div className="text-center flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
              Create New Plan
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              Create a custom subscription tier for Route-In users.
            </p>
          </div>

          <form onSubmit={handleAddNewPlan} className="flex flex-col gap-5">
            {/* Plan Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none">
                Plan Tier Name
              </label>
              <Input
                type="text"
                placeholder="e.g. Starter, Standard, Enterprise"
                className="bg-[#07080a] border border-[#1b1e25] text-white rounded-lg h-11 w-full px-4 placeholder:text-zinc-500 focus-visible:ring-primary/30 text-sm shadow-inner transition-colors"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                required
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none">
                Price (USD)
              </label>
              <Input
                type="text"
                placeholder="e.g. $49.00 / month"
                className="bg-[#07080a] border border-[#1b1e25] text-white rounded-lg h-11 w-full px-4 placeholder:text-zinc-500 focus-visible:ring-primary/30 text-sm shadow-inner transition-colors"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Features Description */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none">
                Plan Description & Features
              </label>
              <textarea
                placeholder="Provide details about standard quotas, scan limits, and support SLAs..."
                className="bg-[#07080a] border border-[#1b1e25] text-white rounded-lg h-32 w-full p-4 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 text-sm shadow-inner transition-colors resize-none"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                required
              />
            </div>

            {/* Actions Buttons */}
            <div className="flex items-center gap-4 mt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-2.5 rounded-lg text-sm transition-all active:scale-95 cursor-pointer h-11 flex-1 shadow-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-black font-bold py-2.5 rounded-lg text-sm transition-all active:scale-95 cursor-pointer h-11 flex-1 shadow-md shadow-primary/10"
              >
                Create Tier
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsTable;
