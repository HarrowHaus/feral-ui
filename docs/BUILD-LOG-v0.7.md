# BUILD LOG v0.7

## Scope

Hard component pass 2: upgraded basis-level app components into more usable primitives.

## Added / hardened

- Calendar now supports `mode="range"`, disabled-date predicates, keyboard arrow movement, range start/end/in-range states, and richer ARIA labels.
- DatePicker now closes on single selection and forwards disabled dates.
- DateRangePicker added as a first-class export.
- ToastProvider + `useToast` added, with stacking, dismiss, action button, duration handling, and tone variants.
- Carousel now has context, previous/next controls, dots, keyboard arrow movement, scroll-to-slide behavior, and slide count.
- Sidebar now has mobile toggle, collapse button, sections, footer, icon slots, active state, and collapsed labels.
- Dogfood app demos now use the hardened components.

## Verification

- `npm run build` passed locally.
- Registry scripts are expected to regenerate records from the updated source files.

## Caveat

This is still local registry proof, not a hosted public registry. Public install claims remain banned until hosted URL smoke tests pass.
