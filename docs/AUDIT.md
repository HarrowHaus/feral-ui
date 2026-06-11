# Audit: static seed → real library basis

## Strongest parts of the original seed

The original page has a strong dogfood shape: sticky nav, component collage, hero, marquee, feature argument, customization demo, testimonials, FAQ, CTA, and footer. The component collage is the correct lead because a UI library must demonstrate itself through real UI surfaces, not moodboard wallpaper.

The central instinct is also strong: every settled convention gets broken on one axis per component. Borders vary. Shadows become chromatic. Radii clash. Pattern fills appear. Rotations creep in. Press motion binds the page together.

## Main problems fixed in this repo

### 1. No fake CLI

The seed had install-style copy. This repo removes fictional distribution promises. The site now says the honest thing: run the local source, inspect components, and publish later only when the code earns it.

### 2. No fake Radix claim

The seed claimed Radix/WAI-ARIA underneath. The source was static HTML/CSS. This repo does not claim Radix behavior until Radix-backed components are actually added.

### 3. Transform bug fixed

The seed's `.press:hover` overwrote `transform`, causing rotated components to snap straight on hover. The new CSS composes translate and rotate through variables:

```css
.feral-press {
  --feral-x: 0px;
  --feral-y: 0px;
  --feral-tilt: 0deg;
  transform: translate(var(--feral-x), var(--feral-y)) rotate(var(--feral-tilt));
}
```

### 4. Brand framing hardened

The public style is no longer framed as a child of another style. The locked category is **controlled variance**. Tongue-in-cheek jokes are allowed, but fake social proof, fake install commands, and fake accessibility are banned.

## Current gap

This is still not a 50-component rival library. It is the first real repo basis with a component vocabulary, dogfood app, docs, and system grammar. Next implementation units should add Radix-backed overlays, menus, popovers, dialogs, tables, sidebars, charts, blocks, and template pages.
