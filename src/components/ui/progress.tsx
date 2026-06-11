import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/cn";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { value?: number }
>(({ className, value = 0, ...props }, ref) => (
  <ProgressPrimitive.Root ref={ref} className={cn("feral-progress", className)} value={value} {...props}>
    <ProgressPrimitive.Indicator className="feral-progress-indicator" style={{ transform: `translateX(-${100 - value}%)` }} />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
