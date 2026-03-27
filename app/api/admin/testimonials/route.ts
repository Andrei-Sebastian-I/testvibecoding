import { NextRequest, NextResponse } from "next/server";
import { authenticate, unauthorized } from "@/lib/admin/auth";
import {
  getAllTestimonials,
  createTestimonial,
} from "@/lib/admin/testimonials-store";

export async function GET(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();
  return NextResponse.json(getAllTestimonials());
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();

  const body = await request.json();
  const { name, initials, role, text } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const autoInitials = name.trim().split(/\s+/).filter((w: string) => w.length > 0).map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

  const testimonial = createTestimonial({
    name: name.trim(),
    initials: initials || autoInitials,
    role: role ?? "",
    text: text.trim(),
  });

  return NextResponse.json(testimonial, { status: 201 });
}
