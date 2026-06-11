import * as React from "react";
import { cn } from "../../lib/cn";

export type BadgeTone = "acid" | "pink" | "ultra" | "paper" | "tang";

export function Badge({ className, tone = "acid", ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return <span className={cn("feral-badge", className)} data-tone={tone} {...props} />;
}
