import type { Testimonial } from "@/lib/testimonials";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-background-warm py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white p-6 sm:p-10 rounded-xl shadow-sm border border-brand-gold/10"
            >
              <div className="flex text-brand-gold mb-6" role="img" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined fill-1"
                    aria-hidden="true"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-primary/80 italic mb-8 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-primary">{t.name}</p>
                  <p className="text-sm text-primary/80">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
