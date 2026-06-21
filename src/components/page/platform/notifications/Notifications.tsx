"use client";

import React, { useState, useEffect } from "react";
import { Bell, Mail, Users, Send, CheckCircle2, ChevronRight } from "lucide-react";

interface NotificationHistoryItem {
  id: string;
  type: "Push" | "Email";
  title: string;
  audience: string;
  sentCount: string;
  date: string;
}

const initialHistory: NotificationHistoryItem[] = [
  {
    id: "1",
    type: "Push",
    title: "Payout reminder: Your group payout is tomorrow",
    audience: "Active groups",
    sentCount: "3,241",
    date: "2026-06-09 09:00",
  },
  {
    id: "2",
    type: "Email",
    title: "June contribution reminder - Don't miss your cycle!",
    audience: "All users",
    sentCount: "36,412",
    date: "2026-06-08 08:00",
  },
  {
    id: "3",
    type: "Email",
    title: "Your KYC has been approved. Start saving today!",
    audience: "Family subscribers",
    sentCount: "128",
    date: "2026-06-07 14:00",
  },
  {
    id: "4",
    type: "Push",
    title: "New Pro features unlocked: Advanced analytics",
    audience: "Plus subscribers",
    sentCount: "3,212",
    date: "2026-06-05 10:00",
  },
  {
    id: "5",
    type: "Email",
    title: "CirclePay platform maintenance - June 12, 02:00-04:00 UTC",
    audience: "All users",
    sentCount: "36,412",
    date: "2026-06-04 16:00",
  },
];

const Notifications = () => {
  const [currentDate, setCurrentDate] = useState("Wednesday, June 10, 2026");
  const [type, setType] = useState<"Push" | "Email">("Push");
  const [audience, setAudience] = useState("All Users");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<NotificationHistoryItem[]>(initialHistory);
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

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      showToast("Title and message are required!");
      return;
    }

    // Determine target count based on audience
    let targetCount = "36,412";
    if (audience === "Active Groups") targetCount = "3,241";
    if (audience === "Family Subscribers") targetCount = "128";
    if (audience === "Plus Subscribers") targetCount = "3,212";

    // Format current date and time
    const now = new Date();
    const formattedDate = now.toISOString().replace("T", " ").substring(0, 16);

    const newNotification: NotificationHistoryItem = {
      id: Date.now().toString(),
      type,
      title: title.trim(),
      audience: audience.toLowerCase(),
      sentCount: targetCount,
      date: formattedDate,
    };

    setHistory((prev) => [newNotification, ...prev]);
    setTitle("");
    setMessage("");
    showToast(`Notification sent successfully via ${type.toLowerCase()}!`);
  };

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
      <div className="flex flex-col gap-1 select-none">
        <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none">
          Notifications
        </h1>
        <span className="text-xs font-semibold text-zinc-550 tracking-wide mt-1 block">
          {currentDate}
        </span>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Compose Notification */}
        <div className="lg:col-span-5 bg-[#0e1015]/60 border border-[#1b1e25] rounded-2xl p-6 flex flex-col gap-5 hover:border-[#00ADEF]/20 transition-all duration-300 shadow-md">
          <h2 className="text-sm font-bold text-white text-left tracking-wide select-none">
            Compose Notification
          </h2>

          <form onSubmit={handleSendNotification} className="flex flex-col gap-5">
            {/* Type Selector (Push / Email) */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left select-none">
                Type
              </label>
              <div className="flex items-center gap-3">
                {/* Push Toggle */}
                <button
                  type="button"
                  onClick={() => setType("Push")}
                  className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none active:scale-98 ${
                    type === "Push"
                      ? "bg-[#00ADEF]/10 border-[#00ADEF] text-white shadow-[0_0_12px_rgba(0,173,239,0.15)]"
                      : "bg-[#08090d] border-[#1b1e25] text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Bell className="size-3.5" />
                  Push
                </button>
                {/* Email Toggle */}
                <button
                  type="button"
                  onClick={() => setType("Email")}
                  className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none active:scale-98 ${
                    type === "Email"
                      ? "bg-[#00ADEF]/10 border-[#00ADEF] text-white shadow-[0_0_12px_rgba(0,173,239,0.15)]"
                      : "bg-[#08090d] border-[#1b1e25] text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Mail className="size-3.5" />
                  Email
                </button>
              </div>
            </div>

            {/* Audience Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left select-none">
                Audience
              </label>
              <div className="relative">
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-[#08090d] border border-[#1b1e25] text-white py-3.5 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors appearance-none cursor-pointer"
                >
                  <option value="All Users">All Users</option>
                  <option value="Active Groups">Active Groups</option>
                  <option value="Family Subscribers">Family Subscribers</option>
                  <option value="Plus Subscribers">Plus Subscribers</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                  <ChevronRight className="size-4 rotate-95" />
                </div>
              </div>
            </div>

            {/* Title Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left select-none">
                Title
              </label>
              <input
                type="text"
                placeholder="Notification title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-500 py-3.5 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left select-none">
                Message
              </label>
              <textarea
                placeholder="Notification body..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-500 py-3.5 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors resize-none leading-relaxed"
                required
              />
            </div>

            {/* Send Notification Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00ADEF] to-[#3b82f6] hover:opacity-90 border-none text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-[0.98] mt-2 shadow-[0_0_15px_rgba(0,173,239,0.15)]"
            >
              <Send className="size-3.5" />
              Send Notification
            </button>
          </form>
        </div>

        {/* Right Column: Notification History */}
        <div className="lg:col-span-7 bg-[#0e1015]/60 border border-[#1b1e25] rounded-2xl p-6 flex flex-col gap-5 hover:border-[#00ADEF]/10 transition-all duration-300 shadow-md">
          <h2 className="text-sm font-bold text-white text-left tracking-wide select-none">
            Notification History
          </h2>

          <div className="flex flex-col gap-4 max-h-[620px] overflow-y-auto pr-1 no-scrollbar">
            {history.map((item) => {
              const isPush = item.type === "Push";
              return (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-4 border border-[#1b1e25]/60 bg-[#07080a]/30 hover:bg-[#121520]/25 rounded-xl transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    {/* Badge Container */}
                    <div
                      className={`py-1.5 px-3 rounded-lg border flex items-center gap-1.5 text-[10px] font-bold select-none shrink-0 ${
                        isPush
                          ? "bg-[#00ADEF]/10 border-[#00ADEF]/20 text-[#00ADEF]"
                          : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {isPush ? <Bell className="size-3" /> : <Mail className="size-3" />}
                      {item.type}
                    </div>

                    {/* Content Details */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <span className="text-sm font-bold text-white leading-snug">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-4 text-zinc-500 font-semibold text-[11px] select-none">
                        <span className="flex items-center gap-1">
                          <Users className="size-3.5" />
                          {item.audience}
                        </span>
                        <span>
                          Sent: <strong className="text-zinc-350">{item.sentCount}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <span className="text-[10px] font-bold text-zinc-550 shrink-0 select-none pt-1">
                    {item.date}
                  </span>
                </div>
              );
            })}

            {history.length === 0 && (
              <div className="py-12 text-center text-xs text-zinc-555 font-bold uppercase tracking-wider select-none">
                No notifications sent yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
