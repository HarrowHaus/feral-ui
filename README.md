# feral/ui

Components raised by wolves. Housebroken by Radix. Leashed by tokens. Released into your codebase.

feral/ui is a React component kit for landing pages, dashboards, docs, forms, shops, blogs, and apps that need more personality than a compliance webinar.

## Install a component

```bash
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json
```

More creatures:

```bash
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/card.json
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/dialog.json
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/data-table.json
```

## Preview

```txt
https://harrowhaus.github.io/feral-ui/
```

## Run locally

```bash
npm install --registry=https://registry.npmjs.org --no-audit --no-fund
npm run dev -- --host 0.0.0.0
```

## Build checks

```bash
npm run registry:build
npm run build
npm run smoke:registry
npm run smoke:fresh-app
npm run smoke:hosted-registry
```

## What is included

- React/Vite dogfood site
- hosted shadcn registry output under `/r`
- component source under `src/components/ui`
- route-backed docs shell
- live template previews
- reusable blocks
- Style Lab
- ornament pack
- component voice one-liners
- MIT license

## Source map

- `src/components/ui` — UI components, docs primitives, ornaments, and Radix adapters
- `src/docs/component-voice.json` — single source for public component one-liners
- `src/docs/component-catalog.ts` — docs-page data basis
- `src/features/style-lab.tsx` — Style Lab
- `src/templates/template-catalog.tsx` — live template preview catalog
- `src/blocks` — reusable page blocks
- `src/styles/feral.css` — token grammar and component CSS
- `scripts/build-registry.mjs` — registry item generator
- `scripts/smoke-hosted-registry.mjs` — hosted install smoke test
- `docs/VOICE-LAW-v2.md` — public voice law
- `docs/AUDIT-EXECUTION-GRAPH.md` — build gate graph

## Voice law

Useful component library with a goblin in the margins. Not a manifesto with a component demo attached.

MIT licensed. Raised under duress. No animals were beiged in the making of this library.
