import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/admin/auth";
import { getAllProducts, createProduct } from "@/lib/admin/product-store";

function authenticate(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifySessionToken(token);
}

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(getAllProducts());
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, subtitle, price, category, description, image, images } = body;

  if (!name || !price) {
    return NextResponse.json(
      { error: "Name and price are required" },
      { status: 400 }
    );
  }

  const product = createProduct({
    name,
    subtitle: subtitle ?? "",
    price: Number(price),
    category: category ?? "",
    description: description ?? "",
    image: image ?? "",
    images: images ?? [],
  });

  return NextResponse.json(product, { status: 201 });
}
