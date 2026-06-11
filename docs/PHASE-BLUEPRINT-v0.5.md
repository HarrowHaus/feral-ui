# feral/ui competitive phase blueprint after v0.5

## Current state

v0.5 is a local, build-verified product basis with:

- 65 UI registry source files
- 5 block registry records
- 1 template catalog registry record
- generated local registry index
- route-backed docs shell seed
- Style Lab seed
- Ornament Pack seed
- preview/code docs primitives
- fresh-app materialization smoke test

## Phase 1 — Remote registry truth

Build a hosted registry path and test it from a clean app. Public install copy is banned until this passes.

Acceptance:

```bash
pnpm dlx shadcn@latest add https://feral-ui.com/r/button.json
pnpm dlx shadcn@latest add https://feral-ui.com/r/dialog.json
pnpm dlx shadcn@latest add https://feral-ui.com/r/block-marketing.json
pnpm build
```

## Phase 2 — Route real site

Replace the single scroll page with route-backed pages:

- `/docs`
- `/docs/installation`
- `/docs/styling`
- `/components/[slug]`
- `/blocks/[slug]`
- `/templates/[slug]`
- `/themes`
- `/style-lab`
- `/ornaments`
- `/showcase`
- `/changelog`

Acceptance: every component in the registry has a docs page with preview, code, source path, dependencies, accessibility notes, and related components.

## Phase 3 — Hard component pass

Harden the components that currently exist as basis pieces:

- Sortable/filterable DataTable
- Calendar range picker
- DateRangePicker
- Toast provider/hook
- Carousel controls
- Resizable drag handles
- Chart adapter layer
- Mobile sidebar/drawer

Acceptance: build full dashboard, settings, auth, docs, pricing, article, and data-table pages using only feral components.

## Phase 4 — Blocks and templates

Add enough previewable blocks/templates to make the library useful immediately.

Targets:

- 30+ blocks
- 8 full templates
- isolated full-screen preview routes
- code and registry records for each

## Phase 5 — Style Lab moat

Turn the seed into a real theme builder:

- color controls
- radius controls
- pressure controls
- pattern controls
- density controls
- CSS output
- Tailwind snippet output
- registry base output
- shareable preset state

## Phase 6 — Ornament moat

Expand the ornament pack:

- 40+ SVG ornaments
- React components
- copyable SVG source
- configurable stroke/fill
- docs examples
- marketing/template integration

## Phase 7 — Trust receipts

Add release-grade checks:

- keyboard checklist
- axe/a11y script
- reduced-motion audit
- color contrast mode
- visual regression snapshots
- mobile viewport smoke
- registry remote install smoke

## Phase 8 — Public release surface

Finish:

- README
- LICENSE
- CHANGELOG
- CONTRIBUTING
- SECURITY
- comparison page
- launch announcement
- showcase submission path
- sponsor/support area

The product wins when strangers can laugh at the copy, install the components, inspect the source, tune the style, preview full templates, and trust the receipts.
