# feral/ui kit v0.5

Controlled Variance UI for React: loud visuals, named mutation axes, Radix/cmdk behavior where it matters, generated local registry item files, route-backed docs shell seed, Style Lab, Ornament Pack, and no fake install-command séance.

## Run locally

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## Build + registry checks

```bash
npm run build
npm run registry:build
npm run smoke:registry
npm run smoke:fresh-app
```

The v0.5 package has been build-verified, registry-smoke-verified, and fresh-app-materialization-smoke-verified locally.

## What this is

A serious local source basis for a shadcn-style component library and dogfood website. The dogfood app imports the same components, blocks, template catalog, docs primitives, and Style Lab it demonstrates.

v0.5 adds:

- route-backed docs/product shell seed
- component docs page pattern
- preview/code split primitives
- copy button
- Style Lab with presets, sliders, color controls, live preview, and CSS output
- Ornament Pack seed
- generated UI, block, and template registry records
- fresh-app materialization smoke script

## What this is not yet

A published npm package or hosted shadcn registry. Generated files under `public/r` and `registry/items` are local structural registry receipts. Public install commands become allowed only after remote registry install tests pass.

## Source map

- `src/components/ui` — UI components, docs primitives, ornaments, and Radix adapters
- `src/features/docs-shell.tsx` — route-backed docs shell seed
- `src/features/style-lab.tsx` — Style Lab seed
- `src/blocks` — reusable page blocks
- `src/docs/component-catalog.ts` — docs-page data basis
- `src/templates/template-catalog.tsx` — live template preview basis
- `src/styles/feral.css` — token grammar and component CSS
- `scripts/build-registry.mjs` — local registry item generator
- `scripts/smoke-registry.mjs` — structural registry smoke test
- `scripts/smoke-fresh-app.mjs` — materializes registry files into `.smoke/fresh-app`
- `registry/registry.json` — generated registry index
- `public/r/*.json` — generated registry item files for local serving
- `docs/BUILD-LOG-v0.5.md` — latest build log
- `docs/PHASE-BLUEPRINT-v0.5.md` — next competitive execution graph

## Voice law

Tongue-in-cheek is allowed. Fake proof is not. The goblin gets jokes. The docs need receipts. If the words say “Radix,” “registry,” “accessible,” or “install,” the code has to show up wearing pants.
