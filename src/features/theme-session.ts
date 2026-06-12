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
};

const STORAGE_KEY = "feral-ui-active-theme";
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
] as const;

export function themeVarsFor(state: FeralThemeState) {
  return {
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
  } satisfies Record<(typeof THEME_KEYS)[number], string>;
}

export function applyFeralTheme(state: FeralThemeState) {
  const vars = themeVarsFor(state);
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) root.style.setProperty(key, value);
  root.dataset.feralTheme = state.label;
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
  for (const key of THEME_KEYS) document.documentElement.style.removeProperty(key);
  delete document.documentElement.dataset.feralTheme;
  sessionStorage.removeItem(STORAGE_KEY);
}

const bootTheme = loadFeralTheme();
if (bootTheme) applyFeralTheme(bootTheme);
