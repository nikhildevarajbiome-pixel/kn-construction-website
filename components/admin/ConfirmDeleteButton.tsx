"use client";

import { Trash2 } from "lucide-react";

export function ConfirmDeleteButton({ label = "Delete enquiry" }: { label?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm("Delete this enquiry permanently? This cannot be undone.")) e.preventDefault();
      }}
      className="btn border border-red-700 text-red-700 hover:bg-red-700 hover:text-white"
    >
      <Trash2 size={16} aria-hidden /> {label}
    </button>
  );
}
