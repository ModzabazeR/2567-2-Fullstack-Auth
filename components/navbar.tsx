"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/user", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.json())
        .then((data) => setRole(data.role));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-blue-600 p-4 text-white">
      <h1 className="text-xl">Web Auth App</h1>
      <div className="flex gap-4">
        {role === "admin" && (
          <Button onClick={() => router.push("/admin")}>Admin</Button>
        )}
        {role === "manager" && (
          <Button onClick={() => router.push("/manager")}>Manager</Button>
        )}
        <Button onClick={handleLogout} className="bg-red-500">
          Logout
        </Button>
      </div>
    </nav>
  );
}
