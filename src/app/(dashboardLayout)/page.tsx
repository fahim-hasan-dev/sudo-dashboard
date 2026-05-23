"use client";

import React from "react";
import StatCard from "@/components/page/analytics/cards/StatCard";
import { Users, Activity, DollarSign, QrCode } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  active: {
    label: "Active Users",
    color: "var(--primary)",
  },
};

// 30-day high-density demo dataset mimicking the mockup curve rising and dipping organically
const chartData = [
  { date: "01 Oct", active: 20 },
  { date: "03 Oct", active: 22 },
  { date: "05 Oct", active: 21 },
  { date: "08 Oct", active: 23 },
  { date: "10 Oct", active: 28 },
  { date: "12 Oct", active: 38 },
  { date: "15 Oct", active: 56 },
  { date: "18 Oct", active: 50 },
  { date: "20 Oct", active: 48 },
  { date: "22 Oct", active: 45 },
  { date: "25 Oct", active: 54 },
  { date: "28 Oct", active: 68 },
  { date: "30 Oct", active: 88 },
];

const AnalyticsPage = () => {
  return (
    <div className="h-full flex flex-col gap-6 animate-fadeIn pb-6">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Systems Overview
        </h1>
        <p className="text-sm font-semibold text-[#9f8b7c] mt-1">
          Real-time performance metrics for ROUTEIN application
        </p>
      </div>

      {/* Grid of 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="84,293"
          icon={<Users className="h-6 w-6 text-[#FF8E25]" />}
        />
        <StatCard
          title="Active Users Today"
          value="12,402"
          icon={<Activity className="h-6 w-6 text-[#2AC5F4]" />}
        />
        <StatCard
          title="Subscription Revenue"
          value="$3.8M"
          icon={<DollarSign className="h-6 w-6 text-[#2AC5F4]" />}
        />
        <StatCard
          title="Total Scans"
          value="456K"
          icon={<QrCode className="h-6 w-6 text-[#2AC5F4]" />}
        />
      </div>

      {/* Large Daily User Activity Chart Card */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Daily User Activity
          </h2>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Last 30 days active engagement
          </p>
        </div>

        {/* Recharts Area Chart in ChartContainer wrapper */}
        <div className="w-full relative mt-4 h-80">
          <ChartContainer config={chartConfig} className="h-full w-full aspect-auto">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="chartAreaGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF8E25" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#FF8E25" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#1d222b"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                stroke="#6b7280"
                style={{ fontSize: "11px", fontWeight: "600" }}
                tickFormatter={(value) => {
                  // Only display specific dates to match the mockup design
                  if (["01 Oct", "08 Oct", "15 Oct", "22 Oct", "30 Oct"].includes(value)) {
                    return value;
                  }
                  return "";
                }}
              />
              <ChartTooltip
                cursor={{ stroke: "#1d222b", strokeWidth: 1 }}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                type="monotone"
                dataKey="active"
                stroke="#FF8E25"
                strokeWidth={3}
                fill="url(#chartAreaGlow)"
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  // Render glowing active dots on specific dates
                  if (["01 Oct", "08 Oct", "15 Oct", "22 Oct", "30 Oct"].includes(payload.date)) {
                    return (
                      <g key={`dot-${payload.date}`}>
                        <circle cx={cx} cy={cy} r={8} fill="#FF8E25" fillOpacity={0.3} />
                        <circle cx={cx} cy={cy} r={4} fill="#ffffff" stroke="#FF8E25" strokeWidth={2} />
                      </g>
                    );
                  }
                  return <React.Fragment key={`empty-${cx}`} />;
                }}
                activeDot={{
                  r: 6,
                  fill: "#FF8E25",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
