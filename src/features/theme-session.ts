export type FeralThemeState = {
  label: string;
  ink: string;
  cream: string;
  pink: string;
  acid: string;
  ultra: string;
  cyan: string;
  tang: string;
  border: number;
  pressure: number;
  radius: number;
  tilt: number;
  pattern: number;
  density: number;
  motion: number;
  contrast: string;
  /* Optional hard-shadow tone; defaults to ink when absent. */
  shadow?: string;
  /* Polarity presets ("dark") ship dark paper and suspend the scheme toggle. */
  polarity?: "dark";
  /* Override for text on saturated signals (pastel palettes need dark text). */
  onSignal?: string;
};

import { readFeralScheme } from "./color-scheme";

const STORAGE_KEY = "feral-ui-active-theme";
const POLARITY_EVENT = "feral-polarity-change";
const THEME_KEYS = [
  "--feral-ink",
  "--feral-cream",
  "--feral-bone",
  "--feral-paper",
  "--feral-muted",
  "--feral-pink",
  "--feral-acid",
  "--feral-ultra",
  "--feral-verm",
  "--feral-cyan",
  "--feral-tang",
  "--feral-focus",
  "--feral-border-md",
  "--feral-border-lg",
  "--feral-pressure-md",
  "--feral-shadow-x",
  "--feral-shadow-y",
  "--feral-radius-md",
  "--feral-radius-lg",
  "--feral-tilt-max",
  "--feral-pattern-intensity",
  "--feral-density",
  "--feral-speed",
  "--feral-shadow-tone",
  "--feral-on-signal",
] as const;

export function themeVarsFor(state: FeralThemeState): Record<string, string> {
  const vars: Record<string, string> = {
    "--feral-ink": state.ink,
    "--feral-cream": state.cream,
    "--feral-bone": state.cream,
    "--feral-paper": state.cream,
    "--feral-muted": state.ink,
    "--feral-pink": state.pink,
    "--feral-acid": state.acid,
    "--feral-ultra": state.ultra,
    "--feral-verm": state.tang,
    "--feral-cyan": state.cyan,
    "--feral-tang": state.tang,
    "--feral-focus": state.ultra,
    "--feral-border-md": `${state.border}px`,
    "--feral-border-lg": `${Math.max(state.border + 1, 3)}px`,
    "--feral-pressure-md": `${state.pressure}px`,
    "--feral-shadow-x": `${state.pressure}px`,
    "--feral-shadow-y": `${state.pressure}px`,
    "--feral-radius-md": `${state.radius}px`,
    "--feral-radius-lg": `${state.radius + 6}px`,
    "--feral-tilt-max": `${state.tilt}deg`,
    "--feral-pattern-intensity": `${state.pattern}%`,
    "--feral-density": String(state.density),
    "--feral-speed": `${state.motion}ms`,
    "--feral-shadow-tone": state.shadow ?? state.ink,
  };
  // Only override on-signal when a preset asks for it (pastel palettes); else
  // the role keeps its scheme-driven default (#fff in light, dark in dark).
  if (state.onSignal) vars["--feral-on-signal"] = state.onSignal;
  return vars;
}

/* A polarity preset *is* a scheme: it forces dark role remaps and suspends
   the toggle. Leaving it restores the user's own scheme preference. */
function applyPolarity(root: HTMLElement, polarity: FeralThemeState["polarity"]) {
  if (polarity === "dark") {
    root.dataset.feralPolarity = "dark";
    root.dataset.feralScheme = "dark";
    root.style.colorScheme = "dark";
  } else if (root.dataset.feralPolarity) {
    delete root.dataset.feralPolarity;
    const scheme = readFeralScheme();
    root.dataset.feralScheme = scheme;
    root.style.colorScheme = scheme;
  }
  window.dispatchEvent(new CustomEvent(POLARITY_EVENT, { detail: polarity ?? null }));
}

export function applyFeralTheme(state: FeralThemeState) {
  const vars = themeVarsFor(state);
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) root.style.setProperty(key, value);
  root.dataset.feralTheme = state.label;
  applyPolarity(root, state.polarity);
}

export function saveFeralTheme(state: FeralThemeState) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadFeralTheme(): FeralThemeState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as FeralThemeState : null;
  } catch {
    return null;
  }
}

export function clearFeralTheme() {
  const root = document.documentElement;
  for (const key of THEME_KEYS) root.style.removeProperty(key);
  delete root.dataset.feralTheme;
  applyPolarity(root, undefined);
  sessionStorage.removeItem(STORAGE_KEY);
}

const bootTheme = loadFeralTheme();
if (bootTheme) applyFeralTheme(bootTheme);
