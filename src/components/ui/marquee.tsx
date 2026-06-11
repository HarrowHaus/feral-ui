import * as React from "react";
import { cn } from "../../lib/cn";

export function Marquee({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("feral-marquee", className)}>
      <div className="feral-marquee-track" aria-hidden="true">
        {children}{children}
      </div>
    </div>
  );
}
