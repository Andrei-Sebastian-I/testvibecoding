"use client";

import { useEffect, useState, useCallback } from "react";
import type { StoredTestimonial } from "@/lib/admin/testimonials-store";

type Mode =
  | { type: "list" }
  | { type: "create" }
  | { type: "edit"; testimonial: StoredTestimonial };

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-primary/15 bg-white text-sm text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-colors";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<StoredTestimonial[]>([]);
  const [mode, setMode] = useState<Mode>({ type: "list" });
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) setTestimonials(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  async function handleDelete(id: number) {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch(`/api/admin/testimonials/${id}`, {
      method: "DELETE",
    });
    if (res.ok) await fetchTestimonials();
  }

  return (
    <div>
      {mode.type === "list" && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-primary">Testimonials</h2>
              <p className="text-sm text-text-muted mt-0.5">
                {testimonials.length} testimonial
                {testimonials.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => setMode({ type: "create" })}
              className="flex items-center gap-2 bg-brand-gold text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Add Testimonial
            </button>
          </div>

          {loading ? (
            <div className="text-center py-16 text-text-muted">Loading...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16 text-text-muted">
              <span className="material-symbols-outlined text-5xl mb-4 block">
                format_quote
              </span>
              <p className="text-lg font-medium">No testimonials yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-xl border border-primary/10 p-5 flex gap-4"
                >
                  <div className="size-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm text-primary">
                        {t.name}
                      </p>
                      {t.role && (
                        <span className="text-xs text-text-muted">
                          — {t.role}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-primary/70 italic line-clamp-2">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-start gap-1 shrink-0">
                    <button
                      onClick={() =>
                        setMode({ type: "edit", testimonial: t })
                      }
                      className="p-1.5 rounded-md text-text-muted hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-1.5 rounded-md text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {(mode.type === "create" || mode.type === "edit") && (
        <TestimonialForm
          initial={mode.type === "edit" ? mode.testimonial : undefined}
          onSave={async () => {
            await fetchTestimonials();
            setMode({ type: "list" });
          }}
          onCancel={() => setMode({ type: "list" })}
        />
      )}
    </div>
  );
}

function TestimonialForm({
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
