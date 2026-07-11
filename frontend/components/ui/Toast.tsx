"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";
import { cn } from "@/utils/cn";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

type ToastContextType = (message: string, type?: ToastType, duration?: number) => void;

const ToastContext = createContext<ToastContextType | null>(null);

// Static emitter for non-component files if needed
let toastEmitter: ToastContextType = () => {};

export const toast = (message: string, type: ToastType = "info", duration = 3000) => {
  toastEmitter(message, type, duration);
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastType = "info", duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  useEffect(() => {
    toastEmitter = addToast;
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <Toaster toasts={toasts} setToasts={setToasts} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return toast; // Fallback to global emitter
  }
  return context;
}

interface ToasterProps {
  toasts: ToastMessage[];
  setToasts: React.Dispatch<React.SetStateAction<ToastMessage[]>>;
}

function Toaster({ toasts, setToasts }: ToasterProps) {
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full select-none pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onClose={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastCardProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

function ToastCard({ toast, onClose }: ToastCardProps) {
  const { id, message, type = "info", duration = 3000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-accent-green shrink-0" />,
    error: <XCircle className="h-4 w-4 text-accent-red shrink-0" />,
    warning: <AlertTriangle className="h-4 w-4 text-accent-orange shrink-0" />,
    info: <Info className="h-4 w-4 text-accent-blue shrink-0" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "pointer-events-auto flex items-start space-x-3 rounded-md border border-border bg-card p-3 shadow-md border-l-4",
        {
          "border-l-accent-green": type === "success",
          "border-l-accent-red": type === "error",
          "border-l-accent-orange": type === "warning",
          "border-l-accent-blue": type === "info",
        }
      )}
    >
      {icons[type]}
      <div className="flex-1 text-xs font-medium text-foreground pr-2 break-words leading-relaxed">
        {message}
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-muted hover:text-foreground shrink-0 cursor-pointer p-0.5 hover:bg-border/30 rounded-sm"
      >
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  );
}
export default toast;
