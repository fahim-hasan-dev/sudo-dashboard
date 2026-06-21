"use client";

import React, { useEffect, useState } from "react";
import StatCard from "@/components/page/analytics/cards/StatCard";
import { Users, Activity, Wallet, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Data for Subscription Growth (Jan - Jun)
const subscriptionData = [
  { month: "Jan", subscriptions: 3200 },
  { month: "Feb", subscriptions: 3950 },
  { month: "Mar", subscriptions: 4120 },
  { month: "Apr", subscriptions: 4680 },
  { month: "May", subscriptions: 4920 },
  { month: "Jun", subscriptions: 5240 },
];

// Data for User Growth (Jan - Dec)
const userGrowthData = [
  { month: "Jan", active: 5000 },
  { month: "Feb", active: 6800 },
  { month: "Mar", active: 7900 },
  { month: "Apr", active: 10500 },
  { month: "May", active: 13800 },
  { month: "Jun", active: 17200 },
  { month: "Jul", active: 21800 },
  { month: "Aug", active: 24900 },
  { month: "Sep", active: 27800 },
  { month: "Oct", active: 30800 },
  { month: "Nov", active: 33500 },
  { month: "Dec", active: 36412 },
];

// Data for Weekly Transaction Volume (Mon - Sun)
const weeklyTransactionData = [
  { day: "Mon", volume: 120 },
  { day: "Tue", volume: 190 },
  { day: "Wed", volume: 135 },
  { day: "Thu", volume: 205 },
  { day: "Fri", volume: 225 },
  { day: "Sat", volume: 100 },
  { day: "Sun", volume: 85 },
];

const OverviewDashboard = () => {
  const [currentDate, setCurrentDate] = useState("Wednesday, June 10, 2026");

  useEffect(() => {
    // Generate dynamic date on client side to avoid hydration mismatch
    const formatted = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formatted);
  }, []);

  return (
    <div className="h-full flex flex-col gap-6 animate-fadeIn pb-8 text-white">
      {/* Overview Title and Date Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none">
          Overview Dashboard
        </h1>
        <span className="text-[11px] md:text-xs font-semibold text-zinc-500 tracking-wide mt-1 block">
          {currentDate}
        </span>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        <StatCard
          title="Total Users"
          value="36,412"
          icon={<Users className="size-5" />}
          iconBg="bg-blue-500/10"
          iconColor="text-blue-500"
        />
        <StatCard
          title="Active Users"
          value="30,248"
          icon={<Activity className="size-5" />}
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-500"
        />
        <StatCard
          title="Savings Groups"
          value="4,821"
          icon={<Wallet className="size-5" />}
          iconBg="bg-purple-500/10"
          iconColor="text-purple-500"
        />
        <StatCard
          title="Total Revenue"
          value="$104,200"
          icon={<TrendingUp className="size-5" />}
          iconBg="bg-cyan-500/10"
          iconColor="text-cyan-500"
        />
      </div>

      {/* Subscription Growth Chart Card */}
      <div className="bg-[#0e1015]/60 backdrop-blur-xl border border-zinc-850 rounded-2xl p-5 md:p-6 shadow-md flex flex-col gap-4">
        <div>
          <h2 className="text-base md:text-lg font-bold text-white tracking-tight leading-none">
            Subscription Growth
          </h2>
          <span className="text-[10px] md:text-xs font-semibold text-zinc-550 block mt-1.5">
            6-month trend across all plans
          </span>
        </div>

        <div className="w-full h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={subscriptionData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barSize={18}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#1d222b/40" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                stroke="#6b7280"
                style={{ fontSize: "10px", fontWeight: "600" }}
                tickMargin={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="#6b7280"
                style={{ fontSize: "10px", fontWeight: "600" }}
                tickMargin={12}
                domain={[0, 6000]}
                ticks={[0, 1500, 3000, 4500, 6000]}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.02)" }}
                contentStyle={{
                  backgroundColor: "#0e1015",
                  border: "1px solid #191c24",
                  borderRadius: "8px",
                  fontSize: "11px",
                  color: "#ffffff",
                }}
              />
              <Bar
                dataKey="subscriptions"
                fill="#2ac5f4"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Growth Chart Card */}
      <div className="bg-[#0e1015]/60 backdrop-blur-xl border border-zinc-850 rounded-2xl p-5 md:p-6 shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base md:text-lg font-bold text-white tracking-tight leading-none">
              User Growth
            </h2>
            <span className="text-[10px] md:text-xs font-semibold text-zinc-550 block mt-1.5">
              Total vs active users over 12 months
            </span>
          </div>

          {/* Simple Chart Legend indicators */}
          <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest select-none">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#00ADEF]" />
              <span>Total</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#10B981]" />
              <span>Active</span>
            </div>
          </div>
        </div>

        <div className="w-full h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={userGrowthData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="userGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#1d222b/40" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                stroke="#6b7280"
                style={{ fontSize: "10px", fontWeight: "600" }}
                tickMargin={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="#6b7280"
                style={{ fontSize: "10px", fontWeight: "600" }}
                tickMargin={12}
                domain={[0, 38000]}
                ticks={[0, 10000, 19000, 29000, 38000]}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0e1015",
                  border: "1px solid #191c24",
                  borderRadius: "8px",
                  fontSize: "11px",
                  color: "#ffffff",
                }}
              />
              <Area
                type="monotone"
                dataKey="active"
                stroke="#10B981"
                strokeWidth={3}
                fill="url(#userGlow)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Transaction Volume */}
      <div className="bg-[#0e1015]/60 backdrop-blur-xl border border-zinc-850 rounded-2xl p-5 md:p-6 shadow-md flex flex-col gap-4">
        <div>
          <h2 className="text-base md:text-lg font-bold text-white tracking-tight leading-none">
            Weekly Transaction Volume
          </h2>
          <span className="text-[10px] md:text-xs font-semibold text-zinc-550 block mt-1.5">
            Total $ processed per day
          </span>
        </div>

        <div className="w-full h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyTransactionData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barSize={24}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#1d222b/40" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                stroke="#6b7280"
                style={{ fontSize: "10px", fontWeight: "600" }}
                tickMargin={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="#6b7280"
                style={{ fontSize: "10px", fontWeight: "600" }}
                tickMargin={12}
                domain={[0, 240]}
                ticks={[0, 60, 120, 180, 240]}
                tickFormatter={(val) => `$${val}k`}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.02)" }}
                contentStyle={{
                  backgroundColor: "#0e1015",
                  border: "1px solid #191c24",
                  borderRadius: "8px",
                  fontSize: "11px",
                  color: "#ffffff",
                }}
              />
              <Bar
                dataKey="volume"
                fill="#00ADEF"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
