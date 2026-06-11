import * as React from "react";
import { cn } from "../../lib/cn";

export function Pagination({ pages = 5, active = 3, className }: { pages?: number; active?: number; className?: string }) {
  return (
    <nav className={cn("feral-pagination", className)} aria-label="Pagination">
      <button className="feral-page-button feral-focus-ring" type="button" aria-label="Previous page">‹</button>
      {Array.from({ length: pages }).map((_, index) => (
        <button key={index} className="feral-page-button feral-focus-ring" type="button" data-active={index + 1 === active} aria-current={index + 1 === active ? "page" : undefined}>
          {index + 1}
        </button>
      ))}
      <button className="feral-page-button feral-focus-ring" type="button" aria-label="Next page">›</button>
    </nav>
  );
}
