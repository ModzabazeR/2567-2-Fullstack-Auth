import { NextRequest, NextResponse } from "next/server";
import { authorizeRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = authorizeRole(["user", "manager", "admin"], req);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  return await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, email: true, role: true },
  });
}
