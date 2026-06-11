import * as React from "react";
import { cn } from "../../lib/cn";

export function Banner({ className, tone = "acid", ...props }: React.HTMLAttributes<HTMLDivElement> & { tone?: "acid" | "pink" | "ultra" | "tang" | "paper" }) {
  return <div className={cn("feral-banner", className)} data-tone={tone} {...props} />;
}
