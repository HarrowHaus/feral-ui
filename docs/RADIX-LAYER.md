# Radix behavior layer — v0.2

This layer is where feral/ui stops being a landing-page skin and starts becoming a serious shadcn-style component basis.

## What changed

Added Radix-backed adapters for behavior-heavy UI:

- Dialog
- Sheet
- Popover
- Tooltip
- Hover Card
- Dropdown Menu
- Menubar
- Navigation Menu
- Progress
- Slider
- Command via `cmdk`

Also added source-only primitives:

- Table
- Skeleton

## Rule

The visual layer is allowed to be obnoxious. The behavior layer is not.

If a component needs focus trapping, portal layering, roving tabindex, keyboard navigation, typeahead, or ARIA state, do not fake it. Use a primitive underneath and put feral/ui styling on top.

## Public copy rule

You may now say these specific components use Radix primitives. You may not say the whole library is Radix-backed until the full parity set is implemented.

Approved copy:

> Dialog, Sheet, Popover, Tooltip, Hover Card, Dropdown Menu, Menubar, Navigation Menu, Progress, and Slider are wrapped around Radix primitives.

Banned copy:

> Every feral/ui component is accessible by default.

Better copy:

> Behavior-heavy components use Radix primitives where the interaction contract matters. Simpler controls use native elements until they need more machinery.
