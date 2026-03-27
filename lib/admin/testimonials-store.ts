import {
  testimonials as staticTestimonials,
  type Testimonial,
} from "@/lib/testimonials";

export interface StoredTestimonial extends Testimonial {
  id: number;
}

declare global {
  var __adminTestimonialsStore: StoredTestimonial[] | undefined;
  var __adminTestimonialsNextId: number | undefined;
}

function getStore(): StoredTestimonial[] {
  if (!globalThis.__adminTestimonialsStore) {
    globalThis.__adminTestimonialsStore = staticTestimonials.map((t, i) => ({
      ...structuredClone(t),
      id: i + 1,
    }));
    globalThis.__adminTestimonialsNextId = globalThis.__adminTestimonialsStore.length + 1;
  }
  return globalThis.__adminTestimonialsStore;
}

function nextId(): number {
  getStore();
  return globalThis.__adminTestimonialsNextId!++;
}

export function getAllTestimonials(): StoredTestimonial[] {
  return structuredClone(getStore());
}

export function getTestimonialById(id: number): StoredTestimonial | undefined {
  const t = getStore().find((t) => t.id === id);
  return t ? structuredClone(t) : undefined;
}

export function createTestimonial(
  data: Omit<StoredTestimonial, "id">
): StoredTestimonial {
  const store = getStore();
  const testimonial: StoredTestimonial = { ...data, id: nextId() };
  store.push(testimonial);
  return structuredClone(testimonial);
}

export function updateTestimonial(
  id: number,
  data: Partial<Omit<StoredTestimonial, "id">>
): StoredTestimonial | null {
  const store = getStore();
  const index = store.findIndex((t) => t.id === id);
  if (index === -1) return null;
  store[index] = { ...store[index], ...data };
  return structuredClone(store[index]);
}

export function deleteTestimonial(id: number): boolean {
  const store = getStore();
  const index = store.findIndex((t) => t.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
