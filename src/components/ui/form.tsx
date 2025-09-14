"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { DatePicker } from "./date-picker";
import { Input } from "./input";
import { Button } from "./button";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface FormInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  disabled?: boolean;
  className?: string;
}

interface FormTextareaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

interface FormSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface FormFileUploadProps {
  accept?: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface FormDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

const FormField = ({
  label,
  error,
  required,
  children,
  className,
}: FormFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-white flex items-center gap-1">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-400 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
};

const FormInput = ({
  placeholder,
  value,
  onChange,
  type = "text",
  disabled,
  className,
}: FormInputProps) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={cn(
        "enhanced-input form-input bg-black border-0 text-white placeholder:text-spotify-text-gray focus:ring-2 focus:ring-spotify-green focus:outline-none",
        className
      )}
    />
  );
};

const FormTextarea = ({
  placeholder,
  value,
  onChange,
  rows = 4,
  disabled,
  className,
}: FormTextareaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      disabled={disabled}
      className={cn(
        "flex w-full rounded-md border-0 bg-black px-3 py-2 text-sm text-white placeholder:text-spotify-text-gray focus:ring-2 focus:ring-spotify-green focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200",
        className
      )}
    />
  );
};

const FormSelect = ({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  className,
}: FormSelectProps) => {
  return (
    <div className="custom-select-wrapper">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn("enhanced-select w-full", className)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-spotify-light-gray text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const FormFileUpload = ({
  accept,
  onChange,
  disabled,
  className,
  children,
}: FormFileUploadProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />
      <div
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed border-spotify-light-gray rounded-lg p-6 text-center hover:border-spotify-green transition-colors cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {children || (
          <div className="space-y-2">
            <div className="w-12 h-12 bg-spotify-light-gray rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">📁</span>
            </div>
            <p className="text-sm text-spotify-text-gray">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-spotify-text-gray">
              {accept ? `Accepts: ${accept}` : "Any file type"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const FormSubmit = ({
  children,
  loading = false,
  disabled = false,
  className,
}: {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <Button
      type="submit"
      disabled={disabled || loading}
      className={cn(
        "w-full bg-gradient-to-r from-spotify-green to-spotify-green-hover hover:from-spotify-green-hover hover:to-spotify-green text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",
        className
      )}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

const FormDatePicker = ({
  value,
  onChange,
  placeholder,
  disabled,
  className,
  label,
  error,
  required,
}: FormDatePickerProps) => {
  return (
    <DatePicker
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      label={label}
      error={error}
      required={required}
    />
  );
};

export {
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormFileUpload,
  FormDatePicker,
  FormSubmit,
};
