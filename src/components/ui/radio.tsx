import * as React from "react";
import { cn } from "../../lib/cn";

export const Radio = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type: _type, ...props }, ref) => {
  return <input ref={ref} type="radio" className={cn("feral-radio feral-focus-ring", className)} {...props} />;
});
Radio.displayName = "Radio";

export function RadioRow({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("feral-radio-row", className)} {...props} />;
}
