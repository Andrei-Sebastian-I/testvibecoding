import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/admin/auth";
import { getAllSales, createSale } from "@/lib/admin/sales-store";

function authenticate(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifySessionToken(token);
}

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAllSales());
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { productName, quantity, unitPrice, customer, date } = body;

  if (!productName || !quantity || !unitPrice) {
    return NextResponse.json({ error: "Product, quantity, and unit price are required" }, { status: 400 });
  }

  const sale = createSale({
    productName,
    quantity: Number(quantity),
    unitPrice: Number(unitPrice),
    customer: customer ?? "",
    date: date ?? new Date().toISOString().slice(0, 10),
  });

  return NextResponse.json(sale, { status: 201 });
}
