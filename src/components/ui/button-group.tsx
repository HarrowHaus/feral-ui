import * as React from "react";
import { cn } from "../../lib/cn";

export function ButtonGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="group" className={cn("feral-button-group", className)} {...props} />;
}
