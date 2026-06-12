import * as React from "react";
import { clearFeralTheme } from "./theme-session";
import { applyFeralScheme, readFeralScheme, type FeralScheme } from "./scheme-session";

type ThemeSelectorProps = {
  variant?: "desktop" | "icon";
  className?: string;
};

export function ThemeSelector({ variant = "desktop", className = "" }: ThemeSelectorProps) {
  const [scheme, setScheme] = React.useState<FeralScheme>(() => {
    if (typeof window === "undefined") return "light";
    return readFeralScheme();
  });

  React.useEffect(() => {
    applyFeralScheme(scheme);
  }, [scheme]);

  function toggle() {
    const next = scheme === "dark" ? "light" : "dark";
    clearFeralTheme();
    setScheme(next);
  }

  const isDark = scheme === "dark";
  const label = isDark ? "Lights on" : "Lights out";
  const icon = isDark ? "☀" : "☾";

  return (
    <button
      className={["theme-selector", variant === "icon" ? "theme-selector-icon" : "theme-selector-desktop", className].filter(Boolean).join(" ")}
      type="button"
      aria-label={label}
      aria-pressed={isDark}
      data-scheme={scheme}
      onClick={toggle}
    >
      <span aria-hidden="true" className="theme-selector-symbol">{icon}</span>
      {variant === "desktop" ? <span className="theme-selector-label">{label}</span> : null}
    </button>
  );
}
