import * as React from "react";
import { cn } from "../../lib/cn";

export function ResizablePanels({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-resizable-panels", className)} {...props} />;
}
export function ResizablePanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-resizable-panel", className)} {...props} />;
}
