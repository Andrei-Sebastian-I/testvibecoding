export default function NewsletterCTA() {
  return (
    <section className="bg-primary text-white py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold">Stay Inspired</h2>
        <p className="text-lg opacity-80">
          Join our newsletter for the latest interior design trends and
          exclusive offers.
        </p>
        <form className="flex flex-col sm:flex-row w-full max-w-lg gap-3">
          <input
            className="flex-1 rounded-lg border-none bg-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-accent-gold h-14 px-6 text-lg"
            placeholder="Enter your email"
            type="email"
            required
            aria-label="Enter your email"
          />
          <button
            type="submit"
            className="bg-accent-gold text-primary font-bold px-8 h-14 rounded-lg hover:bg-white transition-all text-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
