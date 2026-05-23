"use client";

import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

// Load JoditEditor dynamically with ssr: false to prevent Next.js SSR crashes
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 rounded-xl border border-zinc-800 bg-[#0e1015] animate-pulse flex items-center justify-center text-zinc-500">
      Loading Text Editor...
    </div>
  ),
});

interface RichTextEditorProps {
  title: string;
  initialContent?: string;
  onUpdate?: (content: string) => void;
  onCancel?: () => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  title,
  initialContent = "",
  onUpdate,
  onCancel,
}) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(initialContent);

  // Calibrate jodit config to match the mockup: dark theme, clean toolbar, customized heights
  const config = useMemo(
    () => ({
      readonly: false,
      theme: "dark",
      placeholder: "Start writing here...",
      minHeight: 350,
      maxHeight: 500,
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
        background: "#0e1015",
        color: "#ffffff",
        border: "1px solid #1b1e25",
      },
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
    }),
    []
  );

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(content);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-6 text-white">
      {/* Editorial Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
      </div>

      {/* Editor Box */}
      <div className="rounded-xl border border-[#1b1e25] bg-[#0e1015] overflow-hidden p-1 shadow-md">
        <JoditEditor
          ref={editorRef}
          value={content}
          config={config as never}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 mt-4">
        <button
          onClick={onCancel}
          className="bg-[#8fa0b5] hover:bg-[#78899c] text-black font-bold px-10 py-3 rounded-lg text-sm transition-all active:scale-95 cursor-pointer h-12 min-w-[130px] flex items-center justify-center shadow-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="bg-[#ff8f23] hover:bg-[#e07f1f] text-black font-bold px-10 py-3 rounded-lg text-sm transition-all active:scale-95 cursor-pointer h-12 min-w-[130px] flex items-center justify-center shadow-md shadow-primary/10"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default RichTextEditor;
