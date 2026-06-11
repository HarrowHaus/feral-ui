# Build log — v0.2

## Completed

- Fixed TypeScript config for current TypeScript module resolution.
- Added React type dependencies and Vite type declarations.
- Added Radix dependencies.
- Added `cmdk` for Command.
- Added 13 new component source files.
- Exported all new components through `src/components/ui/index.ts`.
- Added CSS for overlays, menus, command, progress, slider, tables, skeleton, menubar, navigation menu, and template preview surfaces.
- Expanded the dogfood site with:
  - Radix behavior lab
  - Command preview
  - Progress/slider preview
  - Template preview surface
  - Table inventory preview
- Verified production build with `npm run build`.

## Still not done

- No registry JSON yet.
- No shadcn CLI install route yet.
- No full docs routing.
- No calendar/date-picker.
- No combobox.
- No data table logic.
- No chart layer.
- No dashboard sidebar.
- No form adapter layer.
- No dark/high-contrast theme package.

## Next build unit

Build the docs/product site shape:

- `/docs`
- `/docs/components/button`
- `/docs/components/dialog`
- `/docs/blocks`
- `/docs/templates`
- reusable component-page layout
- preview/code split panel
- source-truth warnings for unpublished registry items

Then add the first real block files:

- marketing hero
- navbar
- pricing grid
- FAQ
- auth/login
- dashboard shell
