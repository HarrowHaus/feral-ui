# Style grammar: controlled variance

## Definition

Feral UI is a controlled-variance design system. Components may mutate across several visual axes, but the axes are named, tokenized, and capped.

## Constitution

1. **Ink stays authoritative.** Black borders keep the surface readable.
2. **Pressure is universal.** Pressable elements depress with hard offset motion.
3. **Variance is tokenized.** Visual weirdness comes from tokens, not random one-offs.
4. **Role stays obvious.** A button must still read as a button. A field must still read as a field.
5. **Humor stops at trust.** Do not joke about install, accessibility, or behavior that does not exist.

## Axes

| Axis | Tokens | Use |
|---|---|---|
| Ink | `--feral-ink`, border widths | Universal contour and hierarchy |
| Pressure | `--feral-pressure-*`, `--feral-shadow-color` | Interaction unity |
| Collision | radius tokens | Shape contrast across component types |
| Signal | pink, acid, ultra, verm, cyan, violet, tang | Loud accents and semantic grouping |
| Surface | dots, stripes, check, zap | Pattern as accent, not wallpaper |
| Tilt | `--feral-tilt` | Handmade volatility, capped to small degrees |
| Density | size and spacing choices | Allows dashboards and docs, not only marketing |

## Mutation budget

A component should usually mutate on **one to three axes**.

Good:

- Button: acid fill + hard pressure + pill radius.
- Alert: ultra fill + pill radius + chromatic shadow.
- Card: square radius + tang fill + left tilt.

Bad:

- Every component has every pattern, every color, tilt, and mixed typography.
- Nothing aligns.
- Controls stop looking like controls.

## Interaction rule

Press motion must compose with rotation:

```css
transform: translate(var(--feral-x), var(--feral-y)) rotate(var(--feral-tilt));
```

Never overwrite transform in hover state.

## Typography

- Display/body: Bricolage Grotesque
- Utility/code-ish labels: Space Grotesk
- No decorative font pileups until the component library has earned complexity.

## Color posture

Saturation is intentional. Harmony is not the primary goal. Recognition is.

The palette should feel like:

- acid label gun
- dollar-store hazard signage
- arcade cabinet sticker sheet
- municipal form stamped by someone having a weird day

But all text contrast must remain defensible.
