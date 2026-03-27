import { howItsMadeSteps } from "@/lib/data/how-its-made";

export default function HowItsMade() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          How It&apos;s Made
        </h2>
        <div className="w-24 h-1 bg-brand-gold mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        {howItsMadeSteps.map((item) => (
          <div key={item.title} className="text-center">
            <div className="text-5xl font-bold text-primary/65 mb-4">
              {item.step}
            </div>
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-brand-gold/10 mb-6">
              <span aria-hidden="true" className="material-symbols-outlined text-brand-gold text-3xl">
                {item.icon}
              </span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">
              {item.title}
            </h3>
            <p className="text-primary/80 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
