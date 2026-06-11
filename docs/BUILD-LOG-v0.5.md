# feral/ui v0.5 build log

## What changed

v0.5 executes the first competitive blueprint unit after v0.4. The package is no longer only a component inventory and dogfood scroll page. It now contains the first product infrastructure needed to compete with neobrutalism.dev, 8bitcn, and pxlkit.

## Added

- Route-backed docs shell seed inside the dogfood app.
- Component-page pattern with docs nav, preview panel, code tabs, source path tab, and accessibility receipt callout.
- `CopyButton`, `PreviewFrame`, and `CodeTabs` docs primitives.
- Feral Ornament Pack seed: `FeralBurst`, `FeralSplat`, `FeralArrow`, and `FeralStamp`.
- Feral Style Lab seed with token presets, live preview, sliders, color controls, CSS output, and copy button.
- Stronger registry generator:
  - generates UI item records
  - generates block item records
  - generates template catalog item
  - emits local registry dependencies
  - keeps `feral-style` as a first-class registry item
- Fresh-app materialization smoke script.

## Scripts verified

```bash
npm install
npm run build
npm run registry:build
npm run smoke:registry
npm run smoke:fresh-app
```

## Registry status

The registry is structurally generated and materialized into `.smoke/fresh-app`. This validates item paths, dependency references, and file payloads. It is still not a hosted public shadcn registry, so public install commands remain forbidden until remote install smoke tests pass.

## Competitive meaning

v0.5 moves feral/ui from “source library foundation” to “product-system foundation.” The moat is now visible:

- controlled-variance style grammar
- funny-but-honest documentation voice
- live Style Lab
- ornament layer
- registry-generation receipts
- preview/code docs primitive

Still missing: full routed site, public registry hosting, deeper templates, a11y automation, visual regression, and final release surface.
