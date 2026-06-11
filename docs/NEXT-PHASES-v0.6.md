# Next phases after v0.6

## Phase A — Fresh app registry install proof

Create Vite and Next fixture apps under `.smoke/`, install representative local registry items, and run builds.

Acceptance:

```bash
npm run registry:build
npm run smoke:registry
npm run smoke:fresh-app
npm run smoke:vite-app
npm run smoke:next-app
npm run build
```

## Phase B — Hard component pass 2

Finish deeper production behavior for:

- Calendar range mode
- DateRangePicker
- Toast provider/hook examples
- Carousel controls and keyboard movement
- Sidebar mobile drawer/collapsible state
- Command palette dialog integration
- Chart adapter boundary

## Phase C — Template depth

Expand each template from preview surface into multi-section pages with isolated preview routes and source metadata.

## Phase D — Public release receipts

Add README, LICENSE, CONTRIBUTING, CHANGELOG, ROADMAP, SECURITY, CODE_OF_CONDUCT, accessibility checklist, and comparison page.
