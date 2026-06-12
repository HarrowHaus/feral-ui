# Composition Overhaul v0.8

## Diagnosis

The site is not suffering from isolated nav bugs. It has two architectures fighting each other.

### Architecture A

The original one-page dogfood homepage:

- its own nav
- anchor hash links
- embedded component browser
- embedded template browser
- embedded Style Lab
- embedded blocks/gallery/docs material
- footer/version copy from an older build

### Architecture B

The newer routed product site:

- hash routes
- routed nav
- dedicated pages for components, docs, blocks, templates, Style Lab, ornaments, install, accessibility, changelog
- separate footer/version copy

The conflict is literal. Architecture A writes hashes like `#components`. Architecture B reads the hash as a route and expects `#/components`. The router wins and sends the user to 404.

## Verdict

This needs a composition demolition, not a redesign.

Keep the visual system. Delete the duplicate architecture.

## New law

Architecture B is the site.

The homepage is a front door, not the entire product.

If a thing has a route, the homepage may tease it, but may not contain a second working version of it.

## Target structure

One shared shell wraps every page, including home:

- one nav
- one footer
- one version source
- one command/search surface
- one theme state
- one route model

Home becomes one route inside that shell.

## Homepage target

Hero -> Collage -> Doctrine -> Behavior Lab -> Style Lab teaser -> Template teaser -> Field Reports -> FAQ -> CTA -> Footer

Nine sections. Every section demonstrates or jokes. None confesses.

## Remove from public homepage

- inline component docs browser
- inline full Style Lab app
- inline template browser
- Productization Lab
- Competitive Audit
- Matrix
- Blueprint
- Repo section
- any public install anxiety copy
- any source/receipt/truth sermon copy

Their content belongs in docs, not the front page.

## Immediate defect class this kills

- homepage nav links going to 404
- skip link going to 404
- hero CTAs being inert
- duplicate nav vocabularies
- component browser showing button placeholders
- stale version labels
- public roadmap leakage

## AppShell requirements

The shared shell must include:

- `feral/ui` home link -> `#/`
- Docs -> `#/docs`
- Components -> `#/components`
- Blocks -> `#/blocks`
- Templates -> `#/templates`
- Charts -> `#/charts` once charts land
- Style Lab -> `#/style-lab`
- Ornaments -> `#/ornaments`
- Install -> `#/docs/installation`
- Search trigger using Command
- GitHub link
- theme toggle once dark mode lands
- version badge from package.json

No nav item should use raw section hashes.

## Component docs rule

There is only one component docs system.

Both route pages and any homepage teaser must consume:

- `src/docs/component-voice.json`
- `ComponentShowcase`
- `componentContent`

Delete the old `DocsPreview` fallback once migration is complete.

## Closed-loop doctrine

No screenshots. No descriptions. Only specimens.

Every behavioral claim should be operable within one viewport of where it is made, and every interaction should either:

- teach through live code
- brand through a creature response
- convert by giving the user code

## Acceptance journey

A first-time visitor on a phone can:

1. land on the homepage
2. tap any nav item
3. reach a working route
4. open search
5. find Button
6. read a non-boilerplate description
7. preview a real component, not a generic button
8. copy a working hosted install command

No dead CTAs. No accidental 404. No duplicate version numbers.
