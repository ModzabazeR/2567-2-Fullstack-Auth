"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GoogleLoginButton from "@/components/ui/googleLoginButton";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, "Password can only contain letters and numbers")
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result = await res.json();
    if (result.token) {
      localStorage.setItem("token", result.token);

      // Redirect ไปหน้าตาม Role
      if (result.role === "admin") router.push("/admin");
      else if (result.role === "manager") router.push("/manager");
      else router.push("/dashboard"); // Default User
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-[350px] p-4">
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2 text-center mb-4">
            <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to continue
            </p>
          </div>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <Input type="text" placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button className="w-full" type="submit">
              Sign In
            </Button>
            
            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>
            
            {/* Google Login Button */}
            <GoogleLoginButton />
            
            <div className="text-center text-sm">
              Need an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}