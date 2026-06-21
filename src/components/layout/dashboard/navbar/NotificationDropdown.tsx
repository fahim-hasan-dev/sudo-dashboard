"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";

interface NotificationItem {
  id: string;
  dotColor: string;
  message: string;
  time: string;
}

const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    dotColor: "bg-amber-550 shadow-[0_0_8px_rgba(245,158,11,0.4)]",
    message: "3 new KYC requests pending review",
    time: "2m ago",
  },
  {
    id: "2",
    dotColor: "bg-rose-550 shadow-[0_0_8px_rgba(244,63,94,0.4)]",
    message: "Fraud alert: suspicious activity on user #U-4821",
    time: "8m ago",
  },
  {
    id: "3",
    dotColor: "bg-blue-550 shadow-[0_0_8px_rgba(59,130,246,0.4)]",
    message: "Transaction TXN-98231 disputed by user",
    time: "15m ago",
  },
  {
    id: "4",
    dotColor: "bg-emerald-550 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
    message: "New group 'Alpha Savers' reached payout threshold",
    time: "1h ago",
  },
];

export default function NotificationDropdown() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer p-2 text-zinc-400 hover:text-white transition-all duration-200 select-none hover:scale-105 active:scale-95">
          {/* Notification Alert Bullet */}
          <span className="absolute top-1.5 right-1.5 size-2 bg-rose-500 rounded-full border border-[#07080a] shadow-[0_0_6px_rgba(244,63,94,0.6)] animate-pulse"></span>
          <Bell className="size-5 shrink-0" />
        </div>
      </PopoverTrigger>
      
      <PopoverContent
        align="end"
        sideOffset={12}
        className="w-[320px] md:w-[350px] bg-[#0e1015]/95 backdrop-blur-xl border border-zinc-800 rounded-xl p-4 shadow-2xl flex flex-col gap-4 text-white z-50"
      >
        {/* Header row */}
        <div className="flex items-center justify-between pb-1 select-none">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white">Notifications</span>
            <span className="bg-rose-500/10 text-rose-500 font-extrabold px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider">
              5 new
            </span>
          </div>
        </div>

        {/* Separator line */}
        <div className="h-px bg-zinc-800/40 w-full" />

        {/* Notifications List */}
        <div className="flex flex-col gap-2 my-1">
          {DEMO_NOTIFICATIONS.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 text-xs cursor-pointer group hover:bg-zinc-850/40 p-2 rounded-xl transition-all duration-200"
            >
              {/* Left dot */}
              <span className={`size-2 rounded-full mt-1.5 shrink-0 ${item.dotColor}`} />
              
              {/* Text detail & timestamp stacked */}
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="text-zinc-300 group-hover:text-white leading-normal transition-colors text-[13px] font-medium">
                  {item.message}
                </span>
                <span className="text-[10px] text-zinc-500 font-semibold leading-none">
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer View All link */}
        <div className="border-t border-zinc-800/40 pt-3 text-center">
          <button className="text-xs font-bold text-blue-500 hover:text-blue-400 cursor-pointer transition-colors hover:underline bg-transparent border-none py-1 w-full">
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
