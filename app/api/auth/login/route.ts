import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

const users = [
	{ username: "user1", password: "password", role: "user" },
	{ username: "manager1", password: "password", role: "manager" },
	{ username: "admin1", password: "password", role: "admin" },
];

export async function POST(req: NextRequest) {
	const { username, password } = await req.json();
	const user = users.find((u) => u.username === username && u.password === password);

	if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

	const token = createToken({ username, role: user.role });
	return NextResponse.json({ token, role: user.role });
}
