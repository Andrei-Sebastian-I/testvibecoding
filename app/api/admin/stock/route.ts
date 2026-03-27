import { NextRequest, NextResponse } from "next/server";
import { authenticate, unauthorized } from "@/lib/admin/auth";
import { getAllStock, updateStockBulk } from "@/lib/admin/stock-store";

export async function GET(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();
  return NextResponse.json(getAllStock());
}

export async function PUT(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();

  const body = await request.json();
  const { updates } = body as {
    updates: { productId: number; stock: number }[];
  };

  if (!updates || !Array.isArray(updates)) {
    return NextResponse.json(
      { error: "updates array is required" },
      { status: 400 }
    );
  }

  updateStockBulk(updates);
  return NextResponse.json(getAllStock());
}
