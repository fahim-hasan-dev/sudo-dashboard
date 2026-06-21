import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;      // Tailwind background color class, e.g., 'bg-blue-500/10'
  iconColor: string;   // Tailwind text color class, e.g., 'text-blue-550' or 'text-blue-500'
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div className="bg-[#0e1015]/60 backdrop-blur-xl border border-zinc-850 rounded-2xl p-5 shadow-md flex flex-col gap-4.5 hover:border-zinc-800 transition-all duration-300">
      {/* Icon Area */}
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor} border border-current/10 shadow-[0_0_12px_rgba(0,0,0,0.1)]`}>
          {icon}
        </div>
      </div>

      {/* Numerical Data & Label */}
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-extrabold text-white tracking-tight leading-none">
          {value}
        </span>
        <span className="text-xs font-semibold text-zinc-500 tracking-wide mt-1">
          {title}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
