"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import {
  FileText,
  ChevronRight,
  ChevronLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  Save,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Load JoditEditor dynamically with ssr: false to prevent Next.js SSR crashes
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 rounded-xl border border-[#1b1e25] bg-[#0e1015] animate-pulse flex items-center justify-center text-zinc-500 select-none">
      Loading Text Editor...
    </div>
  ),
});

interface ContentPageItem {
  id: string;
  title: string;
  updatedAt: string;
  status: "published";
  type: "editor" | "faq";
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const initialPages: ContentPageItem[] = [
  {
    id: "terms",
    title: "Terms & Conditions",
    updatedAt: "2026-05-12",
    status: "published",
    type: "editor",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    updatedAt: "2026-05-12",
    status: "published",
    type: "editor",
  },
  {
    id: "faq",
    title: "FAQ's",
    updatedAt: "2026-05-12",
    status: "published",
    type: "faq",
  },
  {
    id: "about",
    title: "About Us",
    updatedAt: "2026-04-20",
    status: "published",
    type: "editor",
  },
];

const initialTermsContent = `<h1>Terms and Conditions</h1>
<p>Last updated: May 12, 2026</p>
<h2>1. Acceptance of Terms</h2>
<p>By accessing and using CirclePay ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
<h2>2. Description of Service</h2>
<p>CirclePay is a peer-to-peer savings circle platform that enables users to form contribution groups, pool funds, and distribute payouts on a rotating basis.</p>
<h2>3. User Eligibility</h2>
<p>You must be at least 18 years of age and have completed KYC verification to participate in savings groups with contribution amounts exceeding $500 per cycle.</p>
<h2>4. Financial Obligations</h2>
<p>All members of a savings circle are bound to their contribution schedule. Failure to contribute may result in suspension from the group and the platform.</p>`;

const initialPrivacyContent = `<h1>Privacy Policy</h1>
<p>Last updated: May 12, 2026</p>
<h2>1. Information We Collect</h2>
<p>We collect information you provide directly to us when creating an account, updating your profile, or executing savings circle transactions.</p>
<h2>2. How We Use Information</h2>
<p>We use the information we collect to provide, maintain, and improve our services, verify identity (KYC), and protect against fraudulent activity.</p>
<h2>3. Data Protection</h2>
<p>We implement standard cryptographic safeguards to secure your personal information and transaction details against unauthorized access.</p>`;

const initialAboutContent = `<h1>About Us</h1>
<p>Last updated: April 20, 2026</p>
<h2>Our Vision</h2>
<p>At CirclePay, our vision is to democratize financial savings through secure, automated, and community-driven peer-to-peer savings circles.</p>
<h2>Empowering Communities</h2>
<p>We build tools that make it easy for groups, families, and local communities to pool capital, establish savings targets, and achieve their collective financial goals.</p>
<h2>Security First</h2>
<p>Our platform integrates advanced escrow structures, identity verification, and ledger compliance to provide peace of mind for every circle participant.</p>`;

const initialFaqs: FaqItem[] = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  question: i % 2 === 0 ? "How do i reset my password?" : "How do I complete KYC verification?",
  answer:
    i % 2 === 0
      ? "To reset your password, navigate to the Login page and click on the 'Forgot Password' link. Enter your registered email address, and we will send you an OTP code to verify and reset your security credentials."
      : "To complete KYC, navigate to User Management, upload a valid government-issued ID (Passport, National ID Card, or Driver License) along with a clear selfie. Approvals are processed within 24 hours.",
}));

const CMS = () => {
  const [currentDate, setCurrentDate] = useState("Wednesday, June 10, 2026");
  const [selectedPageId, setSelectedPageId] = useState("terms");

  // Page contents state
  const [termsContent, setTermsContent] = useState(initialTermsContent);
  const [privacyContent, setPrivacyContent] = useState(initialPrivacyContent);
  const [aboutContent, setAboutContent] = useState(initialAboutContent);

  // Faqs state
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 8; // Render 8 rows per page in table

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  // FAQ Form state
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  // Toast alert state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const editorRef = useRef(null);

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

  // Get active document details
  const activePage = useMemo(() => {
    return initialPages.find((p) => p.id === selectedPageId) || initialPages[0];
  }, [selectedPageId]);

  const activeContent = useMemo(() => {
    if (selectedPageId === "terms") return termsContent;
    if (selectedPageId === "privacy") return privacyContent;
    if (selectedPageId === "about") return aboutContent;
    return "";
  }, [selectedPageId, termsContent, privacyContent, aboutContent]);

  const handleUpdateContent = (newContent: string) => {
    if (selectedPageId === "terms") setTermsContent(newContent);
    else if (selectedPageId === "privacy") setPrivacyContent(newContent);
    else if (selectedPageId === "about") setAboutContent(newContent);
  };

  const handleSavePage = () => {
    showToast(`Page "${activePage.title}" saved and published successfully!`);
  };

  // Word & Character counter helpers
  const getCharCount = (str: string) => {
    const text = str.replace(/<[^>]*>/g, ""); // Strip HTML tags
    return text.length;
  };

  const getWordCount = (str: string) => {
    const text = str.replace(/<[^>]*>/g, " ").trim(); // Strip HTML tags
    if (!text) return 0;
    return text.split(/\s+/).length;
  };

  // Faq functions
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query)
    );
  }, [faqs, searchQuery]);

  // Pagination calculations
  const totalFaqs = filteredFaqs.length;
  const totalPages = Math.ceil(totalFaqs / faqsPerPage) || 1;
  const startIndex = (currentPage - 1) * faqsPerPage;
  const paginatedFaqs = useMemo(() => {
    return filteredFaqs.slice(startIndex, startIndex + faqsPerPage);
  }, [filteredFaqs, startIndex]);

  // Adjust page number if it exceeds total pages after filtering
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleOpenCreateFaq = () => {
    setFaqQuestion("");
    setFaqAnswer("");
    setIsCreateOpen(true);
  };

  const handleOpenEditFaq = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
  };

  const handleCreateFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      showToast("Question and Answer are required!");
      return;
    }

    const newFaq: FaqItem = {
      id: Date.now().toString(),
      question: faqQuestion.trim(),
      answer: faqAnswer.trim(),
    };

    setFaqs((prev) => [newFaq, ...prev]);
    setIsCreateOpen(false);
    showToast("FAQ created successfully!");
  };

  const handleEditFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      showToast("Question and Answer are required!");
      return;
    }

    setFaqs((prev) =>
      prev.map((f) =>
        f.id === editingFaq.id
          ? { ...f, question: faqQuestion.trim(), answer: faqAnswer.trim() }
          : f
      )
    );
    setEditingFaq(null);
    showToast("FAQ updated successfully!");
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    showToast("FAQ deleted successfully!");
  };

  // Jodit Editor configuration overridden to look premium and match mockup styling
  const joditConfig = useMemo(
    () => ({
      readonly: false,
      theme: "dark",
      placeholder: "Start writing here...",
      minHeight: 480,
      maxHeight: 700,
      toolbarButtonSize: "middle",
      buttons: [
        "fontsize",
        "paragraph",
        "brush",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "align",
        "eraser",
        "ul",
        "ol",
        "image",
        "link",
      ],
      style: {
        background: "#08090d",
        color: "#ffffff",
        border: "1px solid #1b1e25",
        fontFamily: "Inter, sans-serif",
      },
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
    }),
    []
  );

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-8 text-white select-text relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#0a201c] border border-emerald-500/30 text-[#10B981] px-4 py-3 rounded-xl flex items-center gap-2.5 shadow-2xl z-50 animate-slideIn">
          <CheckCircle2 className="size-4" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header - Styled as "Saving Groups" as shown in the screenshot */}
      <div className="flex flex-col gap-1 select-none">
        <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none">
          Saving Groups
        </h1>
        <span className="text-xs font-semibold text-zinc-555 tracking-wide mt-1 block">
          {currentDate}
        </span>
      </div>

      {/* Grid Layout containing sidebar & main edit panels */}
      <div className="flex flex-col md:flex-row gap-6 items-start w-full">
        {/* Left Column: Content Pages List */}
        <div className="bg-[#0e1015]/60 border border-[#1b1e25] rounded-2xl p-5 w-full md:w-[290px] shrink-0 flex flex-col gap-4 shadow-md">
          <h2 className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider select-none text-left">
            Content Pages
          </h2>

          <div className="flex flex-col gap-2.5">
            {initialPages.map((page) => {
              const isSelected = page.id === selectedPageId;
              return (
                <button
                  key={page.id}
                  onClick={() => setSelectedPageId(page.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 select-none cursor-pointer ${
                    isSelected
                      ? "bg-[#121520]/30 border-[#00ADEF]/60 text-white shadow-[0_0_15px_rgba(0,173,239,0.08)]"
                      : "bg-[#07080a]/30 border-[#1b1e25]/60 hover:bg-[#121520]/15 hover:border-[#1b1e25] text-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText
                      className={`size-4 shrink-0 transition-colors ${
                        isSelected ? "text-[#00ADEF]" : "text-zinc-500"
                      }`}
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-white tracking-tight leading-snug">
                        {page.title}
                      </span>
                      <span className="text-[9px] font-bold text-zinc-550 select-none">
                        Updated {page.updatedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase select-none">
                      {page.status}
                    </span>
                    {isSelected && (
                      <ChevronRight className="size-3.5 text-[#00ADEF] shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic editor content based on active item */}
        <div className="flex-1 bg-[#0e1015]/60 border border-[#1b1e25] rounded-2xl p-6 w-full shadow-md min-h-[600px] flex flex-col justify-between">
          {activePage.type === "editor" ? (
            /* Text Editor Panel */
            <div className="flex flex-col gap-5 h-full">
              {/* Header inside right card */}
              <div className="flex justify-between items-center select-none border-b border-[#1b1e25]/60 pb-4">
                <span className="text-sm font-bold text-white tracking-wide">
                  {activePage.title}
                </span>
                <button
                  onClick={handleSavePage}
                  className="bg-gradient-to-r from-[#00ADEF] to-[#3b82f6] hover:opacity-90 border-none text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(0,173,239,0.15)]"
                >
                  <Save className="size-3.5" />
                  Save & Publish
                </button>
              </div>

              {/* Editor Box */}
              <div className="rounded-xl border border-[#1b1e25] bg-[#08090d] overflow-hidden p-1 shadow-inner mt-1">
                <JoditEditor
                  ref={editorRef}
                  value={activeContent}
                  config={joditConfig as never}
                  onBlur={handleUpdateContent}
                />
              </div>

              {/* Editor Footer: Character / Word Count */}
              <div className="text-[11px] font-bold text-zinc-550 select-none text-left tracking-wide mt-2">
                {getCharCount(activeContent)} characters · {getWordCount(activeContent)} words
              </div>
            </div>
          ) : (
            /* FAQ Management Panel */
            <div className="flex flex-col gap-5 h-full">
              {/* Header inside right card */}
              <div className="flex justify-between items-center select-none border-b border-[#1b1e25]/60 pb-4">
                <span className="text-sm font-bold text-white tracking-wide">
                  FAQ's
                </span>
                <button
                  onClick={handleOpenCreateFaq}
                  className="bg-[#00ADEF] hover:bg-[#009cd6] border-none text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <Plus className="size-3.5" />
                  Add FAQ
                </button>
              </div>

              {/* Search input field */}
              <div className="relative flex items-center mt-1 select-none">
                <Search className="absolute left-4 size-4 text-zinc-550 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search products by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to page 1 on search
                  }}
                  className="w-full bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-550 pl-11 pr-4 py-3.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                />
              </div>

              {/* FAQ's List Table */}
              <div className="rounded-xl border border-[#1b1e25]/60 bg-[#07080a]/30 overflow-hidden w-full mt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f111a] border-b border-[#1b1e25]/65 text-[11px] text-zinc-500 font-bold select-none h-11">
                      <th className="py-2.5 px-4 font-semibold w-1/3">Question</th>
                      <th className="py-2.5 px-4 font-semibold w-1/2">Answer Snippet</th>
                      <th className="py-2.5 px-4 font-semibold text-center w-[12%]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedFaqs.map((faq) => (
                      <tr
                        key={faq.id}
                        className="border-b border-[#1b1e25]/50 hover:bg-[#121520]/25 h-[62px] transition-colors"
                      >
                        {/* Question */}
                        <td className="py-2.5 px-4 text-xs font-semibold text-white leading-normal max-w-[200px] truncate">
                          {faq.question}
                        </td>
                        {/* Answer snippet */}
                        <td className="py-2.5 px-4 text-[11px] text-zinc-400 font-medium leading-relaxed max-w-[340px] truncate">
                          {faq.answer}
                        </td>
                        {/* Action Edit / Delete */}
                        <td className="py-2.5 px-4 text-center select-none">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleOpenEditFaq(faq)}
                              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                              title="Edit FAQ"
                            >
                              <Pencil className="size-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteFaq(faq.id)}
                              className="text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete FAQ"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {paginatedFaqs.length === 0 && (
                      <tr className="h-48 border-none bg-transparent">
                        <td colSpan={3} className="text-center text-xs text-zinc-555 font-bold uppercase tracking-wider select-none">
                          No FAQs matching your query
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer: Dynamic event range and page numbers pagination */}
              <div className="flex justify-between items-center mt-4 select-none">
                <span className="text-[11px] font-bold text-zinc-555 tracking-wide">
                  Showing {totalFaqs === 0 ? 0 : startIndex + 1} -{" "}
                  {Math.min(startIndex + faqsPerPage, totalFaqs)} of {totalFaqs} events
                </span>

                <div className="flex items-center gap-1.5">
                  {/* Prev page button */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="size-7 rounded-lg border border-[#1b1e25] bg-[#07080a]/30 flex items-center justify-center text-zinc-400 hover:bg-[#121520]/20 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="size-3.5" />
                  </button>

                  {/* Dynamic Page Buttons */}
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`size-7 rounded-lg text-[11px] font-extrabold transition-all flex items-center justify-center cursor-pointer select-none border border-transparent ${
                          currentPage === pageNum
                            ? "bg-[#00ADEF] text-white"
                            : "bg-[#07080a]/30 hover:bg-[#121520]/20 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 3 && (
                    <>
                      <span className="text-xs text-zinc-500 font-bold px-1 select-none">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`size-7 rounded-lg text-[11px] font-extrabold transition-all flex items-center justify-center cursor-pointer select-none border border-transparent ${
                          currentPage === totalPages
                            ? "bg-[#00ADEF] text-white"
                            : "bg-[#07080a]/30 hover:bg-[#121520]/20 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  {/* Next page button */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="size-7 rounded-lg border border-[#1b1e25] bg-[#07080a]/30 flex items-center justify-center text-zinc-400 hover:bg-[#121520]/20 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 1. Create New FAQ Dialog Modal Overlay */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-[#0b0d13] border border-[#1b1e25] rounded-2xl max-w-md p-6 text-white shadow-2xl">
          <DialogHeader className="flex flex-col gap-1 border-b border-[#1b1e25] pb-4 select-none">
            <DialogTitle className="text-base font-extrabold text-white text-left">Create a New FAQ</DialogTitle>
            <DialogDescription className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider text-left leading-none mt-1">
              Add a new frequently asked question to the system
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateFaqSubmit} className="flex flex-col gap-5 mt-4">
            <div className="flex flex-col gap-4">
              {/* Question Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left select-none">
                  Question
                </label>
                <input
                  type="text"
                  placeholder="Enter the question here..."
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-500 py-3.5 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                  required
                />
              </div>

              {/* Answer Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left select-none">
                  Answer
                </label>
                <textarea
                  placeholder="Enter the detail answer here..."
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  rows={4}
                  className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-500 py-3.5 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors resize-none leading-relaxed"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-2 select-none">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="bg-[#08090d] border border-[#1b1e25] text-zinc-350 hover:text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#00ADEF] to-[#3b82f6] hover:opacity-90 border-none text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer active:scale-[0.98] shadow-[0_0_15px_rgba(0,173,239,0.15)]"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. Edit FAQ Dialog Modal Overlay */}
      <Dialog open={editingFaq !== null} onOpenChange={(open) => { if (!open) setEditingFaq(null); }}>
        <DialogContent className="bg-[#0b0d13] border border-[#1b1e25] rounded-2xl max-w-md p-6 text-white shadow-2xl">
          <DialogHeader className="flex flex-col gap-1 border-b border-[#1b1e25] pb-4 select-none">
            <DialogTitle className="text-base font-extrabold text-white text-left">Edit FAQ</DialogTitle>
            <DialogDescription className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider text-left leading-none mt-1">
              Edit frequently asked question details
            </DialogDescription>
          </DialogHeader>

          {editingFaq && (
            <form onSubmit={handleEditFaqSubmit} className="flex flex-col gap-5 mt-4">
              <div className="flex flex-col gap-4">
                {/* Question Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left select-none">
                    Question
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the question here..."
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                    className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-500 py-3.5 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors"
                    required
                  />
                </div>

                {/* Answer Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider text-left select-none">
                    Answer
                  </label>
                  <textarea
                    placeholder="Enter the detail answer here..."
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    rows={4}
                    className="bg-[#08090d] border border-[#1b1e25] text-white placeholder-zinc-500 py-3.5 px-4 rounded-xl text-xs font-semibold focus:outline-none focus:border-zinc-700 transition-colors resize-none leading-relaxed"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-2 select-none">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="bg-[#08090d] border border-[#1b1e25] text-zinc-350 hover:text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#00ADEF] to-[#3b82f6] hover:opacity-90 border-none text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer active:scale-[0.98] shadow-[0_0_15px_rgba(0,173,239,0.15)]"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMS;
