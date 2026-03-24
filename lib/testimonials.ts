export interface Testimonial {
  initials: string;
  name: string;
  role: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    initials: "ED",
    name: "Eleanor Davis",
    role: "Interior Designer",
    text: "The attention to detail and the quality of the materials exceeded my expectations. My living room finally feels complete and sophisticated.",
  },
  {
    initials: "JM",
    name: "Julian Marcus",
    role: "Architect",
    text: "Found the most stunning minimalist table here. The delivery was seamless and the piece is truly a work of art. Highly recommended.",
  },
  {
    initials: "SH",
    name: "Sarah Hughes",
    role: "Art Collector",
    text: "Their curation is impeccable. Every item tells a story. TVC has become my go-to for unique home decor pieces.",
  },
];
