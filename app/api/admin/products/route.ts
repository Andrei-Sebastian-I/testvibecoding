import { NextRequest, NextResponse } from "next/server";
import { authenticate, unauthorized } from "@/lib/admin/auth";
import { getAllProducts, createProduct } from "@/lib/admin/product-store";

export async function GET(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();
  return NextResponse.json(getAllProducts());
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();

  const body = await request.json();
  const { name, subtitle, price, category, description, image, images } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
  }

  const product = createProduct({
    name: name.trim(),
    subtitle: subtitle ?? "",
    price: numericPrice,
    category: category ?? "",
    description: description ?? "",
    image: image ?? "",
    images: Array.isArray(images) ? images : [],
  });

  return NextResponse.json(product, { status: 201 });
}
