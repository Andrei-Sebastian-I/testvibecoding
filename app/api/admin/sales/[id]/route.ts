import { NextRequest, NextResponse } from "next/server";
import { authenticate, unauthorized, type RouteContext } from "@/lib/admin/auth";
import { updateSale, deleteSale } from "@/lib/admin/sales-store";

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!authenticate(request)) return unauthorized();
  const { id } = await context.params;
  const body = await request.json();
  const updated = updateSale(Number(id), body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!authenticate(request)) return unauthorized();
  const { id } = await context.params;
  if (!deleteSale(Number(id))) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
