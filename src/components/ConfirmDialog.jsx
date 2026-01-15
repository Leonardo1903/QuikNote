import React from "react";
import { AlertCircle, Check, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
  onConfirm,
  onCancel,
  isLoading = false,
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-full ${
                isDangerous
                  ? "bg-red-100 dark:bg-red-900/30"
                  : "bg-blue-100 dark:bg-blue-900/30"
              }`}
            >
              {isDangerous ? (
                <AlertCircle
                  className={`${
                    isDangerous
                      ? "text-red-600 dark:text-red-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                  size={28}
                />
              ) : (
                <Check
                  className={`${
                    isDangerous
                      ? "text-red-600 dark:text-red-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                  size={28}
                />
              )}
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="text-xl font-bold">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm mt-2">
                {description}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="flex gap-3 pt-4 justify-end">
          <AlertDialogCancel disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className={
              isDangerous
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-primary hover:bg-primary/90 text-white"
            }
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
