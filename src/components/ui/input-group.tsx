import * as React from "react";
import { cn } from "../../lib/cn";

export function InputGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-input-group", className)} {...props} />;
}

export function InputAddon({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("feral-input-addon", className)} {...props} />;
}
