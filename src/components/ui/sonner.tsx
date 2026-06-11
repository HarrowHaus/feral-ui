import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "./button";

type ToastTone = "acid" | "pink" | "ultra" | "paper" | "danger";
export type FeralToast = {
  id: string;
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
  action?: { label: string; onClick: () => void };
};

type ToastContextValue = {
  toasts: FeralToast[];
  toast: (toast: Omit<FeralToast, "id"> & { id?: string }) => string;
  dismiss: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children, defaultDuration = 4200 }: { children: React.ReactNode; defaultDuration?: number }) {
  const [toasts, setToasts] = React.useState<FeralToast[]>([]);
  const timers = React.useRef(new Map<string, number>());

  const dismiss = React.useCallback((id: string) => {
    window.clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((items) => items.filter((item) => item.id !== id));
  }, []);

  const toast = React.useCallback((next: Omit<FeralToast, "id"> & { id?: string }) => {
    const id = next.id ?? `feral-toast-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const item: FeralToast = { ...next, id };
    setToasts((items) => [item, ...items].slice(0, 5));
    const duration = next.duration ?? defaultDuration;
    if (duration > 0) {
      const timer = window.setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    }
    return id;
  }, [defaultDuration, dismiss]);

  React.useEffect(() => () => { timers.current.forEach((timer) => window.clearTimeout(timer)); }, []);

  return <ToastContext.Provider value={{ toasts, toast, dismiss }}>{children}<ToastViewport /></ToastContext.Provider>;
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider. Tiny yelling rectangle needs a house.");
  return context;
}

export function ToastViewport({ className }: { className?: string }) {
  const context = React.useContext(ToastContext);
  if (!context) return null;
  return <ToastStack className={className}>{context.toasts.map((toast) => <Toast key={toast.id} {...toast} onDismiss={() => context.dismiss(toast.id)} />)}</ToastStack>;
}

export function ToastStack({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-toast-stack", className)} aria-live="polite" aria-relevant="additions" {...props} />;
}

export function Toast({
  className,
  title,
  description,
  tone = "acid",
  action,
  onDismiss,
}: {
  className?: string;
  title: string;
  description?: string;
  tone?: ToastTone;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
}) {
  return (
    <div className={cn("feral-toast feral-press", className)} data-tone={tone} role="status">
      <div className="feral-toast-copy"><strong>{title}</strong>{description ? <span>{description}</span> : null}</div>
      <div className="feral-toast-actions">
        {action ? <Button type="button" size="sm" tone="paper" onClick={action.onClick}>{action.label}</Button> : null}
        {onDismiss ? <button type="button" className="feral-toast-close feral-focus-ring" aria-label="Dismiss toast" onClick={onDismiss}><X size={14} /></button> : null}
      </div>
    </div>
  );
}
