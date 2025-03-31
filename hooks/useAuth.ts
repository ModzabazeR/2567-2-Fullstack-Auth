"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export function useAuth(requiredRole?: string) {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const verifyToken = async (token: string, role: string) => {
    try {
      const res = await fetch(`/api/${role}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return null;
      }

      const data = await res.json();
      return data as {
        message: string;
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // ถ้าไม่มี Token ให้ Redirect ไป Login
      return;
    }

    const payload = jwt.decode(token) as {
      id: number;
      email: string;
      role: string;
    };

    setRole(payload.role);

    const result = verifyToken(token, payload.role);
    if (!result) {
      router.push("/login"); // ถ้า Token ไม่ถูกต้อง ให้ Redirect ไป Login
      return;
    }

    if (requiredRole && payload.role !== requiredRole) {
      router.push("/dashboard"); // ถ้าไม่มีสิทธิ์ ให้ Redirect ไปหน้าหลัก
    }
  }, [router, requiredRole]);

  return { role };
}
