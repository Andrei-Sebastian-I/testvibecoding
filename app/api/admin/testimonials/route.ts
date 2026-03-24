import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/admin/auth";
import {
  getAllTestimonials,
  createTestimonial,
} from "@/lib/admin/testimonials-store";

function authenticate(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifySessionToken(token);
}

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAllTestimonials());
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, initials, role, text } = body;

  if (!name || !text) {
    return NextResponse.json(
      { error: "Name and text are required" },
      { status: 400 }
    );
  }

  const testimonial = createTestimonial({
    name,
    initials: initials || name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2),
    role: role ?? "",
    text,
  });

  return NextResponse.json(testimonial, { status: 201 });
}
