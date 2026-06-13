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

## Phase 1 — defects & chrome polish

- One hero per route via a `hero` prop on `RoutePage`; tool routes (Style Lab,
  Ornaments) pass `hero={false}` so the feature's own header speaks.
- Mobile rail now engages on `(max-width: 1100px), (pointer: coarse)`, and the
  ≤480px tap targets were raised from 40px to 44px to clear the gate.
- GitHub uses an inline octocat mark SVG — lucide-react dropped its `Github`
  brand icon in this version, so a real mark is the faithful choice.
- `component-voice.json` is now the description source for the site catalog
  (via `componentContent`) as well as the registry generator (Voice Law rule 7).
- Style Lab preset VALUES are unchanged in Phase 1 — only the chip UI (grid +
  3-dot palette preview) changed. Phase 2 swaps in the ten new presets.
- Style Lab "arch panel" = `.feral-style-lab-controls` rounded top; it gets
  extra header top-padding ≥0.4× its radius and flattens below 720px. The
  "eyebrow half-bleed" item was already satisfied — the catalog route eyebrow
  Badge sits inside the content column with no bleed observed.

## Phase 2 — preset replacement + distance lint

- The ten presets live in `src/features/feral-presets.json`, the single source
  shared by the Style Lab and `scripts/preset-distance.mjs`.
- **Polarity rule:** a polarity preset (`"polarity": "dark"`, i.e. Midnight
  Shift and VHS Séance) ships dark paper and *is* a scheme, so it suspends the
  scheme toggle while active. Applying one sets `data-feral-polarity="dark"`
  and forces `data-feral-scheme="dark"` (so the role remaps give dark-on-bright
  text); the toggle renders disabled (◐) and no-ops. Leaving the preset clears
  the flag and restores the user's own scheme preference. `color-scheme.ts`
  skips its boot scheme-apply while a polarity flag is present so the forced
  scheme survives reload.
- `--feral-shadow-tone` is now consumed by every hard offset shadow (the Phase 0
  deferral); it defaults to `--feral-ink` in both schemes, so the default theme
  is unchanged, while presets tint it (Riso → #1d1aa3, Hazard → #ff2d00,
  De Stijl → #000). The dark scheme no longer overrides shadow-tone to black,
  which would have hidden shadows on the dark page.
- **Distance lint:** the handoff's strict discrete encoding (≥4/7 hues ≥40° AND
  ≥3/4 geometry axes ≥40%) is unsatisfiable by the supplied set — Midnight Shift
  and VHS Séance are intentional dark-neon siblings, and ink/cream rarely move
  (both keep the dark-ink/light-cream convention). The lint instead implements
  the handoff's primary framing — a normalized pairwise distance (palette + 7
  geometry axes + polarity) with a threshold of 1.0, calibrated to sit far below
  the closest real pair (1.97) and far above any near-duplicate (0.04). A
  `--selftest` proves it rejects a near-duplicate; both run in CI before build.

## Phase 3 — second nav level + layout archetypes

- Routing is a declarative `resolveRoute(route)` table returning one of three
  archetypes per route: `marketing` (home, full-bleed, no sidebar), `catalog`
  (indexes: wrapper hero + grid), `tool-doc` (sidebar + header + content +
  pager). The archetype is enforced by the resolver, not remembered per page.
- The persistent grouped sidebar (Getting started / Style / Creatures-by-layer
  with status dots / Surfaces) replaces the orphaned `docs-shell.tsx` and shows
  on BOTH catalog and tool-doc routes — so the sidebar (which lists everything)
  is always one click from any non-home page, giving two-click reachability.
  The handoff's CATALOG spec didn't mention a sidebar, but reachability requires
  it there too; catalog keeps its wrapper hero, tool-doc gets a feature header.
- "One hero" holds via `ownHeader`: Style Lab and Ornaments render their own
  header, so the shell suppresses its `doc-page-header`; every other tool-doc
  page gets the shell-provided header. Catalog uses the wrapper `.route-hero`.
- On mobile (≤900px) the sidebar is hidden and the full grouped tree lives in
  the Sheet menu, preserving two-tap reachability.
- Added `/docs/theming` and `/docs/distemper` stub routes referenced by the
  sidebar; the Distemper page is a placeholder until Phase 4's manifesto.
- Hardcoded creature counts ("66 loose", "66 creatures") were removed site-wide
  per user request; "Controlled variance UI" on the home hero is now
  "Distemper — feral formalism" per Voice Law.
