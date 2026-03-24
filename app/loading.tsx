export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 border-4 border-primary/20 border-t-brand-gold rounded-full animate-spin" />
        <p className="text-primary/50 text-sm font-medium tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}
