"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/forms/login-form";
import { AuthLayout } from "@/components/layout/auth-layout";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate login logic
          if (data.email === "admin@example.com" && data.password === "admin123") {
            resolve({ role: "admin" });
          } else if (data.email === "artist@example.com" && data.password === "artist123") {
            resolve({ role: "artist" });
          } else if (data.email === "user@example.com" && data.password === "user123") {
            resolve({ role: "user" });
          } else {
            reject(new Error("Invalid email or password"));
          }
        }, 2000);
      });

      // Redirect based on role (in real app, this would come from API)
      const role = data.email === "admin@example.com" ? "admin" : 
                   data.email === "artist@example.com" ? "artist" : "user";
      
      router.push(`/${role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginForm 
        onSubmit={handleLogin} 
        loading={loading} 
        error={error} 
      />
    </AuthLayout>
  );
}
