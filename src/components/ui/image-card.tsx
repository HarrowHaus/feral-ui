import * as React from "react";
import { cn } from "../../lib/cn";

export function ImageCard({ className, title, description, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { title: string; description?: string }) {
  return (
    <figure className={cn("feral-image-card feral-press", className)} {...props}>
      <div className="feral-image-card-media">{children}</div>
      <figcaption><strong>{title}</strong>{description ? <span>{description}</span> : null}</figcaption>
    </figure>
  );
}
