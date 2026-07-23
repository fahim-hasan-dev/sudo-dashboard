"use client";

import React, { useState, useEffect } from "react";
import RichTextEditor from "@/components/page/editor/RichTextEditor";
import { myFetch } from "@/utils/myFetch";
import { toast } from "react-hot-toast";

const PrivacyPage = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const res = await myFetch("/public/privacy-policy");
        if (res.success && res.data?.content !== undefined) {
          setContent(res.data.content);
        }
      } catch (error) {
        console.error("Failed to fetch privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacy();
  }, []);

  const handleUpdate = async (newContent: string) => {
    try {
      const res = await myFetch("/public", {
        method: "POST",
        body: {
          type: "privacy-policy",
          content: newContent,
        },
      });

      if (res.success) {
        toast.success("Privacy Policy updated successfully!");
        setContent(newContent);
      } else {
        toast.error(res.message || "Failed to update Privacy Policy");
      }
    } catch (error) {
      console.error("Error updating privacy policy:", error);
      toast.error("Failed to update Privacy Policy");
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="w-full h-80 rounded-xl border border-[#1b1e25] bg-[#0e1015] animate-pulse flex items-center justify-center text-zinc-500">
        Loading Privacy Policy...
      </div>
    );
  }

  return (
    <RichTextEditor
      title="Privacy Policy"
      initialContent={content}
      onUpdate={handleUpdate}
      onCancel={handleCancel}
    />
  );
};

export default PrivacyPage;
