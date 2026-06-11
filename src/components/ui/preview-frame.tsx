import * as React from "react";
import { cn } from "../../lib/cn";

export function PreviewFrame({ className, title, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { title?: string }) {
  return (
    <section className={cn("feral-preview-frame", className)} aria-label={title ?? "Component preview"} {...props}>
      {title ? <div className="feral-preview-title">{title}</div> : null}
      <div className="feral-preview-stage">{children}</div>
    </section>
  );
}
