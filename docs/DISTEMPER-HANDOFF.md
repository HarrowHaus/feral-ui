# DISTEMPER — BUILD HANDOFF FOR CLAUDE CODE
**Repo:** github.com/harrowhaus/feral-ui (work in this repo directly; you have permission to change anything this document requires)
**Deploy:** GitHub Pages at harrowhaus.github.io/feral-ui — inspect `.github/workflows/` to confirm the deploy trigger before assuming; a previous commit ("chore: trigger pages deploy") suggests push-to-main deploys.
**Companion reference:** `FERAL-UI-COMPETITIVE-AUDIT-2026-06-11.md` (full audit, Parts One–Six). This handoff is self-contained; the audit is background.

---

## 0. THE DECISION THIS HANDOFF EXECUTES

The library is **feral/ui**. The coined design style it canonizes is now named:

> **DISTEMPER — feral formalism for the web.**

"Controlled variance" is retired as the public style name (it may survive in code comments and the registry's internal vocabulary, but no user-facing surface says it as the name of the style; it can appear as a *description* of Distemper). The movement vocabulary, used consistently everywhere:

| Term | Means |
|---|---|
| **Distemper** | The style itself. (Real painting medium + animal disease + a temper, lost. All three meanings are intended; the manifesto says so.) |
| **the muzzle** | The token grammar — every axis of chaos is a named CSS variable |
| **bitework** | The interaction layer — trained, precise, keyboard-perfect (real dog-training term for controlled aggression) |
| **the zoomies** | Press physics and motion |
| **shedding** | Ornaments, stickers, stamps |
| **Beige** | The antagonist. Always capitalized. |

---

## 1. OPERATING RULES (read before any work)

1. **Work the phases in order.** Phase 0 is load-bearing for everything after it; do not start visual work on top of the unconsolidated cascade.
2. **One concern per commit.** Delegate the writing of every commit (staging review + message + commit) to a **Haiku subagent**; the main agent does the engineering, the subagent writes commits in conventional-commit style (`fix:`, `feat:`, `refactor:`, `docs:`, `theme:`, `test:`). Commit messages describe the change, never the struggle — any message containing "final", "force", "load last", or "override" means the change itself is wrong; stop and fix the root cause instead.
3. **Verify before every commit:** `npm run build` must pass; run the registry/smoke scripts in `scripts/` when registry items or components change.
4. **Never narrate process in public copy.** See Voice Law (§2). The words honest, fake, receipt, earned, theater are banned from every user-facing surface, file default, and registry description.
5. When something is ambiguous, prefer the smallest change that satisfies the acceptance gate, and leave a `docs/DECISIONS.md` entry (one line) rather than expanding scope.

### CSS LAW (commit as `docs/CSS-LAW.md` in Phase 0, then obey it forever)
1. Exactly three stylesheets exist: `tokens.css`, `feral.css`, `pages.css`. No new stylesheet files, ever, without amending this law first.
2. Every selector has exactly one definition site. Fixes happen at the definition, never as an appended override.
3. `!important` is banned. If a fix appears to need it, stop and fix the conflicting rule — the conflict is the actual bug. Site-wide budget: ≤ 5, each with a comment naming the third-party constraint that demands it.
4. No color literals outside `tokens.css`. Components consume role tokens only.
5. Chrome selectors (`.site-nav`, `.site-footer`, shell layout) are owned by the chrome section of `feral.css` and may never be touched from feature work.
6. Dark mode and all themes are token values only. A component that misbehaves under any theme contains a literal — by definition.
7. Reordering CSS imports must produce zero visual change. This is the standing test that the cascade is healthy.

---

## 2. VOICE LAW (commit as `docs/VOICE-LAW.md`; supersedes COPY-LAW.md, which should be deleted or archived to `docs/legacy/`)

1. **Never narrate integrity.** The site doesn't promise it isn't lying; it simply doesn't lie, silently. No surface mentions what the project *doesn't falsely claim*.
2. **Jokes punch at the components, at Beige, and at the reader's restraint — never at the project's quality or readiness.** Self-deprecation about the aesthetic is the genre; self-deprecation about competence is banned.
3. **Every technical claim rides inside a bit, stated flat.** Model: "Raised by wolves. Housebroken by Radix." Four words of joke carrying one true dependency claim.
4. **Unfinished things get absence or a status creature, never a disclaimer.** Statuses: built → **LOOSE**, basis → **IN THE ENCLOSURE**, planned → **SIGHTED**.
5. **One bit per surface.** A card gets one joke.
6. **The lore is proprietary:** the facility, the goblin, the toast pigeons, Beige, and now the Distemper glossary (§0). Reuse these; do not invent parallel lore.
7. `src/docs/component-voice.json` is the single source of component descriptions for BOTH the site catalog and the registry generator. If it currently feeds only `build-registry.mjs`, wire it into `component-catalog.ts` consumption as part of Phase 1.

---

## 3. PHASE 0 — CSS CONSOLIDATION (do first; nothing ships on top of the current cascade)

**State:** nine stylesheets; five are firefight patch layers (`mobile-nav-fix`, `navigation-structure`, `night-role-repair`, `self-labels`, `ornaments-page`) holding ~174 `!important` declarations; `.site-nav` is styled in eight of nine files; `feral.css` contains ~102 hardcoded light colors (80× `#fff`, 12× `white`, assorted cream hexes) which is the root cause of the two stacked dark-mode files.

**Tasks:**
1. Create `tokens.css`: move all `:root` tokens there; add role tokens for every hardcoded color in `feral.css` (`--feral-surface` for #fff, `--feral-surface-raised`, `--feral-ink-soft` for #333, cream-tint roles, etc.) and replace all ~102 literals with roles. Add `--feral-shadow-tone` (the role color used by hard shadows; default current value).
2. Rewrite dark mode as ONE token remap block in `tokens.css`: `[data-feral-scheme="dark"] { …token values only… }` (~30–50 lines). Preserve the current night palette *values*; then **delete `dark-mode.css` and `night-role-repair.css` entirely.** Anything that looks wrong in dark mode afterward is a remaining literal — fix the literal.
3. Fold every surviving rule from the patch files into the owning block in `feral.css` (or `pages.css` for route/template layout), then delete the patch files. Delete `overflow-x: auto` from `.site-nav` (it was clipping nav controls and caused an entire patch file); mobile navigation is the Sheet menu, desktop never needed to scroll.
4. Rename `scheme-session.ts` → `color-scheme.ts` (or merge with `theme-session.ts` into one `theme.ts` exposing `{ tokens, scheme }`). Color enters the page from exactly two places: token values and the scheme attribute.
5. Commit `docs/CSS-LAW.md`.

**Acceptance gate:** light AND dark render correctly with both deleted files gone; `grep -c '!important' src/styles/*.css` ≤ 5; `grep -cE '#fff|white' ` in component styles = 0; `.site-nav` rules exist in exactly one file; reordering imports in `main.tsx` changes nothing visually; `npm run build` passes.

---

## 4. PHASE 1 — DEFECTS & CHROME POLISH

1. **Double hero rule:** a route owns exactly one hero. Tool routes (Style Lab, Ornaments) suppress the RoutePage hero and let the feature's own header speak; catalog routes keep the wrapper hero and contain grids only. Remove the duplicated intro on Style Lab (currently "Build a look…" + "Style Lab: the whole site…" stacked).
2. **Mobile nav breakpoint:** the phone currently renders the desktop nav (six links + search + GitHub at sub-44px tap targets). Fix the breakpoint so MobileNavControls/Sheet menu engages on narrow + coarse-pointer viewports.
3. **Nav right cluster:** GitHub mark icon only (`aria-label="GitHub"`, kill the "GH GitHub" stutter); search shows the ⌘K hint on desktop only, icon-only on touch; **add the scheme toggle to the nav** (it currently isn't reachable anywhere in the chrome); version badge from package.json stays.
4. Unknown routes/slugs everywhere → NotFound (verify docs slugs no longer silently impersonate other pages).
5. Wire `component-voice.json` into the site catalog (Voice Law rule 7).
6. Style Lab micro-fixes: arch panels get top padding ≥ 0.4× their top radius (copy currently clips into the curve) or flatten the arch < 720px; the eyebrow badge aligns to the content column (no half-bleed); preset chips become an equal-width grid with a 3-dot palette preview per chip; color rows become swatch + hex + native color input (they currently read as progress bars); slider labels = name left, value right, with the bit rendered AS the value at poles ("radius: 999 — pill outbreak", "tilt: 0 — sedated"); right column stacks session card → operable specimen strip (button, input, badge, toast trigger) → CSS output with copy; add a visible "Reset to Default Feral".

**Acceptance:** at 360px the nav is a Sheet menu with ≥44px targets; one hero per page; scheme toggle operable from chrome; no clipped copy in the Lab; Lab CSS export reachable without scrolling a void.

---

## 5. PHASE 2 — PRESET REPLACEMENT + DISTANCE LINT (depends on Phase 0 tokenization)

Replace the current 11 presets (which share one fixed hue scheme — eleven presets, zero hue decisions) with these ten. Values: cream/ink, then pink/acid/ultra/cyan/tang, then border(px)/radius/tilt(deg)/pattern(%)/contrast.

| Preset | cream / ink | pink / acid / ultra / cyan / tang | b / r / t / p / contrast |
|---|---|---|---|
| Default Feral | #fff4e0 / #0a0a0a | #ff2d9b / #bfff00 / #3d2bff / #00e5ff / #ff8a00 | 4 / 10 / 1.5 / 45 / standard |
| Ransom Note | #f2f2ee / #000000 | #ff0040 / #e8e8e0 / #1a1a1a / #bdbdb5 / #ff0040 | 6 / 0 / 2.6 / 85 / grit |
| Pool Party Violence | #e8fbff / #002033 | #ff3d00 / #00ffc8 / #0051ff / #00e5ff / #ffd500 | 3 / 999 / 1 / 25 / standard |
| Riso Misprint | #fff6ec / #1d1aa3 | #ff5f1f / #ff5f1f / #1d1aa3 / #1d1aa3 / #ff5f1f | 4 / 6 / 1.8 / 90 / grit |
| Midnight Shift | #12101c / #f4f1ff | #ff7ad9 / #d4ff4f / #8c7bff / #5ef2ff / #ffb14d | 4 / 10 / 1.5 / 35 / standard |
| De Stijl Tantrum | #f7f7f2 / #111111 | #e10600 / #ffd400 / #0033cc / #0033cc / #e10600 | 8 / 0 / 0 / 0 / standard |
| Swamp Cabinet | #efe8d3 / #1c1a12 | #c84b1f / #9aa825 / #3f5d3a / #7fae9e / #b8860b | 5 / 2 / 1.2 / 60 / grit |
| Waiting Room | #ffffff / #2b2b2b | #ffb3d9 / #d6ff9e / #b3b9ff / #aef4ff / #ffd9a8 | 2 / 14 / 0.4 / 6 / quiet |
| Hazard Pay | #ffc800 / #0a0a0a | #ff2d00 / #ffffff / #1a1aff / #e8e8e8 / #ff2d00 | 7 / 0 / 1 / 50 / high |
| VHS Séance | #1f0a24 / #ffe9f8 | #ff36c7 / #7dff5e / #b14dff / #4dfff0 / #ff9e4d | 4 / 8 / 2 / 70 / grit |

Notes: keep pressure/density/motion per nearest current analog or sensible mid values; set `--feral-shadow-tone` per preset where it strengthens the school (Riso → its second ink #1d1aa3; Hazard → #ff2d00; De Stijl → pure black). Midnight Shift and VHS Séance are **polarity presets** (dark paper): decide and implement the rule that a polarity preset suspends the scheme toggle while active (the preset *is* a polarity); document the rule in DECISIONS.md. Run a contrast check on every preset's ink-on-cream and badge text combinations; adjust values minimally to clear WCAG AA for body text.

**Distance lint:** add `scripts/preset-distance.mjs` run in the smoke/CI path: compute pairwise preset distance (hue-angle deltas across the seven roles + normalized geometry deltas) and FAIL if any pair is too close. Encode: a preset must move ≥4 of 7 hues by ≥40° OR flip polarity OR collapse palette arity, AND move ≥3 geometry axes by ≥40% of range, relative to every other preset.

**Acceptance:** all ten presets selectable, site-wide, persistent; the lint passes and demonstrably fails if a near-duplicate is added; dark-paper presets render correctly (proof Phase 0 held).

---

## 6. PHASE 3 — SECOND NAVIGATION LEVEL + LAYOUT ARCHETYPES

1. Top nav shrinks to **Docs · Components · Templates** + icon cluster (search, GitHub, scheme toggle, version).
2. Build the persistent grouped sidebar (resurrect/replace the orphaned `docs-shell.tsx`) used by all Docs and Components routes: **Getting started** (Install, Theming, Accessibility, Molt Log, Distemper manifesto) / **Style** (Style Lab, Ornaments) / **Creatures** (components grouped by layer with status-creature badges) / **Surfaces** (Blocks, Templates). Breadcrumb on top; prev/next pager stays.
3. Declare three layout archetypes and assign every route exactly one: **MARKETING** (home: full-bleed sections, no sidebar), **CATALOG** (indexes: wrapper hero + grid + pager), **TOOL/DOC** (sidebar + feature-owned single header + content + pager). Encode the archetype in the route table so it's enforced, not remembered.

**Acceptance:** every page reachable within two clicks from anywhere; component detail shows sidebar + breadcrumb + pager; no page renders two heroes; route table declares archetypes.

---

## 7. PHASE 4 — THE DISTEMPER MANIFESTO (the category play)

New route `#/docs/distemper` (also linked from the homepage Doctrine section: "Read the manifesto"). This page is the citable definition of the style — the page other people link when they call something Distemper. Copy below is final draft; light edits for fit are allowed, voice changes are not.

---

### DISTEMPER
**Feral formalism for the web.**

**dis·tem·per** (n.) — 1. A painting medium older than oil: pigment bound in glue, used for centuries before anyone decided art needed to be calm. 2. A disease of undomesticated animals. 3. What your design system has now.

Distemper is what happens when formalism gets bitten. Every surface obeys a strict grammar — the borders are real, the shadows are honest, the focus ring is the loudest thing in the room — and inside that fence, every component is allowed exactly one act of violence. A tilt. A clash. A chromatic shadow. Never two.

This is not chaos. Chaos is cheap and Beige loves it, because chaos discredits the alternative. Distemper is a leash long enough to be interesting.

**The anatomy:**
- **The muzzle.** Every axis of wildness is a named token. Re-tint the entire habitat from one file. If you can't re-skin it in one move, it isn't Distemper — it's just loud.
- **Bitework.** The interaction layer is trained, not tame. Keyboard-perfect, focus-visible, screen-reader boring. Controlled aggression is still control.
- **The zoomies.** Motion is press physics: things depress, lift, and settle like objects with mass. Respect reduced-motion. The zoomies are optional; the mass is not.
- **Shedding.** Stickers, bursts, stamps, and scribbles are components, not decoration. The sticker sheet has a changelog.
- **One broken rule per creature.** The whole doctrine in six words.

**Is it Distemper? The field test:**
1. Hard borders — no gradient pretending to be an edge.
2. Hard offset shadows, zero blur. Shadows may have a color and an opinion.
3. Exactly one convention violated per component.
4. Tokens govern every axis of variance; the whole surface re-tints from one file.
5. Focus states are the clearest states.
6. Paper backgrounds with visible grain or pattern.
7. Loud display type over workmanlike body type.
8. Ornaments shipped as first-class components.
9. Interaction behavior that would pass in a payroll portal.
10. Not Beige. Not even ironically.

Score eight or better and you may call it Distemper. Score ten and the facility will send a sticker.

*Reference implementation: feral/ui. MIT licensed. Raised under duress.*

---

**Acceptance:** route live, linked from home and sidebar; OG/meta title for the page reads "Distemper — feral formalism for the web" once per-route meta exists.

## 8. PHASE 5 — RESUME THE BACKLOG (in this order)
1. **Playground rollout:** the button/badge/card playground pattern across the catalog (generate controls from the variant type unions; live-rewriting code block with copy).
2. **Tier A component depth:** Sidebar (provider, expanded/rail/Sheet-on-mobile, ⌘B, persisted state, group/menu primitives), Form (id/aria wiring, FormMessage, ErrorSummary focus links, submit states — adopt react-hook-form via thin adapter), Chart (adopt Recharts; ChartContainer themed by tokens: 3px ink strokes, hard SVG-filter shadows in `--feral-shadow-tone`, pattern fills; ship bar/line/area/pie/radar demos on a new `#/charts` route added to the sidebar), Toast hardening (live region, stacking, hover-pause, swipe dismiss, action slot — pigeons copy stays).
3. **Blocks:** dashboard family first (it forces the Tier A depth), then marketing, auth, content, commerce — each block 60–250 lines, mobile-safe at 360px, tokens only, registered as `registry:block`, consumed by ≥1 template.
4. **Template exit ramps:** per-template installable item or build-time zip + "Take it home" action; template-mode fresh-app smoke in CI.
5. **Ornament corrections:** rename FeralPointerHand→FeralHand, FeralSkullBubble→FeralGhost, FeralSplatSmall→FeralSplatAlt, FeralNoiseBadge→FeralStatic, FeralReceiptTag→FeralTag, FeralReceiptStamp→FeralLooseStamp; stamp defaults: "DO NOT FEED" (base), "GOOD CREATURE", "LOOSE", "CONTAINMENT BREACH", "BITES", "SIGHTED"; keep old names as deprecated aliases for one version; fix the unused `label` prop leaking onto `<svg>`.
6. **SEO/OG pass:** per-route titles exist — add per-route meta description + one OG card image; implement the GitHub Pages 404-redirect or prerender trick so routes get real URLs.
7. **Chrome self-labeling:** small "this is `<Command/>` →" chips on chrome elements (search, Sheet menu, theme toggle, toasts), linking to the component's page.

## 9. STANDING DEFINITION OF DONE (every phase)
Build passes; smoke scripts pass; no new stylesheet files; `!important` count unchanged or lower; no banned vocabulary introduced; component-voice.json remains the single description source; one concern per commit, committed by a Haiku subagent; deploy verified live (the repo has previously drifted ahead of the deployment — confirm the Pages build actually shipped after each phase).
