import * as React from "react";
import { cn } from "../../lib/cn";

export type AccordionItem = {
  title: React.ReactNode;
  content: React.ReactNode;
  defaultOpen?: boolean;
};

export function Accordion({ className, items }: { className?: string; items: AccordionItem[] }) {
  return (
    <div className={cn("feral-accordion", className)}>
      {items.map((item, index) => (
        <details key={index} open={item.defaultOpen} className="feral-press">
          <summary>{item.title}</summary>
          <div className="feral-accordion-panel">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
