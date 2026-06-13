export type FeralScheme = "light" | "dark";

const KEY = "feral-ui-scheme";

export function readFeralScheme(): FeralScheme {
  try {
    return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function applyFeralScheme(scheme: FeralScheme) {
  document.documentElement.dataset.feralScheme = scheme;
  document.documentElement.style.colorScheme = scheme;
  try {
    localStorage.setItem(KEY, scheme);
  } catch {
    // storage can fail in private/browser-restricted contexts
  }
}

export function clearFeralScheme() {
  document.documentElement.dataset.feralScheme = "light";
  document.documentElement.style.colorScheme = "light";
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore storage failures
  }
}

if (typeof window !== "undefined" && !document.documentElement.dataset.feralPolarity) {
  // A polarity preset owns the scheme; don't override it on boot.
  applyFeralScheme(readFeralScheme());
}
