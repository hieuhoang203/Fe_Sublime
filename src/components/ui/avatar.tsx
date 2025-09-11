"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export function Avatar({
  src,
  alt = "Avatar",
  fallback = "?",
  size = "md",
  className,
  onClick,
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-spotify-green to-spotify-green-hover text-black font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group",
        sizeClasses[size],
        onClick && "hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <span className="group-hover:scale-110 transition-transform duration-300">
          {fallback}
        </span>
      )}

      {/* Online indicator */}
      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-spotify-black rounded-full"></div>
    </div>
  );
}

interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    alt?: string;
    fallback?: string;
  }>;
  max?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 3,
  size = "md",
  className,
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          fallback={avatar.fallback}
          size={size}
          className="border-2 border-spotify-black hover:z-10 transition-all duration-300"
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "relative inline-flex items-center justify-center rounded-full bg-spotify-light-gray text-spotify-text-gray font-bold border-2 border-spotify-black",
            sizeClasses[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
