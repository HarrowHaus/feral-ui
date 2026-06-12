# Audit Execution Graph

Source audit: `FERAL-UI-COMPETITIVE-AUDIT-2026-06-11.md`

This is not a timeline. It is the build order that turns the deployed dogfood app into an installable public library.

## Finished product basis

The target is a public component library with:

- a working hosted shadcn registry
- usable install docs
- real component docs, not generated placeholders
- app-grade sidebar, form, toast, chart, carousel, select, drawer, and resizable components
- a block library large enough to power templates
- live template routes plus take-home template artifacts
- dark mode
- search
- route/share polish
- Voice Law v2 applied across all public surfaces

## Gate 0 — stabilize the current repo

### Build units

1. Remove duplicate imports and local patch artifacts.
2. Run the core commands cleanly:

```bash
npm run registry:build
npm run build
```

3. Commit generated registry output when it changes.
4. Confirm GitHub Pages still deploys the real Vite app from `dist`.

### Acceptance

- `npm run build` passes locally.
- GitHub Actions passes.
- `https://harrowhaus.github.io/feral-ui/#/` loads the React app.
- `https://harrowhaus.github.io/feral-ui/r/button.json` returns current registry output.

## Gate 1 — legal and install unlock

### Build units

1. Add MIT `LICENSE`.
2. Add hosted registry smoke test:
   - create fresh Vite React app in temp dir
   - run shadcn CLI against `https://harrowhaus.github.io/feral-ui/r/button.json`
   - build the fresh app
   - fail if imports, paths, or dependencies do not materialize
3. Fix registry path mapping if needed:
   - current output targets `src/components/ui/...`
   - consumer apps may expect `components/ui/...`
   - `../../lib/cn` imports may need alias-safe generation
4. Flip Installation page only after hosted smoke passes.

### Acceptance

- A clean app can install at least `button`, `card`, `dialog`, and `data-table` from hosted URLs.
- Installation page has real command tabs.
- Manual install tab exists.
- No public copy narrates integrity or apologizes for readiness.

## Gate 2 — Voice Law v2 public copy pass

### Build units

1. Treat `docs/VOICE-LAW-v2.md` as the public voice contract.
2. Use `src/docs/component-voice.json` as the component one-liner source.
3. Wire docs pages and registry descriptions to that source.
4. Rename status badges everywhere:
   - `built` -> `LOOSE`
   - `basis` -> `IN THE ENCLOSURE`
   - `planned` -> `SIGHTED`
5. Remove banned words from public UI copy unless inside internal docs:
   - honest
   - fake
   - receipt
   - earned
   - hallucinate
   - theater
   - séance
6. Replace testimonial gag with Field Reports.
7. Remove public homepage project-log sections:
   - Productization Lab
   - Competitive Audit
   - Matrix
   - Blueprint

### Acceptance

- Homepage shape is: Hero -> Collage -> Doctrine -> Behavior Lab -> Style Lab teaser -> Field Reports -> FAQ -> CTA -> Footer.
- No public homepage section reads like implementation notes.
- Registry descriptions use component one-liners.
- Component pages do not show generated catalog boilerplate.

## Gate 3 — docs credibility pass

### Build units

1. Wire component-specific previews for every component page.
2. Replace public catalog notes with bespoke descriptions.
3. Add import snippets.
4. Add install snippets once hosted smoke passes.
5. Add previous/next navigation to component docs.
6. Add docs search using the existing Command component.
7. Add upstream reference links where useful.

### Acceptance

- No component page falls back to a button demo unless the component is actually Button.
- Every component page includes:
  - description
  - preview
  - usage
  - source path
  - dependency notes
  - accessible behavior note
  - previous/next navigation
- Search opens from nav and finds components, blocks, templates, docs pages.

## Gate 4 — Tier A component depth

Build these before adding more decorative inventory.

### Sidebar

Target: real app shell component.

Required:

- `SidebarProvider`
- controlled and uncontrolled state
- expanded, icon-rail collapsed, hidden modes
- mobile Sheet behavior below 768px
- Cmd/Ctrl+B toggle
- localStorage persistence
- Header/Content/Footer/Group/Menu primitives
- active item state
- badge slot
- nav landmark
- `aria-current` support

Acceptance:

- Dashboard template uses it.
- Docs shell uses it.
- Works at 360px and 1440px.

### Form

Required:

- generated ids
- label/help/error chaining through `aria-describedby`
- `aria-invalid`
- `FormMessage`
- ErrorSummary entries focus offending fields
- submit pending/success/error states
- pick either react-hook-form adapter or minimal validation context

Acceptance:

- Auth blocks use real validation.
- Settings form block uses it.

### Toast

Required:

- live region
- stacking
- max-visible handling
- overflow count
- pause on hover/focus
- dismiss
- action slot
- promise helper if low-cost

Acceptance:

- Toast demo uses provider.
- Field Reports or templates use toast pigeons without custom one-offs.

### Chart

Required:

- Recharts wrapper
- `ChartContainer`
- feral SVG pattern fills
- thick ink strokes
- hard offset shadow, no blur
- tooltip
- legend
- bar, stacked bar, line, area, pie/donut, radar demos
- Charts route

Acceptance:

- Dashboard template stat panels use chart components.
- New charts route exists.

## Gate 5 — Tier B canon gap closure

### Build units

1. Carousel on embla-carousel.
2. Resizable on react-resizable-panels.
3. Radix Select while keeping native select as `SelectNative`.
4. Drawer on vaul.
5. Collapsible on Radix Collapsible.
6. Calendar keyboard pass:
   - arrow movement
   - Home/End
   - PageUp/PageDown
   - role grid semantics
7. DatePicker presets:
   - Today
   - Last 7
   - Last 30
   - This month
8. OTP verification:
   - paste distribution
   - auto-advance
   - backspace retreat
   - screen-reader announcement

### Acceptance

- Components marked `LOOSE` meet the global depth rule.
- Components that do not meet it are `IN THE ENCLOSURE`.

## Gate 6 — block library expansion

Blocks are the forcing function for real component depth.

### Dashboard family first

1. App shell
2. Stats row
3. Chart panel
4. Activity feed
5. Data table page
6. Settings form
7. Empty/error pair

### Marketing family

1. Collage hero
2. Manifesto hero
3. Product-shot hero
4. Logo/word marquee
5. Feature grid
6. Pricing table
7. Field Reports wall
8. FAQ accordion
9. CTA slab
10. Footer

### Auth family

1. Login card
2. Signup card
3. Forgot password
4. OTP verification
5. Split-panel auth layout

### Content family

1. Article layout
2. Blog index grid
3. Changelog feed / Molt Log
4. Doc page
5. Search command overlay

### Commerce family

1. Product card grid
2. Product detail
3. Cart drawer
4. Checkout summary

### Acceptance

- Every block is mobile-safe at 360px.
- Every block is a `registry:block` item.
- Every block is consumed by at least one template route.
- Blocks use tokens, not hardcoded one-off colors.

## Gate 7 — template exit ramps

### Build units

1. Keep live template routes.
2. Add take-home action to every template route:
   - install command, or
   - generated zip download
3. Generate template registry items or starter zips at build time.
4. Add template-mode smoke test:
   - fresh Vite app
   - materialize template
   - build

### Acceptance

- Every template can be viewed live.
- Every template can be taken home.
- Every take-home template passes a clean build.

## Gate 8 — dark mode and style modes

### Build units

1. Add `[data-feral-scheme="dark"]` token block.
2. Add nav toggle copy: `Lights out. They can see in the dark.`
3. Add Style Lab support for dark output.
4. Convert presets into role-based visual modes:
   - Default Feral
   - Invoice Goblin
   - Candy Lawsuit
   - Basement Flyer
   - Public School Portal
   - Emergency Broadcast
   - Court-Ordered Minimal
   - Mall Kiosk Apocalypse
   - Sticker Shop
   - Spreadsheet Mutant
   - Night Shift Docs
5. Make preview content change by preset role:
   - Emergency Broadcast previews warning banner
   - Spreadsheet Mutant previews table/chart
   - Sticker Shop previews product card
   - Night Shift Docs previews docs/code surface

### Acceptance

- Dark mode works across homepage, docs, component pages, templates, Style Lab.
- Presets look meaningfully different by role, ratio, and use case.

## Gate 9 — route, search, and sharing polish

### Build units

1. Replace hash-only public pages with static route support or SPA redirect.
2. Add route-specific titles and descriptions.
3. Add favicon.
4. Add OG image.
5. Add social card metadata.
6. Add GitHub link/star surface in nav.
7. Add Showcase / Built with feral page seeded with Harrow Haus properties.

### Acceptance

- Component routes can be shared with meaningful previews.
- Search indexes docs/components/templates/blocks.
- Repo contribution loop is visible.

## Gate 10 — category play

### Build units

1. Public route defining controlled variance.
2. Keep it practical, not poetic:
   - visual rules
   - token grammar
   - interaction constraints
   - examples
   - when not to use it
3. Link from docs, not as the main homepage argument.
4. Add optional `tailwind-bridge` registry item.

### Acceptance

- Feral owns a named style category without making the homepage a manifesto.
- Tailwind users have an incremental adoption path.

## Current next action

Do Gate 0 and Gate 1 before any more visual expansion.

Immediate commands:

```bash
npm run registry:build
npm run build
```

Then add MIT license and hosted registry smoke.
