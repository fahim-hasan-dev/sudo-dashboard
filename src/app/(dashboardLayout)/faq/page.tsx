"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import DeleteModal from "@/components/modals/DeleteModal";
import { myFetch } from "@/utils/myFetch";
import { toast } from "react-hot-toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  // Form states
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const fetchFaqs = async () => {
    try {
      const res = await myFetch("/public/faq/all");
      if (res.success && Array.isArray(res.data)) {
        const mappedFaqs: FAQ[] = res.data.map(
          (item: { _id?: string; id?: string; question: string; answer: string }) => ({
            id: item._id || item.id || String(Date.now()),
            question: item.question,
            answer: item.answer,
          })
        );
        setFaqs(mappedFaqs);
      }
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenAdd = () => {
    setEditingFAQ(null);
    setQuestion("");
    setAnswer("");
    setIsOpen(true);
  };

  const handleOpenEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;

    try {
      if (editingFAQ) {
        // Edit existing FAQ
        const res = await myFetch(`/public/faq/${editingFAQ.id}`, {
          method: "PATCH",
          body: { question, answer },
        });

        if (res.success) {
          setFaqs(faqs.map(item => item.id === editingFAQ.id ? { ...item, question, answer } : item));
          toast.success("FAQ updated successfully!");
        } else {
          toast.error(res.message || "Failed to update FAQ");
        }
      } else {
        // Add new FAQ
        const res = await myFetch("/public/faq", {
          method: "POST",
          body: { question, answer },
        });

        if (res.success && res.data) {
          const newFaq: FAQ = {
            id: res.data._id || res.data.id || String(Date.now()),
            question: res.data.question || question,
            answer: res.data.answer || answer,
          };
          setFaqs([newFaq, ...faqs]);
          toast.success("FAQ added successfully!");
        } else {
          toast.error(res.message || "Failed to add FAQ");
        }
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting FAQ:", error);
      toast.error("Failed to submit FAQ");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await myFetch(`/public/faq/${id}`, {
        method: "DELETE",
      });

      if (res.success) {
        setFaqs(faqs.filter(item => item.id !== id));
        toast.success("FAQ deleted successfully!");
      } else {
        toast.error(res.message || "Failed to delete FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete FAQ");
    }
  };

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-6 text-white">
      
      {/* FAQ Settings Heading */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            FAQ&apos;s Settings
          </h1>
          <p className="text-sm font-semibold text-[#9f8b7c] mt-1">
            {faqs.length} FAQ&apos;s
          </p>
        </div>
        
        {/* + Add FAQ Action Button */}
        <button
          onClick={handleOpenAdd}
          className="bg-primary hover:bg-primary/95 text-black font-extrabold px-5 py-2.5 rounded-lg text-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-md shadow-primary/10 h-11"
        >
          <Plus className="size-4 stroke-[3]" /> Add FAQ
        </button>
      </div>

      {/* FAQ List Card Container */}
      <div className="bg-[#0e1015] border border-[#1b1e25] rounded-xl p-6 flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            FAQ List
          </h2>
        </div>

        {/* Full-width search bar inside list card */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-3.5 text-zinc-500 size-5" />
          <Input
            type="text"
            placeholder="Search here..."
            className="bg-[#07080a] border border-[#1b1e25] text-white rounded-lg h-12 w-full pl-12 pr-4 placeholder:text-zinc-500 focus-visible:ring-primary/30 text-sm shadow-inner transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Dynamic FAQ Table Grid */}
        <div className="rounded-xl border border-[#1b1e25]/60 bg-[#07080a] overflow-hidden w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-[#64748b] border-b border-[#1b1e25] font-bold uppercase tracking-wider text-[10px] h-12">
                <th className="py-3.5 px-4">Question</th>
                <th className="py-3.5 px-4">Answer Snippet</th>
                <th className="py-3.5 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={3} className="h-24 text-center text-zinc-500 font-bold animate-pulse">
                    Loading FAQs...
                  </td>
                </tr>
              ) : filteredFaqs.length ? (
                filteredFaqs.map((item) => (
                  <tr key={item.id} className="border-b border-[#1b1e25]/60 hover:bg-[#121520]/20 h-14">
                    <td className="py-3 px-4 font-semibold text-white max-w-[200px] truncate">
                      {item.question}
                    </td>
                    <td className="py-3 px-4 text-zinc-400 max-w-[320px] truncate">
                      {item.answer}
                    </td>
                    <td className="py-3 px-4 flex items-center gap-4 h-14 leading-none">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="text-primary hover:underline font-bold text-xs cursor-pointer select-none"
                      >
                        Edit
                      </button>

                      {/* Delete Modal Trigger */}
                      <DeleteModal
                        itemId={item.id}
                        action={handleDelete}
                        triggerBtn={
                          <span className="text-[#ff3b30] hover:underline font-bold text-xs cursor-pointer select-none">
                            Delete
                          </span>
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="h-24 text-center text-zinc-500 font-bold">
                    No FAQs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer dynamic totals and pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 text-zinc-400 select-none w-full">
          <div className="text-xs font-semibold text-zinc-500">
            Showing 1-{Math.min(12, filteredFaqs.length)} of {filteredFaqs.length} questions
          </div>

          <div className="flex items-center gap-1">
            <button className="size-8 rounded-lg flex items-center justify-center border border-transparent text-zinc-500 hover:text-white hover:bg-zinc-850 disabled:opacity-30 disabled:pointer-events-none transition-all">
              1
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit FAQ Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#0e1015] border border-[#1b1e25] p-6 max-w-lg rounded-xl flex flex-col gap-6 text-white shadow-2xl">
          <DialogTitle className="hidden">Frequently Asked Questions</DialogTitle>
          
          <div className="text-center flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              Create a frequently asked question to help users.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Question Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none">
                FAQ Question
              </label>
              <Input
                type="text"
                placeholder="Enter the question here"
                className="bg-[#07080a] border border-[#1b1e25] text-white rounded-lg h-11 w-full px-4 placeholder:text-zinc-500 focus-visible:ring-primary/30 text-sm shadow-inner transition-colors"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>

            {/* Answer Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none">
                Answer
              </label>
              <textarea
                placeholder="Provide a detailed answer"
                className="bg-[#07080a] border border-[#1b1e25] text-white rounded-lg h-36 w-full p-4 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 text-sm shadow-inner transition-colors resize-none"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>

            {/* Actions Buttons */}
            <div className="flex items-center gap-4 mt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-2.5 rounded-lg text-sm transition-all active:scale-95 cursor-pointer h-11 flex-1 shadow-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-black font-bold py-2.5 rounded-lg text-sm transition-all active:scale-95 cursor-pointer h-11 flex-1 shadow-md shadow-primary/10"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FAQPage;
