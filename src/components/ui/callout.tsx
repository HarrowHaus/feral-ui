import * as React from "react";
import { cn } from "../../lib/cn";

export type CalloutTone = "acid" | "pink" | "ultra" | "paper" | "tang" | "danger";

export function Callout({ className, tone = "acid", ...props }: React.HTMLAttributes<HTMLDivElement> & { tone?: CalloutTone }) {
  return <div className={cn("feral-callout", className)} data-tone={tone} {...props} />;
}

export function CalloutTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cn("feral-callout-title", className)} {...props} />;
}

export function CalloutDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("feral-callout-description", className)} {...props} />;
}
