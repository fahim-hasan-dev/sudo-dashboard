"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { myFetch } from "@/utils/myFetch";
import { toast } from "react-hot-toast";

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await myFetch("/public", {
        method: "POST",
        body: {
          type: "privacy-policy",
          content,
        },
      });

      if (res.success) {
        toast.success("Privacy Policy updated successfully!");
      } else {
        toast.error(res.message || "Failed to update Privacy Policy");
      }
    } catch (error) {
      console.error("Error updating privacy policy:", error);
      toast.error("Failed to update Privacy Policy");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-4 h-96 flex items-center justify-center text-zinc-500">
        Loading Privacy Policy...
      </Card>
    );
  }

  return (
    <Card className="p-4 h-full flex flex-col justify-between gap-4 shadow-sm">
      <JoditEditor
        ref={editor}
        value={content}
        config={{ height: 600, theme: "light", readonly: false }}
        onBlur={(newContent) => setContent(newContent)}
      />
      <div className="flex justify-end">
        <Button className="px-10" onClick={handleUpdate} disabled={saving}>
          {saving ? "Updating..." : "Update"}
        </Button>
      </div>
    </Card>
  );
};

export default PrivacyPolicy;
