import React from "react";
import { Mail, Phone, Calendar, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserDetailsProps {
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    photo?: string;
    isBlocked?: boolean;
    gender?: string;
    location?: string;
  };
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  // Gracefully fallback to demo details if user prop is missing
  const name = user ? `${user.firstName} ${user.lastName}` : "Felix Vance";
  const email = user ? user.email : "felix.v@scan-nav.ai";
  const id = user ? `ID: SN-${user._id}` : "ID: SN-88219";
  const photo = user?.photo || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000";
  const isActive = user ? !user.isBlocked : true;

  return (
    <div className="text-white flex flex-col gap-6 py-2 max-h-[85vh] overflow-y-auto no-scrollbar">
      
      {/* Top Section: Avatar & Total Scans */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="size-16 rounded-full border-2 border-primary/40 p-0.5 bg-zinc-950">
              <AvatarImage
                src={photo}
                alt={name}
                className="rounded-full object-cover"
              />
              <AvatarFallback className="rounded-full bg-zinc-800 text-sm">US</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-white leading-tight">
              {name}
            </h2>
            <p className="text-xs text-zinc-500 font-semibold">{id}</p>
            <span
              className={`w-fit text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 select-none leading-none ${
                isActive
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-zinc-800 text-zinc-500 border-zinc-700"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Total Scans Card */}
        <div className="bg-[#0b131e] border border-[#2ac5f4]/15 rounded-xl p-3 px-4 min-w-[140px] flex flex-col shadow-inner">
          <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest leading-none">
            Total Scans
          </span>
          <span className="text-2xl font-black text-white mt-1.5 leading-none">
            125
          </span>
        </div>
      </div>

      {/* Middle Section: Two Parallel Column Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column Card: Contact Information */}
        <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-4 flex flex-col gap-3.5">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-2">
            Contact Information
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <Mail className="size-4 text-zinc-500 shrink-0" />
              <span className="truncate">{email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <Phone className="size-4 text-zinc-500 shrink-0" />
              <span>+1 (555) 012-3456</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <Calendar className="size-4 text-zinc-500 shrink-0" />
              <span>Joined Jan 15, 2024</span>
            </div>
          </div>
        </div>

        {/* Right Column Card: Subscription */}
        <div className="bg-[#081525] border border-[#2ac5f4]/15 rounded-xl p-4 flex flex-col gap-3.5">
          <div className="flex items-center gap-1.5 border-b border-[#2ac5f4]/5 pb-2">
            <TrendingUp className="size-4 text-[#00ff88]" />
            <h3 className="text-xs font-bold text-white leading-none">
              Subscription
            </h3>
          </div>
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 font-medium">Current Plan</span>
              <span className="bg-[#ff6200] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-none select-none">
                Free
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 font-medium">Member Since</span>
              <span className="text-zinc-200 font-medium">Jan 15, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 font-medium">Last Active</span>
              <span className="text-zinc-200 font-medium">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Middle: Subscription History Card */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-4 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-white border-b border-zinc-900 pb-2">
          Subscription History
        </h3>
        
        {/* Simple History Table */}
        <div className="w-full overflow-x-auto rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-zinc-500 font-semibold border-b border-zinc-900 pb-2">
                <th className="py-2 pr-2">Plan</th>
                <th className="py-2 px-2">Start Date</th>
                <th className="py-2 px-2">End Date</th>
                <th className="py-2 px-2">Amount</th>
                <th className="py-2 pl-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300 font-medium">
              <tr className="border-b border-zinc-900/40">
                <td className="py-2.5 pr-2 font-bold text-white">Pro</td>
                <td className="py-2.5 px-2 text-[11px]">Jan 15, 2024</td>
                <td className="py-2.5 px-2 text-[11px]">Jan 15, 2025</td>
                <td className="py-2.5 px-2 font-semibold text-white">$9.99</td>
                <td className="py-2.5 pl-2">
                  <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full text-[10px] font-semibold leading-none select-none">
                    Active
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-2 font-bold text-white">Free</td>
                <td className="py-2.5 px-2 text-[11px]">Dec 1, 2023</td>
                <td className="py-2.5 px-2 text-[11px]">Jan 14, 2024</td>
                <td className="py-2.5 px-2 font-semibold text-white">$0.00</td>
                <td className="py-2.5 pl-2">
                  <span className="bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded-full text-[10px] font-semibold leading-none select-none">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Action full width button */}
      <button className="w-full text-center py-3 bg-[#ff3b30]/10 border border-[#ff3b30]/30 hover:bg-[#ff3b30]/20 text-[#ff3b30] hover:text-[#ff3b30] rounded-xl font-bold text-sm tracking-wide active:scale-[0.99] transition-all cursor-pointer">
        Delete
      </button>
    </div>
  );
};

export default UserDetails;
