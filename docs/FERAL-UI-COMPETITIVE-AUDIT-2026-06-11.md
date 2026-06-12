# FERAL/UI COMPETITIVE AUDIT — v0.7 deployed build vs neobrutalism.dev
**Date:** 2026-06-11
**Subject:** https://harrowhaus.github.io/feral-ui/#/ (source: github.com/harrowhaus/feral-ui)
**Comparator:** https://www.neobrutalism.dev (ekmas/neobrutalism-components, ~5.1k GitHub stars)
**Method:** Full source clone + static analysis + live-site fetch of both properties.

---

## 0. Headline findings

1. **Your hosted registry is already live and you don't know it.** `https://harrowhaus.github.io/feral-ui/r/button.json` returns HTTP 200 with valid shadcn registry-item schema. The "public install commands become allowed only after remote registry install tests pass" gate in your own docs is now one smoke test away from being satisfiable. This is the single highest-leverage unlock in the whole audit.
2. **The deployed site is the real Vite app, not the static fallback.** Your v0.8 "Pages deployment law" is satisfied. The bundle (`/feral-ui/assets/index-*.js`) is the dogfood app.
3. **Component breadth is at parity-plus; component depth is not.** 66 component files vs neobrutalism's ~45-ish shadcn-derived set. But your 66 files total only 2,090 lines (~32 lines average), and ~55 of 66 catalog entries carry auto-generated boilerplate notes. Breadth is won. Depth, docs content, and proof are the war.
4. **Three adoption blockers are absolute, cheap, and non-design:** no LICENSE file, no dark mode (zero references in the entire codebase), and hash routing that destroys per-page SEO/social previews. Neobrutalism has all three solved and they are table stakes, not differentiators.
5. **You have four genuine moats neobrutalism doesn't have:** Style Lab (live theme generator with CSS output), the Ornament Pack, eight live template *routes* (theirs are external repos), and the honesty/receipts doctrine as brand voice. These should be promoted, not buried mid-page.

---

## 1. State of the live site (harrowhaus.github.io/feral-ui)

**What's deployed:** React/Vite SPA, hash-routed (`#/`, `#/docs`, `#/components/:slug`, `#/blocks/:slug`, `#/templates/:slug`, `#/templates/:slug/preview`, changelog, installation, accessibility, style-lab routes). Google Fonts: Bricolage Grotesque + Space Grotesk. Title/meta: "feral/ui — controlled variance components."

**Homepage section inventory (in order):** Nav → Hero → Component Collage → Doctrine → Behavior Lab → Forms & Data → Component Docs strip → Toast demo → Blocks → Template Browser → Kitchen Sink → Productization Lab → Nth Components → Competitive Audit → Matrix → Blueprint → Repo → Footer. That is a *seventeen-section* homepage. Neobrutalism's homepage is seven: hero, marquee, four-card value props, customization demo with live theme buttons, joke testimonials, FAQ, CTA. Yours demonstrates more but argues less — several sections (Productization Lab, Matrix, Blueprint, Competitive Audit) are internal roadmap material leaking into the public sales surface. A first-time visitor cannot tell the product from the project log.

**Verified strengths of the deployment:**
- Skip link, `feral-sr-only`, global dashed `:focus-visible` ring, 11 media queries, reduced-motion handling — the accessibility *scaffolding* is real, matching your Copy Law.
- The press-motion transform bug from the static seed is genuinely fixed (composed `translate()` + `rotate()` via custom properties).
- `public/r/*.json` ships with the build → 72 registry item files are publicly fetchable right now.

**Verified weaknesses of the deployment:**
- **Hash routing = one URL forever.** `#/components/button` is invisible to crawlers, link unfurlers, and OG scrapers. Every neobrutalism component page has its own URL, title, and meta description (verified on their accordion page). On GitHub Pages you can fix this with a 404.html SPA-redirect trick or by pre-rendering routes at build time — no server needed.
- **No favicon/OG image pipeline observed.** Neobrutalism ships `preview.png` OG cards and full Twitter card meta. Sharing your link on any platform produces a naked text link.
- **No search.** You ship a cmdk `Command` component but it is not wired into the site nav. Neobrutalism's nav has "Search documentation… Search for a command to run" as a first-class element.
- **No GitHub link/star badge in nav.** Their 5.1k star count is rendered in the header as social proof and a contribution funnel. Your repo link lives in a footer-adjacent section.

---

## 2. The library itself — inventory and honest depth grading

### 2.1 Inventory
- **66 UI component files** in `src/components/ui/` + index.
- **5 block files** (auth, content, dashboard, docs, marketing) — but they total only **131 lines combined** (15–36 lines each).
- **8 template routes** via `template-catalog.tsx` (61 lines) + `template-previews.tsx` (149 lines) — ~26 lines of preview per template.
- **Style Lab** (243 lines): presets, sliders, color controls, live preview, CSS output. Real feature.
- **Docs shell** (162 lines), component catalog (66 entries with slug/layer/status/file/snippet/deps/accessibility fields).
- **72 registry items**, all `$schema: https://ui.shadcn.com/schema/registry-item.json`, with inlined file content and a `feral-style` registry dependency. Plus `registry.json` index, build script, two smoke scripts (structural + fresh-app materialization).
- **17 docs/ markdown files** — build logs v0.2→v0.7, audits, competitive reassessment, style grammar, copy law, Radix layer notes, v0.8 execution plan. This internal paper trail is unusually good; most public libraries have nothing like it.

### 2.2 Depth grading (line counts as proxy, spot-checked)

| Tier | Components | Assessment |
|---|---|---|
| **Real** | data-table (176), calendar (142), style-lab, ornaments, button, card, combobox/command (cmdk-backed), the 15 Radix-wrapped overlays/menus | Genuine behavior. Calendar handles single+range modes, range sorting, disabled dates. DataTable claims sort/filter/pagination/selection/empty/loading. |
| **Thin but legitimate** | badge, kbd, separator, skeleton, spinner, toggle (13), tooltip (19), etc. | Small is correct for these; shadcn's equivalents are also small. |
| **Thin where thin is a problem** | **chart (28 lines)**, **form (23)**, **sidebar (54)**, sonner/toast (basis), resizable (basis), carousel (basis) | Package.json v0.7 description claims "hardened calendar, date range picker, toast provider, carousel controls, sidebar behavior" — calendar earns it; chart, form, and sidebar do not. Neobrutalism has an entire **Charts** nav section (Recharts-themed). Your chart.tsx cannot back a charts page. shadcn's sidebar is one of its most-adopted components and runs to many hundreds of lines (collapsible, mobile sheet mode, keyboard shortcut, persisted state); yours is a 54-line layout shell. |

### 2.3 The docs-content problem (biggest internal gap)
~55 of 66 catalog entries have the literal generated string "*source item generated from local UI inventory. Page must show preview, code, dependencies, and receipts*" as their public-facing description, and most accessibility receipts are one of two copy-pasted sentences. Only button, card, calendar, data-table, dialog, date-picker, sonner, and ornaments have bespoke notes. So the component pages *exist* (good — that's ahead of where most projects die) but read as scaffolding. Your own Copy Law says "the docs need receipts" — right now the docs have placeholders for receipts.

Compare the neobrutalism component page anatomy (verified on /docs/accordion): description → link to upstream shadcn docs → Preview/Code tabs with a working demo → Installation with **CLI and Manual tabs × pnpm/npm/yarn/bun** → Usage (import block + example) → prev/next pagination. Your component page has: hero with status/file badges, a preview, and CodeTabs with usage snippet / source path / local registry paths. Missing relative to theirs: working copy-paste import blocks, install command (now unlockable, see §4), manual-install tab, prev/next navigation, and real prose.

---

## 3. Side-by-side matrix

| Surface | feral/ui (v0.7 deployed) | neobrutalism.dev | Verdict |
|---|---|---|---|
| Component count | 66 files + 5 blocks + 8 templates | ~45 shadcn-derived + charts | **Feral wins breadth** |
| Component depth | ~32-line avg; chart/form/sidebar stubs | shadcn-grade (inherits upstream hardening) | **Neo wins** |
| Install path | Local clone only (per site copy) — but registry JSON is live | `pnpm dlx shadcn@latest add https://neobrutalism.dev/r/x.json`, 4 package managers, manual tab | **Neo wins today; flippable this week** |
| Styling base | Custom CSS token grammar (no Tailwind) | Tailwind + shadcn conventions | **Trade-off** — see §5 |
| Theming | Style Lab: live generator w/ CSS export | Styling page: preset palettes, "try blue/green/orange/violet" | **Feral wins** (generator > presets) |
| Dark mode | **None (0 refs)** | Full toggle, site-wide | **Neo wins, hard** |
| Charts | 28-line stub | Dedicated Charts section | **Neo wins** |
| Templates | 8 live routes inside the app, isolated preview routes | Template links (external repos/deploys) | **Feral wins** (live > linked) |
| Blocks | 5 thin blocks (15–36 lines) | N/A as such | Feral, weakly |
| Ornaments | 40+ exports — unique category | None | **Feral moat** |
| Docs search | Command component exists, not wired | cmdk palette in nav | Neo wins |
| SEO/sharing | Hash routes, one URL, no OG | Per-page URLs, full OG/Twitter cards | **Neo wins, hard** |
| License | **No LICENSE file** | MIT, stated in footer | **Blocker for feral** |
| Social proof | Joke testimonials (shared gag — they did it first: "I want to vomit," "This library is complete garbage") | Same gag + 5.1k real stars + Showcase page of real adopters | Neo wins (real proof layered under the joke) |
| Accessibility posture | Honest tiering (built/basis), real focus/skip/reduced-motion, Radix where claimed | "Adheres to WAI-ARIA" via shadcn inheritance | **Feral's honesty framing is stronger**, but needs the audits it promises |
| Internal engineering docs | 17 files: build logs, audits, smoke scripts | Public changelog | **Feral wins** (turn this outward) |
| Brand category | "Controlled variance" — owned term, not a child style | "Neobrutalism" — owns the established term | Different games; yours requires coining the category (your stated goal) |

---

## 4. The registry finding, spelled out

Your README and site both say public install commands stay banned "until remote registry install tests pass." The remote half already exists:

- `GET https://harrowhaus.github.io/feral-ui/r/button.json` → **200**, valid shadcn registry-item JSON with inlined source and `registryDependencies: ["feral-style"]`.

What remains to honestly flip the switch: run the shadcn CLI against the **hosted** URL (not the local file) in a fresh Vite+React app and confirm materialization — i.e., a hosted-mode version of your existing `smoke:fresh-app` script. Two caveats to test for: (a) whether `feral-style` resolves correctly as a registry dependency over the network, and (b) whether the `src/components/ui/...` target paths in the items map sanely onto a consumer app's structure (shadcn registries usually target `components/ui/...` and rely on the consumer's alias config — your relative `../../lib/cn` import inside file content may need to become an alias import to survive transplantation). If that hosted smoke passes, your Installation page goes from "no fake install theater" to a real one-liner — the exact adoption mechanic that built neobrutalism — while your honesty doctrine stays intact because you'll have the receipt.

---

## 5. The Tailwind question (structural fork in the road)

Neobrutalism rides the shadcn/Tailwind ecosystem: every consumer already has the toolchain, upstream improvements flow in for free, and the audience self-selects. Feral is a self-contained CSS token grammar (`feral.css`, 1,023 lines) with data-attribute variants instead of class-variance-authority. Consequences:

**Costs:** you forfeit the "drop into my existing shadcn app and it just matches" adoption path; Tailwind-native users must carry a parallel stylesheet; you re-implement what shadcn hardens upstream (sidebar, form, chart are exactly where this shows).

**Benefits:** single-import theming (Style Lab outputs one CSS file — genuinely cleaner than Tailwind config surgery), framework-portability of the visual system (the grammar could ship for vanilla HTML, Vue, Svelte later), and the variant API (`data-tone`, `data-shape`, `tilt`) is more legible than utility soup.

Recommendation: don't convert. **Document the choice as doctrine** ("why feral is not a Tailwind theme") on a dedicated page, and ensure the registry install story works regardless — registry items can ship CSS deps. The one concession worth considering: a thin `tailwind-bridge` registry item exposing feral tokens as Tailwind theme variables, so shadcn-app users can adopt incrementally. That neutralizes the ecosystem objection without surrendering the grammar.

---

## 6. Component gap list vs the shadcn/neobrutalism canon

**Present in feral, absent or external in neobrutalism:** avatar-group, banner, button-group, callout, code-block, code-tabs, copy-button, data-table (as shipped component), empty-state, file-upload, image-card, kbd, marquee (as component), meter, otp-input (they demo OTP but via input-otp), preview-frame, stat-card, stepper, theme-selector, timeline, ornaments, style-lab. **This is a real breadth lead.**

**Present in the canon, missing or under-built in feral:**
- **Drawer** (vaul-style bottom sheet) — you have Sheet, but mobile drawer is a distinct, heavily-used pattern.
- **Collapsible** — trivial, expected.
- **Input-OTP–grade OTP** — yours exists; verify paste/auto-advance/screen-reader behavior matches the canon.
- **Toast** — sonner.tsx is a self-described basis; either harden the custom provider (live region, stacking, swipe-dismiss, action buttons) or actually adopt sonner.
- **Chart system** — the canon ships a Recharts wrapper + a charts gallery. Your 28-line stub can't support a Charts nav item, and "loud" chart styling (thick strokes, hard shadows, pattern fills) is arguably the most *visually ownable* surface for controlled variance that you haven't built.
- **Sidebar** — needs collapsible/mobile/persisted modes to earn the package.json claim.
- **Form** — 23 lines vs the canon's react-hook-form integration with field-level error wiring. Your ErrorSummary instinct is good and differentiating; it needs the plumbing.
- **Resizable, Carousel** — both marked basis; carousel controls are claimed in v0.7 copy.
- **Drawer/Select (styled)** — you use native `<select>`; fine and honest, but the canon ships a Radix Select and users will ask.

**Site features missing vs neobrutalism.dev:** dark mode toggle, docs search palette, Showcase page, Charts page, Stars/social-proof surface, per-page SEO/OG, install tabs (pnpm/npm/yarn/bun + manual), upstream-reference links, prev/next pagination on docs pages, LICENSE + contribution docs (FAQ "How to contribute?" is part of their funnel).

---

## 7. What feral should NOT copy

- **Their homepage minimalism past the point of argument.** Your collage-first instinct is correct and your own AUDIT.md identified why: a UI library must demonstrate itself through real surfaces. Cut the roadmap-leak sections, keep the demonstration density.
- **The testimonial gag as-is.** You both run the self-deprecating fake-testimonial bit; they shipped it first and yours reads as derivative to anyone who's seen theirs. Your Copy Law ("fake social proof... banned") actually forbids the *sincere* version — lean into a feral-specific replacement: fake *complaint tickets*, fake *HOA violation notices* about the colors, anything that isn't the same joke.
- **"Based on shadcn/ui" positioning.** Your locked category is controlled variance; the brand framing in AUDIT.md ("no longer framed as a child of another style") is the right call and the site holds that line.

---

## 8. Prioritized execution graph (slots into V0.8-EXECUTION.md)

**P0 — adoption blockers, near-zero design cost**
1. Add LICENSE (MIT unless you have reasons). Without it, nobody can legally use anything, and the registry endpoint being live makes this urgent rather than theoretical.
2. Hosted-registry smoke test (shadcn CLI vs the live Pages URL, fresh app). Fix import-alias/path mapping in generated items if needed. On pass: flip the Installation page to the real one-liner with pnpm/npm/yarn/bun tabs + Manual tab.
3. SPA-redirect or prerender pass so `#/components/button` becomes `/components/button` with per-route `<title>`, meta description, and an OG image. Add favicon + `preview.png`-style social card.

**P1 — credibility surfaces**
4. Dark mode. The token grammar makes this cheaper than it would be for most: a `[data-feral-scheme="dark"]` block remapping ink/cream/paper/muted, plus a nav toggle, plus Style Lab support. Its absence is the most visible single gap vs neobrutalism.
5. Docs content pass: replace the 55 boilerplate catalog notes with bespoke two-sentence descriptions + real accessibility receipts; wire the existing Command component into the nav as docs search; add prev/next.
6. Harden the three components whose claims outrun their code: sidebar, form, toast. De-claim or deliver.

**P2 — moat amplification**
7. Charts: Recharts (or uPlot) wrapper themed in the grammar — thick strokes, ink borders, pattern fills, chromatic shadows — plus a Charts route. This is simultaneously a gap-close and the most visually differentiating surface available.
8. Template depth pass per your existing v0.8 spec (3–6 real sections each, mobile-safe). The architecture already beats neobrutalism's external-repo approach; depth converts that to a visible win.
9. Promote Style Lab and Ornaments to top-level nav items with their own landing arguments. They are the two features the competitor cannot match and they're currently discoverable only by exploration.
10. Showcase/Stars equivalent: even pre-community, a "built with feral" page seeded with your own Harrow Haus properties starts the loop honestly.

**P3 — category play**
11. A manifesto route defining *controlled variance* as a named style (the neobrutalism.dev playbook was: own the term, be the canonical reference). Your STYLE-GRAMMAR.md is most of the raw material; it needs a public, linkable, citable form — that's what gets a style named after your site instead of the reverse.
12. Optional `tailwind-bridge` registry item (per §5) to capture shadcn-ecosystem users without converting.

---

## 9. Bottom line

Feral/ui v0.7 is past the dangerous phase where most "new design system" projects die (static mockup pretending to be a library). The deployed site is the real app, the component vocabulary outnumbers the competitor, the registry plumbing is not only built but accidentally already in production, and the internal engineering discipline (build logs, smoke tests, copy law) exceeds what neobrutalism publishes. The gaps are concentrated and legible: three table-stakes blockers (license, dark mode, SEO-capable routing), one switch to flip (hosted install), three components whose marketing outruns their code (sidebar/form/chart-or-toast), and a docs-content pass to replace scaffolding text with receipts. Close P0+P1 and the honest comparison stops being "promising local source basis vs established library" and becomes "two installable libraries, one of which has a theme generator, an ornament system, live templates, and a category of its own."

---
---

# PART TWO — REVISIONS & BUILD DIRECTIVES (v2, same day)
**Status:** Supersedes Part One wherever they conflict. Specifically: §0 finding 5 and §7 praised the "honesty/receipts doctrine" as a brand moat. **Owner has rejected that voice.** It is hereby reclassified from moat to liability. New voice law in §13. Everything below is written as build directives for the executing agent.

---

## 10. Live template routes vs external template repos — full answer

**The question:** feral serves 8 templates as live routes inside the dogfood app; neobrutalism links out to separately-deployed template repos. Which is better?

**Answer: they solve two different jobs, and the winner depends on which job. Feral currently wins the wrong one by default.**

**Job 1 — Demonstration ("show me this style can build a real app").** Live routes win decisively. Zero friction: one click from the docs, no context switch, no separate deploy to rot. They're theme-reactive: when Style Lab re-skins the tokens, every template re-skins with it — an external repo screenshot can never do that. They're dogfood proof: the templates import the same components the docs sell, so the demonstration cannot drift from the product. And they're maintained for free: one build, one deploy, no N separate repos drifting out of date (neobrutalism's external templates are pinned to whatever component versions they were built with; staleness is structural for them).

**Job 2 — Adoption ("give me a starting point I can own").** External repos win, and this is the job that converts visitors into users. A repo is clonable: `git clone`, `npm install`, ship. It proves the library works *outside its own house* — in a fresh toolchain, with real routing, real build config. A live route inside your SPA cannot be cloned; the visitor admires it and leaves with nothing. Neobrutalism's templates are weaker demos but stronger products.

**Directive: keep the live routes, add the exit ramp.** The architecture already supports both because templates are composed from blocks and blocks are registry items:
1. Each template gets a `registry:block`-composed template item (or a generated zip) so the template is *installable/downloadable*, not just viewable.
2. Each template route gets a "Take it home" action: the install command (now that the hosted registry is live, §4) or a zip download generated at build time by a script alongside `build-registry.mjs`.
3. The fresh-app smoke script gains a template mode: materialize template X into a clean Vite app, build it, fail CI if it breaks. That makes the clonable artifact trustworthy without ever saying the word "trustworthy" in public (see §13).

**Acceptance:** every template route renders live AND produces a verified, downloadable starter. That combination is something neither shadcn's paid templates nor neobrutalism's external repos currently offer in one motion. That's the actual flex.

---

## 11. Component depth plan — per-component acceptance criteria

Ordering principle: depth goes first to components that (a) are claimed in v0.7 marketing copy, (b) carry whole site sections (charts), or (c) are the highest-traffic patterns in the canon (sidebar, form, toast). "Adopt" means wrap the canonical library in feral chrome — same play shadcn runs; do not hand-roll solved problems.

### Tier A — claims that must be backed (build first)

**Sidebar — target 300–500 lines (currently 54).**
- `SidebarProvider` with context; controlled + uncontrolled open state.
- Three display modes: expanded, icon-rail collapsed, hidden.
- Mobile breakpoint behavior: below 768px the sidebar becomes the existing Sheet component (reuse, don't duplicate).
- Keyboard shortcut (Cmd/Ctrl+B) to toggle; state persisted (localStorage).
- Structure primitives: `SidebarHeader/Content/Footer/Group/GroupLabel/Menu/MenuItem/MenuButton/MenuSub`, active-item state, badge slot.
- A11y: nav landmark, `aria-current` on active item, focus order survives collapse.
- Done when: the dashboard template and the docs shell both run on it, at 360px and 1440px.

**Form — target 150–250 lines (currently 23).**
- Field wiring: auto-generated ids, `aria-describedby` chaining label→help→error, `aria-invalid` on error.
- `FormMessage` (per-field error) + existing `ErrorSummary` upgraded: each summary entry is a link that moves focus to the offending field.
- Submit states: pending (button spinner slot), success, error.
- Either integrate react-hook-form via a thin adapter (canon-compatible, recommended) or ship a minimal validation context — pick one, don't half-build both.
- Done when: auth blocks (§12) run real validation through it.

**Chart — target: real system, ~200 lines core + per-chart demos (currently 28).**
- Adopt Recharts. Build `ChartContainer` that injects the feral theme: 3px ink strokes, hard offset shadows (SVG `<filter>` drop-shadow, no blur), pattern fills for series (dots/stripes/check — the patterns already exist in CSS, port them to SVG `<pattern>`), series palette acid→pink→ultra→tang→cyan.
- Styled tooltip (feral card chrome) and legend.
- Ship demos: bar, stacked bar, line, area, pie/donut, radar — 8–12 total on a new `#/charts` route (closes the nav-parity gap from §3 and is the most ownable visual surface in the entire backlog; nobody has loud charts).
- Done when: the dashboard template's stat panels use it.

**Toast — target 150–250 lines (currently a basis).**
- Decide: harden the custom provider (preferred — it's brandable) with `role="status"`/`aria-live="polite"` region, stacking with max-visible + overflow count, timer pause on hover/focus, click + swipe dismiss, action button slot, optional promise helper.
- The pigeon copy stays. The pigeons are canon now.

### Tier B — canon gaps (adopt + chrome)

- **Carousel:** wrap embla-carousel. Prev/next feral buttons, dot indicators, keyboard arrows, `aria-roledescription="carousel"`. (v0.7 copy claims carousel controls — this clears it.)
- **Resizable:** wrap react-resizable-panels; style the handle as a chunky feral grip with focus ring.
- **Select:** wrap Radix Select (keep native `<select>` available as `SelectNative` — it's a legitimate option, just stop making it the only one).
- **Drawer:** wrap vaul (bottom-sheet pattern, distinct from Sheet).
- **Collapsible:** wrap Radix Collapsible (trivial; expected by anyone migrating from the canon).
- **Calendar keyboard pass:** arrow-key grid navigation, Home/End, PageUp/Down for months, `role="grid"` semantics. This is the one place the hand-rolled calendar trails react-day-picker and it's a bounded fix.
- **Date Picker:** presets row ("Today / Last 7 / Last 30 / This month"), range mode wired to the calendar's existing range support.
- **OTP Input:** verify paste-distribution, auto-advance, backspace-retreat, and screen-reader announcement; fix what fails.

### Tier C — extensions on already-real components

- **DataTable v2:** column visibility menu (dropdown reuse), sticky header, density toggle, CSV export hook. Optional TanStack Table adapter as a separate registry item for heavy users.
- **File Upload:** progress states, rejection states (type/size), multiple-file list with remove.
- **Input/Textarea:** size variants + invalid styling driven by Form wiring above.

**Global depth rule:** a component may not be listed with status "built" unless it has (1) every interactive state styled — hover/active/focus/disabled/invalid where applicable, (2) keyboard operation, (3) a bespoke docs description (no generated boilerplate), and (4) appearance in at least one block or template. Components that don't clear the bar get the new status names from §13 — not an apology.

---

## 12. Block expansion plan (currently 5 files / 131 lines total — that's a folder, not a block library)

**Definition of a block (acceptance criteria, applies to every item below):** a full page *section*, 60–250 lines of real markup; mobile-safe at 360px; themed exclusively through tokens (zero hardcoded colors); keyboard reachable; registered as a `registry:block` item with declared component deps; consumed by at least one template route. Blocks are the unit templates are made of and the unit users actually steal — shadcn's blocks page is one of its biggest traffic surfaces, and feral currently has nothing equivalent in earnest.

**Marketing family (target 10 blocks):** collage hero (extract from homepage — it's already the best section you have), manifesto hero (type-led, one ornament), product-shot hero; logo/word marquee band; feature grid (cards w/ ornament accents); pricing table (3 tiers, "popular" tier gets a burst sticker + tilt); testimonial wall (runs the new bit from §13 — Field Reports, not fake quotes); FAQ accordion; CTA slab; footer.

**Auth family (target 5):** login card, signup card, forgot-password, OTP verification (dogfoods otp-input), split-panel layout (form left / ornament chaos right).

**Dashboard family (target 7):** app shell (new Sidebar + topbar w/ Command palette trigger); stats row (stat-card × 4 with delta badges); chart panel (new Chart system); activity feed (timeline); data-table page (toolbar + DataTable v2 + pagination); settings form (Form v2 + sections); empty/error state pair.

**Content family (target 5):** article layout (prose styles — these don't exist yet and are required for any docs/blog use), blog index grid (image-card), changelog feed, doc page (sidebar + toc), search/command overlay block.

**Commerce family (target 4, feeds the ecommerce template):** product card grid, product detail (carousel dogfood), cart drawer (Drawer dogfood), checkout summary.

**Total: ~31 blocks.** Sequence them dashboard → marketing → auth → content → commerce, because dashboard blocks force Tier A component depth (§11) to actually happen — the blocks are the forcing function for the depth work, build them in the same passes.

---

## 13. VOICE LAW v2 — kill the receipts sermon, run the bit at maximum

### 13.1 The problem, named precisely
The current public copy is obsessed with its own integrity: "no fake install-command séance," "Honesty: irritating but load-bearing," "install commands may not hallucinate," "generated locally; install-test before publishing, cowardly and correctly," "fewer fake doors," "Public registry still waits for hosted install receipts." This is *process anxiety performed in public.* It jokes about the project's trustworthiness, which (a) plants the idea the project might not be trustworthy, (b) is meta-commentary, which is the weakest form of comedy, and (c) is nobody's reason to use a component library. Neobrutalism never once tells you it isn't lying — it just shows working components and lets fake haters scream. Confidence is the joke's load-bearing wall.

### 13.2 New voice law (replaces COPY-LAW.md's public-facing rules; internal engineering discipline is unchanged — keep the smoke tests, stop narrating them)
1. **Never narrate integrity.** The words honest, fake, receipt, earned, hallucinate, theater, séance, and any sentence about what the project *doesn't falsely claim* are banned from every public surface. The site doesn't promise it isn't lying. It simply doesn't lie, silently.
2. **Jokes punch at the components, at Beige, and at the reader's restraint — never at the project's quality or readiness.** Self-deprecation about the *aesthetic* ("this will upset your design lead") is the genre and is allowed. Self-deprecation about *competence* is banned.
3. **Every technical claim rides inside a bit, stated flat.** Model sentence: "Raised by wolves. Housebroken by Radix." Four words of joke, one true dependency claim, zero disclaimers.
4. **Unfinished things get absence or a status creature — never a disclaimer.** Status renames, applied everywhere statuses render (catalog, badges, registry descriptions): `built` → **LOOSE** (it's out, good luck), `basis` → **IN THE ENCLOSURE** (you can look at it), `planned` → **SIGHTED** (unconfirmed reports).
5. **One bit per surface.** A card gets one joke. Stacked jokes read as nerves.
6. **The lore is proprietary and recurring:** feral components as barely-contained creatures; a containment-facility frame; the goblin (already canon); the toast pigeons (already canon); **Beige** as the named antagonist. This is the universe neobrutalism doesn't have — they have a style, feral has *fauna.*

### 13.3 The testimonial replacement (this is the flagship bit — do not reuse their fake-hater gag)
Neobrutalism's fake hateful testimonials ("I want to vomit," "imagine using this") are theirs; running the same joke marks feral as a cover band. Escalation that is ours: **FIELD REPORTS — complaints with official responses.** Each card is a 1-star review from an absurd complainant, followed by a deadpan official reply from the facility. The reply is the punchline and the product claim at once.

- ★☆☆☆☆ "The button bit me." — *Facility response: the button is up to date on its shots.*
- ★☆☆☆☆ "I hovered over a card and it lifted toward my cursor. I have not slept since." — *Response: that is the intended behavior. The card likes you.*
- ★☆☆☆☆ "My design system had a panic attack." — *Response: we sent flowers. Beige ones. As a warning.*
- ★☆☆☆☆ — The Concept of Beige: "This library is a hate crime against me specifically." — *Response: correct.*
- ★☆☆☆☆ — A Notion Template: "I no longer feel safe." — *Response: you were never safe.*
- ★☆☆☆☆ "I pressed ⌘K and something FETCHED." — *Response: good palette. Best palette.*
- ★★★★★ "Wait, the keyboard navigation actually—" — *Response: [REPORT REDACTED. Five-star reviews violate facility policy.]*

(That last one smuggles the accessibility claim in as a joke — this is the §13.2 rule 3 pattern: the truth is delivered as contraband, never as a sermon.)

### 13.4 Copy rewrites — surface by surface (builder: these are drop-in replacements)

**Hero.** Current energy is fine but cap it: headline "**Components raised by wolves.**" / subhead "**Housebroken by Radix. Leashed by tokens. Released into your codebase.**" / primary CTA "Open the cages" (→ components) / secondary "See the damage" (→ templates).

**Nav badge.** Currently "v0.6 routed" (also stale — package is 0.7). Replace with version + creature count: "**v0.7 — 66 loose**".

**Installation page.** Current page is the worst offender (install "truth," receipts callout, the goblin denied "creative writing privileges"). Full replacement once the hosted smoke passes (§4):
- H1: "**Releasing a component into your codebase.**"
- Body: "One command. It installs its own source. It knows the way home — the way home is your `components/ui` folder now."
- The command, in tabs (pnpm/npm/yarn/bun), plus a Manual tab labeled "**Catch it by hand**" (copy-paste source).
- Single callout, danger tone: "**Side effects include:** visible focus rings, chromatic shadows, and your design lead asking to 'hop on a quick call.'"

**Footer.** Current: "fewer fake doors… Honesty: irritating but load-bearing." Replace: "**feral/ui — MIT licensed. Raised under duress. No animals were beiged in the making of this library.**"

**FAQ (homepage).**
- "Is it accessible?" → "**Yes. The chaos is strictly visual. Keyboards are sacred ground, focus rings are non-negotiable, and the screen reader gets the boring version of the truth.**"
- "Can I use this in production?" → "**Legally, yes — MIT. Spiritually, that's between you and whoever approves your PRs.**"
- "Why do some components tilt?" → "**They heard something.**"
- "Can I make it match my brand?" → "**The Style Lab re-skins every creature from one set of tokens. Your brand, but feral. Like a corporate retreat that went wrong in a good way.**"

**Accessibility page.** The frame is currently "receipts." Reframe as facility policy, keep the two lines that already hit: hero stays "**Boring semantics. Radioactive sticker sheet.**" and the line "**the interaction layer has to behave like a professional adult with a mortgage**" survives — both obey the new law (they assert, they don't apologize). Delete the "Known caveat / shame closet / before public bragging rights" card entirely; anything not done is simply not listed (rule 4).

**Changelog.** Rename the route label to "**Molt Log**." Entries stay factual; the frame does the comedy: "v0.7 — the calendar grew range selection. We don't know where it learned that."

**404.** Keep as-is. "This route escaped into the vents" was already written under the correct law.

**Components index hero.** Replace "Some are still basis-level. None are hidden in the shame closet." with: "**66 creatures. Browse the enclosures. Tap the glass — they like it.**"

**Empty state default copy.** "**Nothing here. The raccoon took it.**"

**Skeleton docs description.** "**It's not loading. It's molting.**"

**Catalog one-liners — replace ALL ~55 generated boilerplate notes.** Bespoke examples to set register; builder writes the remainder to match (one bit, ≤ 14 words, claim allowed to ride inside):
- Accordion: "Folds and unfolds on command. The only obedient one here."
- Alert Dialog: "Stops you before you do the thing. Someone has to."
- Badge: "A small loud sticker with a job."
- Breadcrumb: "Leaves a trail out. You'll want it."
- Calendar: "Knows what day it is, which is more than the marquee can say."
- Card: "A box that lifts when touched. Do not feed after midnight."
- Checkbox: "Checked or unchecked. No feelings about it either way."
- Combobox: "A dropdown that went to grad school."
- Command: "⌘K and it fetches. Good palette. Best palette."
- Context Menu: "Right-click summons it. Mind what you summon."
- Data Table: "Sorts, filters, paginates, selects rows, holds grudges."
- Dialog: "Traps focus like it's paid to. It is. Radix money."
- Dropdown Menu: "Opens downward, keyboard-navigable. We're unhinged, not rude."
- Empty State: "Professional nothing."
- Hover Card: "Lurks until you hover. Then it's charming."
- Kbd: "Tiny keycap cosplay."
- Marquee: "Scrolls forever. We've stopped asking why."
- Meter: "Measures things. Judges silently."
- Popover: "Pops over. Escape sends it home."
- Scroll Area: "A window with manners."
- Separator: "A line. It separates. We pay it anyway."
- Sidebar: "Holds the whole app's coat."
- Slider: "Drag it. It remembers."
- Spinner: "Rotates so you don't have to."
- Stepper: "One step at a time, like the therapist said."
- Switch: "Flips. Commits. No takebacks until you flip it back."
- Tabs: "Multiple personalities, one panel at a time."
- Timeline: "Events in order. Time stays linear. Nothing else here does."
- Tooltip: "Whispers on hover. Knows things."
- Toast: keep "tiny interface pigeons that arrive, yell, and leave" verbatim — it's the register the rest must rise to.
- Ornaments: "The sticker sheet escaped containment, so we made it a product."

**Registry item descriptions** (currently "…cowardly and correctly"): regenerate from the new catalog one-liners via `build-registry.mjs` — single source of truth for voice, zero per-file editing.

**Sections to remove from the public homepage entirely** (per §1; they're roadmap leakage and they all speak in the banned register): Productization Lab, Competitive Audit, Matrix, Blueprint. Their content lives on in `docs/*.md` where it belongs. Homepage target shape: Hero → Collage → Doctrine (rewritten, 4 cards max) → Behavior Lab → Style Lab teaser w/ live re-tint buttons → Field Reports → FAQ → CTA → Footer. Nine sections, every one of them either demonstrates or jokes, none of them confesses.

### 13.5 Doctrine section rewrite (the 4 cards)
1. "**One broken rule per creature.**" Every component violates exactly one settled convention — a tilt, a clash, a chromatic shadow. Variance with a leash.
2. "**The leash is a token.**" Every axis of chaos is a named CSS variable. Re-tint the whole habitat from one file.
3. "**Loud face, quiet hands.**" The visuals are off-leash. Keyboard, focus, and screen-reader behavior are trained professionals.
4. "**Beige is a choice. So is this.**"

---

## 14. Builder handoff checklist (delta to Part One's P0–P3; same priorities, plus the above)
1. P0 unchanged: LICENSE (MIT — the footer rewrite already asserts it, make it true first), hosted-registry smoke + flip Installation page to §13.4 copy, routing/SEO/OG pass.
2. Voice pass (§13) across: App.tsx site copy, component-catalog.ts notes, registry generator descriptions, status renames in catalog types + badges, COPY-LAW.md superseded by VOICE-LAW-v2 (this section, copied into docs/).
3. Dark mode (Part One §8.4) — toggle copy: "**Lights out. They can see in the dark.**"
4. Tier A component depth (§11) built via the dashboard block family (§12) as forcing function.
5. Charts route + chart system (§11 Tier A) — new nav item.
6. Template exit ramps (§10): per-template install/download + template-mode smoke.
7. Block families (§12) in sequence; register everything; templates recomposed from them per the v0.8 depth spec.
8. Field Reports block replaces any testimonial section (§13.3).

---
---

# PART THREE — UX / IA / STRUCTURE AUDIT + SITE PARITY (v3)
**Scope:** the deployed site at harrowhaus.github.io/feral-ui as served on audit day (bundle `index-C1gtf-6Z.js`, 539KB — verified against repo source by string fingerprinting; the live build predates the Part Two work now landing in the repo). Parity comparison is site-vs-site against neobrutalism.dev.

**Deploy-lag note for the builder:** the repo is now AHEAD of the deployment. Commits exist for the MIT license, the hosted-registry smoke script, the Installation-page flip to hosted commands, and `src/docs/component-voice.json` (wired into `build-registry.mjs`). None of it is live. **Deployment is currently the bottleneck — everything in this Part audits the world users actually see.** Also: `component-voice.json` feeds the registry generator but NOT `component-catalog.ts`, so the site's component pages will keep the old boilerplate even after deploy unless the catalog consumes the same JSON. Make the voice file the single source for both.

---

## 15. CRITICAL DEFECTS — the site breaks on first click

### 15.1 Every homepage navigation link renders the 404 page
The homepage header is built from in-page anchors (`#top`, `#doctrine`, `#components`, `#docs`, `#blocks`, `#templates`, `#route-docs`, `#style-lab`, `#blueprint`). But the entire app is hash-routed: `useHashRoute` reads `location.hash`, and `AppRoutes` matches only `/`-prefixed paths, falling through to `NotFoundRoute` for everything else. Clicking "Components" sets the hash to `#components`, the router reads route `components`, matches nothing, and **unmounts the homepage to render the 404**. All nine header links do this — including the logo (`#top`). The primary navigation of the site is nine consecutive landmines, and the 404's joke copy ("this route escaped into the vents") fires on every one, turning the best page on the site into evidence of the worst bug.

Two of the nine targets (`#route-docs`, `#style-lab`) don't even exist as element ids on the homepage, so they'd be broken under any routing scheme.

**Fix (pick one, first is cleanest):**
- (a) Convert the homepage nav to route links (`#/components`, `#/docs`, `#/templates`, `#/style-lab`) — the routed pages exist and are better destinations than mid-homepage scroll positions anyway; or
- (b) make `AppRoutes` treat any hash not starting with `/` as a scroll target: `document.getElementById(route)?.scrollIntoView()` and keep rendering the homepage; or
- (c) namespace section anchors as buttons with `scrollIntoView` handlers, leaving the hash untouched.

### 15.2 The accessibility skip link is the same trap
`HomePage` renders `<a className="feral-skip" href="#components">Skip to components</a>`. A keyboard or screen-reader user's very first Tab + Enter on the site **navigates them to the 404 page.** The one feature built specifically for assistive tech is the fastest route to the broken state. Fix alongside 15.1; point it at a real `main` id with `tabindex="-1"`.

### 15.3 The three hero CTAs do nothing
"See what it builds," "Browse components," "Copy the source" are `<Button>` elements with no `href`, no `onClick`. The largest, loudest, highest-placed interactive elements on the site are inert. A visitor's likely first three clicks: dead button, dead button, then a nav link that 404s. Fix: hero CTAs become links to `#/templates`, `#/components`, and the GitHub repo (or the install page once the hosted flip deploys).

### 15.4 Unknown docs slugs silently impersonate the install page
`DocPage` falls through to installation content for any unrecognized slug — `#/docs/asdf` renders the Installation page with no indication anything is wrong. Silent wrong-page is worse than a 404. Route unknown slugs to `NotFoundRoute`.

---

## 16. INFORMATION ARCHITECTURE — the site exists twice and disagrees with itself

### 16.1 Two unrelated navigation systems
The homepage `Nav` and the routed `ProductNav` are different components with different links, different labels, and different mental models:

| Homepage nav (anchors, all broken) | Routed nav (routes, working) |
|---|---|
| Build → #doctrine | Install truth → #/docs/installation |
| Components → #docs-section | Components → #/components |
| Docs → #docs | Blocks → #/blocks |
| Blocks → #blocks | Templates → #/templates |
| Templates → #templates | Style Lab → #/style-lab |
| Guides → #route-docs (id doesn't exist) | Ornaments → #/ornaments |
| Style Lab → #style-lab (id doesn't exist) | Apps and forms → #/docs/accessibility |
| Roadmap → #blueprint | — |

Consequences: **Ornaments** (a flagship moat per Part One) is unreachable from the homepage nav. **"Apps and forms"** links to the accessibility page — label and destination are strangers. **"Install truth"** is process-anxiety language in the highest-visibility slot (Voice Law violation, but also just bad information scent — users scan for the noun "Docs" or "Install"). **"Roadmap"** exposes internal planning as a top-level destination. A user who learns the homepage nav has learned nothing about every other page, and vice versa.

**Fix:** ONE shared nav component on every page: `feral/ui · Docs · Components · Blocks · Templates · Charts · Style Lab · Ornaments` + right cluster: search (real ⌘K), GitHub link, theme toggle, version badge. Labels are nouns. Nothing internal.

### 16.2 The homepage is the entire site, stacked — and then the site exists again as routes
Seventeen sections, several of which are full interactive applications duplicating routed pages: `ComponentDocs` is a 66-item mini docs browser (duplicates `#/components/*`), `TemplateBrowser` is an interactive template switcher (duplicates `#/templates`), `StyleLab` embeds the entire 243-line theme generator mid-page (it also has its own route), `Blocks` duplicates `#/blocks`, `DocsProductShell` duplicates `#/docs`. This is the single biggest source of the "convoluted" feel: there are two competing ways to do everything, the homepage scroll is enormous, the JS for five apps loads on first paint, and neither surface is clearly canonical. Neobrutalism's homepage demos components but sends you to exactly one place to *use* them.

**Fix:** the homepage *teases*, routes *serve*. Each duplicated app becomes a bounded teaser (collage already does this correctly; Style Lab becomes the live re-tint button strip from Part Two §13.4 with "Open the Lab" → route; templates become 3 thumbnail cards → route). Target shape is the nine-section homepage already specified in §13.4.

### 16.3 Roadmap leakage (restated, now quantified)
Six of seventeen homepage sections are internal material: ProductizationLab, NthComponents, CompetitiveAudit, Matrix, Blueprint, Repo. More than a third of the public sales surface is the project talking to itself. Move to `docs/*.md`; Repo becomes a GitHub icon in the nav.

### 16.4 Orphans and ghosts
- `src/features/docs-shell.tsx` (162 lines) is imported by **nothing** — a dead module that nonetheless appears in the README source map as a feature.
- `#/showcase` exists as a route but is linked from **nowhere** — an unreachable page whose copy is, ironically, another integrity sermon.
- Decision per item: wire it in or delete it. (Docs-shell is worth resurrecting — see 17.2.)

### 16.5 Version chaos — three versions on one site
Homepage footer: **v0.5**. Routed footer and nav badge: **v0.6**. package.json: **0.7.0**. README: **v0.5**. A visitor who notices (and the target audience of developers notices) concludes the site doesn't know what it is. **Fix:** import the version from `package.json` once (`import pkg from "../package.json"`) and render it everywhere from that single constant. This class of bug becomes impossible.

---

## 17. PAGE-LEVEL UX

### 17.1 The fake search box
The nav contains "Search soon. Panic now." — non-interactive text styled like a control, sitting in the exact slot where every modern docs site puts a working ⌘K. It advertises an absence (Voice Law rule 4 violation) AND creates a false affordance (users click it; nothing happens — the third category of dead control on this site after the hero CTAs and the nav links). The cmdk-backed `Command` component is already built and shipped in the bundle. **Fix:** wire it — index the component catalog, docs routes, and templates; ⌘K to open; this is hours, not days, because the hard part already exists in `src/components/ui/command.tsx`.

### 17.2 Docs pages are dead ends
Every routed docs/component page is hero + content + nothing: no sidebar, no breadcrumb, no prev/next. The only way onward is the top nav (8 broad destinations) or the back button. Neobrutalism's equivalent page has persistent sidebar navigation, a breadcrumb trail (Home / Components / Button), and prev–next pagination at the bottom — three navigation systems to feral's zero. For a 66-component catalog this is the difference between browsing and spelunking. **Fix:** resurrect the orphaned docs-shell as a persistent two-column layout for all `#/docs/*` and `#/components/*` routes: left sidebar (grouped by layer: primitives / radix / composites / ornaments, with status creatures as badges), breadcrumb on top, prev/next from catalog order at the bottom.

### 17.3 Mobile
No mobile menu exists; the nav relies on `overflow-x: auto` — eight links in a horizontal scroll strip with no visual affordance that it scrolls. At ≤820px `.site-nav-right` is hidden, which removes the version badge and (post-fix) would remove search/GitHub/theme. The collage degrades gracefully (3→2→1 columns — good), and the route pages collapse to one column properly. **Fix:** below ~720px collapse nav links into a Sheet-based menu (the Sheet component exists; dogfood it), keep logo + menu button + search icon visible.

### 17.4 What's already right (keep)
Sticky nav; global dashed focus-visible rings; reduced-motion handling; route-card grids with press physics (the best-feeling interaction on the site); isolated template preview routes (`/templates/:slug/preview`) — a genuinely good pattern neobrutalism lacks; the 404 page (correct voice, correct behavior, give it an ornament).

---

## 18. SITE PARITY MATRIX — feral-ui pages vs neobrutalism.dev (live vs live)

| Surface | neobrutalism.dev | feral-ui (deployed) | Gap class |
|---|---|---|---|
| Working primary nav | ✅ | ❌ all 9 homepage links 404 | **DEFECT** |
| Per-page URLs + meta/OG | ✅ Next.js, full cards | ❌ one URL, no OG | Structural (Part One P0.3) |
| Docs search (⌘K) | ✅ working palette | ❌ fake placeholder | Build (component exists) |
| Theme/dark toggle | ✅ in nav | ❌ none | Build (Part One P1.4) |
| GitHub link + stars in nav | ✅ 5.1k badge | ❌ buried in footer section | Trivial |
| Docs sidebar / breadcrumb / prev-next | ✅ all three | ❌ none | Build (17.2) |
| Install commands w/ pkg-manager tabs | ✅ CLI+Manual × 4 managers | ❌ local-clone story (flip committed, not deployed) | **Deploy** |
| Component pages | ~45, deep content | 66, boilerplate content | Content (voice json, wire to catalog) |
| Styling/theming page | ✅ presets | ✅ + Style Lab generator | **Feral ahead** |
| Charts section | ✅ nav item + gallery | ❌ stub component | Build (Part Two §11) |
| Templates | links to external repos | ✅ 8 live routes + isolated previews | **Feral ahead** (add exit ramps, §10) |
| Showcase | ✅ real adopters | orphan stub route | Defer (seed w/ Harrow Haus properties later) |
| Blocks library | ❌ none | 5 thin blocks, routed | Feral ahead on architecture, behind on substance (§12) |
| Mobile nav | ✅ responsive | ❌ overflow-scroll strip | Build (17.3) |
| Consistent version label | ✅ | ❌ v0.5/v0.6/v0.7 simultaneously | Trivial (16.5) |
| Working hero CTAs | ✅ | ❌ three inert buttons | **DEFECT** |
| License visible | ✅ MIT in footer | ❌ live site says "MIT later" (license now committed) | **Deploy** |

Reading: feral is ahead on exactly the things that don't gate adoption yet (generator, ornaments, live templates, breadth) and behind or broken on everything a first-time visitor touches in the first sixty seconds. The first-sixty-seconds path on neobrutalism: land → click Components → working page → copy install command. On feral: land → click anything → 404, or click a hero button → nothing.

---

## 19. FIX ORDER (folds into the master checklist; defect class outranks everything)

**P-1 — DEFECTS (before any feature work, including Part Two items):**
1. Homepage nav → route links (15.1a). 2. Skip link target fix (15.2). 3. Hero CTAs get destinations (15.3). 4. Single version constant from package.json (16.5). 5. Unknown doc slug → 404 (15.4). 6. **Deploy** — license, hosted install page, and voice json are committed and invisible; ship the build.

**P0 — IA unification:** one shared nav (16.1); homepage reduced to teaser model per §13.4 (16.2); roadmap sections off the public site (16.3); orphan triage (16.4); wire component-voice.json into component-catalog.ts so site and registry share one voice source.

**P1 — navigation depth:** docs shell with sidebar/breadcrumb/prev-next (17.2); real ⌘K search (17.1); mobile Sheet menu (17.3); GitHub + theme toggle in nav right-cluster.

**P2 — parity closes:** dark mode, charts route, OG/SEO routing pass — all already specified in Parts One–Two; this Part adds no new scope to them, only sequencing beneath the defects.

**Acceptance for P-1/P0, stated as a user journey:** a first-time visitor on a phone can land, tap any nav item, reach a working page, open search, find Button, read a non-boilerplate description, and copy a working hosted install command — without encountering a dead control, a 404, or three different version numbers. That journey is currently impossible at step one.

---
---

# PART FOUR — COMPOSITION VERDICT, ORNAMENT AUDIT, FINAL SWEEP (v4)

## 20. The composition question, answered directly: yes, overhaul — and here is precisely why it feels wrong

**The diagnosis you sensed is correct.** The site is running two complete, competing site architectures simultaneously:

**Architecture A — the one-page demo site** (vestige of the v0.4 static seed): a 17-section scrolling monolith where everything lives inline — embedded docs browser, embedded template switcher, the *entire Style Lab application* mounted mid-scroll — navigated by in-page anchors. This is "the whole product is one long page" composition.

**Architecture B — the multi-page product site** (added in v0.6): hash routes, a second nav, dedicated pages for docs/components/blocks/templates/style-lab/ornaments, page heroes, per-page footers. This is "the product is a site" composition.

Neither was demoted when the other arrived. They were stacked. And critically, **they share one namespace — the URL hash — which is why the conflict isn't just a feeling: it's the literal mechanism of the §15.1 defect.** Architecture A's anchor links (`#components`) and Architecture B's routes (`#/components`) are the same kind of string fighting over the same browser field, and B's router wins every collision by rendering the 404. The "is this one page or many pages?" confusion you feel as a user is encoded in the address bar as an actual race condition between two designs.

Secondary symptoms, all downstream of the same dual-architecture root: two navs with disjoint vocabularies (§16.1), every feature reachable two ways with neither canonical (§16.2), the homepage footer frozen at v0.5 while routed footers say v0.6 (the two architectures were built at different times and never reconciled — the version skew is an archaeology layer, not a typo), and a skip link written for Architecture A executing inside Architecture B.

**What "overhaul" means here — and what it doesn't.** This is a *composition* overhaul, not a redesign. The visual language (tokens, press physics, collage, route-card grids) is healthy and survives intact. The work is demotion and deletion, not invention:

1. **Architecture B is the site.** Routes are canonical for every capability. Full stop.
2. **The homepage is demoted from "the product" to "the front door":** a marketing page composed of *teasers that route inward* — hero, collage (the one inline section that earns its place because demonstration-by-collage IS the homepage's job), a 4-card doctrine, a Style Lab teaser (the live re-tint buttons, not the Lab), 3 template thumbnails, Field Reports, FAQ, CTA, footer. Nine sections, ~one screen-height each, every interactive element a door into a route.
3. **Embedded apps are evicted:** the inline docs browser, template switcher, Style Lab instance, blocks gallery, and docs shell duplicate routes and are deleted from the homepage (the routes already exist; this is removal, not migration).
4. **One nav, one footer, one version constant**, shared by both the homepage and every route (§16.1, §16.5).
5. **One namespace:** in-page anchors disappear from the nav entirely; any remaining same-page scroll (e.g., FAQ link in footer) uses scroll handlers, never raw hash anchors.

Estimated shape of the work: the overhaul is roughly 70% deletion/relocation of existing code and 30% writing teaser variants of sections that already exist. The scary word "overhaul" describes a demolition, not a construction project.

---

## 21. ORNAMENT AUDIT — every shape rendered and judged by eye

**Method:** all 40 SVG ornaments were extracted from `ornaments.tsx`, rendered to raster with the site's actual stroke/fill rules, and inspected visually on a labeled contact sheet (delivered alongside this document: `feral-ornament-contact-sheet.png` — give it to the builder; it is the ground truth for everything below).

**Top-line verdict: the owner's complaint is confirmed, and it has a clean fault line.** The ornament set splits into two families with opposite quality:

- **The iconic/geometric family is GOOD.** Warning, Pointer, Star, StarUgly, Check, X, Censor, ReceiptTag, NoiseBadge, CornerSticker, SpeechScrap, Crown, Lightning, Eye, Flame, Ticket, Paperclip, Megaphone, Radioactive, Bracket, Asterisk, Spiral, Drip, SkullBubble(shape) — these read instantly as named. Censor, NoiseBadge, CornerSticker, and Paperclip are genuinely excellent. Roughly 24 of 40 pass clean.
- **The organic/chaos family is BROKEN.** The shapes that most needed to look feral — splats, blobs, bursts, loops, scribbles — are exactly the ones whose names lie.

### 21.1 Mismatch table (per-ornament directives)

| Export | What it actually renders as | Verdict & directive |
|---|---|---|
| `FeralBurstSquare` | A thick X / four-armed cross | **Mismatch + collision** with `FeralX`. Redraw as a burst whose points are square-cut (flat-tipped rays), or delete. |
| `FeralSplat` | A smooth, symmetric six-lobed flower | **Mismatch.** Zero splat character — splats are violent and asymmetric with satellite droplets. Redraw per recipe (21.3). |
| `FeralSplatSmall` | A wavy soft blob, same size as Splat | **Double mismatch:** not splatty AND not small. The size axis already exists as a prop — "Small" in a name is dead weight. Redraw as a true splat variant or delete. |
| `FeralBlob` | An almost perfect circle | **Mismatch.** A blob must be irregular; this is `FeralCircle`. Redraw with real asymmetry. Currently Splat/SplatSmall/Blob are three interchangeable soft shapes — the set claims an irregularity spectrum and delivers none of it. |
| `FeralArrowLoop` | A circle with a small tick inside — reads as a broken clock | **Mismatch.** The arrowhead lands inside the loop and vanishes perceptually. Redraw: open loop (¾ turn) with the head clearly exiting the curve tangentially. |
| `FeralScribbleCircle` | A clean, closed, single-stroke ellipse | **Mismatch in spirit.** Nothing scribbled about it. The hand-drawn emphasis ellipse overlaps itself 1.5–2 turns with a visible gap and crossing — that's the whole gesture. Redraw. |
| `FeralScribble` | A tidy sine wave | Borderline. Reads "squiggle," not "scribble" (scribble = overlapping chaos). Either rename `FeralSquiggle` or redraw with self-crossings. |
| `FeralPointerHand` | An open palm — a STOP hand | **Semantic mismatch.** A pointer hand has an extended index finger (the cursor everyone knows). Either redraw as pointing hand or rename `FeralStopHand` / `FeralTalkToTheHand` — the stop gesture is on-brand if it's named what it is. |
| `FeralLoop` | A small tangled knot, off-center, occupying ~30% of its canvas | Shape passable, **composition bug:** badly scaled/positioned in the viewBox. Re-center and scale to fill like every other ornament. Also: Loop/ArrowLoop/Spiral are three near-synonyms — after fixes, confirm each earns a distinct slot. |
| `FeralSkullBubble` | A skull. No bubble anywhere | Shape is good; **name lies.** Rename `FeralSkull`. |
| `FeralTinyGoblin` | A cat or fox head: pointed ears, round eyes, no goblin features — and full-canvas, not tiny | Shape is charming; **name lies twice.** Decision point: redraw an actual goblin (asymmetric ears, snaggle, brow) OR keep the shape and rename — given the lore (§13.2 rule 6), this could simply become the facility's other resident. Either way the current name must die. |
| `FeralBurstRound` | A rounded 8-lobe burst, gear-adjacent | Passable; keep, but after Splat is redrawn confirm the two remain distinguishable. |
| `FeralDrip` | Bar with drips — reads, but the source rectangle is ambiguous | Keep; minor: thicken the source bar so it reads "dripping from something." |

### 21.2 Root cause — and the law that prevents recurrence
The fault line is diagnostic: **geometric and iconic shapes survive being authored blind from path coordinates; organic shapes do not.** A star, a bracket, a triangle are constructible from math in one's head. A splat, a blob, a self-overlapping scribble are *defined by* controlled irregularity, which is unjudgeable without looking. These paths were authored without a render-verify loop, so exactly the shapes requiring eyes failed.

**New build law for all visual assets:** no ornament (or future asset: pattern, mascot, sticker) merges without passing contact-sheet review. The verification harness below regenerates the sheet in seconds; it goes in `scripts/render-ornaments.py` and runs after any ornament change. A human (or a vision-capable agent) must look at the output and confirm name↔shape before commit.

```python
# scripts/render-ornaments.py — contact-sheet verifier (deps: cairosvg, pillow)
import re, os, cairosvg
from PIL import Image, ImageDraw, ImageFont
src = open('src/components/ui/ornaments.tsx').read()
pat = re.compile(r'export function (Feral\w+)\(props: FeralOrnamentProps\) \{ return <(Svg|StrokeSvg) \{\.\.\.props\}>(.*?)</\2>; \}')
os.makedirs('orn-audit', exist_ok=True)
cells = []
for name, kind, body in pat.findall(src):
    body = body.replace('strokeWidth','stroke-width').replace('strokeLinecap','stroke-linecap')
    vb, style = (("0 0 100 100","fill:#bfff00;stroke:#0a0a0a;stroke-width:4;stroke-linejoin:round;color:#bfff00")
                 if kind=="Svg" else
                 ("0 0 120 80","fill:none;stroke:#3d2bff;stroke-width:7;stroke-linecap:round;stroke-linejoin:round;color:#3d2bff"))
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="160" height="160" style="{style}">{body}</svg>'
    png = f'orn-audit/{name}.png'
    cairosvg.svg2png(bytestring=svg.encode(), write_to=png, background_color='white')
    cells.append((name, png))
cols, cell, lh = 5, 190, 30
rows = (len(cells)+cols-1)//cols
sheet = Image.new('RGB', (cols*cell, rows*(cell+lh)), 'white'); d = ImageDraw.Draw(sheet)
try: font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 14)
except: font = ImageFont.load_default()
for i,(name,p) in enumerate(cells):
    x, y = (i%cols)*cell+15, (i//cols)*(cell+lh)+5
    sheet.paste(Image.open(p).resize((160,160)), (x,y)); d.text((x,y+165), name.replace('Feral',''), fill='black', font=font)
sheet.save('orn-audit/contact-sheet.png'); print('sheet:', len(cells), 'ornaments')
```

### 21.3 Generation recipes for the redraws (so the organic shapes come out organic)
- **Splat:** start from a radial polygon of 7–9 points at randomized radii (0.45–1.0 of max), smooth with quadratic curves, then add 2–4 detached satellite droplets (small circles/teardrops) at varied distances. Asymmetry is mandatory: no two opposite lobes equal.
- **Blob:** 6–8 point radial polygon, radii jittered ±25%, fully smoothed, slight overall skew. If it could pass for a circle, regenerate.
- **Scribble circle:** an ellipse path traversed ~1.7 turns with the second pass offset 4–8 units, open ends, one visible self-crossing.
- **Arrow loop:** ¾-turn open circle; head attached tangent to the exit, sized ≥22% of loop diameter, pointing clearly away from the curve.
- Verify every regeneration on the contact sheet. Organic shapes are accepted by eye or not at all.

### 21.4 Stamps — voice fixes
Default stamp texts are `RECEIPT`, `WARNING`, `APPROVED?`, `BAD IDEA`, plus `FeralReceiptStamp`/`FeralReceiptTag` as names — the receipts doctrine fossilized into the asset layer. Under Voice Law v2: `FeralReceiptStamp` → `FeralStamp` default text rotates to lore: **LOOSE / BITES / DO NOT FEED / ESCAPED / GOOD CREATURE / SIGHTED**. `FeralReceiptTag` (the shape is a fine torn tag) → `FeralTag`. `WARNING` and `BAD IDEA` stay — they were already correct. The marquee's "RECEIPTS OR RIOT" strip (§16) gets replaced in the same pass: `FERAL/UI × CONTROLLED VARIANCE × DO NOT FEED × IT BITES ×`.

---

## 22. FINAL SWEEP — remaining items found, previously unlisted

1. **`document.title` never changes.** Zero per-route title updates in the codebase: every page, component, and template shows the same browser-tab title. Tab-switchers and screen-reader users get no orientation. Fix in `useHashRoute` or per-page effect: `feral/ui — Button`, `feral/ui — Style Lab`, etc. (This also unblocks the Part One SEO pass.)
2. **No favicon and no OG/social meta of any kind.** `index.html` contains neither; `public/` contains only the registry. Browser tab shows the default globe; every share is a bare link. Ship favicon.svg (FeralStar or the renamed cat-goblin is right there) + OG image + twitter card meta in the P0 routing/SEO pass.
3. **Static-fallback fossils still in the repo:** `legacy/feral-ui-home-1.html` and a root-level `pages/index.html`. Your own v0.8 doc warns the static fallback must never become the product preview — it's still sitting in the repo confusing agents and tooling. Delete both (git history preserves them).
4. **`FeralLoop` canvas bug** (21.1) — the one ornament with a scale/positioning defect rather than a naming defect.
5. **Minor, note-only:** `::selection` is white-on-pink (#ff2d9b), ~3.5:1 contrast — acceptable for selection states but worth a darker pink if Style Lab ever exports it as a text color; the homepage currently has its own `<h1>` and each routed page another — fine as-is since they're separate views, just keep it one h1 per view after the homepage recomposition.

## 23. CHECKLIST DELTA (appends to §19; same defect-first ordering)
- P-1 add: per-route `document.title`; favicon + OG meta (pulled forward from P2 — it's two files and ten lines).
- P0 add: homepage recomposition per §20 (this *is* the overhaul — schedule it as the same work item as §16.2, now with the architecture rationale and the nine-section target locked).
- P0 add: ornament repair pass per §21 — redraw list (BurstSquare, Splat, SplatSmall, Blob, ArrowLoop, ScribbleCircle, Loop-rescale), rename list (SkullBubble→Skull, TinyGoblin→decide, ReceiptTag→Tag, ReceiptStamp→Stamp defaults, Scribble→Squiggle or redraw, PointerHand→decide), `scripts/render-ornaments.py` committed, contact-sheet review made a merge requirement for visual assets.
- P0 add: delete `legacy/` and root `pages/`; marquee text swap (§21.4).

---
---

# PART FOUR — COMPOSITION DIAGNOSIS, ORNAMENT AUDIT, CLOSED-LOOP DOCTRINE (v4)

## 20. Yes — your composition instinct is exactly right, and here is the mechanism

The codebase contains **two complete, competing site paradigms running at the same time**, because v0.6 *added* a multi-page architecture on top of v0.5's single-page brochure instead of *migrating* into it:

- **Paradigm A (v0.5 survivor):** `HomePage` — its own `Nav`, its own footer (still saying v0.5), anchor-hash navigation, 17 stacked sections, full applications embedded inline.
- **Paradigm B (v0.6 addition):** `RoutedShell` — its own `ProductNav`, its own footer (saying v0.6), hash-route navigation, one page per concern.

Every major symptom in Part Three is these two paradigms colliding, not separate defects: the **404 bug is literally the two paradigms fighting over the same URL hash** (Paradigm A writes `#components` as a scroll instruction; Paradigm B reads it as a route and answers "no such page"). The dual navs are one nav per paradigm. The duplicate component browsers/template switchers/Style Labs are Paradigm A refusing to trust Paradigm B's pages to exist. The conflicting version numbers are the two paradigms' separate footers. The skip-link trap is an A-style anchor evaluated under B's router.

**So: does composition need an overhaul? Yes — but it's a *demolition*, not a redesign.** Paradigm B is already the right architecture and already works. The job is to finish the migration v0.6 started:

1. **One `AppShell`** (shared nav + footer + command palette + theme state) wraps **every** route, *including home*. Delete `Nav`, `ProductNav`, both footers, both shell variants. Home becomes just another route's content inside the shell — at that moment the anchor/route collision becomes structurally impossible, not just patched.
2. **Homepage demotes from "the whole site" to "the front door":** each embedded application is replaced by its bounded teaser + a route link (the §13.4 nine-section shape). Rule of thumb: the homepage may *contain* components; it may not *contain pages*.
3. **One canonical surface per concern.** If a thing has a route, the homepage gets a teaser of it, never a second implementation of it. This single rule, enforced, is the entire overhaul.

Estimated blast radius is small: `App.tsx` reorganization plus deletions. No component changes. The "feeling" you're getting will disappear because its cause is one file's architecture, not the design language.

---

## 21. ORNAMENT AUDIT — the names don't match the shapes for TWO reasons, and the bigger one is a bug

### 21.1 The showcase page mislabels 9 of its 10 samples (defect)
`OrnamentsPage` renders a hand-picked `samples` array (`Burst, Splat, Arrow, Warning, Pointer, Star, Censor, ReceiptTag, Scribble, TinyGoblin`) but labels each card with `feralOrnamentCatalog[index]` — the **catalog's** order, which is different. So the rendered Splat is labeled "FeralBurstRound," the Arrow is labeled "FeralBurstSquare," the Warning triangle is labeled "FeralSplat," the Pointer is labeled "FeralSplatSmall," the Star is labeled "FeralBlob," the Censor bars are labeled "FeralArrow," and so on. **Nine of ten labels on the ornament showcase are wrong.** This is almost certainly the primary source of the "names don't match shapes" impression — the shapes are mostly fine; the page lies about which is which. Fix: pair name and component in one array of `{ name, Component }` objects so they cannot desynchronize.

### 21.2 Genuine name↔geometry mismatches (verified by reading the SVG paths)
I traced every path. Most are honest: Burst, BurstSquare, Splat, Blob, Star, StarUgly (intentionally lopsided — name matches, keep), Check, X, Censor, SpeechScrap, Crown (correct three-point crown), Lightning (correct bolt), Eye, Drip, Bracket, Asterisk, Spiral, Ticket, Megaphone, Radioactive (a properly constructed trefoil), Warning (triangle + exclamation), ScribbleUnderline, Scribble, TinyGoblin (pointed ears + dot eyes — reads goblin). The real offenders:

| Export | What the path actually draws | Problem | Fix |
|---|---|---|---|
| `FeralPointerHand` | Four equal finger capsules on a palm — an open hand / high-five | A "pointer hand" needs ONE extended index finger | Rename `FeralHand` (and optionally add a true pointing-hand later) |
| `FeralSkullBubble` | Round head, two dot eyes, straight line mouth — a ghost/emoji face | No nasal cavity, no teeth = not a skull | Rename `FeralGhost` or add nose triangle + teeth ticks |
| `FeralSplatSmall` | A different splat at the **same size** as FeralSplat (size comes from the `size` prop, not the name) | Name encodes a size that isn't true | Rename `FeralSplatAlt` |
| `FeralNoiseBadge` | A square of scattered pixels | It's noise, not a badge | Rename `FeralStatic` |
| `FeralBurstRound` | Curved-lobe seal, but the final curve segment is asymmetric — verify visually for a lopsided lobe | Possible geometry wobble | Eyeball at lg size; re-balance last `c` segment if lopsided |
| `FeralArrowLoop` | Loop with an arrowhead placed mid-path | Arrowhead direction may not match the path's end tangent | Eyeball; move head to path terminus |

**Naming-system rules to adopt (prevents recurrence):** names describe *silhouette only*, never size (size is a prop) and never lore-unverified anatomy; one name = one recognizable shape a stranger could match blind in a lineup. Acceptance test for every ornament, current and future: show a person the shape, offer four names, they pick the right one. Run that lineup once and rename whatever fails.

### 21.3 The receipts doctrine is fossilized in the ornament API
`FeralReceiptTag`, `FeralReceiptStamp`, default stamp text `"RECEIPT"`, and `"APPROVED?"` bake the banned vocabulary into **code**, where Part Two's copy pass can't reach it. Voice Law applies to exported names and defaults too:
- `FeralReceiptStamp` → `FeralLooseStamp` (default text **LOOSE**)
- `FeralStamp` default `"RECEIPT"` → `"DO NOT FEED"`
- `FeralApprovedStamp` default `"APPROVED?"` → `"GOOD CREATURE"`
- `FeralBadIdeaStamp` stays — it's already in voice.
- `FeralReceiptTag` (the shape is a hang-tag with a tear edge) → `FeralTag`.
- New stamp defaults worth shipping because they're free: `CONTAINMENT BREACH`, `BITES`, `SIGHTED`.
Keep old names as deprecated aliases for one version so nothing breaks.

### 21.4 The ornament page hides the moat it advertises
Only 10 of 44 exports render; the other 34 exist as text badges — a "visual moat" page where 77% of the visuals are invisible. Plus a minor code bug: `Svg` doesn't destructure the `label` prop, so it spreads an invalid `label` attribute onto the `<svg>` element. **Page spec:** render ALL ornaments in the grid from the paired `{name, Component}` array; click any card to copy its JSX (toast: "specimen bagged"); hover cycles tones; a tone/size control strip at top re-renders the whole grid live. This page should be the easiest fun on the site.

---

## 22. CLOSED-LOOP INTERACTION DOCTRINE — your thought makes complete sense; here is its name and its spec

The instinct you're describing is **self-demonstration**: the site should never *show* the components — the site's own working chrome should *be* the components, visibly, and every demo should be operable and round-trip back into something you take with you. Right now the loop is open: demos are mostly admire-only renders, the chrome doesn't identify itself, and nothing you do on the site leaves with you. The principle, stated as law:

> **"No screenshots. No descriptions. Only specimens."** Every behavioral claim must be operable within one viewport of where it's made, and every interaction should either teach (live code), brand (a creature responds), or convert (you leave with code).

### 22.1 The chrome identifies its own organs
The shell already dogfoods by accident; make it dogfood *on purpose*: the ⌘K search IS `<Command/>`, the mobile menu IS `<Sheet/>`, the theme switch IS `<ThemeSelector/>`, copy confirmations ARE the toast pigeons. Add a tiny recurring affordance — a small tag (or long-press/hover chip) on chrome elements reading e.g. "this is `<Command/>` →" linking to that component's page. The site becomes a continuously self-labeling organism: you never wonder if the components are real because you are *always already using them*, and the site keeps telling you which one you're touching. No other component library does this as a systemic pattern. This is cheap and it is the full-circle feeling you're describing, mechanized.

### 22.2 Component pages get playgrounds, not posters
Every component page gets a **props playground**: the live specimen plus controls for its actual variance axes (tone / shape / size / tilt — they're already typed unions, the controls can be generated from the types), and a code block that **rewrites in real time** as you toggle, with copy. The loop: touch the creature → watch the code change → take the code. The Style Lab (243 lines, already shipped) proves the team can build exactly this; the playground is Style Lab's pattern applied per-component. This single feature converts 66 static pages into 66 toys and is the largest interactivity upgrade available per unit of effort.

### 22.3 The Style Lab loop must close site-wide
Re-tinting in the Lab should restyle **the entire site for the session** — nav, docs, every component page — not just the Lab's preview pane. Then the exit: "Take it home" yields the generated CSS *and* the install command together. Full circle: arrive → touch specimens → reskin the whole habitat to your brand → leave with your theme and the install one-liner. That sequence is the conversion funnel disguised as a toy.

### 22.4 Demos that respond (the brand loop)
Closed-loop also means the *bit* is interactive, not just the components: the Field Reports block accepts submissions through the real `<Form/>` (validation and all) and answers with a facility-toast ("Your complaint has been fed to the goblin. ★☆☆☆☆"); the ornaments page's "Release one" button drops a random ornament onto the page with press physics; the 404 already does this correctly (the joke is a working button). Rule: every joke surface should have one operable element, because operating the joke is what makes visitors send the link to someone else.

### 22.5 What NOT to do
No fake terminals typing themselves, no autoplaying demo videos, no simulated cursors — those are *theater* of interactivity and read as the opposite of a working library. The whole point of the doctrine is that nothing on this site performs; everything functions.

---

## 23. Remaining items swept up in this pass
- `AccessibilityPage` still ships the "shame closet"-adjacent "Known caveat" card — confirmed for deletion under §13 rule 4 (absence, not apology).
- Repo root carries a `legacy/` directory — confirm it's excluded from the Pages artifact; delete from main if dead.
- Hero buttons, skip link, nav links: all reconfirmed broken in this pass via the shared-shell lens of §20 — the §20 demolition fixes them as a class, which is why §20 outranks patching them individually.

## 24. Updated execution order (final, supersedes §19 sequencing where they overlap)
1. **§20 demolition** — one AppShell, one nav, one footer, home becomes a route. (Kills the 404 class, the skip-link trap, dual navs, and version chaos in one move; pull the version from package.json while in there.)
2. **§21.1 ornament label fix** + renames (21.2) + stamp default renames (21.3) + full-grid ornament page (21.4).
3. **Deploy** the accumulated repo work (license, hosted install, voice json — wire voice json into component-catalog.ts first).
4. **§22.2 playgrounds** (start with Button/Card/Badge to establish the generated-controls pattern), then §22.1 chrome self-labeling, then §22.3 Lab loop closure.
5. Then resume the Part Two/Three backlog (depth tiers, blocks, dark mode, charts, docs shell, search) — all of which now land inside a coherent shell instead of on top of two fighting ones.

---
---

# PART FIVE — POST-REBUILD AUDIT: THE COHESION DISEASE HAS ONE NAME (v5)
**State:** repo + live deploy re-audited after the builder's execution sprint. The §20 demolition **happened and largely succeeded** — credit first, then the disease.

## 25. What the builder got right (verified in source and in the live bundle)
One `AppShell`, one nav, one footer; home is a route inside the shell; the nine-section teaser homepage shipped with the §13.4 copy nearly verbatim (Field Reports, Doctrine cards, FAQ, CTA); hero CTAs navigate; version renders from package.json; status creatures (LOOSE / IN THE ENCLOSURE / SIGHTED) are live; hosted install page with four package managers + "Catch it by hand"; per-component install tabs; prev/next pager on component pages; document titles per route; ⌘K SearchDialog exists; ornaments render from a paired name/component catalog (the §21.1 bug class is dead); playgrounds live for button/badge/card; Molt Log shipped. The 404-on-every-nav-click era is over. This is a different, dramatically better site.

## 26. The convolution you feel now is not IA anymore — it is **cascade accretion**
The information architecture is fixed. The remaining incoherence lives almost entirely in the styling layer, and it has a precise mechanism: **every regression was fixed by appending a new stylesheet on top, never by editing the one below.** Evidence:

1. **Nine stylesheets, five of them firefight patches** (`mobile-nav-fix`, `navigation-structure`, `night-role-repair`, `self-labels`, `ornaments-page`), with correctness depending on import order — the commit log says it out loud: "load final mobile nav overrides last," "load night role repair after all component styles," "load structural nav styles last." The site's appearance is now a function of line numbers in `main.tsx`.
2. **174 `!important` declarations** in the patch layers (77 in night-role-repair, 43 in mobile-nav-fix, 24 in self-labels, 16 in navigation-structure) vs **2** in the 1,023-line base. The cascade is at war with itself, and every future change must out-shout the last one.
3. **`.site-nav` is styled in eight of nine files** — nineteen rule references in night-role-repair alone. The nav has no owner. Changing it requires holding eight files and their load order in mind simultaneously — no agent (and no human) can do that reliably, which is *exactly* why the builder "sprints" on greenfield features and thrashes on anything touching shared chrome. The thrash is not a discipline problem; it's the codebase punishing edits to contested selectors.
4. **There are two dark modes stacked.** `dark-mode.css` (190 lines) paints night mode; `night-role-repair.css` (198 lines) re-paints it on top, correcting the first via 77 !importants. "Reimagine night palette" + "repair night role mapping" are corrective layers over a corrective layer.
5. **Root cause of the dark-mode war, found:** `feral.css` contains **~102 hardcoded light-mode color literals** (80× `#fff`, 12× `white`, assorted cream hexes) — components paint surfaces directly instead of through tokens. So dark mode *couldn't* be a token swap and degenerated into 388 lines of per-component overrides. Every future component will break night mode again until this is fixed at the source. The entire premise of the token grammar (one re-tintable habitat) is being violated by its own base stylesheet.
6. **Root cause of the mobile-nav war, found:** `.site-nav { overflow-x: auto }` clips any positioned children, so the menu/theme controls kept disappearing — and the builder fought the *symptom* across 3+ commits and 43 !importants ("force mobile nav controls outside clipped header") instead of deleting one property. One CSS declaration generated an entire patch file.
7. **Minor but compounding:** feature styles leak into chrome (`ornaments-page.css` and `self-labels.css` both restyle `.site-nav`); `theme-session.ts` and `scheme-session.ts` are distinct concerns (Lab tokens vs light/dark) with confusably twin names, plus night-role-repair painting color from a third direction; and **Roadmap is back in the public nav** with its own route, contra §16.3 — move it behind `/docs` or out.

## 27. THE CONSOLIDATION — one work order that ends the war
This is a refactor with zero visual-change ambition: same pixels, one-tenth the entropy.

1. **Tokenize the surfaces.** Define role tokens in `:root`: `--feral-surface` (was #fff), `--feral-surface-raised`, `--feral-paper-tint`, `--feral-ink-soft` (was #333), etc. Replace all ~102 color literals in `feral.css` with roles. Mechanical, grep-driven, low risk.
2. **Dark mode becomes a token remap.** One block — `[data-feral-scheme="dark"] { --feral-surface: …; --feral-ink: …; --feral-cream: …; }` — of roughly 30–50 lines. Then **delete both** `dark-mode.css` and `night-role-repair.css`. Keep the blacklight palette *values*; discard the 388 lines of per-component re-painting that carried them. Any component that still looks wrong in dark mode after the swap is using a literal somewhere — fix the literal, not the night layer.
3. **Fold the patch layers home.** Each surviving rule in `mobile-nav-fix`, `navigation-structure`, `self-labels`, `ornaments-page` either (a) becomes a token value, (b) moves into the owning component/chrome block in the base sheet, or (c) dies as obsolete. End state: **three files** — `tokens.css` (roles + scheme remap), `feral.css` (components + chrome, each selector defined exactly once), `pages.css` (route/template/marketing layouts). Alternatively one file with native `@layer tokens, base, components, chrome, pages` — either is fine; the invariant is *one definition site per selector*.
4. **Kill the nav's overflow.** Delete `overflow-x: auto` from `.site-nav`; mobile gets the Sheet menu (already built into AppShell) and desktop never needed to scroll. With the clip gone, most of mobile-nav-fix.css evaporates unconditionally.
5. **!important budget: ≤ 5 site-wide,** each with a comment explaining the third-party constraint that demands it. Currently 176. After steps 1–4 the survivors should be near zero naturally.
6. **Rename for sanity:** `scheme-session.ts` → `color-scheme.ts`, or merge both session modules into one `theme.ts` exposing `{ tokens, scheme }`. Color must enter the page from exactly two places: token values and scheme attribute.
7. **Roadmap out of the nav** (route can live, unlinked, or under /docs).

**Acceptance:** light and dark render correctly with `dark-mode.css` and `night-role-repair.css` deleted; `grep -c '!important'` ≤ 5; `grep -c '#fff\|white'` in component styles = 0; `.site-nav` matches rules in exactly one file; reordering CSS imports produces zero visual change (the true test that the cascade war is over).

## 28. AGENT GUARDRAILS — why the builder thrashes, and the law that stops it
The sprint/stall pattern you're seeing is structural: an agent mid-task doesn't hold the whole cascade, so when an edit to shared chrome regresses something, the *locally safest* move is to append an override — which globally is the most destructive move available. It will keep happening on any shared surface until the repo states its invariants. Add **`docs/CSS-LAW.md`** and paste it into every styling task brief:

1. **No new stylesheet files.** Three exist (tokens / feral / pages); additions require explicitly amending this law first.
2. **Edit the definition, never append an override.** Every selector has exactly one home; fixes happen at the home.
3. **No `!important`.** If a fix seems to need one, STOP and report the conflicting rule instead of out-shouting it — that report is the actual bug.
4. **No color literals outside tokens.css.** Components consume roles only.
5. **Chrome selectors (`.site-nav`, `.site-footer`, shell layout) may only be touched in the chrome section,** never from feature work.
6. **Dark mode is token values only.** If a component misbehaves in dark mode, the bug is a literal in the component, by definition.
7. **One concern per commit** (already happening — keep it), and any commit message containing "load X last," "final override," or "force" is an automatic signal the change is wrong.

These seven lines are the cheapest fix in this entire document: they convert the builder's failure mode from silent accretion into loud, reviewable reports.

## 29. Run order
1. §27 consolidation (steps 1–4 are one focused session; do it BEFORE any new visual feature, because every feature shipped onto the current cascade deepens the eventual dig-out).
2. §28 law file committed and added to the builder's standing prompt.
3. Then resume the open backlog in this order: remaining playgrounds (the button/badge/card pattern is proven — roll it across the catalog), docs-shell sidebar for /components and /docs, block families (§12), charts (§11 Tier A), template exit ramps (§10), ornament renames (§21.2–21.3).

---
---

# PART SIX — MICRO-UX, NAV ANATOMY, AND THE PRESET PROBLEM (v6)

## 30. Style Lab: the site-wide question, answered, and the preset sameness, quantified

**Is it site-wide? Yes — already.** `theme-session.ts` writes token values onto `document.documentElement` and persists them in localStorage; `main.tsx` imports it before anything else, so a chosen theme survives route changes and reloads and restyles every page. The SITE-WIDE sticker is telling the truth. **The reason it doesn't *feel* site-wide is that the presets are too timid to notice from across the room.**

**The sameness, measured.** All 11 presets share one fixed hue scheme: ink is near-black in every preset (#050505–#161616), cream is warm paper in every preset, pink stays hot pink (#d93682–#ff2bbd — a hue swing of a few degrees), acid stays acid-green, ultra stays blue-violet, cyan stays cyan, tang stays orange. **Eleven presets, zero hue decisions.** What actually varies: saturation nudges and slider shuffles (border 2–6, tilt 0–2.8, pattern 8–80, radius 0–999). "Birthday Lawsuit" vs "Default Feral" is pink #ff2d9b → #ff1493 plus 2px of border — imperceptible at arm's length. Only three presets are distinguishable at all (Mall Kiosk's pill radius, Court-Ordered's flatness, the grit contrast mode). In design-theory terms: these are **microvariations in value/saturation within a single fixed palette**, when a preset system's job is to occupy *different palette strategies*. The hue wheel — the most powerful and cheapest variance axis available — is currently treated as an invariant.

## 31. RADICAL PRESETS WITH COHESION — the constraint model and ten paste-ready themes

**First, define the brand's actual invariants** (what makes any theme still read as feral): hard ink-role borders on everything; offset hard shadows (no blur); visible dashed focus; the seven role slots; the press physics; one broken rule per creature. **Everything else is a free axis:** hue scheme, palette *strategy* (how many hues, what relationship), background polarity (light vs dark paper), geometry pole (radius 0 ↔ pill, border hairline ↔ slab), tilt sign and magnitude, pattern flavor and intensity, contrast mode. Radical-inside-the-leash means: move MANY free axes in one *coordinated* direction per preset, never touch the invariants. Each preset is a named **school**, built on a classical palette strategy:

| Preset | Strategy (the theory) | cream / ink | pink / acid / ultra / cyan / tang | Geometry |
|---|---|---|---|---|
| **Default Feral** | house clash (keep) | #fff4e0 / #0a0a0a | #ff2d9b / #bfff00 / #3d2bff / #00e5ff / #ff8a00 | b4 r10 t1.5 p45 |
| **Ransom Note** | achromatic + one signal | #f2f2ee / #000000 | #ff0040 / #e8e8e0 / #1a1a1a / #bdbdb5 / #ff0040 | b6 r0 t2.6 p85 grit |
| **Pool Party Violence** | analogous cool + hot accent; **ink goes navy** | #e8fbff / #002033 | #ff3d00 / #00ffc8 / #0051ff / #00e5ff / #ffd500 | b3 r999 t1 p25 |
| **Riso Misprint** | duotone (palette collapses to two inks) | #fff6ec / #1d1aa3 | #ff5f1f / #ff5f1f / #1d1aa3 / #1d1aa3 / #ff5f1f | b4 r6 t1.8 p90 grit |
| **Midnight Shift** | **polarity flip** — dark paper, light ink | #12101c / #f4f1ff | #ff7ad9 / #d4ff4f / #8c7bff / #5ef2ff / #ffb14d | b4 r10 t1.5 p35 |
| **De Stijl Tantrum** | primary triad, zero tilt, slab borders | #f7f7f2 / #111111 | #e10600 / #ffd400 / #0033cc / #0033cc / #e10600 | b8 r0 t0 p0 |
| **Swamp Cabinet** | desaturated earth analogous | #efe8d3 / #1c1a12 | #c84b1f / #9aa825 / #3f5d3a / #7fae9e / #b8860b | b5 r2 t1.2 p60 grit |
| **Waiting Room** | high-key pastel (the ironic one) | #ffffff / #2b2b2b | #ffb3d9 / #d6ff9e / #b3b9ff / #aef4ff / #ffd9a8 | b2 r14 t.4 p6 quiet |
| **Hazard Pay** | industrial complementary; **background goes yellow** | #ffc800 / #0a0a0a | #ff2d00 / #ffffff / #1a1aff / #e8e8e8 / #ff2d00 | b7 r0 t1 p50 high |
| **VHS Séance** | neon-on-dark, low-key | #1f0a24 / #ffe9f8 | #ff36c7 / #7dff5e / #b14dff / #4dfff0 / #ff9e4d | b4 r8 t2 p70 grit |

Every row keeps every invariant — same borders, same shadows, same physics — and yet no two rows could be mistaken for each other at thumbnail size. That's the whole assignment: *the leash holds while the animal changes species.*

**Three small token additions multiply the radicalism for cheap:**
1. `--feral-shadow-tone` — which role colors the hard shadows (currently effectively fixed). Riso shadows in its second ink; Hazard in red; De Stijl in pure black. Coordinated shadow chroma is the difference between "recolored" and "redesigned."
2. **Background polarity as a first-class preset property** — Midnight Shift and VHS Séance work by swapping the cream/ink *roles*, which requires the §27 tokenization to be complete (with 102 hardcoded `#fff`s, dark-paper presets will break; after tokenization they're free). Decide the interaction rule: a polarity preset suspends the scheme toggle (the preset *is* a polarity) rather than fighting it.
3. `--feral-font-display` / `--feral-font-body` slots with three shipped stacks (current pair; a black-weight poster stack; an all-mono "Printer Jam" pair). A font swap is the single largest perceived change per byte; even two presets using it will make the system feel vast. Phase 2 — webfont weight is the only cost.

**Mechanize the standard ("radical leaps" as a lint):** add a script next to build-registry that computes pairwise preset distance — hue-angle deltas across the seven roles plus normalized slider deltas — and **fails if any preset sits within threshold of another** (rule of thumb: a preset must move ≥4 of 7 hues by ≥40° OR flip polarity OR collapse palette arity, AND move ≥3 geometry axes by ≥40% of range). Sameness becomes a CI failure instead of a vibe you have to catch by eye. This is the guardrail that stops the builder from regenerating eleven shades of the same pink.

## 32. NAV & MENU MICRO-AUDIT (from the live mobile screenshot + source)

1. **The mobile breakpoint isn't firing.** Your phone screenshot shows the full desktop nav — six text links + "Search ⌘K" + "GH GitHub" — compressed into one strip with tap targets far below the 44px floor. The Sheet-based mobile menu exists in code (`MobileNavControls`) but at this width you're getting `DesktopNavControls`. Verify the breakpoint and the (post-§27) cascade; this is likely another casualty of the override war.
2. **"⌘K" rendered on a touch device** is noise from another input modality — show a search icon alone on touch/coarse pointers; keep the shortcut hint desktop-only.
3. **"GH GitHub"** is a stuttered label (icon-abbreviation + word). Use the GitHub mark alone, `aria-label="GitHub"`.
4. **No scheme toggle is visible in the nav at all** — dark mode shipped but its switch isn't reachable from the chrome in this build.
5. **Why the nav feels lazy:** not the item count (neobrutalism also runs seven) but that the top bar is the *only* navigation level in the entire product — six flat text links with no grouping, no icons, no second level anywhere, so every concern is forced to be a top-level page. Neobrutalism's top nav stays calm because the **docs sidebar** does the organizational work underneath it (Getting Started / Styling / sectioned component list). **Fix — add the second level, then shrink the top:** top nav becomes `Docs · Components · Templates` + icon cluster (search, GitHub, scheme toggle, version). Everything else lives in a persistent grouped sidebar under Docs/Components: *Getting started* (Install, Theming, Accessibility, Molt Log) / *Style* (Style Lab, Ornaments) / *Creatures* (components grouped by layer: primitives, radix, composites) / *Surfaces* (Blocks, Templates). Style Lab and Ornaments stay one click deep but stop crowding the chrome. "Too many pages" resolves itself — the pages are fine; they were all standing in the doorway.

## 33. PAGE-ANATOMY FIXES (the "tacked-on" feeling, itemized from the Style Lab screenshot)

1. **The double hero.** The route wrapper prints "Build a look without letting the goblin drive" + description, then the StyleLab feature prints its *own* second hero ("Style Lab: the whole site is the preview now") + description, saying the same thing 200px apart. This wrapper-plus-feature stacking is the exact mechanical source of "comprehensive but tacked-on": the feature was dropped into a page template that already speaks. **Rule: a route owns exactly one hero.** Tool routes (Style Lab, Ornaments) suppress the RoutePage hero and let the feature speak; catalog routes keep the wrapper hero and contain dumb grids only.
2. **The arch panels clip their own content.** "Presets" and its helper text collide with the arch's curve — a 200px top radius creates dead corners the padding ignores. Either give arch panels `padding-top ≥ radius × 0.4` or flatten the arch below ~720px. (Decorative geometry must never eat copy — that's an invariant, not a taste call.)
3. **The eyebrow badge bleeds to the viewport edge** while body content is inset — one element off-grid reads as a defect, not a choice. Align it to the content column (or bleed it *fully* and deliberately, hazard-tape style — half-bleed is the only wrong answer).
4. **Preset chips are an unordered pile** — ten chips wrapping 1–2 per row at random widths. Order them by strategy family (house → light schemes → dark schemes → ironic), equal-width 2-col grid on mobile, and give each chip a 3-dot hue preview of its palette so choosing is visual, not lexical.
5. **The color rows read as progress bars, not controls.** ink/cream/pink rendered as horizontal bars inside input-shaped boxes have no editing affordance. Use the standard pattern: square swatch + hex field + native color input behind the swatch.
6. **Slider labels mix registers inconsistently** — "Border mass: 4px" (value), "Radius collision: pill outbreak" (bit), "Tilt intensity: 2.2°" (value). System: label = name, value rendered right-aligned, and the *bit appears as the value at the poles* ("radius: 999 — pill outbreak", "tilt: 0 — sedated"). The joke becomes the measurement instead of replacing it.
7. **The right column dies after the preview card** — one card, then a long fall of empty paper. Stack it: session-theme card → a specimen strip (button, input, badge, toast trigger — *operable*, per §22) → the CSS output block with copy. The Lab's exit (take the CSS home) should be visible without scrolling past a void.
8. **Sticky chrome + long tool pages:** add a "Reset to Default Feral" affordance near the presets (escape hatch builds courage to experiment — people go radical when undo is visible).

## 34. THE LAYOUT GRAMMAR — the cure for "too simple and too complicated at once"
The site currently has exactly two layout ideas — hero-plus-grid, and whatever each feature brings with it — which is why pages feel simultaneously thin (catalog pages are one grid) and overstuffed (tool pages are two systems fighting). Declare **three layout archetypes** and assign every route one, the same way every component gets one broken rule:

- **MARKETING** (home only): full-bleed stacked sections, collage energy, no sidebar.
- **CATALOG** (components index, templates index, blocks, docs index): wrapper hero + filterable grid + pager. Dumb on purpose.
- **TOOL/DOC** (Style Lab, Ornaments, component detail, docs pages): persistent §32 sidebar + single feature-owned header + content + prev/next. The feature owns the voice; the frame owns the navigation.

This is the parallel of the token grammar at the layout level — **Aesthetic = Surface × Architecture × Behavior** was always your matrix; the site has been shipping Surface and Behavior while leaving Architecture implicit. Make it explicit and the "cohesion between nav, layouts, and sections" stops being a feeling you have to police, because it's a property the system enforces.

## 35. Run order for this part
1. §33.1 double-hero rule + §32 nav icon cluster fixes (hours, high visibility).
2. §31 preset replacement table + distance lint (depends on §27 tokenization for the two dark-paper presets; ship the eight light ones immediately).
3. §32 docs sidebar / second navigation level + §34 archetype assignment (one structural session).
4. §33 remaining micro-fixes (arches, chips, swatches, sliders, right column) in a single polish pass.
5. Phase 2: shadow-tone token, font slots, polarity rule.
