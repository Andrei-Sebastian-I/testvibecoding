"use client";

import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";

interface ContactDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isHome?: boolean;
}

export default function ContactDropdown({ isOpen, onToggle, onClose, isHome }: ContactDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [contactMsg, setContactMsg] = useState("");
  const [contactSent, setContactSent] = useState(false);

  useClickOutside(ref, onClose, isOpen);

  function handleContactSend(e: React.FormEvent) {
    e.preventDefault();
    if (!contactMsg.trim()) return;
    setContactSent(true);
    setContactMsg("");
    setTimeout(() => {
      setContactSent(false);
      onClose();
    }, 2000);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        aria-label="Contact Us"
        className={`flex items-center justify-center rounded-full size-10 transition-colors cursor-pointer ${
          isHome
            ? "bg-white/15 text-white hover:bg-white/25"
            : "bg-primary/5 text-primary hover:bg-primary/10"
        }`}
      >
        <span aria-hidden="true" className="material-symbols-outlined">mail</span>
      </button>

      {isOpen && (
        <div className="fixed right-4 left-4 top-20 sm:absolute sm:left-auto sm:top-full sm:right-0 sm:mt-3 sm:w-80 bg-white rounded-xl shadow-xl border border-primary/10 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-primary/10 flex items-center justify-between">
            <h3 className="font-bold text-sm text-primary">Contact Us</h3>
            <button
              onClick={onClose}
              className="p-0.5 text-text-muted hover:text-primary transition-colors cursor-pointer"
             aria-label="Close">
              <span aria-hidden="true" className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {contactSent ? (
            <div className="px-4 py-8 text-center">
              <span aria-hidden="true" className="material-symbols-outlined text-4xl text-green-500 mb-2 block">
                check_circle
              </span>
              <p className="text-sm font-semibold text-primary">Message sent!</p>
              <p className="text-xs text-text-muted mt-1">We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSend} className="p-4 space-y-3">
              <p className="text-xs text-text-muted">
                Send us a message and our team will reply as soon as possible.
              </p>
              <textarea
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                placeholder="Write your message..."
                required
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-primary/15 bg-white text-sm text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-brand-gold text-white py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-lg">send</span>
                Send Message
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
