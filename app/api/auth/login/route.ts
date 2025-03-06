import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

// Validation functions
const isValidUsername = (username: string) => /^[a-z0-9]+$/.test(username);
const isValidPassword = (password: string) => /^[a-zA-Z0-9]+$/.test(password) && password.length >= 8;

export async function POST(req: NextRequest) {
	try {
		const { username, password } = await req.json();
		
		if (!username || !password) {
			return NextResponse.json({ message: "Username and password required" }, { status: 400 });
		}

		// Validate username and password format
		if (!isValidUsername(username)) {
			return NextResponse.json({ message: "Invalid username. Only lowercase letters and numbers are allowed." }, { status: 400 });
		}

		if (!isValidPassword(password)) {
			return NextResponse.json({ message: "Invalid password. Only letters and numbers are allowed, and must be at least 8 characters long." }, { status: 400 });
		}

		// Find user from MySQL database
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		// Verify password
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		// Generate JWT token
		const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });

		return NextResponse.json({ token, role: user.role });
	} catch (error) {
		return NextResponse.json({ message: "Error logging in", error }, { status: 500 });
	}
}
