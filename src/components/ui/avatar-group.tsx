import * as React from "react";
import { cn } from "../../lib/cn";

export function AvatarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-avatar-group", className)} {...props} />;
}
