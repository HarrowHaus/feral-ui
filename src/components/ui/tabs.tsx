import * as React from "react";
import { cn } from "../../lib/cn";

export type TabItem = {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
};

export function Tabs({ items, defaultValue, className }: { items: TabItem[]; defaultValue?: string; className?: string }) {
  const [value, setValue] = React.useState(defaultValue ?? items[0]?.id);
  const active = items.find((item) => item.id === value) ?? items[0];

  return (
    <div className={cn("feral-tabs feral-press", className)}>
      <div className="feral-tab-list" role="tablist" aria-label="Feral tabs">
        {items.map((item) => (
          <button
            key={item.id}
            className="feral-tab feral-focus-ring"
            role="tab"
            aria-selected={item.id === active.id}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            type="button"
            onClick={() => setValue(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="feral-tab-panel" role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`}>
        {active.content}
      </div>
    </div>
  );
}
