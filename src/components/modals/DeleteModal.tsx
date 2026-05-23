"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type TDeleteModalProps = {
  itemId: string;
  triggerBtn: React.ReactNode;
  title?: string;
  description?: string;
  actionBtnText?: string;
  action: (id: string) => Promise<void>;
};

const DeleteModal = ({
  itemId,
  triggerBtn,
  title,
  action,
}: TDeleteModalProps) => {
  const [open, setOpen] = useState(false);

  const handleAction = async () => {
    await action(itemId);
    setOpen(false);
  };

  return (
    <AlertDialog open={open}>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {triggerBtn}
      </span>
      <AlertDialogContent className="bg-[#0e1015] border border-[#1b1e25] p-6 max-w-sm rounded-xl flex flex-col items-center">
        {/* Centered Glowing Red Trash Can */}
        <div className="bg-[#ff3b30]/10 text-[#ff3b30] p-4 rounded-full size-16 flex items-center justify-center mx-auto mb-4 border border-[#ff3b30]/20 shadow-[0_0_20px_rgba(255,59,48,0.15)]">
          <Trash2 className="size-7" />
        </div>

        {/* Modal Title */}
        <AlertDialogTitle className="text-center text-lg font-bold text-white max-w-xs leading-snug">
          {title || "Are you sure you want to delete this?"}
        </AlertDialogTitle>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-6 w-full">
          <AlertDialogAction
            onClick={handleAction}
            className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-white font-bold py-2.5 rounded-lg flex-1 border-none shadow-none text-sm h-11"
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-none font-bold py-2.5 rounded-lg flex-1 text-sm h-11 shadow-none"
          >
            Cancel
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
