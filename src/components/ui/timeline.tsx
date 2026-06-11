import * as React from "react";
import { cn } from "../../lib/cn";

export type TimelineItemData = { time: string; title: string; description?: string; tone?: "acid" | "pink" | "ultra" | "tang" };

export function Timeline({ items, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { items: TimelineItemData[] }) {
  return (
    <div className={cn("feral-timeline", className)} {...props}>
      {items.map((item) => (
        <article key={`${item.time}-${item.title}`} className="feral-timeline-item" data-tone={item.tone ?? "acid"}>
          <time>{item.time}</time>
          <div><h4>{item.title}</h4>{item.description ? <p>{item.description}</p> : null}</div>
        </article>
      ))}
    </div>
  );
}
