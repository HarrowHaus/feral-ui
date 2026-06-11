import * as React from "react";
import { cn } from "../../lib/cn";

export function Spinner({ className, label = "Loading", ...props }: React.HTMLAttributes<HTMLSpanElement> & { label?: string }) {
  return <span role="status" aria-label={label} className={cn("feral-spinner", className)} {...props} />;
}
