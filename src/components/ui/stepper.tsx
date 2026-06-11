import * as React from "react";
import { cn } from "../../lib/cn";

export type StepperStep = { label: string; description?: string; state?: "complete" | "current" | "upcoming" };

export function Stepper({ steps, className, ...props }: React.HTMLAttributes<HTMLOListElement> & { steps: StepperStep[] }) {
  return (
    <ol className={cn("feral-stepper", className)} {...props}>
      {steps.map((step, index) => (
        <li key={`${step.label}-${index}`} className="feral-stepper-step" data-state={step.state ?? "upcoming"}>
          <span className="feral-stepper-index">{index + 1}</span>
          <span><strong>{step.label}</strong>{step.description ? <em>{step.description}</em> : null}</span>
        </li>
      ))}
    </ol>
  );
}
