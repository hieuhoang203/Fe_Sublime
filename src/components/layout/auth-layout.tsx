"use client";

import { ReactNode } from "react";
import { Music, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  backHref?: string;
}

export function AuthLayout({
  children,
  showBackButton = true,
  backHref = "/",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-spotify-black via-spotify-gray to-spotify-black relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Background Circles */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-spotify-green/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-spotify-green/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-spotify-green/5 rounded-full blur-3xl animate-pulse-slow"></div>

        {/* Floating Music Notes */}
        <div className="absolute top-20 left-20 text-spotify-green/20 animate-bounce">
          <Music className="h-8 w-8" />
        </div>
        <div
          className="absolute top-40 right-32 text-spotify-green/15 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <Music className="h-6 w-6" />
        </div>
        <div
          className="absolute bottom-32 left-32 text-spotify-green/20 animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          <Music className="h-10 w-10" />
        </div>
        <div
          className="absolute bottom-20 right-20 text-spotify-green/15 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          <Music className="h-7 w-7" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center shadow-lg group-hover:shadow-spotify-green/30 transition-all duration-300 group-hover:scale-110">
              <Music className="h-5 w-5 text-black" />
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300">
              Sublime
            </span>
          </Link>

          {/* Back Button */}
          {showBackButton && (
            <Button
              variant="ghost"
              asChild
              className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <Link href={backHref} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-start justify-center pt-8 pb-4 px-4">
        {children}
      </div>

      {/* Footer */}
      <div className="relative z-10 p-4 mt-auto">
        <div className="text-center text-spotify-text-gray text-xs">
          <p>© 2024 Sublime. Built with Next.js and Tailwind CSS.</p>
          <div className="flex justify-center gap-4 mt-1">
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="/help"
              className="hover:text-white transition-colors duration-300"
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
