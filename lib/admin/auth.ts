import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.ADMIN_SESSION_SECRET ?? "dev-secret-change-me";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const SESSION_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function verifyPassword(input: string): boolean {
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

export const COOKIE_NAME = "admin_session";
