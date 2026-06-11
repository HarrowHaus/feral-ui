import * as React from "react";
import { Button } from "./button";

type CopyButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  value: string;
  copiedLabel?: string;
};

export function CopyButton({ value, children = "Copy", copiedLabel = "Copied", ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button type="button" onClick={copy} aria-live="polite" {...props}>
      {copied ? copiedLabel : children}
    </Button>
  );
}
