import { partners } from "@/lib/data/partners";

export default function PartnersBar() {
  return (
    <section className="bg-background-warm py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-primary/80 mb-10">
          As Seen In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
          {partners.map((name) => (
            <span
              key={name}
              className="text-base sm:text-xl font-bold text-primary/80 tracking-wide"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
