export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string; // ISO date string
}

declare global {
  // eslint-disable-next-line no-var
  var __adminExpensesStore: Expense[] | undefined;
}

function getStore(): Expense[] {
  if (!globalThis.__adminExpensesStore) {
    globalThis.__adminExpensesStore = [
      // 12 months ago — Mar 2025
      { id: 1,  description: "Warehouse rent — March",          amount: 1200, category: "Rent",       date: "2025-03-01" },
      { id: 2,  description: "Clay & glaze supplies",           amount: 280,  category: "Materials",  date: "2025-03-10" },
      { id: 3,  description: "Packaging materials",             amount: 95,   category: "Shipping",   date: "2025-03-20" },
      // 11 months ago — Apr 2025
      { id: 4,  description: "Warehouse rent — April",          amount: 1200, category: "Rent",       date: "2025-04-01" },
      { id: 5,  description: "Instagram ad campaign",           amount: 350,  category: "Marketing",  date: "2025-04-12" },
      { id: 6,  description: "Bubble wrap & boxes",             amount: 60,   category: "Shipping",   date: "2025-04-18" },
      // 10 months ago — May 2025
      { id: 7,  description: "Warehouse rent — May",            amount: 1200, category: "Rent",       date: "2025-05-01" },
      { id: 8,  description: "Marble slab order",               amount: 520,  category: "Materials",  date: "2025-05-08" },
      { id: 9,  description: "Product photography",             amount: 200,  category: "Marketing",  date: "2025-05-22" },
      // 9 months ago — Jun 2025
      { id: 10, description: "Warehouse rent — June",           amount: 1200, category: "Rent",       date: "2025-06-01" },
      { id: 11, description: "Organic cotton rope",             amount: 180,  category: "Materials",  date: "2025-06-15" },
      { id: 12, description: "Courier service fees",            amount: 140,  category: "Shipping",   date: "2025-06-25" },
      // 8 months ago — Jul 2025
      { id: 13, description: "Warehouse rent — July",           amount: 1200, category: "Rent",       date: "2025-07-01" },
      { id: 14, description: "Gold leaf sheets",                amount: 410,  category: "Materials",  date: "2025-07-10" },
      { id: 15, description: "Website hosting & domain",        amount: 45,   category: "Utilities",  date: "2025-07-15" },
      // 7 months ago — Aug 2025
      { id: 16, description: "Warehouse rent — August",         amount: 1200, category: "Rent",       date: "2025-08-01" },
      { id: 17, description: "Velvet fabric rolls",             amount: 350,  category: "Materials",  date: "2025-08-08" },
      { id: 18, description: "Google Ads — summer campaign",    amount: 275,  category: "Marketing",  date: "2025-08-20" },
      { id: 19, description: "Shipping labels & tape",          amount: 55,   category: "Shipping",   date: "2025-08-28" },
      // 6 months ago — Sep 2025
      { id: 20, description: "Warehouse rent — September",      amount: 1200, category: "Rent",       date: "2025-09-01" },
      { id: 21, description: "Kiln maintenance",                amount: 320,  category: "Equipment",  date: "2025-09-12" },
      { id: 22, description: "Linen shade fabric",              amount: 150,  category: "Materials",  date: "2025-09-24" },
      // 5 months ago — Oct 2025
      { id: 23, description: "Warehouse rent — October",        amount: 1200, category: "Rent",       date: "2025-10-01" },
      { id: 24, description: "Seasonal brochure printing",      amount: 180,  category: "Marketing",  date: "2025-10-10" },
      { id: 25, description: "Mirror glass & frames",           amount: 460,  category: "Materials",  date: "2025-10-20" },
      { id: 26, description: "Insurance renewal",               amount: 300,  category: "Utilities",  date: "2025-10-28" },
      // 4 months ago — Nov 2025
      { id: 27, description: "Warehouse rent — November",       amount: 1200, category: "Rent",       date: "2025-11-01" },
      { id: 28, description: "Clay & stoneware restock",        amount: 390,  category: "Materials",  date: "2025-11-09" },
      { id: 29, description: "Influencer collaboration",        amount: 500,  category: "Marketing",  date: "2025-11-18" },
      // 3 months ago — Dec 2025
      { id: 30, description: "Warehouse rent — December",       amount: 1200, category: "Rent",       date: "2025-12-01" },
      { id: 31, description: "Holiday packaging (gift boxes)",  amount: 220,  category: "Shipping",   date: "2025-12-05" },
      { id: 32, description: "Extra courier runs — holidays",   amount: 310,  category: "Shipping",   date: "2025-12-18" },
      { id: 33, description: "Electricity — December",          amount: 130,  category: "Utilities",  date: "2025-12-20" },
      // 2 months ago — Jan 2026
      { id: 34, description: "Warehouse rent — January",        amount: 1200, category: "Rent",       date: "2026-01-01" },
      { id: 35, description: "New display shelving",            amount: 450,  category: "Equipment",  date: "2026-01-10" },
      { id: 36, description: "Cotton & textile supplies",       amount: 275,  category: "Materials",  date: "2026-01-20" },
      { id: 37, description: "Electricity — January",           amount: 115,  category: "Utilities",  date: "2026-01-25" },
      // 1 month ago — Feb 2026
      { id: 38, description: "Warehouse rent — February",       amount: 1200, category: "Rent",       date: "2026-02-01" },
      { id: 39, description: "Raw materials — clay & glazes",   amount: 320,  category: "Materials",  date: "2026-02-01" },
      { id: 40, description: "Shipping supplies",               amount: 85,   category: "Shipping",   date: "2026-02-05" },
      { id: 41, description: "Photography session",             amount: 200,  category: "Marketing",  date: "2026-02-10" },
    ];
  }
  return globalThis.__adminExpensesStore;
}

export function getAllExpenses(): Expense[] {
  return structuredClone(getStore());
}

export function createExpense(data: Omit<Expense, "id">): Expense {
  const store = getStore();
  const maxId = store.reduce((max, e) => Math.max(max, e.id), 0);
  const expense: Expense = { ...data, id: maxId + 1 };
  store.push(expense);
  return structuredClone(expense);
}

export function updateExpense(id: number, data: Partial<Omit<Expense, "id">>): Expense | null {
  const store = getStore();
  const index = store.findIndex((e) => e.id === id);
  if (index === -1) return null;
  store[index] = { ...store[index], ...data };
  return structuredClone(store[index]);
}

export function deleteExpense(id: number): boolean {
  const store = getStore();
  const index = store.findIndex((e) => e.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
