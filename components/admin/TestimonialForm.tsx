"use client";

import { useState } from "react";
import type { StoredTestimonial } from "@/lib/admin/testimonials-store";
import { inputClass } from "@/lib/admin/shared";

export default function TestimonialForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: StoredTestimonial;
  onSave: () => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [initials, setInitials] = useState(initial?.initials ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [text, setText] = useState(initial?.text ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = initial
        ? `/api/admin/testimonials/${initial.id}`
        : "/api/admin/testimonials";
      const method = initial ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, initials, role, text }),
      });
      if (res.ok) await onSave();
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">
          {initial ? "Edit Testimonial" : "Add Testimonial"}
        </h2>
      </div>
      <div className="bg-white rounded-xl border border-primary/10 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                Name *
              </label>
              <input
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                Initials
              </label>
              <input
                className={inputClass}
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                placeholder="Auto from name"
                maxLength={3}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                Role
              </label>
              <input
                className={inputClass}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Interior Designer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              Testimonial Text *
            </label>
            <textarea
              className={`${inputClass} min-h-[100px] resize-y`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              placeholder="What they said about your products..."
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-gold text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving
                ? "Saving..."
                : initial
                ? "Update Testimonial"
                : "Create Testimonial"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-text-muted hover:text-primary border border-primary/10 hover:border-primary/20 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
