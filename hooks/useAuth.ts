"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth(requiredRole?: string) {
	const [role, setRole] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const userRole = localStorage.getItem("role");

		if (!token) {
			router.push("/login"); // ถ้าไม่มี Token ให้ Redirect ไป Login
			return;
		}

		setRole(userRole);

		if (requiredRole && userRole !== requiredRole) {
			router.push("/dashboard"); // ถ้าไม่มีสิทธิ์ ให้ Redirect ไปหน้าหลัก
		}
	}, [router, requiredRole]);

	return { role };
}
