"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => void;
  loading?: boolean;
  error?: string;
  success?: boolean;
}

export function ForgotPasswordForm({ 
  onSubmit, 
  loading = false, 
  error, 
  success = false 
}: ForgotPasswordFormProps) {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });
  const [errors, setErrors] = useState<Partial<ForgotPasswordFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ForgotPasswordFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof ForgotPasswordFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md bg-spotify-gray/60 backdrop-blur-xl border-0 shadow-3xl">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-spotify-text-gray">
                We've sent a password reset link to <strong>{formData.email}</strong>
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-spotify-text-gray">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-spotify-light-gray border-spotify-light-gray text-white hover:bg-spotify-hover"
                  onClick={() => window.location.reload()}
                >
                  Resend Email
                </Button>
                <Button
                  asChild
                  className="flex-1 bg-gradient-to-r from-spotify-green to-spotify-green-hover text-black font-bold"
                >
                  <Link href="/login">
                    Back to Login
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-spotify-gray/60 backdrop-blur-xl border-0 shadow-3xl">
        <CardHeader className="text-center space-y-4 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold text-white text-gradient">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-spotify-text-gray text-sm">
              No worries, we'll send you reset instructions
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-white">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-12 bg-spotify-light-gray border-spotify-light-gray text-white placeholder:text-spotify-text-gray focus:border-spotify-green focus:ring-spotify-green/20 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-spotify-green to-spotify-green-hover hover:from-spotify-green-hover hover:to-spotify-green text-black font-bold py-2.5 text-base transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-spotify-green hover:text-spotify-green-hover font-semibold transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
    </Card>
  );
}
