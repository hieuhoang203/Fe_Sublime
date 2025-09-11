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
      <DialogContent className="sm:max-w-md animate-dialog-slide-in">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-spotify-gray to-spotify-light-gray animate-icon-bounce">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full",
                config.iconBg
              )}
            >
              <Icon className={cn("h-6 w-6", config.iconColor)} />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-white">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-spotify-text-gray text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2">
          <Button
            variant="ghost"
            onClick={handleCancel}
            disabled={loading || disabled}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            {cancelText || config.cancelText}
          </Button>
          <Button
            variant={config.confirmVariant}
            onClick={handleConfirm}
            disabled={loading || disabled}
            loading={loading}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Processing...
              </div>
            ) : (
              confirmText || config.confirmText
            )}
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
    return <ConfirmDialog open={open} onOpenChange={setOpen} {...config} />;
  }, [open, config]);

  return {
    confirm,
    ConfirmDialog: ConfirmDialogComponent,
  };
}
