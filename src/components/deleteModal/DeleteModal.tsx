"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
  confirmLabel?: string;
}

export default function DeleteModal({ open, onOpenChange, onConfirm, title = "Delete user?", description = "Are you sure you want to delete this user? This action cannot be undone.", confirmLabel = "Delete" }: DeleteModalProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function confirm() {
    setPending(true);
    setError("");
    try {
      await onConfirm();
      onOpenChange(false);
    } catch {
      setError("Could not delete this item. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={(next) => { if (!pending) { setError(""); onOpenChange(next); } }}>
      <DialogContent className="rounded-xl bg-white sm:max-w-[420px] [&_button]:cursor-pointer" showCloseButton={!pending}>
        <div className="flex size-12 items-center justify-center rounded-full bg-red-50 text-red-600"><Trash2 className="size-6" /></div>
        <DialogHeader>
          <DialogTitle className="text-[#003B3B]">{title}</DialogTitle>
          <DialogDescription className="leading-6 text-[#718589]">{description}</DialogDescription>
        </DialogHeader>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <DialogFooter className="gap-2">
          <Button variant="outline" disabled={pending} onClick={() => onOpenChange(false)} className="cursor-pointer border-[#C8D9D6] text-[#003B3B]">Cancel</Button>
          <Button variant="destructive" disabled={pending} onClick={confirm} className="cursor-pointer">{pending ? "Deleting…" : confirmLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
