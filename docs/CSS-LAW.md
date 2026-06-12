# CSS LAW

Committed in Phase 0 (DISTEMPER handoff §3). Obey it forever. The cascade is
a trained animal, not a firefight.

1. **Exactly three stylesheets exist:** `tokens.css`, `feral.css`, `pages.css`.
   No new stylesheet files, ever, without amending this law first.
   - `tokens.css` — the muzzle. Every color value and the dark-scheme remap.
     It is the only file permitted to hold a color literal.
   - `feral.css` — component primitives (`.feral-*`) and the shell chrome.
   - `pages.css` — route, template, Style Lab, ornament-gallery and playground layout.

2. **Every selector has exactly one definition site.** Fixes happen at the
   definition, never as an appended override. `feral.css` and `pages.css` hold
   disjoint selector sets (verifiable: `comm -12` of their selector lists is empty).

3. **`!important` is banned.** If a fix appears to need it, stop and fix the
   conflicting rule — the conflict is the actual bug. Site-wide budget: ≤ 5,
   each carrying a comment naming the constraint that demands it. (Current
   count: 5 — one press-collapse override, four in the reduced-motion block.)

4. **No color literals outside `tokens.css`.** Components consume role tokens
   only. The substring `#fff` and the keyword `white` (as a color) must not
   appear in `feral.css` or `pages.css`.

5. **Chrome selectors** (`.site-nav`, `.site-footer`, `.mobile-control-rail`,
   `.theme-selector`, `.site-menu-button`, shell layout) are owned by the chrome
   section of `feral.css` and may never be touched from feature work.

6. **Dark mode and all themes are token values only.** A component that
   misbehaves under any theme contains a literal — by definition. The role
   layer that makes this hold:
   - `--feral-surface` / `--feral-surface-raised` — panel backgrounds (follow paper/bone).
   - `--feral-ink` — primary text/border; flips light↔dark.
   - `--feral-ink-soft` — secondary body text.
   - `--feral-on-signal` — text on a saturated signal (pink/ultra/verm/violet); dark under dark.
   - `--feral-on-bright` — text/icon on an always-bright signal (acid/tang/cyan); never flips.
   - `--feral-ink-anchor` — a surface that stays dark in BOTH schemes (code/tooltip terminals).
   - `--feral-shadow-tone`, `--feral-scrim`, `--feral-cream-tint`, `--feral-cream-sunk`.

7. **Reordering CSS imports must produce zero visual change.** This is the
   standing test that the cascade is healthy. It holds because (1) and (2)
   keep the three files' selector sets disjoint.
