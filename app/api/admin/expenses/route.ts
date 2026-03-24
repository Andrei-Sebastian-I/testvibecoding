import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/admin/auth";
import { getAllExpenses, createExpense } from "@/lib/admin/expenses-store";

function authenticate(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifySessionToken(token);
}

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAllExpenses());
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { description, amount, category, date } = body;

  if (!description || !amount) {
    return NextResponse.json({ error: "Description and amount are required" }, { status: 400 });
  }

  const expense = createExpense({
    description,
    amount: Number(amount),
    category: category ?? "",
    date: date ?? new Date().toISOString().slice(0, 10),
  });

  return NextResponse.json(expense, { status: 201 });
}
