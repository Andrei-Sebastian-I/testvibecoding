import { products as staticProducts } from "@/lib/products";
import { getAllProducts } from "@/lib/admin/product-store";

export interface StockEntry {
  productId: number;
  productName: string;
  stock: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __adminStockStore: Map<number, number> | undefined;
}

function getStore(): Map<number, number> {
  if (!globalThis.__adminStockStore) {
    globalThis.__adminStockStore = new Map(
      staticProducts.map((p) => [p.id, 10]) // default stock of 10
    );
  }
  return globalThis.__adminStockStore;
}

export function getAllStock(): StockEntry[] {
  const store = getStore();
  const products = getAllProducts();

  return products.map((p) => ({
    productId: p.id,
    productName: p.name,
    stock: store.get(p.id) ?? 0,
  }));
}

export function getStock(productId: number): number {
  return getStore().get(productId) ?? 0;
}

export function updateStock(productId: number, stock: number): boolean {
  getStore().set(productId, stock);
  return true;
}

export function updateStockBulk(
  updates: { productId: number; stock: number }[]
): void {
  const store = getStore();
  for (const { productId, stock } of updates) {
    store.set(productId, stock);
  }
}
