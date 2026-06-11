import * as React from "react";
import { Upload } from "lucide-react";
import { cn } from "../../lib/cn";

export const FileUpload = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string; help?: string }>(
  ({ className, label = "Drop files here", help = "Native input, feral outfit. No fake drag engine yet.", id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <label className={cn("feral-file-upload", className)} htmlFor={inputId}>
        <Upload size={22} aria-hidden="true" />
        <strong>{label}</strong>
        <span>{help}</span>
        <input ref={ref} id={inputId} type="file" {...props} />
      </label>
    );
  },
);
FileUpload.displayName = "FileUpload";
