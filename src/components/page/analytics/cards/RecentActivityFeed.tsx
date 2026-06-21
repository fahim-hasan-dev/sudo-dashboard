import React from "react";

interface ActivityItem {
  id: string;
  dotColor: string; // Tailwind class, e.g., 'bg-emerald-500'
  message: string;
  time: string;
}

const DEMO_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    dotColor: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    message: "KYC Approved - Amara Okonkwo",
    time: "2 min ago",
  },
  {
    id: "2",
    dotColor: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]",
    message: "Fraud Alert - Unknown device on User #U-4821",
    time: "8 min ago",
  },
  {
    id: "3",
    dotColor: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]",
    message: "New Group Created - Tech Savers Circle",
    time: "14 min ago",
  },
  {
    id: "4",
    dotColor: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]",
    message: "New Group Created - Tech Savers Circle",
    time: "14 min ago",
  },
  {
    id: "5",
    dotColor: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    message: "Payout Processed - Blessing Nwaneri - $2,500",
    time: "22 min ago",
  },
  {
    id: "6",
    dotColor: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    message: "Dispute Filed - Marcus Chen vs Group #G-1142",
    time: "35 min ago",
  },
  {
    id: "7",
    dotColor: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    message: "Payout Processed - Blessing Nwaneri - $2,500",
    time: "22 min ago",
  },
];

const RecentActivityFeed: React.FC = () => {
  return (
    <div className="bg-[#0e1015]/60 backdrop-blur-xl border border-zinc-850 rounded-2xl p-5 shadow-lg flex flex-col gap-4 select-none h-full justify-between">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base md:text-lg font-bold text-white tracking-tight leading-none">
            Recent Activity Feed
          </h3>
          <span className="text-[10px] md:text-xs font-semibold text-zinc-550 block mt-1.5">
            Real-time platform events
          </span>
        </div>
        <button className="text-[10px] md:text-xs font-bold text-blue-500 hover:text-blue-400 cursor-pointer select-none transition-colors border border-transparent hover:underline bg-transparent px-2.5 py-1 rounded-lg">
          View All
        </button>
      </div>

      {/* Separator line */}
      <div className="h-px bg-zinc-800/40 w-full" />

      {/* Activity List */}
      <div className="flex flex-col gap-4 flex-1 justify-center my-auto">
        {DEMO_ACTIVITIES.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between gap-4 text-xs font-medium text-zinc-350"
          >
            {/* Left side: dot & activity text */}
            <div className="flex items-center gap-3 min-w-0">
              <span className={`size-2 rounded-full shrink-0 ${activity.dotColor}`} />
              <span className="truncate leading-none text-zinc-300">
                {activity.message}
              </span>
            </div>
            {/* Right side: duration */}
            <span className="text-[10px] text-zinc-500 shrink-0 font-semibold">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;
