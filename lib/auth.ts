import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface UserPayload {
  id: string;
  email: string;
  role: string | "user" | "manager" | "admin";
}

export function createToken(user: UserPayload) {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

export function verifyToken(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
  } catch {
    return null;
  }
}

export function authorizeRole(roles: string[], req: NextRequest) {
  const user = verifyToken(req);
  return user && roles.includes(user.role) ? user : null;
}
