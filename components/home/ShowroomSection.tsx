import Image from "next/image";
import { COMPANY } from "@/lib/constants";

export default function ShowroomSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold text-primary mb-8">
            Visit Our Showroom
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-brand-gold" aria-hidden="true">
                location_on
              </span>
              <div>
                <p className="font-bold text-lg">{COMPANY.address}</p>
                <p className="text-primary/80">{COMPANY.cityFull}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-brand-gold" aria-hidden="true">
                call
              </span>
              <p className="text-primary/80">{COMPANY.phone}</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-brand-gold" aria-hidden="true">
                mail
              </span>
              <p className="text-primary/80">{COMPANY.email}</p>
            </div>
            <div className="pt-6">
              <p className="font-bold mb-2">Showroom Hours:</p>
              <p className="text-primary/80">
                Mon - Fri: 10:00 AM - 7:00 PM
              </p>
              <p className="text-primary/80">
                Sat - Sun: 11:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>
        <div className="relative h-64 sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-primary/5 bg-primary/5">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAylV4iStLoxXG26Vmpjy22T65wHLYGMq3JtZYLDymQvmDnIPJyIPKDJRxxsszbnt5UvaSTe1K9YHKQkH_HeHwi7l2-xl-nQThOJQEpjD25l1IntSYDCPX1kOHIZTTcqh5xEp6-ccNk-NPvxGahMcer5SQIpM8uZz5_F7ao_w2wyNMyTld9GmQcvOtxs5Ux2v0dIKyIpj3z2baLgpbn7isorLHTxRvIDCTaCLpcEU7JZ-sBS3wO_QsAP7qnyv_f_WkVgBRIrM2-3Ulv"
            alt="Map placeholder"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-brand-gold text-6xl mb-4">
                map
              </span>
              <p className="text-primary/80 font-medium">
                Interactive Map Placeholder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
