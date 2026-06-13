import * as React from "react";
import { clearFeralTheme } from "./theme-session";
import { applyFeralScheme, readFeralScheme, type FeralScheme } from "./color-scheme";

type ThemeSelectorProps = {
  variant?: "desktop" | "icon";
  className?: string;
};

export function ThemeSelector({ variant = "desktop", className = "" }: ThemeSelectorProps) {
  const [scheme, setScheme] = React.useState<FeralScheme>(() => {
    if (typeof window === "undefined") return "light";
    return readFeralScheme();
  });
  // A polarity preset (dark-paper) *is* a scheme; the toggle suspends while one
  // is active because there is no light counterpart to switch to.
  const [suspended, setSuspended] = React.useState(() => typeof document !== "undefined" && !!document.documentElement.dataset.feralPolarity);

  React.useEffect(() => {
    const onPolarity = () => setSuspended(!!document.documentElement.dataset.feralPolarity);
    window.addEventListener("feral-polarity-change", onPolarity);
    return () => window.removeEventListener("feral-polarity-change", onPolarity);
  }, []);

  React.useEffect(() => {
    if (suspended) return; // the active preset owns the scheme
    applyFeralScheme(scheme);
  }, [scheme, suspended]);

  function toggle() {
    if (suspended) return;
    const next = scheme === "dark" ? "light" : "dark";
    clearFeralTheme();
    setScheme(next);
  }

  const isDark = suspended ? true : scheme === "dark";
  const label = suspended ? "Scheme set by preset" : isDark ? "Lights on" : "Lights out";
  const icon = suspended ? "◐" : isDark ? "☀" : "☾";

  return (
    <button
      className={["theme-selector", variant === "icon" ? "theme-selector-icon" : "theme-selector-desktop", suspended ? "theme-selector-suspended" : "", className].filter(Boolean).join(" ")}
      type="button"
      aria-label={label}
      aria-pressed={isDark}
      aria-disabled={suspended || undefined}
      data-scheme={scheme}
      data-suspended={suspended || undefined}
      title={suspended ? "A polarity preset is active — it sets the scheme." : undefined}
      onClick={toggle}
    >
      <span aria-hidden="true" className="theme-selector-symbol">{icon}</span>
      {variant === "desktop" ? <span className="theme-selector-label">{label}</span> : null}
    </button>
  );
}
