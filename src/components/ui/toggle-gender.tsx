"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { User, Users } from "lucide-react";

interface ToggleGenderProps {
  value: true | false ;
  onChange: (value: true | false ) => void;
  className?: string;
  disabled?: boolean;
}

export function ToggleGender({
  value,
  onChange,
  className,
  disabled = false,
}: ToggleGenderProps) {
  const options = [
    {
      value: true as const,
      label: "Male",
      icon: User,
      selectedIconColor: "text-blue-400",
      selectedTextColor: "text-blue-400",
    },
    {
      value: false as const,
      label: "Female", 
      icon: Users,
      selectedIconColor: "text-pink-400",
      selectedTextColor: "text-pink-400",
    }
  ];

  return (
    <div className={cn("flex gap-2", className)}>
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = value === option.value;
        
        return (
          <button
            key={option.value.toString()}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all duration-300 group hover-lift",
              isSelected
                ? `bg-[#121212] ${option.selectedTextColor} shadow-lg`
                : "bg-[#121212] text-spotify-text-gray hover:bg-spotify-light-gray hover:text-white",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-all duration-300",
                isSelected ? option.selectedIconColor : "text-spotify-text-gray group-hover:text-white"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium transition-all duration-300",
                isSelected ? option.selectedTextColor : "text-spotify-text-gray group-hover:text-white"
              )}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
