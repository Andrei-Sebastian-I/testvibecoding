import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_MAX_AGE, COOKIE_NAME } from "./constants";

const SECRET = process.env.ADMIN_SESSION_SECRET ?? "dev-secret-change-me";
const PASSWORD = process.env.ADMIN_PASSWORD;

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function verifyPassword(input: string): boolean {
  if (!PASSWORD) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(PASSWORD);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = sign(timestamp);
  return `${timestamp}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  const [timestamp, signature] = token.split(".");
  if (!timestamp || !signature) return false;

  const expected = sign(timestamp);
  if (expected.length !== signature.length) return false;

  const valid = timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
  if (!valid) return false;

  const age = Date.now() - Number(timestamp);
  return age < SESSION_MAX_AGE;
}

export { COOKIE_NAME };

export type RouteContext = { params: Promise<{ id: string }> };

export function authenticate(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifySessionToken(token);
}

export function unauthorized(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
