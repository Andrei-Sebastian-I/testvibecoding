"use client";

import { useEffect } from "react";

interface FeedbackToastProps {
  feedback: { type: "success" | "error"; message: string } | null;
  onDismiss: () => void;
}

export default function FeedbackToast({ feedback, onDismiss }: FeedbackToastProps) {
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [feedback, onDismiss]);

  if (!feedback) return null;

  return (
    <div
      className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
        feedback.type === "success"
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-600 border border-red-200"
      }`}
      role="alert"
    >
      <span className="material-symbols-outlined text-lg" aria-hidden="true">
        {feedback.type === "success" ? "check_circle" : "error"}
      </span>
      {feedback.message}
    </div>
  );
}
