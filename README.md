# feral/ui

**Controlled Variance UI for React.**

A loud, source-owned component-system experiment for shadcn-style projects: ink-heavy borders, pressure shadows, clashing radii, pattern surfaces, rude documentation, and engineering receipts.

> The components are loud. The tokens are disciplined. The goblin is on a leash.

## Status

`feral/ui` is currently a **pre-release product basis**, not a published npm package and not a hosted shadcn registry yet.

Current working basis from the build thread:

- routed preview/docs app
- 65 local UI registry records
- 72 total generated registry records
- Style Lab theme-generator seed
- 40+ ornament exports
- eight template-preview route patterns
- local registry and fresh-app smoke scripts

This repo now contains the public preview bootstrap. The full source-library package continues from the local v0.6 build and will be landed into the repository in the next source-sync pass.

## Preview

GitHub Pages workflow is included. Once Pages is enabled for GitHub Actions, the preview target is:

```txt
https://harrowhaus.github.io/feral-ui/
```

Local preview:

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Build:

```bash
npm run build
```

## What is Controlled Variance UI?

Most UI kits try to make every component agree. `feral/ui` makes components disagree **inside a controlled grammar**:

| Axis | Meaning |
|---|---|
| Ink | black border mass, focus rings, hard separation |
| Pressure | offset shadows and press-down interaction |
| Collision | square, rounded, and pill radii intentionally coexisting |
| Signal | loud color tokens with semantic restraint |
| Surface | dots, stripes, checks, and odd texture fills |
| Tilt | small rotation as a controlled accent, not layout collapse |
| Density | compact/default/chunky surfaces for real app use |

The visual layer is allowed to act like it found a coupon for chaos. The interaction layer has to behave like a professional adult with a mortgage.

## Brand voice law

Tongue-in-cheek is allowed. Fake proof is not.

Allowed:

- mean little docs jokes
- self-roasting component copy
- honest registry status
- loud labels with clean semantics

Banned:

- fake install commands
- fake testimonials
- fake accessibility claims
- pretending the registry is hosted before it is hosted
- startup fog-machine prose

## Competitive target

`feral/ui` is being built to compete with the category depth of libraries like neobrutalism.dev, 8bitcn, and pxlkit without copying their aesthetic lane.

Positioning:

```txt
shadcn default = neutral source base
neobrutalism = blunt offset-shadow rebellion
8bitcn = retro game interface language
pxlkit = pixel-art product toolkit
feral/ui = controlled-variance maximalist registry
```

## Current build priorities

1. land full v0.6 source package into repo
2. harden Calendar + DatePicker range mode
3. harden Toast provider/hook
4. harden Carousel controls and keyboard movement
5. harden Sidebar mobile/collapsible behavior
6. deepen all eight template previews
7. run public registry install smoke tests

## Repository map

```txt
src/                  preview app source
src/styles/           feral token grammar
.github/workflows/    GitHub Pages preview workflow
docs/                 build notes and phase blueprints
```

## License

MIT. Use it, mutate it, keep the receipts.
