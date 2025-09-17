"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-7 h-7",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-14 h-14",
  "2xl": "w-20 h-20",
  "3xl": "w-24 h-24",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
  "2xl": "text-4xl",
  "3xl": "text-5xl",
};

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "bg-gradient-to-br from-gray-900 to-purple-900 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-yellow-300/20",
          sizeClasses[size]
        )}
      >
        <Image
          src="/logo.png"
          alt="Sublime Logo"
          width={
            size === "sm"
              ? 20
              : size === "md"
              ? 26
              : size === "lg"
              ? 32
              : size === "xl"
              ? 38
              : size === "2xl"
              ? 50
              : size === "3xl"
              ? 62
              : 26
          }
          height={
            size === "sm"
              ? 20
              : size === "md"
              ? 26
              : size === "lg"
              ? 32
              : size === "xl"
              ? 38
              : size === "2xl"
              ? 50
              : size === "3xl"
              ? 62
              : 26
          }
          className="text-black object-contain"
          quality={100}
          priority
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
