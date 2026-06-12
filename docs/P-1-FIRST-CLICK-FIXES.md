# P-1 First Click Fixes

These outrank feature work.

## 1. One shared navigation component

Replace `Nav` and `ProductNav` with one shared nav.

Required links:

- `#/`
- `#/docs`
- `#/components`
- `#/blocks`
- `#/templates`
- `#/style-lab`
- `#/ornaments`
- `#/docs/installation`

Future link:

- `#/charts`

No raw `#section` links in the nav.

## 2. Skip link

The skip link must not mutate the hash.

Use a real main target:

```tsx
<a className="feral-skip" href="#main">Skip to main content</a>
<main id="main" tabIndex={-1}>...</main>
```

The router must not treat `#main` as a route.

Preferred implementation: skip link uses `onClick` + `scrollIntoView` and prevents default hash navigation.

## 3. Hero CTAs

No inert hero buttons.

- Open the cages -> `#/components`
- See the damage -> `#/templates`
- Release one -> `#/docs/installation`

## 4. Unknown docs slug

Unknown docs slugs must route to 404.

Do not silently render Installation for unrecognized docs pages.

## 5. Version constant

Render package version from one constant.

No more v0.5/v0.6/v0.7 archaeology layers.

## 6. Component browser

Delete the old button-fallback browser path.

Every component preview must use either:

- the component itself, or
- `ComponentShowcase`

A non-button component may not render as a generic Button preview.

## 7. Search placeholder

Remove fake search copy.

Either wire Command search or do not render a search-looking control.

## 8. Public copy ban

Public UI copy may not use these as personality words:

- fake
- receipt
- truth
- honesty
- hallucinate
- theater
- séance

Internal docs may still use them when discussing tests or audits.

## Acceptance

On phone and desktop:

- every nav item opens a working route
- every hero CTA opens a working route
- skip link does not 404
- component pages do not show button placeholders
- install page shows hosted commands
- version is consistent
