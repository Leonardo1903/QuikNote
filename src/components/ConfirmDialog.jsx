import React from "react";
import { AlertCircle, Check, X } from "lucide-react";

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Icon */}
        <div className="flex justify-center">
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
        </div>

        {/* Content */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              isDangerous
                ? "bg-red-600 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
