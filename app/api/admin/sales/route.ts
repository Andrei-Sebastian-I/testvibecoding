import { NextRequest, NextResponse } from "next/server";
import { authenticate, unauthorized } from "@/lib/admin/auth";
import { getAllSales, createSale } from "@/lib/admin/sales-store";

export async function GET(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();
  return NextResponse.json(getAllSales());
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();

  const body = await request.json();
  const { productName, quantity, unitPrice, customer, date } = body;

  if (!productName || typeof productName !== "string" || productName.trim().length === 0) {
    return NextResponse.json({ error: "Product name is required" }, { status: 400 });
  }

  const numericQty = Number(quantity);
  if (!Number.isInteger(numericQty) || numericQty <= 0) {
    return NextResponse.json({ error: "Quantity must be a positive integer" }, { status: 400 });
  }

  const numericPrice = Number(unitPrice);
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return NextResponse.json({ error: "Unit price must be a positive number" }, { status: 400 });
  }

  const sale = createSale({
    productName: productName.trim(),
    quantity: numericQty,
    unitPrice: numericPrice,
    customer: customer ?? "",
    date: date ?? new Date().toISOString().slice(0, 10),
  });

  return NextResponse.json(sale, { status: 201 });
}
