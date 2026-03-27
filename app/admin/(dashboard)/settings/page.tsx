"use client";

import { useEffect, useState } from "react";
import type { SiteSettings } from "@/lib/admin/settings-store";
import { inputClass } from "@/components/admin/form-styles";

const fields: { key: keyof SiteSettings; label: string; placeholder: string }[] = [
  { key: "name", label: "Company Name", placeholder: "TestVibeCoding" },
  { key: "shortName", label: "Short Name", placeholder: "TVC" },
  { key: "tagline", label: "Tagline", placeholder: "Curating Elegance..." },
  { key: "address", label: "Address", placeholder: "42 Elegance Avenue" },
  { key: "city", label: "City", placeholder: "Design District, New York" },
  { key: "cityFull", label: "City (Full)", placeholder: "Design District, New York, NY 10013" },
  { key: "phone", label: "Phone", placeholder: "+1 (555) 123-4567" },
  { key: "email", label: "Email", placeholder: "hello@testvibecoding.com" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setSettings);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSettings(await res.json());
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  if (!settings) {
    return (
      <div className="text-center py-16 text-text-muted">Loading...</div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">Site Settings</h2>
        <p className="text-sm text-text-muted mt-0.5">
          Update your company information displayed across the storefront.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-primary/10 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                  {field.label}
                </label>
                <input
                  className={inputClass}
                  value={settings[field.key]}
                  onChange={(e) =>
                    setSettings({ ...settings, [field.key]: e.target.value })
                  }
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-gold text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
            {saved && (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <span aria-hidden="true" className="material-symbols-outlined text-lg">check_circle</span>
                Saved
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
