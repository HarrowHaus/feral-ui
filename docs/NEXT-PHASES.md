# Next execution blueprint after v0.4

## Unit 1 — Fresh-app registry proof

Acceptance criteria:

- Create a clean Vite or Next app outside the repo.
- Serve local `public/r/*.json` from the dogfood app or static server.
- Install at least 12 generated components into the fresh app.
- Confirm imports, CSS, `cn`, Radix dependencies, and build all work.
- Only then write public install docs.

## Unit 2 — Route-backed docs

Acceptance criteria:

- `/docs`
- `/docs/installation`
- `/docs/styling`
- `/docs/components/[name]`
- `/blocks`
- `/templates`
- Preview/code tabs per page.
- Copy button per code block.

## Unit 3 — Hard component upgrade

Acceptance criteria:

- Sortable/filterable DataTable.
- Calendar/date picker with disabled dates and range mode.
- Chart adapter story.
- Toast provider/hook.
- Carousel controls.
- True resizable panel handles.
- Breadcrumb, Callout, CodeBlock integrated into docs.

## Unit 4 — Moat

Acceptance criteria:

- Feral Style Lab: interactive token editor producing CSS variable snippets.
- Feral Ornament Pack: SVG stickers, splats, warning glyphs, arrows, stamps.
- Optional: component mutation visualizer that shows the axes per component.

## Unit 5 — Release receipts

Acceptance criteria:

- Keyboard audit document.
- axe pass or equivalent automated a11y check.
- Mobile screenshots.
- Visual regression baseline.
- LICENSE, CONTRIBUTING, CHANGELOG.
- Public README without jokes that obscure setup.
