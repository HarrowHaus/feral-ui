import * as React from "react";
import { cn } from "../../lib/cn";

export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type: _type, ...props }, ref) => {
  return <input ref={ref} type="checkbox" className={cn("feral-checkbox feral-focus-ring", className)} {...props} />;
});
Checkbox.displayName = "Checkbox";

export function CheckboxRow({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("feral-checkbox-row", className)} {...props} />;
}
