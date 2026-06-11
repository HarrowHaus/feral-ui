import * as React from "react";
import { cn } from "../../lib/cn";

export function Alert({ className, tone = "ultra", ...props }: React.HTMLAttributes<HTMLDivElement> & { tone?: "ultra" | "acid" | "pink" }) {
  return <div role="status" className={cn("feral-alert feral-press", className)} data-tone={tone} {...props} />;
}

export function AlertIcon({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden="true" className={cn("feral-alert-icon", className)} {...props} />;
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-alert-title", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-alert-description", className)} {...props} />;
}
