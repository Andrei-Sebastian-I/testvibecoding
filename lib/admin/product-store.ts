import { products as staticProducts, type Product } from "@/lib/products";

declare global {
  var __adminProductStore: Product[] | undefined;
  var __adminProductNextId: number | undefined;
}

function getStore(): Product[] {
  if (!globalThis.__adminProductStore) {
    globalThis.__adminProductStore = structuredClone(staticProducts);
    globalThis.__adminProductNextId = Math.max(...globalThis.__adminProductStore.map((p) => p.id), 0) + 1;
  }
  return globalThis.__adminProductStore;
}

function nextId(): number {
  getStore();
  return globalThis.__adminProductNextId!++;
}

export function getAllProducts(): Product[] {
  return structuredClone(getStore());
}

export function getProductById(id: number): Product | undefined {
  const product = getStore().find((p) => p.id === id);
  return product ? structuredClone(product) : undefined;
}

export function createProduct(
  data: Omit<Product, "id">
): Product {
  const store = getStore();
  const product: Product = { ...data, id: nextId() };
  store.push(product);
  return structuredClone(product);
}

export function updateProduct(
  id: number,
  data: Partial<Omit<Product, "id">>
): Product | null {
  const store = getStore();
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return null;
  store[index] = { ...store[index], ...data };
  return structuredClone(store[index]);
}

export function deleteProduct(id: number): boolean {
  const store = getStore();
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
