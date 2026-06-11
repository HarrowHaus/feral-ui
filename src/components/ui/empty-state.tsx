import * as React from "react";
import { Ghost } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "./button";

export function EmptyState({ className, title, description, action }: { className?: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className={cn("feral-empty-state", className)}>
      <Ghost size={34} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{description}</p>
      {action ?? <Button tone="paper" type="button">Do something suspiciously useful</Button>}
    </div>
  );
}
