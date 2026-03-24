import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/admin/auth";
import { getAllStock, updateStockBulk } from "@/lib/admin/stock-store";

function authenticate(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifySessionToken(token);
}

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAllStock());
}

export async function PUT(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
