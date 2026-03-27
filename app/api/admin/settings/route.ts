import { NextRequest, NextResponse } from "next/server";
import { authenticate, unauthorized } from "@/lib/admin/auth";
import { getSettings, updateSettings } from "@/lib/admin/settings-store";

export async function GET(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();
  return NextResponse.json(getSettings());
}

export async function PUT(request: NextRequest) {
  if (!authenticate(request)) return unauthorized();

  const body = await request.json();
  const updated = updateSettings(body);
  return NextResponse.json(updated);
}
