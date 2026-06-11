import * as React from "react";
import { cn } from "../../lib/cn";

const themes = ["acid", "pink", "ultra", "tang", "cyan"] as const;
export type FeralThemeAccent = typeof themes[number];

export function ThemeSelector({ value = "acid", onValueChange, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { value?: FeralThemeAccent; onValueChange?: (value: FeralThemeAccent) => void }) {
  return (
    <div className={cn("feral-theme-selector", className)} role="radiogroup" aria-label="Accent theme" {...props}>
      {themes.map((theme) => (
        <button key={theme} type="button" role="radio" aria-checked={value === theme} className="feral-theme-swatch feral-focus-ring" data-tone={theme} onClick={() => onValueChange?.(theme)}>
          <span>{theme}</span>
        </button>
      ))}
    </div>
  );
}
