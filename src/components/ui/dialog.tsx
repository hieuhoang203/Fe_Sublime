"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

interface DialogHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogFooterProps {
  className?: string;
  children: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-lg mx-4">{children}</div>
    </div>
  );
};

const DialogContent = ({
  className,
  children,
  onClose,
}: DialogContentProps) => {
  return (
    <div
      className={cn(
        "bg-spotify-gray border border-spotify-light-gray rounded-xl shadow-2xl animate-fade-in-up",
        className
      )}
    >
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-400/10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {children}
    </div>
  );
};

const DialogHeader = ({ className, children }: DialogHeaderProps) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}>
      {children}
    </div>
  );
};

const DialogTitle = ({ className, children }: DialogTitleProps) => {
  return (
    <h2
      className={cn(
        "text-2xl font-bold text-white leading-none tracking-tight",
        className
      )}
    >
      {children}
    </h2>
  );
};

const DialogDescription = ({ className, children }: DialogDescriptionProps) => {
  return (
    <p className={cn("text-sm text-spotify-text-gray", className)}>
      {children}
    </p>
  );
};

const DialogFooter = ({ className, children }: DialogFooterProps) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};
