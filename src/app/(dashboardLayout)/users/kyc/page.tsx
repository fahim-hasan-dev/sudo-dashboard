"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  CheckCircle,
  XCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface KYCRequest {
  id: string;
  name: string;
  email: string;
  country: string;
  flag: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
}

const KycPage = () => {
  const [currentDate, setCurrentDate] = useState("Wednesday, June 10, 2026");
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [requests, setRequests] = useState<KYCRequest[]>([
    { id: "KYC-8821", name: "Marcus Chen", email: "marcus.c@outlook.com", country: "USA", flag: "🇺🇸", date: "2026-06-09 14:22", status: "Approved" },
    { id: "KYC-8821", name: "Marcus Chen", email: "marcus.c@outlook.com", country: "USA", flag: "🇺🇸", date: "2026-06-09 14:22", status: "Approved" },
    { id: "KYC-8821", name: "Marcus Chen", email: "marcus.c@outlook.com", country: "USA", flag: "🇺🇸", date: "2026-06-09 14:22", status: "Pending" },
    { id: "KYC-8821", name: "Marcus Chen", email: "marcus.c@outlook.com", country: "USA", flag: "🇺🇸", date: "2026-06-09 14:22", status: "Rejected" },
    { id: "KYC-8821", name: "Marcus Chen", email: "marcus.c@outlook.com", country: "USA", flag: "🇺🇸", date: "2026-06-09 14:22", status: "Pending" },
    { id: "KYC-8821", name: "Marcus Chen", email: "marcus.c@outlook.com", country: "USA", flag: "🇺🇸", date: "2026-06-09 14:22", status: "Rejected" },
    { id: "KYC-8821", name: "Marcus Chen", email: "marcus.c@outlook.com", country: "USA", flag: "🇺🇸", date: "2028-06-09 14:22", status: "Pending" },
  ]);

  // Keep a unique state to track which exact row is loaded in review panel.
  // Using index + id to unique identify rows as the mock uses identical IDs
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  // Modal control states
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  
  // Rejection modal options
  const [selectedReason, setSelectedReason] = useState("Document appears to be altered or fraudulent");
  const [additionalNotes, setAdditionalNotes] = useState("");

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

  const kycReasons = [
    "Document is expired or invalid",
    "Document image is blurry or unreadable",
    "Selfie does not match document photo",
    "Document appears to be altered or fraudulent",
    "Address proof does not match provided details",
    "Missing required document",
    "Other (see notes)",
  ];

  // Derive counts
  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;
  const rejectedCount = requests.filter((r) => r.status === "Rejected").length;

  // Filtered requests list
  const filteredRequests = requests.map((req, idx) => ({ ...req, originalIndex: idx })).filter((r) => {
    if (activeTab === "pending") return r.status === "Pending";
    if (activeTab === "approved") return r.status === "Approved";
    if (activeTab === "rejected") return r.status === "Rejected";
    return true;
  });

  const selectedRequest = selectedRowIndex !== null ? requests[selectedRowIndex] : null;

  const handleApproveConfirm = () => {
    const updated = [...requests];
    if (selectedRowIndex !== null && updated[selectedRowIndex]) {
      updated[selectedRowIndex].status = "Approved";
    }
    setRequests(updated);
    setShowApproveModal(false);
  };

  const handleRejectConfirm = () => {
    const updated = [...requests];
    if (selectedRowIndex !== null && updated[selectedRowIndex]) {
      updated[selectedRowIndex].status = "Rejected";
    }
    setRequests(updated);
    setShowRejectModal(false);
    setAdditionalNotes("");
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-8 text-white select-text">
      {/* Header title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none">
          KYC Verification
        </h1>
        <span className="text-xs font-semibold text-zinc-500 tracking-wide mt-1 block">
          {currentDate}
        </span>
      </div>

      {/* Responsive layout structure */}
      <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
        {/* Left Side: Main table list */}
        <div className="flex-1 w-full bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-6 min-h-[500px]">
          {/* Tabs row toolbar */}
          <div className="flex flex-wrap items-center gap-2 select-none border-b border-[#1b1e25] pb-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "all"
                  ? "bg-[#00ADEF]/10 border border-[#00ADEF]/25 text-[#00ADEF]"
                  : "border border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              All <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === "all" ? "bg-[#00ADEF]/20 text-[#00ADEF]" : "bg-zinc-800/80 text-zinc-500"}`}>{totalCount}</span>
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "pending"
                  ? "bg-[#00ADEF]/10 border border-[#00ADEF]/25 text-[#00ADEF]"
                  : "border border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Pending <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === "pending" ? "bg-[#00ADEF]/20 text-[#00ADEF]" : "bg-zinc-800/80 text-zinc-500"}`}>{pendingCount}</span>
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "approved"
                  ? "bg-[#00ADEF]/10 border border-[#00ADEF]/25 text-[#00ADEF]"
                  : "border border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Approved <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === "approved" ? "bg-[#00ADEF]/20 text-[#00ADEF]" : "bg-zinc-800/80 text-zinc-500"}`}>{approvedCount}</span>
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "rejected"
                  ? "bg-[#00ADEF]/10 border border-[#00ADEF]/25 text-[#00ADEF]"
                  : "border border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Rejected <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === "rejected" ? "bg-[#00ADEF]/20 text-[#00ADEF]" : "bg-zinc-800/80 text-zinc-500"}`}>{rejectedCount}</span>
            </button>
          </div>

          {/* Table container using primitive components */}
          <div className="rounded-xl border border-[#1b1e25]/60 bg-[#07080a]/30 overflow-hidden w-full">
            <Table>
              <TableHeader className="bg-[#0f111a] border-b border-[#1b1e25]/65">
                <TableRow className="hover:bg-transparent border-none h-12">
                  <TableHead className="py-3 px-4 font-bold text-[#64748b] uppercase tracking-wider text-[10px] h-12 text-left border-none">Request ID</TableHead>
                  <TableHead className="py-3 px-4 font-bold text-[#64748b] uppercase tracking-wider text-[10px] h-12 text-left border-none">User</TableHead>
                  <TableHead className="py-3 px-4 font-bold text-[#64748b] uppercase tracking-wider text-[10px] h-12 text-left border-none">Country</TableHead>
                  <TableHead className="py-3 px-4 font-bold text-[#64748b] uppercase tracking-wider text-[10px] h-12 text-left border-none">Submitted</TableHead>
                  <TableHead className="py-3 px-4 font-bold text-[#64748b] uppercase tracking-wider text-[10px] h-12 text-left border-none">Status</TableHead>
                  <TableHead className="py-3 px-4 font-bold text-[#64748b] uppercase tracking-wider text-[10px] h-12 text-center border-none">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((req) => {
                  const isSelected = selectedRowIndex === req.originalIndex;
                  return (
                    <TableRow
                      key={req.originalIndex}
                      onClick={() => setSelectedRowIndex(req.originalIndex)}
                      className={`border-b border-[#1b1e25]/50 hover:bg-[#121520]/25 h-16 cursor-pointer transition-colors ${
                        isSelected ? "bg-[#00ADEF]/5 hover:bg-[#00ADEF]/8" : ""
                      }`}
                    >
                      <TableCell className="py-3 px-4 font-semibold text-[#00ADEF] text-left border-none">
                        {req.id}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-left border-none">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-white text-[13px] tracking-tight leading-none">
                            {req.name}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-semibold leading-none mt-0.5">
                            {req.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 px-4 text-left border-none">
                        <div className="flex items-center gap-1 text-zinc-350 select-none text-left">
                          <span className="text-base leading-none">{req.flag}</span>
                          <span className="text-[13px]">{req.country}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 px-4 text-[#64748b] font-semibold text-left border-none">
                        {req.date}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-left border-none">
                        <span
                          className={`font-semibold text-[13px] ${
                            req.status === "Approved"
                              ? "text-emerald-500"
                              : req.status === "Pending"
                              ? "text-amber-500"
                              : "text-[#ff3b30]"
                          }`}
                        >
                          {req.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 px-4 border-none" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-3 select-none">
                          <button
                            onClick={() => {
                              setSelectedRowIndex(req.originalIndex);
                              setShowApproveModal(true);
                            }}
                            disabled={req.status === "Approved"}
                            className={`p-1 transition-colors ${
                              req.status === "Approved"
                                ? "text-zinc-650 cursor-not-allowed"
                                : "text-emerald-500 hover:text-emerald-400 cursor-pointer"
                            }`}
                            title="Approve KYC"
                          >
                            <CheckCircle2 className="size-4.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRowIndex(req.originalIndex);
                              setShowRejectModal(true);
                            }}
                            disabled={req.status === "Rejected"}
                            className={`p-1 transition-colors ${
                              req.status === "Rejected"
                                ? "text-zinc-650 cursor-not-allowed"
                                : "text-[#ff3b30] hover:text-red-400 cursor-pointer"
                            }`}
                            title="Reject KYC"
                          >
                            <XCircle className="size-4.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Side: Detailed Review Sidepanel */}
        {selectedRowIndex !== null && selectedRequest && (
          <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-6 animate-fadeIn">
            <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 shadow-md flex flex-col gap-5 sticky top-6">
              <div className="flex items-center justify-between gap-2 border-b border-[#1b1e25] pb-4">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider select-none leading-none truncate">
                  KYC Review — {selectedRequest.id}
                </h2>
                <button
                  onClick={() => setSelectedRowIndex(null)}
                  className="text-zinc-500 hover:text-white p-1 rounded transition-colors cursor-pointer select-none"
                  title="Close Review Panel"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Status outline pill */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold leading-none border select-none ${
                    selectedRequest.status === "Approved"
                      ? "bg-emerald-500/10 text-emerald-450 border-emerald-500/20"
                      : selectedRequest.status === "Pending"
                      ? "bg-amber-500/10 text-amber-450 border-amber-500/20"
                      : "bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]/20"
                  }`}
                >
                  {selectedRequest.status}
                </span>
              </div>

              {/* Profile row */}
              <div className="flex flex-col gap-1 text-sm border-t border-[#1b1e25] pt-4">
                <span className="font-bold text-white text-[15px] truncate">
                  {selectedRequest.name}
                </span>
                <span className="text-xs text-zinc-500 font-medium truncate">
                  {selectedRequest.email}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1.5 mt-1 font-semibold select-none">
                  <span>{selectedRequest.flag}</span>
                  <span>{selectedRequest.country}</span>
                </span>
              </div>

              {/* Submissions checklist */}
              <div className="flex flex-col gap-4 border-t border-[#1b1e25] pt-4">
                <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider select-none">
                  Submitted Documents
                </span>

                {/* Document items lists */}
                <div className="flex flex-col gap-3">
                  {/* Document Card: Passport */}
                  <div className="bg-[#07080a] border border-[#1b1e25] p-4 rounded-xl flex flex-col gap-4 relative group hover:border-zinc-800 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-350 flex items-center gap-2">
                        <FileText className="size-4 text-[#00ADEF]" /> Passport
                      </span>
                      <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-0.5">
                        <Download className="size-4" />
                      </button>
                    </div>
                    {/* Doc Preview Placeholder */}
                    <div className="h-28 rounded-lg bg-[#0e1015] border border-[#1b1e25] flex flex-col items-center justify-center gap-2 hover:bg-[#0e1015]/60 transition-colors">
                      <FileText className="size-6 text-[#00ADEF]/60" />
                      <span className="text-[10px] text-zinc-500 font-bold select-none uppercase tracking-widest">
                        Document Preview
                      </span>
                    </div>
                  </div>

                  {/* Document Card: Bank Statement */}
                  <div className="bg-[#07080a] border border-[#1b1e25] p-4 rounded-xl flex flex-col gap-4 relative group hover:border-zinc-800 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-350 flex items-center gap-2">
                        <FileText className="size-4 text-[#00ADEF]" /> Bank Statement
                      </span>
                      <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-0.5">
                        <Download className="size-4" />
                      </button>
                    </div>
                    {/* Doc Preview Placeholder */}
                    <div className="h-28 rounded-lg bg-[#0e1015] border border-[#1b1e25] flex flex-col items-center justify-center gap-2 hover:bg-[#0e1015]/60 transition-colors">
                      <FileText className="size-6 text-[#00ADEF]/60" />
                      <span className="text-[10px] text-zinc-500 font-bold select-none uppercase tracking-widest">
                        Document Preview
                      </span>
                    </div>
                  </div>

                  {/* Document Card: Selfie */}
                  <div className="bg-[#07080a] border border-[#1b1e25] p-4 rounded-xl flex flex-col gap-4 relative group hover:border-zinc-800 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-350 flex items-center gap-2">
                        <FileText className="size-4 text-[#00ADEF]" /> Selfie
                      </span>
                      <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-0.5">
                        <Download className="size-4" />
                      </button>
                    </div>
                    {/* Doc Preview Placeholder */}
                    <div className="h-28 rounded-lg bg-[#0e1015] border border-[#1b1e25] flex flex-col items-center justify-center gap-2 hover:bg-[#0e1015]/60 transition-colors">
                      <FileText className="size-6 text-[#00ADEF]/60" />
                      <span className="text-[10px] text-zinc-500 font-bold select-none uppercase tracking-widest">
                        Document Preview
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="flex gap-3 border-t border-[#1b1e25] pt-4.5 select-none">
                {selectedRequest.status === "Pending" && (
                  <>
                    <button
                      onClick={() => setShowApproveModal(true)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-lg text-xs transition-all cursor-pointer active:scale-98 flex items-center justify-center"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="flex-1 bg-[#ff3b30]/10 hover:bg-[#ff3b30]/20 border border-[#ff3b30]/30 text-[#ff3b30] font-bold h-11 rounded-lg text-xs transition-all cursor-pointer active:scale-98 flex items-center justify-center"
                    >
                      Reject
                    </button>
                  </>
                )}
                {selectedRequest.status === "Approved" && (
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="w-full bg-[#ff3b30]/10 hover:bg-[#ff3b30]/20 border border-[#ff3b30]/30 text-[#ff3b30] font-bold h-11 rounded-lg text-xs transition-all cursor-pointer active:scale-98 flex items-center justify-center"
                  >
                    Reject
                  </button>
                )}
                {selectedRequest.status === "Rejected" && (
                  <button
                    onClick={() => setShowApproveModal(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-lg text-xs transition-all cursor-pointer active:scale-98 flex items-center justify-center"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* APPROVE VERIFICATION POPUP MODAL */}
      {showApproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
          <div className="bg-[#0e1015] border border-[#1b1e25] max-w-md w-full rounded-xl p-6 flex flex-col gap-6 text-white shadow-2xl animate-scaleIn">
            {/* Header / Title */}
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white leading-none">
                Approve KYC Verification
              </h3>
              <button
                onClick={() => setShowApproveModal(false)}
                className="text-zinc-500 hover:text-white p-1 rounded transition-colors cursor-pointer"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Circular Checkmark Badge & Content Description */}
            <div className="flex flex-col items-center gap-4 text-center py-2">
              <div className="bg-emerald-500/10 text-emerald-500 p-4 rounded-full size-16 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <CheckCircle className="size-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-[15px] font-bold text-white">Approve KYC Verification</h4>
                <p className="text-xs font-semibold text-zinc-400 leading-relaxed max-w-sm">
                  Grant {selectedRequest?.name} a verified status badge. Confirm that all submitted documents are authentic and valid.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowApproveModal(false)}
                className="flex-1 bg-[#161920] border border-[#1b1e25] hover:bg-zinc-800/40 text-zinc-300 font-bold h-11 rounded-lg text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveConfirm}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-center"
              >
                Approve & Verify
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT VERIFICATION POPUP MODAL */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
          <div className="bg-[#0e1015] border border-[#1b1e25] max-w-lg w-full rounded-xl p-6 flex flex-col gap-6 text-white shadow-2xl animate-scaleIn">
            {/* Header / Title */}
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white leading-none">
                Reject KYC Verification
              </h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="text-zinc-500 hover:text-white p-1 rounded transition-colors cursor-pointer"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Warning block */}
            <div className="bg-[#ff3b30]/10 border border-[#ff3b30]/20 p-4 rounded-xl flex flex-col gap-1 text-[#ff3b30]">
              <span className="text-[13px] font-bold">
                Rejecting KYC for: {selectedRequest?.name}
              </span>
              <span className="text-[11px] text-zinc-400 font-semibold mt-0.5">
                The user will be notified with the reason selected below.
              </span>
            </div>

            {/* Radio reasons selection list */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                Rejection Reason
              </span>
              <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
                {kycReasons.map((reason) => {
                  const isChecked = selectedReason === reason;
                  return (
                    <label
                      key={reason}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        isChecked
                          ? "bg-[#ff3b30]/5 border-[#ff3b30] text-[#ff3b30]"
                          : "bg-[#07080a] border-[#1b1e25] text-zinc-300 hover:border-zinc-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="rejectionReason"
                        checked={isChecked}
                        onChange={() => setSelectedReason(reason)}
                        className="hidden"
                      />
                      <span
                        className={`size-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isChecked ? "border-[#ff3b30]" : "border-zinc-650"
                        }`}
                      >
                        {isChecked && <span className="size-2 rounded-full bg-[#ff3b30]" />}
                      </span>
                      <span className="text-xs font-semibold">{reason}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Textarea notes input */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                Additional Notes (optional)
              </span>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Provide additional context for the user..."
                className="bg-[#07080a] border border-[#1b1e25] rounded-lg p-3.5 text-xs text-white placeholder:text-zinc-550 focus:outline-none focus:border-[#ff3b30] h-20 resize-none transition-colors w-full"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setAdditionalNotes("");
                }}
                className="flex-1 bg-[#161920] border border-[#1b1e25] hover:bg-zinc-800/40 text-zinc-300 font-bold h-11 rounded-lg text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="flex-1 bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-white font-bold h-11 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-center"
              >
                Reject & Notify User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycPage;
