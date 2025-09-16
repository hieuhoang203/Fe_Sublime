"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/components/forms/register-form";
import { AuthLayout } from "@/components/layout/auth-layout";
import { AXIOS_API } from "@/api/api.service";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  role: "user" | "artist";
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const response = AXIOS_API.AUTH.register(data);
          // if (response.) {
          //   reject(new Error("Email already exists"));
          // } else {
          //   resolve({ 
          //     id: "new-user-id",
          //     role: data.role,
          //     name: `${data.firstName} ${data.lastName}`,
          //     email: data.email
          //   });
          // }
        }, 5000);
      });

      // Redirect based on role
      router.push(`/${data.role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <RegisterForm 
        onSubmit={handleRegister} 
        loading={loading} 
        error={error} 
      />
    </AuthLayout>
  );
}
