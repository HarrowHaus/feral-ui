# Build log v0.3 — product-basis completion pass

## What changed

v0.3 pushes feral/ui beyond a homepage/component sampler into a publishable-product basis:

- Added parity components that were previously only listed as future inventory.
- Added reusable block source files under `src/blocks`.
- Added component documentation catalog data under `src/docs/component-catalog.ts`.
- Added template preview catalog under `src/templates/template-catalog.tsx`.
- Rebuilt the dogfood site around real imported components, blocks, docs data, and template previews.
- Kept the registry honest: still parked until generated registry item files are validated.

## Source inventory

- UI component files: **48**
- Block source files: **5**
- Component catalog: `src/docs/component-catalog.ts`
- Template catalog: `src/templates/template-catalog.tsx`
- Main dogfood app: `src/App.tsx`
- Core style sheet: `src/styles/feral.css`

## Added component/source exports

- Alert Dialog
- Context Menu
- Avatar
- Separator
- Scroll Area
- Toggle
- Toggle Group
- Input Group
- File Upload
- Calendar
- Date Picker
- Combobox
- Bar Chart / Sparkline
- Stat Card
- Data Table
- Sidebar layout
- Form Section / Error Summary
- Carousel
- Empty State
- Aspect Ratio
- Resizable Panels basis
- Toast Stack / Toast basis

## Added blocks

- Marketing Hero
- Pricing
- Login/Auth
- Dashboard Shell
- Docs Layout
- Blog Index
- Changelog
- Empty State

## Verification

Ran:

```bash
npm install
npm run build
```

Result: production build completed successfully.

## Honest limitations

This is not a published registry yet. It is now a real source basis for one.

Components marked as `basis` are usable previews and scaffolds, but need deeper production hardening before public registry distribution:

- Calendar/date picker: no date-fns adapter, range mode, disabled dates, locale matrix, or timezone testing yet.
- Data table: no sorting/filtering/pagination state machine yet.
- Chart: CSS chart basis only, no Recharts/Visx adapter yet.
- Resizable panels: CSS resize basis, not a drag-handle primitive.
- Toast: static live region basis, not a full Sonner adapter.
- Carousel: scroll-snap basis, no controls/keyboard model yet.
