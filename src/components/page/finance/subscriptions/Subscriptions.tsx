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
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, X, CheckCircle2, PlusCircle } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  duration: string;
  price: string;
  features: string[];
  activeUsers: string;
  status: "Active" | "Inactive";
}

interface ActiveSubscriber {
  user: string;
  plan: "Free" | "Plus" | "Family" | "Community";
  since: string;
  amount: string;
  renewal: string;
  status: "active" | "expiring";
}

const initialPlans: Plan[] = [
  {
    id: "PLN-001",
    name: "Free",
    duration: "month",
    price: "$0.00",
    features: ["Pot size: up to $1000", "Up to 5 members"],
    activeUsers: "3,453",
    status: "Active",
  },
  {
    id: "PLN-002",
    name: "Plus",
    duration: "month",
    price: "$9.99",
    features: ["Pot size: up to $10,000", "Up to 25 members"],
    activeUsers: "892",
    status: "Active",
  },
  {
    id: "PLN-003",
    name: "Family",
    duration: "month",
    price: "$19.99",
    features: ["Pot size: up to $50,000", "Up to 50 members", "unlimited circle"],
    activeUsers: "955",
    status: "Inactive",
  },
  {
    id: "PLN-003", // Matches duplicate ID in mockup
    name: "Community",
    duration: "month",
    price: "$39.99",
    features: ["Pot size: up to $250,000", "Up to 200 members"],
    activeUsers: "452",
    status: "Active",
  },
];

const initialSubscribers: ActiveSubscriber[] = [
  {
    user: "Fatima Al-Rashid",
    plan: "Plus",
    since: "2025-01-15",
    amount: "$9.99/mo",
    renewal: "2026-07-15",
    status: "active",
  },
  {
    user: "Amara Okonkwo",
    plan: "Plus",
    since: "2025-03-22",
    amount: "$9.99/mo",
    renewal: "2026-07-22",
    status: "active",
  },
  {
    user: "James Oduya",
    plan: "Family",
    since: "2025-06-10",
    amount: "$19.99/mo",
    renewal: "2026-07-10",
    status: "active",
  },
  {
    user: "Blessing Nwankwo",
    plan: "Family",
    since: "2025-09-01",
    amount: "$19.99/mo",
    renewal: "2026-07-01",
    status: "active",
  },
  {
    user: "Emeka Eze",
    plan: "Family",
    since: "2026-01-20",
    amount: "$19.99/mo",
    renewal: "2026-07-20",
    status: "active",
  },
  {
    user: "Priya Sharma",
    plan: "Family",
    since: "2026-04-05",
    amount: "$19.99/mo",
    renewal: "2026-08-25",
    status: "expiring",
  },
];

const Subscriptions = () => {
  const [currentDate, setCurrentDate] = useState("Wednesday, June 10, 2026");
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [subscribers] = useState<ActiveSubscriber[]>(initialSubscribers);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals visibility state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formDuration, setFormDuration] = useState("month");
  const [formPrice, setFormPrice] = useState("");
  const [formFeatures, setFormFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");

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

  // Toggle status of a plan
  const handleToggleStatus = (planId: string, planName: string, currentStatus: "Active" | "Inactive") => {
    const nextStatus = currentStatus === "Active" ? "Inactive" : "Active";
    setPlans((prev) =>
      prev.map((p) => (p.id === planId && p.name === planName ? { ...p, status: nextStatus } : p))
    );
    showToast(`Plan "${planName}" status changed to ${nextStatus.toLowerCase()}!`);
  };

  // Open Add Plan Modal
  const openAddModal = () => {
    setFormName("");
    setFormDuration("month");
    setFormPrice("");
    setFormFeatures([]);
    setFeatureInput("");
    setFormStatus("Active");
    setIsAddOpen(true);
  };

  // Open Edit Plan Modal
  const openEditModal = (plan: Plan) => {
    setEditingPlan(plan);
    setFormName(plan.name);
    setFormDuration(plan.duration);
    setFormPrice(plan.price);
    setFormFeatures([...plan.features]);
    setFeatureInput("");
    setFormStatus(plan.status);
  };

  // Add feature to current feature list in form
  const handleAddFeature = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!featureInput.trim()) return;
    setFormFeatures((prev) => [...prev, featureInput.trim()]);
    setFeatureInput("");
  };

  // Delete feature from current feature list in form
  const handleDeleteFeature = (index: number) => {
    setFormFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Add Plan Form
  const submitAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formDuration.trim()) {
      showToast("Plan Name and Duration are required!");
      return;
    }
    
    const nextIdNum = plans.length + 1;
    const planId = `PLN-00${nextIdNum <= 9 ? "3" : nextIdNum}`;

    const newPlan: Plan = {
      id: planId,
      name: formName.trim(),
      duration: formDuration.trim(),
      price: formPrice.trim() || "$0.00",
      features: formFeatures,
      activeUsers: "0",
      status: formStatus,
    };

    setPlans((prev) => [...prev, newPlan]);
    setIsAddOpen(false);
    showToast(`Plan "${newPlan.name}" added successfully!`);
  };

  // Submit Edit Plan Form
  const submitEditPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    if (!formName.trim() || !formDuration.trim()) {
      showToast("Plan Name and Duration are required!");
      return;
    }

    setPlans((prev) =>
      prev.map((p) =>
        p.id === editingPlan.id && p.name === editingPlan.name
          ? {
              ...p,
              name: formName.trim(),
              duration: formDuration.trim(),
              price: formPrice,
              features: formFeatures,
              status: formStatus,
            }
          : p
      )
    );
    setEditingPlan(null);
    showToast(`Plan "${formName}" updated successfully!`);
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
      <div className="flex justify-between items-start w-full select-none">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none">
            Subscription Management
          </h1>
          <span className="text-xs font-semibold text-zinc-550 tracking-wide mt-1 block">
            {currentDate}
          </span>
        </div>
        {/* Add New Plan Button */}
        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-[#00ADEF] to-[#3b82f6] hover:opacity-90 border-none text-white px-5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-[0_0_20px_rgba(0,173,239,0.2)]"
        >
          <Plus className="size-3.5" />
          Add New Plan
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 select-none">
        {/* Total Active Plans */}
        <div className="bg-[#0e1015]/60 border border-[#1b1e25] rounded-2xl p-5 w-[220px] flex flex-col gap-1.5 hover:border-[#00ADEF]/30 transition-all duration-300 shadow-md">
          <span className="text-2xl font-extrabold text-[#00ADEF] tracking-tight leading-none">
            {plans.filter((p) => p.status === "Active").length}
          </span>
          <span className="text-xs font-semibold text-zinc-555 tracking-wide mt-1">
            Total Active Plans
          </span>
        </div>
      </div>

      {/* Section 1: Manage Subscribers */}
      <div className="flex flex-col gap-4 mt-2">
        <h2 className="text-xs font-bold text-[#64748b] uppercase tracking-wider select-none">
          Manage Subscribers
        </h2>

        {/* Table 1: Subscription Plans */}
        <div className="rounded-xl border border-[#1b1e25]/60 bg-[#07080a]/30 overflow-hidden w-full">
          <Table>
            <TableHeader className="bg-[#0f111a] border-b border-[#1b1e25]/65">
              <TableRow className="hover:bg-transparent border-none h-12">
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                  Plan ID
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                  Name
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                  Duration
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                  Price
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none w-1/3">
                  Features
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                  Active Users
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-center border-none">
                  Status
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-center border-none">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan, index) => (
                <TableRow
                  key={`${plan.id}-${plan.name}-${index}`}
                  className="border-b border-[#1b1e25]/50 hover:bg-[#121520]/25 h-16 transition-colors"
                >
                  {/* Plan ID */}
                  <TableCell className="py-3 px-4 font-semibold text-[#64748b] text-left border-none text-[13px]">
                    {plan.id}
                  </TableCell>

                  {/* Name */}
                  <TableCell className="py-3 px-4 text-left border-none text-[13px] font-bold text-white">
                    {plan.name}
                  </TableCell>

                  {/* Duration */}
                  <TableCell className="py-3 px-4 text-left border-none text-[13px] font-medium text-zinc-400">
                    {plan.duration}
                  </TableCell>

                  {/* Price */}
                  <TableCell className="py-3 px-4 text-left border-none text-[13px] font-bold text-white">
                    {plan.price}
                  </TableCell>

                  {/* Features */}
                  <TableCell className="py-3 px-4 text-left border-none text-[12px] font-medium text-zinc-400 leading-relaxed">
                    {plan.features.slice(0, 2).join(", ")}
                    {plan.features.length >= 2 ? "...." : ""}
                  </TableCell>

                  {/* Active Users */}
                  <TableCell className="py-3 px-4 text-left border-none text-[13px] font-bold text-white">
                    {plan.activeUsers}
                  </TableCell>

                  {/* Status Toggle Switch using standard Switch */}
                  <TableCell className="py-3 px-4 text-center border-none select-none">
                    <div className="flex items-center justify-center">
                      <Switch
                        checked={plan.status === "Active"}
                        onCheckedChange={() => handleToggleStatus(plan.id, plan.name, plan.status)}
                      />
                    </div>
                  </TableCell>

                  {/* Actions (Edit Plan) */}
                  <TableCell className="py-3 px-4 text-center border-none select-none">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => openEditModal(plan)}
                        className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Section 2: Active Subscribers */}
      <div className="flex flex-col gap-4 mt-4">
        <h2 className="text-xs font-bold text-[#64748b] uppercase tracking-wider select-none">
          Active Subscribers
        </h2>

        {/* Table 2: Subscribers List */}
        <div className="rounded-xl border border-[#1b1e25]/60 bg-[#07080a]/30 overflow-hidden w-full">
          <Table>
            <TableHeader className="bg-[#0f111a] border-b border-[#1b1e25]/65">
              <TableRow className="hover:bg-transparent border-none h-12">
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                  User
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                  Plan
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                  Since
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                  Amount
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                  Renewal
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-zinc-500 text-[11px] h-12 text-left border-none">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((sub, index) => {
                const isPlus = sub.plan === "Plus";
                const isExpiring = sub.status === "expiring";
                return (
                  <TableRow
                    key={`${sub.user}-${index}`}
                    className="border-b border-[#1b1e25]/50 hover:bg-[#121520]/25 h-14 transition-colors"
                  >
                    {/* User */}
                    <TableCell className="py-3 px-4 text-left border-none text-[13px] font-semibold text-white">
                      {sub.user}
                    </TableCell>

                    {/* Plan */}
                    <TableCell
                      className={`py-3 px-4 text-left border-none text-[13px] font-bold ${
                        isPlus ? "text-purple-400" : "text-[#00ADEF]"
                      }`}
                    >
                      {sub.plan}
                    </TableCell>

                    {/* Since */}
                    <TableCell className="py-3 px-4 text-zinc-500 font-semibold text-left border-none text-[12px]">
                      {sub.since}
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="py-3 px-4 text-left border-none text-[13px] font-semibold text-zinc-300">
                      {sub.amount}
                    </TableCell>

                    {/* Renewal */}
                    <TableCell className="py-3 px-4 text-zinc-500 font-semibold text-left border-none text-[12px]">
                      {sub.renewal}
                    </TableCell>

                    {/* Status badge */}
                    <TableCell className="py-3 px-4 text-left border-none select-none">
                      {isExpiring ? (
                        <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          {sub.status}
                        </span>
                      ) : (
                        <span className="bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          {sub.status}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 1. Add New Plan Modal Overlay utilizing standard Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="bg-[#0b0d13] border border-[#1b1e25] rounded-2xl max-w-md p-6 text-white shadow-2xl">
          <DialogHeader className="flex flex-col gap-1 border-b border-[#1b1e25] pb-4">
            <DialogTitle className="text-base font-extrabold text-white text-left">Add New Subscription Plan</DialogTitle>
            <DialogDescription className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider text-left leading-none mt-1">
              Add a new subscription plan to the platform
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submitAddPlan} className="flex flex-col gap-5 mt-4">
            {/* Form Input fields */}
            <div className="flex flex-col gap-4">
              {/* Plan Name & Duration Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Family"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-500 py-3 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="month"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-500 py-3 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Plan Price */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left">
                  Price
                </label>
                <input
                  type="text"
                  placeholder="e.g. $19.99"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-550 py-3 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                />
              </div>

              {/* Plan Status */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left">
                  Plan Status
                </label>
                <div className="flex items-center gap-6 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="planStatusAdd"
                      value="Active"
                      checked={formStatus === "Active"}
                      onChange={() => setFormStatus("Active")}
                      className="sr-only"
                    />
                    <div
                      className={`size-4 rounded-full border flex items-center justify-center transition-all duration-200 ${
                        formStatus === "Active"
                          ? "border-[#00ADEF] bg-[#00ADEF]/10 shadow-[0_0_8px_rgba(0,173,239,0.2)]"
                          : "border-zinc-700 hover:border-zinc-500 bg-[#08090d]"
                      }`}
                    >
                      <div
                        className={`size-2 rounded-full transition-transform duration-200 ${
                          formStatus === "Active"
                            ? "bg-[#00ADEF] scale-100"
                            : "bg-transparent scale-0"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold transition-colors duration-200 ${
                        formStatus === "Active" ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      Active
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="planStatusAdd"
                      value="Inactive"
                      checked={formStatus === "Inactive"}
                      onChange={() => setFormStatus("Inactive")}
                      className="sr-only"
                    />
                    <div
                      className={`size-4 rounded-full border flex items-center justify-center transition-all duration-200 ${
                        formStatus === "Inactive"
                          ? "border-[#00ADEF] bg-[#00ADEF]/10 shadow-[0_0_8px_rgba(0,173,239,0.2)]"
                          : "border-zinc-700 hover:border-zinc-500 bg-[#08090d]"
                      }`}
                    >
                      <div
                        className={`size-2 rounded-full transition-transform duration-200 ${
                          formStatus === "Inactive"
                            ? "bg-[#00ADEF] scale-100"
                            : "bg-transparent scale-0"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold transition-colors duration-200 ${
                        formStatus === "Inactive" ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      Inactive
                    </span>
                  </label>
                </div>
              </div>

              {/* Add Features */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left">
                  Add features
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Enter Feature name"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="w-full bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-550 pl-4 pr-10 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddFeature()}
                    className="absolute right-3 text-[#00ADEF] hover:text-[#3b82f6] transition-colors cursor-pointer"
                  >
                    <PlusCircle className="size-4.5" />
                  </button>
                </div>
              </div>

              {/* Feature List Items with divider list styling */}
              <div className="flex flex-col max-h-48 overflow-y-auto mt-1 border border-[#1b1e25]/65 rounded-xl divide-y divide-[#1b1e25]/40 bg-[#08090d]/30">
                {formFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[#121520]/10 transition-colors"
                  >
                    <span className="text-zinc-300 text-xs font-semibold text-left">{feat}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteFeature(idx)}
                      className="text-red-500 hover:text-red-400 p-1 transition-colors cursor-pointer rounded-full hover:bg-red-500/10 active:scale-95"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
                {formFeatures.length === 0 && (
                  <div className="px-4 py-6 text-center text-xs text-zinc-555 font-bold uppercase tracking-wider select-none">
                    No features added yet
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00ADEF] to-[#3b82f6] hover:opacity-90 border-none text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer select-none active:scale-[0.98] mt-2 shadow-[0_0_15px_rgba(0,173,239,0.15)]"
            >
              Add
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. Edit Plan Modal Overlay utilizing standard Dialog */}
      <Dialog open={editingPlan !== null} onOpenChange={(open) => { if (!open) setEditingPlan(null); }}>
        <DialogContent className="bg-[#0b0d13] border border-[#1b1e25] rounded-2xl max-w-md p-6 text-white shadow-2xl">
          <DialogHeader className="flex flex-col gap-1 border-b border-[#1b1e25] pb-4">
            <DialogTitle className="text-base font-extrabold text-white text-left">Edit Subscription Plan</DialogTitle>
            <DialogDescription className="text-[10px] text-zinc-555 font-bold uppercase tracking-wider text-left leading-none mt-1">
              Edit subscription plan details
            </DialogDescription>
          </DialogHeader>

          {editingPlan && (
            <form onSubmit={submitEditPlan} className="flex flex-col gap-5 mt-4">
              {/* Form Input fields */}
              <div className="flex flex-col gap-4">
                {/* Plan Name & Duration Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Family"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-500 py-3 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="month"
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-500 py-3 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Plan Price */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left">
                    Price
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $19.99"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-555 py-3 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                  />
                </div>

                {/* Plan Status */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left">
                    Plan Status
                  </label>
                  <div className="flex items-center gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="planStatusEdit"
                        value="Active"
                        checked={formStatus === "Active"}
                        onChange={() => setFormStatus("Active")}
                        className="sr-only"
                      />
                      <div
                        className={`size-4 rounded-full border flex items-center justify-center transition-all duration-200 ${
                          formStatus === "Active"
                            ? "border-[#00ADEF] bg-[#00ADEF]/10 shadow-[0_0_8px_rgba(0,173,239,0.2)]"
                            : "border-zinc-700 hover:border-zinc-500 bg-[#08090d]"
                        }`}
                      >
                        <div
                          className={`size-2 rounded-full transition-transform duration-200 ${
                            formStatus === "Active"
                              ? "bg-[#00ADEF] scale-100"
                              : "bg-transparent scale-0"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold transition-colors duration-200 ${
                          formStatus === "Active" ? "text-white" : "text-zinc-400"
                        }`}
                      >
                        Active
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="planStatusEdit"
                        value="Inactive"
                        checked={formStatus === "Inactive"}
                        onChange={() => setFormStatus("Inactive")}
                        className="sr-only"
                      />
                      <div
                        className={`size-4 rounded-full border flex items-center justify-center transition-all duration-200 ${
                          formStatus === "Inactive"
                            ? "border-[#00ADEF] bg-[#00ADEF]/10 shadow-[0_0_8px_rgba(0,173,239,0.2)]"
                            : "border-zinc-700 hover:border-zinc-500 bg-[#08090d]"
                        }`}
                      >
                        <div
                          className={`size-2 rounded-full transition-transform duration-200 ${
                            formStatus === "Inactive"
                              ? "bg-[#00ADEF] scale-100"
                              : "bg-transparent scale-0"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold transition-colors duration-200 ${
                          formStatus === "Inactive" ? "text-white" : "text-zinc-400"
                        }`}
                      >
                        Inactive
                      </span>
                    </label>
                  </div>
                </div>

                {/* Add Features */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left">
                    Add features
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Enter Feature name"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                      className="w-full bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-550 pl-4 pr-10 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddFeature()}
                      className="absolute right-3 text-[#00ADEF] hover:text-[#3b82f6] transition-colors cursor-pointer"
                    >
                      <PlusCircle className="size-4.5" />
                    </button>
                  </div>
                </div>

                {/* Feature List Items with divider list styling */}
                <div className="flex flex-col max-h-48 overflow-y-auto mt-1 border border-[#1b1e25]/65 rounded-xl divide-y divide-[#1b1e25]/40 bg-[#08090d]/30">
                  {formFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-[#121520]/10 transition-colors"
                    >
                      <span className="text-zinc-300 text-xs font-semibold text-left">{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteFeature(idx)}
                        className="text-red-500 hover:text-red-400 p-1 transition-colors cursor-pointer rounded-full hover:bg-red-500/10 active:scale-95"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                  {formFeatures.length === 0 && (
                    <div className="px-4 py-6 text-center text-xs text-zinc-555 font-bold uppercase tracking-wider select-none">
                      No features added yet
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00ADEF] to-[#3b82f6] hover:opacity-90 border-none text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer select-none active:scale-[0.98] mt-2 shadow-[0_0_15px_rgba(0,173,239,0.15)]"
              >
                Save all Changes
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Subscriptions;
