import * as React from "react";
import { cn } from "../../lib/cn";

export type ChartDatum = { label: string; value: number; tone?: "acid" | "pink" | "ultra" | "tang" | "cyan" };

export function BarChart({ data, max, className }: { data: ChartDatum[]; max?: number; className?: string }) {
  const top = max ?? Math.max(...data.map((item) => item.value), 1);
  return (
    <div className={cn("feral-chart", className)} role="img" aria-label="Bar chart">
      {data.map((item) => (
        <div className="feral-chart-row" key={item.label}>
          <span>{item.label}</span>
          <div className="feral-chart-track"><div className="feral-chart-bar" data-tone={item.tone ?? "acid"} style={{ width: `${Math.max(4, Math.round((item.value / top) * 100))}%` }} /></div>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className={cn("feral-sparkline", className)} aria-hidden="true">
      {data.map((value, index) => <span key={index} style={{ height: `${Math.max(12, (value / max) * 100)}%` }} />)}
    </div>
  );
}
