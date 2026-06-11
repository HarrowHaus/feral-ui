import * as React from "react";
import { cn } from "../../lib/cn";

export function AspectRatio({ ratio = 16 / 9, className, style, ...props }: React.HTMLAttributes<HTMLDivElement> & { ratio?: number }) {
  return <div className={cn("feral-aspect-ratio", className)} style={{ ...style, aspectRatio: String(ratio) }} {...props} />;
}
