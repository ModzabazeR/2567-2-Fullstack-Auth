import { NextRequest, NextResponse } from "next/server";
import { authorizeRole } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = authorizeRole(["manager"], req);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  return NextResponse.json({
    message: `Welcome ${user.email} to Manager Dashboard`,
  });
}
