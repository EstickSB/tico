import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });
}

export async function getUserFromToken(authorization?: string) {
  if (!authorization?.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(authorization.slice(7), JWT_SECRET) as { userId: string };
    return await prisma.user.findUnique({ where: { id: payload.userId }, include: { driver: true } });
  } catch {
    return null;
  }
}

export type AuthUser = NonNullable<Awaited<ReturnType<typeof getUserFromToken>>>;
