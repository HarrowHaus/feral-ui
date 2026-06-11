import * as React from "react";
import { cn } from "../../lib/cn";
import { Button } from "./button";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";

export type CodeTab = {
  id: string;
  label: string;
  code: string;
};

export function CodeTabs({ tabs, className }: { tabs: CodeTab[]; className?: string }) {
  const [activeId, setActiveId] = React.useState(tabs[0]?.id ?? "");
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div className={cn("feral-code-tabs", className)}>
      <div className="feral-code-tabs-bar" role="tablist" aria-label="Code tabs">
        <div className="feral-code-tabs-buttons">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              type="button"
              size="sm"
              tone={tab.id === active.id ? "pink" : "paper"}
              role="tab"
              aria-selected={tab.id === active.id}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <CopyButton value={active.code} size="sm" tone="acid" />
      </div>
      <CodeBlock>{active.code}</CodeBlock>
    </div>
  );
}
