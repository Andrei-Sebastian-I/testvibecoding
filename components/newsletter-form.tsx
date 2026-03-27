"use client";

import { useState } from "react";

interface NewsletterFormProps {
  className?: string;
  inputClassName: string;
  buttonClassName: string;
  buttonText?: string;
  placeholder?: string;
}

export default function NewsletterForm({
  className = "",
  inputClassName,
  buttonClassName,
  buttonText = "Subscribe",
  placeholder = "Your email address",
}: NewsletterFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: integrate with newsletter API (e.g. Supabase, Mailchimp)
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className={`text-sm font-semibold text-green-600 ${className}`}>
        Thanks for subscribing!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        className={inputClassName}
        placeholder={placeholder}
        type="email"
        required
        aria-label={placeholder}
      />
      <button type="submit" className={buttonClassName}>
        {buttonText}
      </button>
    </form>
  );
}
