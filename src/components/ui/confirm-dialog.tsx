"use client";

import * as React from "react";
import {
  AlertTriangle,
  Trash2,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "warning" | "info" | "success";
  loading?: boolean;
  disabled?: boolean;
}

const variantConfig = {
  default: {
    icon: Info,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    confirmVariant: "spotify" as const,
    confirmText: "Confirm",
    cancelText: "Cancel",
  },
  destructive: {
    icon: Trash2,
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10",
    confirmVariant: "destructive" as const,
    confirmText: "Delete",
    cancelText: "Cancel",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/10",
    confirmVariant: "warning" as const,
    confirmText: "Continue",
    cancelText: "Cancel",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    confirmVariant: "spotify" as const,
    confirmText: "OK",
    cancelText: "Cancel",
  },
  success: {
    icon: CheckCircle,
    iconColor: "text-green-400",
    iconBg: "bg-green-500/10",
    confirmVariant: "spotify" as const,
    confirmText: "OK",
    cancelText: "Cancel",
  },
};

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText,
  cancelText,
  variant = "default",
  loading = false,
  disabled = false,
}: ConfirmDialogProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-dialog-slide-in relative overflow-hidden group">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-spotify-gray/50 via-spotify-light-gray/30 to-spotify-gray/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-lg border border-spotify-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <DialogHeader className="text-center relative z-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-spotify-gray to-spotify-light-gray animate-icon-bounce relative group">
            {/* Pulse effect for icon container */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-spotify-gray to-spotify-light-gray animate-pulse-slow opacity-50"></div>

            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full relative z-10 group-hover:scale-110 transition-transform duration-300",
                config.iconBg
              )}
            >
              <Icon
                className={cn(
                  "h-6 w-6 group-hover:scale-110 transition-transform duration-300",
                  config.iconColor
                )}
              />
            </div>

            {/* Glow effect based on variant */}
            {variant === "destructive" && (
              <div className="absolute inset-0 rounded-full bg-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
            )}
            {variant === "warning" && (
              <div className="absolute inset-0 rounded-full bg-yellow-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
            )}
            {variant === "success" && (
              <div className="absolute inset-0 rounded-full bg-green-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
            )}
            {(variant === "default" || variant === "info") && (
              <div className="absolute inset-0 rounded-full bg-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
            )}
          </div>
          <DialogTitle className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-white/90 text-center text-base leading-relaxed">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-4 sm:gap-3 relative z-10">
          {/* Cancel Button - Enhanced */}
          <Button
            variant="ghost"
            onClick={handleCancel}
            disabled={loading || disabled}
            className="w-full sm:w-auto order-2 sm:order-1 relative overflow-hidden group transition-all duration-200 ease-out hover:scale-105 transform"
          >
            {/* Cancel button background */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out"></div>

            {/* Cancel button border glow */}
            <div className="absolute inset-0 border border-white/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out"></div>

            <span className="relative z-10 text-white font-semibold group-hover:text-white transition-colors duration-200 ease-out">
              {cancelText || config.cancelText}
            </span>
          </Button>

          {/* Confirm Button - Enhanced */}
          <Button
            variant={config.confirmVariant}
            onClick={handleConfirm}
            disabled={loading || disabled}
            loading={loading}
            className="w-full sm:w-auto order-1 sm:order-2 font-bold text-white relative overflow-hidden group hover:scale-105 transition-all duration-200 ease-out shadow-lg hover:shadow-xl transform"
          >
            {/* Simplified glow effect */}
            {variant === "destructive" && (
              <div className="absolute inset-0 rounded-md bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out blur-sm"></div>
            )}

            {variant === "warning" && (
              <div className="absolute inset-0 rounded-md bg-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out blur-sm"></div>
            )}

            {variant === "success" && (
              <div className="absolute inset-0 rounded-md bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out blur-sm"></div>
            )}

            {(variant === "default" || variant === "info") && (
              <div className="absolute inset-0 rounded-md bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out blur-sm"></div>
            )}

            <span className="relative z-10 text-white font-bold">
              {loading ? (
                <div className="flex items-center gap-2 text-white">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </div>
              ) : (
                confirmText || config.confirmText
              )}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Hook để sử dụng confirm dialog dễ dàng hơn
export function useConfirmDialog() {
  const [open, setOpen] = React.useState(false);
  const [config, setConfig] = React.useState<Partial<ConfirmDialogProps>>({});

  const confirm = React.useCallback(
    (options: Omit<ConfirmDialogProps, "open" | "onOpenChange">) => {
      return new Promise<boolean>((resolve) => {
        setConfig({
          ...options,
          onConfirm: () => {
            options.onConfirm();
            resolve(true);
          },
          onCancel: () => {
            options.onCancel?.();
            resolve(false);
          },
        });
        setOpen(true);
      });
    },
    []
  );

  const ConfirmDialogComponent = React.useMemo(() => {
    if (!config) return null;
    return (
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={config.title || "Confirm"}
        description={config.description}
        confirmText={config.confirmText}
        cancelText={config.cancelText}
        variant={config.variant}
        loading={config.loading}
        disabled={config.disabled}
        onConfirm={config.onConfirm || (() => {})}
        onCancel={config.onCancel}
      />
    );
  }, [open, config]);

  return {
    confirm,
    ConfirmDialog: ConfirmDialogComponent,
  };
}
