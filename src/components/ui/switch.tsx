import * as React from "react";
import { cn } from "../../lib/cn";

export const Switch = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type: _type, ...props }, ref) => {
  return (
    <span className={cn("feral-switch", className)}>
      <input ref={ref} type="checkbox" role="switch" {...props} />
      <span className="feral-switch-track" aria-hidden="true" />
      <span className="feral-switch-thumb" aria-hidden="true" />
    </span>
  );
});
Switch.displayName = "Switch";

export function SwitchRow({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("feral-switch-row", className)} {...props} />;
}
