"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchToken = async (code: string) => {
    const res = await fetch(`/api/auth/callback/google`, {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch token");
    }

    const data = await res.json();
    return [data.token, data.role] as [string, string];
  };

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error || !code) {
      toast.error("Authentication failed. Please try again.");
      router.push("/login");
      return;
    }

    fetchToken(code).then(([token, role]) => {
      if (token) {
        // เก็บ token ใน localStorage
        localStorage.setItem("token", token);

        // redirect ตาม role
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "manager") {
          router.push("/manager");
        } else {
          router.push("/dashboard"); // สำหรับ user ทั่วไป
        }
      } else {
        router.push("/login");
      }
    });
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Authenticating...</p>
    </div>
  );
}

// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function AuthCallback() {
  return (
    <Suspense>
      <AuthCallbackInner />
    </Suspense>
  );
}
