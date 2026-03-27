"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span aria-hidden="true" className="material-symbols-outlined text-6xl text-primary/20 mb-4">
        error_outline
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-primary">
        Something went wrong
      </h2>
      <p className="text-primary/60 mt-4 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all"
      >
        Try Again
      </button>
    </div>
  );
}
