import { NextRequest, NextResponse } from "next/server";
import { authenticate, unauthorized, type RouteContext } from "@/lib/admin/auth";
import {
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/admin/testimonials-store";

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!authenticate(request)) return unauthorized();

  const { id } = await context.params;
  const body = await request.json();
  const updated = updateTestimonial(Number(id), body);

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!authenticate(request)) return unauthorized();

  const { id } = await context.params;
  const deleted = deleteTestimonial(Number(id));

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
