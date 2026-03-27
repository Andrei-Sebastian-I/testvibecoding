import { NextRequest, NextResponse } from "next/server";
import { authenticate, unauthorized } from "@/lib/admin/auth";
import { getAllExpenses, createExpense } from "@/lib/admin/expenses-store";

export async function GET(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();
  return NextResponse.json(getAllExpenses());
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();

  const body = await request.json();
  const { description, amount, category, date } = body;

  if (!description || typeof description !== "string" || description.trim().length === 0) {
    return NextResponse.json({ error: "Description is required" }, { status: 400 });
  }

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return NextResponse.json({ error: "Amount must be a positive number" }, { status: 400 });
  }

  const expense = createExpense({
    description: description.trim(),
    amount: numericAmount,
    category: category ?? "",
    date: date ?? new Date().toISOString().slice(0, 10),
  });

  return NextResponse.json(expense, { status: 201 });
}
