# Build log — v0.4

## Goal

Push the kit closer to a publishable rival basis instead of a pretty dogfood homepage.

## Added

- Docs/productization components:
  - Breadcrumb
  - ButtonGroup
  - Kbd
  - InlineCode
  - CodeBlock
  - Callout
  - Banner
- Status/flow components:
  - Spinner
  - Meter
  - Stepper
  - Timeline
- Presentation and theme components:
  - ThemeSelector
  - ImageCard
  - AvatarGroup
- Dogfood app sections:
  - Productization lab
  - Nth-degree component expansion
  - Competitive audit table
  - v0.4 metrics strip
- Registry tooling:
  - `scripts/build-registry.mjs`
  - `scripts/smoke-registry.mjs`
  - generated `registry/registry.json`
  - generated `public/r/*.json`
  - generated `registry/items/*.json`

## Verified

```bash
npm install
npm run build
npm run registry:build
npm run smoke:registry
```

## Truth label

The registry files are now real local JSON artifacts, but they are not a public install guarantee. Next proof step is fresh-app install testing, not more homepage confetti.
