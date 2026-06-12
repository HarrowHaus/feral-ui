# Installation

## Releasing a component into your codebase

One command. It installs its own source. It knows the way home — the way home is your `components/ui` folder now.

## npm

```bash
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json
```

## pnpm

```bash
pnpm dlx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json
```

## yarn

```bash
yarn dlx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json
```

## bun

```bash
bunx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json
```

## More creatures

```bash
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/card.json
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/dialog.json
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/data-table.json
```

## Catch it by hand

```bash
curl https://harrowhaus.github.io/feral-ui/r/button.json
```

## Side effects include

Visible focus rings, chromatic shadows, and your design lead asking to hop on a quick call.

## Smoke test

The hosted registry smoke script creates a fresh Vite React app, installs selected registry items from the live GitHub Pages URLs, and builds the fresh app.

```bash
npm run smoke:hosted-registry
```

Passed items:

- `feral-style`
- `button`
- `card`
- `dialog`
- `data-table`
