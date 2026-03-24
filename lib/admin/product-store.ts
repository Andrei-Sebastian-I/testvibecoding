import { products as staticProducts, type Product } from "@/lib/products";

declare global {
  // eslint-disable-next-line no-var
  var __adminProductStore: Product[] | undefined;
}

function getStore(): Product[] {
  if (!globalThis.__adminProductStore) {
    globalThis.__adminProductStore = structuredClone(staticProducts);
  }
  return globalThis.__adminProductStore;
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
  const maxId = store.reduce((max, p) => Math.max(max, p.id), 0);
  const product: Product = { ...data, id: maxId + 1 };
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
