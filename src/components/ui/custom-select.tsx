"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

interface CustomSelectOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  className,
  error,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const selectRef = React.useRef<HTMLDivElement>(null);
  const optionRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const selectedOption = options.find((option) => option.value === value);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      optionRefs.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusedIndex, isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          onChange(options[focusedIndex].value);
          setIsOpen(false);
          setFocusedIndex(-1);
        } else {
          setIsOpen(true);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        }
        break;
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  return (
    <div ref={selectRef} className={cn("relative", className)}>
      {/* Select Trigger */}
      <div
        className={cn(
          "enhanced-select w-full cursor-pointer flex items-center justify-between",
          error && "border-red-500 focus:border-red-500",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          {selectedOption?.icon && (
            <selectedOption.icon className="h-4 w-4 text-spotify-text-gray" />
          )}
          <span
            className={cn(
              "truncate",
              !selectedOption && "text-spotify-text-gray"
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-spotify-text-gray transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-spotify-light-gray border border-spotify-light-gray rounded-lg shadow-xl max-h-60 overflow-auto">
          {options.map((option, index) => {
            const IconComponent = option.icon;
            const isSelected = option.value === value;
            const isFocused = index === focusedIndex;

            return (
              <div
                key={option.value}
                ref={(el) => (optionRefs.current[index] = el)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200",
                  isSelected && "bg-spotify-green text-black font-medium",
                  !isSelected && isFocused && "bg-spotify-hover text-white",
                  !isSelected &&
                    !isFocused &&
                    "text-white hover:bg-spotify-green hover:text-black hover:translate-x-1"
                )}
                onClick={() => handleOptionClick(option.value)}
                onMouseEnter={() => setFocusedIndex(index)}
                role="option"
                aria-selected={isSelected}
              >
                {IconComponent && (
                  <IconComponent className="h-4 w-4 flex-shrink-0" />
                )}
                <span className="flex-1 truncate">{option.label}</span>
                {isSelected && <Check className="h-4 w-4 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
