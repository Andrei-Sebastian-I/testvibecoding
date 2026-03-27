"use client";

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
  return (
    <form onSubmit={(e) => e.preventDefault()} className={className}>
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
