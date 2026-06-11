import * as React from "react";
import { cn } from "../../lib/cn";

export function Field({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-field", className)} {...props} />;
}

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => {
  return <label ref={ref} className={cn("feral-label", className)} {...props} />;
});
Label.displayName = "Label";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  return <input ref={ref} className={cn("feral-input feral-focus-ring", className)} {...props} />;
});
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => {
  return <textarea ref={ref} className={cn("feral-textarea feral-focus-ring", className)} {...props} />;
});
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({ className, children, ...props }, ref) => {
  return <select ref={ref} className={cn("feral-select feral-focus-ring", className)} {...props}>{children}</select>;
});
Select.displayName = "Select";

export function FieldHelp({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("feral-field-help", className)} {...props} />;
}
