import { authorizeRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = authorizeRole(["admin"], req);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  return NextResponse.json(users);
}
