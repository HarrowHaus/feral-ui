import { clearFeralTheme } from "./theme-session";

export type FeralScheme = "light" | "dark";

const KEY = "feral-ui-scheme";
const SELECTOR = 'button[aria-label="Theme toggle"]';

function stored(): FeralScheme {
  return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
}

export function applyFeralScheme(scheme: FeralScheme) {
  document.documentElement.dataset.feralScheme = scheme;
  document.documentElement.style.colorScheme = scheme;
  localStorage.setItem(KEY, scheme);
  syncButtons(scheme);
}

export function toggleFeralScheme() {
  const next = document.documentElement.dataset.feralScheme === "dark" ? "light" : "dark";
  clearFeralTheme();
  applyFeralScheme(next);
}

function syncButtons(scheme = stored()) {
  document.querySelectorAll<HTMLButtonElement>(SELECTOR).forEach((button) => {
    button.setAttribute("aria-pressed", String(scheme === "dark"));
    button.textContent = scheme === "dark" ? "Lights on" : "Lights out";
  });
}

function init() {
  applyFeralScheme(stored());
  document.addEventListener("click", (event) => {
    const target = event.target as Element | null;
    const button = target?.closest?.(SELECTOR);
    if (!button) return;
    event.preventDefault();
    toggleFeralScheme();
  });
  new MutationObserver(() => syncButtons()).observe(document.documentElement, { childList: true, subtree: true });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}
