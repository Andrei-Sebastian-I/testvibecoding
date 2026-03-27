export interface Sale {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  customer: string;
  date: string; // ISO date string
}

declare global {
  var __adminSalesStore: Sale[] | undefined;
  var __adminSalesNextId: number | undefined;
}

function getStore(): Sale[] {
  if (!globalThis.__adminSalesStore) {
    globalThis.__adminSalesStore = [
      // 12 months ago — Mar 2025
      { id: 1,  productName: "Artisan Ceramic Vase",  quantity: 1, unitPrice: 89,  total: 89,   customer: "Anna Kowalski",    date: "2025-03-05" },
      { id: 2,  productName: "Woven Wall Tapestry",   quantity: 1, unitPrice: 175, total: 175,  customer: "David Park",       date: "2025-03-18" },
      // 11 months ago — Apr 2025
      { id: 3,  productName: "Velvet Cushion Set",    quantity: 2, unitPrice: 120, total: 240,  customer: "Lisa Nguyen",      date: "2025-04-02" },
      { id: 4,  productName: "Marble Table Lamp",     quantity: 1, unitPrice: 215, total: 215,  customer: "Robert Klein",     date: "2025-04-22" },
      // 10 months ago — May 2025
      { id: 5,  productName: "Gold Leaf Mirror",      quantity: 1, unitPrice: 340, total: 340,  customer: "Sophie Laurent",   date: "2025-05-10" },
      { id: 6,  productName: "Artisan Ceramic Vase",  quantity: 3, unitPrice: 89,  total: 267,  customer: "James O'Brien",    date: "2025-05-25" },
      // 9 months ago — Jun 2025
      { id: 7,  productName: "Woven Wall Tapestry",   quantity: 2, unitPrice: 175, total: 350,  customer: "Maria Santos",     date: "2025-06-08" },
      { id: 8,  productName: "Velvet Cushion Set",    quantity: 1, unitPrice: 120, total: 120,  customer: "Thomas Weber",     date: "2025-06-20" },
      // 8 months ago — Jul 2025
      { id: 9,  productName: "Marble Table Lamp",     quantity: 2, unitPrice: 215, total: 430,  customer: "Emily Watson",     date: "2025-07-04" },
      { id: 10, productName: "Artisan Ceramic Vase",  quantity: 1, unitPrice: 89,  total: 89,   customer: "Carlos Rivera",    date: "2025-07-19" },
      // 7 months ago — Aug 2025
      { id: 11, productName: "Gold Leaf Mirror",      quantity: 2, unitPrice: 340, total: 680,  customer: "Olivia Brown",     date: "2025-08-03" },
      { id: 12, productName: "Velvet Cushion Set",    quantity: 2, unitPrice: 120, total: 240,  customer: "Henrik Johansson", date: "2025-08-15" },
      { id: 13, productName: "Woven Wall Tapestry",   quantity: 1, unitPrice: 175, total: 175,  customer: "Yuki Tanaka",      date: "2025-08-28" },
      // 6 months ago — Sep 2025
      { id: 14, productName: "Marble Table Lamp",     quantity: 1, unitPrice: 215, total: 215,  customer: "Priya Sharma",     date: "2025-09-06" },
      { id: 15, productName: "Artisan Ceramic Vase",  quantity: 4, unitPrice: 89,  total: 356,  customer: "Daniel Fischer",   date: "2025-09-22" },
      // 5 months ago — Oct 2025
      { id: 16, productName: "Gold Leaf Mirror",      quantity: 1, unitPrice: 340, total: 340,  customer: "Chloe Martin",     date: "2025-10-01" },
      { id: 17, productName: "Velvet Cushion Set",    quantity: 3, unitPrice: 120, total: 360,  customer: "Alex Petrov",      date: "2025-10-14" },
      { id: 18, productName: "Woven Wall Tapestry",   quantity: 1, unitPrice: 175, total: 175,  customer: "Nina Rossi",       date: "2025-10-30" },
      // 4 months ago — Nov 2025
      { id: 19, productName: "Marble Table Lamp",     quantity: 3, unitPrice: 215, total: 645,  customer: "William Chang",    date: "2025-11-05" },
      { id: 20, productName: "Artisan Ceramic Vase",  quantity: 2, unitPrice: 89,  total: 178,  customer: "Isabella Dubois",  date: "2025-11-18" },
      { id: 21, productName: "Gold Leaf Mirror",      quantity: 1, unitPrice: 340, total: 340,  customer: "Liam McCarthy",    date: "2025-11-28" },
      // 3 months ago — Dec 2025 (holiday season)
      { id: 22, productName: "Velvet Cushion Set",    quantity: 5, unitPrice: 120, total: 600,  customer: "Eva Lindberg",     date: "2025-12-02" },
      { id: 23, productName: "Gold Leaf Mirror",      quantity: 2, unitPrice: 340, total: 680,  customer: "Oscar Müller",     date: "2025-12-10" },
      { id: 24, productName: "Woven Wall Tapestry",   quantity: 3, unitPrice: 175, total: 525,  customer: "Grace Kim",        date: "2025-12-15" },
      { id: 25, productName: "Marble Table Lamp",     quantity: 2, unitPrice: 215, total: 430,  customer: "Hugo Bernard",     date: "2025-12-22" },
      { id: 26, productName: "Artisan Ceramic Vase",  quantity: 4, unitPrice: 89,  total: 356,  customer: "Amelia Scott",     date: "2025-12-28" },
      // 2 months ago — Jan 2026
      { id: 27, productName: "Velvet Cushion Set",    quantity: 2, unitPrice: 120, total: 240,  customer: "Noah Eriksson",    date: "2026-01-07" },
      { id: 28, productName: "Gold Leaf Mirror",      quantity: 1, unitPrice: 340, total: 340,  customer: "Mia Gonzalez",     date: "2026-01-15" },
      { id: 29, productName: "Woven Wall Tapestry",   quantity: 1, unitPrice: 175, total: 175,  customer: "Ethan Brooks",     date: "2026-01-24" },
      // 1 month ago — Feb 2026
      { id: 30, productName: "Artisan Ceramic Vase",  quantity: 2, unitPrice: 89,  total: 178,  customer: "Eleanor Davis",    date: "2026-02-03" },
      { id: 31, productName: "Marble Table Lamp",     quantity: 1, unitPrice: 215, total: 215,  customer: "Julian Marcus",    date: "2026-02-07" },
      { id: 32, productName: "Gold Leaf Mirror",      quantity: 1, unitPrice: 340, total: 340,  customer: "Sarah Hughes",     date: "2026-02-12" },
      { id: 33, productName: "Velvet Cushion Set",    quantity: 3, unitPrice: 120, total: 360,  customer: "Michael Chen",     date: "2026-02-15" },
    ];
    globalThis.__adminSalesNextId = Math.max(...globalThis.__adminSalesStore.map((s) => s.id), 0) + 1;
  }
  return globalThis.__adminSalesStore;
}

function nextId(): number {
  getStore();
  return globalThis.__adminSalesNextId!++;
}

export function getAllSales(): Sale[] {
  return structuredClone(getStore());
}

export function createSale(data: Omit<Sale, "id" | "total">): Sale {
  const store = getStore();
  const sale: Sale = { ...data, id: nextId(), total: data.quantity * data.unitPrice };
  store.push(sale);
  return structuredClone(sale);
}

export function updateSale(id: number, data: Partial<Omit<Sale, "id">>): Sale | null {
  const store = getStore();
  const index = store.findIndex((s) => s.id === id);
  if (index === -1) return null;
  store[index] = { ...store[index], ...data };
  if (data.quantity !== undefined || data.unitPrice !== undefined) {
    store[index].total = store[index].quantity * store[index].unitPrice;
  }
  return structuredClone(store[index]);
}

export function deleteSale(id: number): boolean {
  const store = getStore();
  const index = store.findIndex((s) => s.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
