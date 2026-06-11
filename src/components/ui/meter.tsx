import * as React from "react";
import { cn } from "../../lib/cn";

export function Meter({ className, value = 0, max = 100, label, tone = "acid", ...props }: React.HTMLAttributes<HTMLDivElement> & { value?: number; max?: number; label?: string; tone?: "acid" | "pink" | "ultra" | "tang" | "cyan" }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("feral-meter", className)} data-tone={tone} {...props}>
      {label ? <div className="feral-meter-label"><span>{label}</span><span>{Math.round(pct)}%</span></div> : null}
      <div className="feral-meter-track" role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label}>
        <span className="feral-meter-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
