import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "../../lib/cn";

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & { tone?: "acid" | "pink" | "paper" | "ultra" }
>(({ className, tone = "paper", ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn("feral-toggle", className)} data-tone={tone} {...props} />
));
Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
