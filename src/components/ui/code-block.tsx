import * as React from "react";
import { cn } from "../../lib/cn";

export function InlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <code className={cn("feral-inline-code", className)} {...props} />;
}

export function CodeBlock({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return <pre className={cn("feral-code-block", className)} {...props}><code>{children}</code></pre>;
}
