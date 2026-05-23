import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  color?: string;
  data?: number[];
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
}) => {
  const isTotalUsers = title.toLowerCase().includes("user") && !title.toLowerCase().includes("active");

  return (
    <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-5 shadow-md flex flex-col gap-4 transition-all duration-300 hover:border-[#2b303c] group">
      {/* Glowing Icon Container */}
      <div className="flex items-center justify-between">
        <div
          className={`p-2.5 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
            isTotalUsers
              ? "bg-[#251810] text-[#FF8E25] shadow-[0_0_15px_rgba(255,142,37,0.15)] border border-[#FF8E25]/20"
              : "bg-[#0b212f] text-[#2AC5F4] shadow-[0_0_15px_rgba(42,197,244,0.15)] border border-[#2AC5F4]/20"
          }`}
        >
          {icon}
        </div>
      </div>

      {/* Text Details */}
      <div>
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
          {title}
        </p>
        <p className="text-3xl font-bold text-white mt-2 tracking-tight font-sans">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
