"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export function useAuth(requiredRole?: string) {
	const [role, setRole] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			router.push("/login"); // ถ้าไม่มี Token ให้ Redirect ไป Login
			return;
		}

		const payload = jwt.decode(token) as { id: number; username: string; role: string };

		setRole(payload.role);

		if (requiredRole && payload.role !== requiredRole) {
			router.push("/dashboard"); // ถ้าไม่มีสิทธิ์ ให้ Redirect ไปหน้าหลัก
		}
	}, [router, requiredRole]);

	return { role };
}
