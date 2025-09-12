"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-12 h-12",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-teal-400/30",
          sizeClasses[size]
        )}
      >
        <Image
          src="/vercel.svg"
          alt="Sublime Logo"
          width={
            size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 24 : 28
          }
          height={
            size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 24 : 28
          }
          className="text-black"
        />
      </div>
      {showText && (
        <h1 className={cn("font-bold text-gradient", textSizeClasses[size])}>
          Sublime
        </h1>
      )}
    </div>
  );
}
