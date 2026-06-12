# DECISIONS

One line per decision where the handoff left room and the smallest gate-
satisfying choice was taken.

## Phase 0 — CSS consolidation

- Dark mode is one token-remap block in `tokens.css`; the per-selector dark
  overrides (glows, night-pulse animation, two-tone body dot grid) from
  `dark-mode.css`/`night-role-repair.css` were dropped as decorative shedding,
  not reimplemented — the night *palette values* are preserved.
- Saturated cards (pink/ultra) stay bright in dark mode (token model) rather
  than collapsing to dark panels as the old `night-role-repair.css` forced;
  they read correctly via `--feral-on-signal` text.
- Introduced `--feral-on-bright` (text/icon on always-bright acid/tang/cyan,
  never flips) and `--feral-ink-anchor` (terminal surfaces that stay dark in
  both schemes) to make dark mode a pure remap. These are the roles that
  replaced the bulk of the 174 `!important` firefight.
- Page/route/template selectors that already lived in `feral.css` were left
  there (not migrated to `pages.css`); only the standalone-file content plus
  the Style-Lab/ornament-gallery families moved, keeping the diff minimal.
  feral.css and pages.css selector sets remain disjoint, which is what the
  reorder-safety gate actually requires.
- `--feral-shadow-tone` added as the hard-shadow role (default `var(--feral-ink)`);
  existing literal `var(--feral-ink)` shadows were not rewired in Phase 0 (the
  token exists for Phase 2 presets to drive).
- `scheme-session.ts` renamed to `color-scheme.ts` (the simpler of the two
  handoff options; no merge with `theme-session.ts`).
- Registry `feral-style` item now ships `tokens.css` + `feral.css` (was
  `feral.css` alone) so installed components resolve their variables.
- Mobile-nav breakpoint behavior was preserved as-is from the live
  `navigation-structure.css` rules (collapse to the Sheet rail at ≤1100px).
  Phase 1 owns the proper breakpoint/tap-target fix.
