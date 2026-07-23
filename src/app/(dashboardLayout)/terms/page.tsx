"use client";

import React, { useState, useEffect } from "react";
import RichTextEditor from "@/components/page/editor/RichTextEditor";
import { myFetch } from "@/utils/myFetch";
import { toast } from "react-hot-toast";

const TermsPage = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await myFetch("/public/terms-and-condition");
        if (res.success && res.data?.content !== undefined) {
          setContent(res.data.content);
        }
      } catch (error) {
        console.error("Failed to fetch terms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const handleUpdate = async (newContent: string) => {
    try {
      const res = await myFetch("/public", {
        method: "POST",
        body: {
          type: "terms-and-condition",
          content: newContent,
        },
      });

      if (res.success) {
        toast.success("Terms & Conditions updated successfully!");
        setContent(newContent);
      } else {
        toast.error(res.message || "Failed to update Terms & Conditions");
      }
    } catch (error) {
      console.error("Error updating terms:", error);
      toast.error("Failed to update Terms & Conditions");
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="w-full h-80 rounded-xl border border-[#1b1e25] bg-[#0e1015] animate-pulse flex items-center justify-center text-zinc-500">
        Loading Terms & Conditions...
      </div>
    );
  }

  return (
    <RichTextEditor
      title="Terms & Condition"
      initialContent={content}
      onUpdate={handleUpdate}
      onCancel={handleCancel}
    />
  );
};

export default TermsPage;
