"use client";

import { useState } from "react";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";
import { AuthLayout } from "@/components/layout/auth-layout";

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate forgot password logic
          if (data.email === "test@example.com") {
            reject(new Error("Email not found"));
          } else {
            resolve({ message: "Reset link sent" });
          }
        }, 2000);
      });

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <ForgotPasswordForm 
        onSubmit={handleForgotPassword} 
        loading={loading} 
        error={error}
        success={success}
      />
    </AuthLayout>
  );
}
