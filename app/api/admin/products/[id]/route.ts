import { NextRequest, NextResponse } from "next/server";
import { authenticate, unauthorized, type RouteContext } from "@/lib/admin/auth";
import {
  getProductById,
  updateProduct,
  deleteProduct,
} from "@/lib/admin/product-store";

export async function GET(request: NextRequest, context: RouteContext) {
  if (!authenticate(request)) return unauthorized();

  const { id } = await context.params;
  const product = getProductById(Number(id));
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!authenticate(request)) return unauthorized();

  const { id } = await context.params;
  const body = await request.json();
  const updated = updateProduct(Number(id), body);

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!authenticate(request)) return unauthorized();

  const { id } = await context.params;
  const deleted = deleteProduct(Number(id));

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
