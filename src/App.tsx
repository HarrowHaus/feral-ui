import * as React from "react";
import { Search, Menu } from "lucide-react";
import pkg from "../package.json";
import {
  Accordion,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Callout,
  CalloutDescription,
  CalloutTitle,
  CodeBlock,
  CodeTabs,
  Combobox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DataTable,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Field,
  FieldHelp,
  Input,
  Label,
  OtpInput,
  Pagination,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Switch,
  SwitchRow,
  Tabs,
  TooltipProvider,
} from "./components/ui";
import { componentCatalog } from "./docs/component-catalog";
import { ComponentShowcase, componentContent } from "./docs/component-showcase";
import { ComponentPlayground } from "./features/component-playground";
import { OrnamentsRoute } from "./features/ornaments-page";
import { StyleLab } from "./features/style-lab";
import { ThemeSelector } from "./features/theme-selector";
import { templateCatalog } from "./templates/template-catalog";

const VERSION = `v${pkg.version}`;
const playgroundSlugs = new Set(["button", "badge", "card"]);
// Top nav shrinks to three; everything else lives in the grouped sidebar.
const topNav = [
  { label: "Docs", href: "#/docs" },
  { label: "Components", href: "#/components" },
  { label: "Templates", href: "#/templates" },
];

type Archetype = "marketing" | "catalog" | "tool-doc";
type Crumb = { label: string; href?: string };
type NavLink = { label: string; href: string; status?: string };
type NavSection = { title: string; links?: NavLink[]; subgroups?: { label: string; links: NavLink[] }[] };

// Standalone doc pages, keyed by /docs/<slug>.
const docPages: Record<string, { title: string; desc: string; metaTitle?: string }> = {
  installation: { title: "Releasing a component into your codebase.", desc: "One command. It installs its own source — the way home is your components/ui folder now." },
  theming: { title: "Theming: one file holds the leash.", desc: "Every axis of variance is a token. Re-tint the whole habitat by editing tokens.css; nothing else declares a color." },
  accessibility: { title: "Boring semantics. Radioactive sticker sheet.", desc: "The interaction layer behaves like a professional adult with a mortgage." },
  changelog: { title: "Molt Log: things grew limbs.", desc: "Release notes for a library that keeps escaping its enclosure." },
  distemper: { title: "Distemper", desc: "Feral formalism for the web.", metaTitle: "Distemper — feral formalism for the web" },
};

const layerLabels: Record<string, string> = { primitive: "Primitives", radix: "Radix-backed", composite: "Composite", "block-helper": "Block helpers", ornament: "Ornaments" };
const creatureSubgroups = Object.keys(layerLabels)
  .map((layer) => ({ label: layerLabels[layer], links: componentCatalog.filter((c) => c.layer === layer).map((c) => ({ label: c.name, href: `/components/${c.slug}`, status: c.status })) }))
  .filter((group) => group.links.length > 0);

const navSections: NavSection[] = [
  { title: "Getting started", links: [
    { label: "Install", href: "/docs/installation" },
    { label: "Theming", href: "/docs/theming" },
    { label: "Accessibility", href: "/docs/accessibility" },
    { label: "Molt Log", href: "/docs/changelog" },
    { label: "Distemper manifesto", href: "/docs/distemper" },
  ] },
  { title: "Style", links: [
    { label: "Style Lab", href: "/style-lab" },
    { label: "Ornaments", href: "/ornaments" },
  ] },
  { title: "Creatures", subgroups: creatureSubgroups },
  { title: "Surfaces", links: [
    { label: "Blocks", href: "/blocks" },
    { label: "Templates", href: "/templates" },
  ] },
];

// Flattened nav order drives the prev/next pager on tool-doc pages.
const flatNav: NavLink[] = navSections.flatMap((section) => section.links ?? section.subgroups?.flatMap((group) => group.links) ?? []);

function readRoute() {
  const raw = window.location.hash.replace(/^#/, "");
  return raw.startsWith("/") ? raw : "/";
}

function navigate(path: string) {
  window.location.hash = path;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/\+/g, " plus ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function statusLabel(status: string) {
  if (status === "built") return "LOOSE";
  if (status === "basis") return "IN THE ENCLOSURE";
  if (status === "planned") return "SIGHTED";
  return status.toUpperCase();
}

function useHashRoute() {
  const [route, setRoute] = React.useState(readRoute);
  React.useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

function setMetaTag(key: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Per-route meta: document title plus OG/description tags, derived from the
// resolved route. The Distemper page carries an explicit metaTitle.
function useRouteMeta(resolved: Resolved, route: string) {
  React.useEffect(() => {
    const isHome = resolved.archetype === "marketing";
    const title = resolved.metaTitle ?? (isHome ? "feral/ui — Distemper, feral formalism for the web" : `${resolved.title} — feral/ui`);
    const description = resolved.desc || "feral/ui — Distemper: feral formalism for the web. Controlled-variance React + Radix components, tokens, and a live Style Lab.";
    document.title = title;
    setMetaTag("description", description);
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("twitter:title", title);
  }, [route]);
}

function NavMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild><button className="site-menu-button" type="button"><Menu size={18} /> Menu</button></SheetTrigger>
      <SheetContent>
        <SheetHeader><SheetTitle>feral/ui</SheetTitle><SheetDescription>Pick an enclosure.</SheetDescription></SheetHeader>
        <div className="site-sheet-nav">
          {navSections.map((section) => (
            <div key={section.title} className="site-sheet-group">
              <h4>{section.title}</h4>
              {section.links?.map((link) => <a key={link.href} className="site-sheet-link" href={`#${link.href}`}>{link.label}</a>)}
              {section.subgroups?.map((group) => (
                <React.Fragment key={group.label}>
                  <h5>{group.label}</h5>
                  {group.links.map((link) => <a key={link.href} className="site-sheet-link" href={`#${link.href}`}>{link.label}</a>)}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function GithubMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.3-5.47-5.79 0-1.28.47-2.33 1.24-3.15-.13-.3-.54-1.5.11-3.13 0 0 1.01-.32 3.3 1.2.96-.26 1.98-.39 3-.4 1.02.01 2.04.14 3 .4 2.28-1.52 3.29-1.2 3.29-1.2.65 1.63.24 2.83.12 3.13.77.82 1.23 1.87 1.23 3.15 0 4.5-2.81 5.49-5.49 5.78.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.23 0 .31.21.68.83.56C20.57 21.88 24 17.48 24 12.29 24 5.78 18.63.5 12 .5z" />
    </svg>
  );
}

function DesktopNavControls({ onSearch }: { onSearch: () => void }) {
  return (
    <span className="site-nav-right site-nav-desktop-controls">
      <button className="site-search" type="button" onClick={onSearch}><Search size={13} /> <span className="site-search-label">Search</span> <kbd className="site-kbd-hint">⌘K</kbd></button>
      <a className="site-search site-icon-link" href="https://github.com/HarrowHaus/feral-ui" aria-label="GitHub"><GithubMark /></a>
      <ThemeSelector variant="desktop" className="site-search" />
      <span className="site-version" title="still feral">
        <span className="site-version-dot" aria-hidden="true" />{VERSION}
      </span>
    </span>
  );
}

function MobileNavControls() {
  return <span className="mobile-control-rail"><ThemeSelector variant="icon" /><NavMenu /></span>;
}

function AppShell({ route }: { route: string }) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const resolved = resolveRoute(route);
  useRouteMeta(resolved, route);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <TooltipProvider>
      <a className="feral-skip" href="#main">Skip to content</a>
      <header className="site-nav" data-feral-shell="true">
        <a className="site-mark" href="#/" aria-label="feral/ui home"><span className="site-mark-dot" /> feral/ui</a>
        <nav className="site-nav-links" aria-label="Primary">
          {topNav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <DesktopNavControls onSearch={() => setSearchOpen(true)} />
        <MobileNavControls />
      </header>
      <main id="main" tabIndex={-1}><ArchetypeShell resolved={resolved} /></main>
      <Footer />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </TooltipProvider>
  );
}

function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const docs = [
    { label: "Installation", href: "/docs/installation" },
    { label: "Accessibility", href: "/docs/accessibility" },
    { label: "Molt Log", href: "/docs/changelog" },
    { label: "Roadmap", href: "/roadmap" },
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Command</DialogTitle>
          <DialogDescription>⌘K and it fetches. Good palette. Best palette.</DialogDescription>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search components, templates, docs..." />
          <CommandList>
            <CommandEmpty>No tiny doors found.</CommandEmpty>
            <CommandGroup heading="Components">
              {componentCatalog.slice(0, 18).map((item) => <CommandItem key={item.slug} onSelect={() => { navigate(`/components/${item.slug}`); onOpenChange(false); }}>{item.name}</CommandItem>)}
            </CommandGroup>
            <CommandGroup heading="Templates">
              {templateCatalog.map((item) => <CommandItem key={item.name} onSelect={() => { navigate(`/templates/${slugify(item.name)}`); onOpenChange(false); }}>{item.name}</CommandItem>)}
            </CommandGroup>
            <CommandGroup heading="Docs">
              {docs.map((item) => <CommandItem key={item.href} onSelect={() => { navigate(item.href); onOpenChange(false); }}>{item.label}</CommandItem>)}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function Footer() { return <footer className="site-footer"><p><strong>feral/ui</strong> — MIT licensed. Raised under duress. No animals were beiged in the making of this library.</p></footer>; }
function HomePage() { return <><Hero /><ComponentCollage /><Doctrine /><BehaviorTeaser /><StyleLabTeaser /><TemplateTeaser /><FieldReports /><FAQ /><CTA /></>; }
function Hero() { return <section className="site-hero"><div className="site-eyebrow"><Badge tone="pink">{VERSION}</Badge><Badge tone="paper">Distemper — feral formalism</Badge></div><h1>Components raised<br />by <span className="site-highlight pink">wolves.</span></h1><p>Housebroken by Radix. Leashed by tokens. Released into your codebase.</p><div className="site-hero-actions"><Button tone="ink" size="lg" onClick={() => navigate("/components")}>Open the cages</Button><Button tone="pink" size="lg" tilt="left" onClick={() => navigate("/templates")}>See the damage</Button><Button tone="paper" size="lg" onClick={() => navigate("/docs/installation")}>Install one</Button></div></section>; }

function ComponentCollage() {
  const rows = [{ component: "Button", state: "LOOSE", mode: "press physics" }, { component: "Dialog", state: "LOOSE", mode: "Radix" }, { component: "Calendar", state: "IN THE ENCLOSURE", mode: "date math" }];
  return <section className="site-collage" aria-label="Component collage"><Card tilt="left" radius="none"><CardHeader><CardTitle>Login to your account</CardTitle><CardDescription>Calmer than it looks. Still wearing the traffic cone.</CardDescription></CardHeader><CardContent className="site-stack"><Field><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="you@feral.dev" /></Field><Field><Label htmlFor="password">Password</Label><Input id="password" type="password" placeholder="••••••••" /><FieldHelp>Password managers welcome. We are loud, not foolish.</FieldHelp></Field></CardContent><CardFooter><Button tone="acid">Login</Button><Button tone="paper">Google</Button></CardFooter></Card><Alert tone="ultra"><AlertIcon>⚡</AlertIcon><div><AlertTitle>Saved.</AlertTitle><AlertDescription>The beige committee has been notified and is coping poorly.</AlertDescription></div></Alert><Accordion items={[{ title: "Is it accessible?", content: "Yes. The chaos is strictly visual. Keyboards are sacred ground.", defaultOpen: true }, { title: "Why does it tilt?", content: "It heard something." }]} /><Card tone="acid" radius="none"><CardHeader><CardTitle>OTP code</CardTitle><CardDescription>Six boxes. One tiny security ritual.</CardDescription></CardHeader><CardContent><OtpInput length={6} label="Demo OTP code" /></CardContent></Card><Tabs items={[{ id: "law", label: "Law", content: "One broken rule per creature." }, { id: "leash", label: "Leash", content: "Every axis is a token." }, { id: "beige", label: "Beige", content: "Beige is a choice. So is this." }]} /><Card tone="pink"><CardContent className="site-stack"><SwitchRow><Switch defaultChecked /> Feral mode</SwitchRow><SwitchRow><Switch /> Domesticated</SwitchRow></CardContent></Card><Card tone="ultra" radius="none"><CardHeader><CardTitle>Data table</CardTitle><CardDescription>Sorts, filters, paginates, selects rows, holds grudges.</CardDescription></CardHeader><CardContent><DataTable data={rows} columns={[{ key: "component", header: "Component" }, { key: "state", header: "State" }, { key: "mode", header: "Mode" }]} /></CardContent></Card><Card tone="tang"><CardHeader><CardTitle>Combobox</CardTitle><CardDescription>A dropdown that went to grad school.</CardDescription></CardHeader><CardContent><Combobox options={[{ value: "acid", label: "Acid" }, { value: "pink", label: "Pink" }, { value: "ultra", label: "Ultra" }]} /></CardContent></Card><Card><CardContent><Pagination /></CardContent></Card></section>;
}

function Doctrine() { return <section className="site-section" id="doctrine"><h2>One broken rule per creature.</h2><p className="site-section-intro">Every component violates exactly one settled convention — a tilt, a clash, a chromatic shadow. Variance with a leash.</p><div className="site-section-action"><Button tone="ink" onClick={() => navigate("/docs/distemper")}>Read the manifesto</Button></div><div className="site-grid"><Card tone="acid" radius="none"><CardHeader><CardTitle>The leash is a token.</CardTitle><CardDescription>Every axis of chaos is a named CSS variable.</CardDescription></CardHeader><CardContent>Re-tint the whole habitat from one file.</CardContent></Card><Card tone="pink"><CardHeader><CardTitle>Loud face, quiet hands.</CardTitle><CardDescription>The visuals are off-leash.</CardDescription></CardHeader><CardContent>Keyboard, focus, and screen-reader behavior are trained professionals.</CardContent></Card><Card tone="ultra" radius="none"><CardHeader><CardTitle>Beige is a choice.</CardTitle><CardDescription>So is this.</CardDescription></CardHeader><CardContent>Not every interface needs to dress like a payroll portal.</CardContent></Card><Card tone="tang"><CardHeader><CardTitle>Take the source.</CardTitle><CardDescription>The registry is live.</CardDescription></CardHeader><CardContent><Button tone="paper" onClick={() => navigate("/docs/installation")}>Release one</Button></CardContent></Card></div></section>; }
function BehaviorTeaser() { return <section className="site-section"><h2>Raised by wolves. Housebroken by Radix.</h2><p className="site-section-intro">Dialogs, sheets, menus, hover cards, tooltips, command search, and popovers are the grown-up bones under the loud jacket.</p><div className="site-grid">{componentCatalog.filter((item) => ["dialog", "dropdown-menu", "command", "tooltip"].includes(item.slug)).map((item) => <ComponentCard key={item.slug} item={item} />)}</div></section>; }
function StyleLabTeaser() { return <section className="site-section"><h2>Style Lab: let the tokens touch the furniture.</h2><p className="site-section-intro">Same component family, different jobs: docs, dashboards, shops, warnings, forms, and tiny product disasters.</p><Card tone="acid" radius="none"><CardHeader><CardTitle>Preview modes</CardTitle><CardDescription>Emergency Broadcast, Night Shift Docs, Sticker Shop, Spreadsheet Mutant.</CardDescription></CardHeader><CardContent className="site-mini-grid">{["Emergency Broadcast", "Night Shift Docs", "Sticker Shop", "Spreadsheet Mutant"].map((label) => <Button key={label} tone="paper">{label}</Button>)}</CardContent><CardFooter><Button tone="pink" onClick={() => navigate("/style-lab")}>Open the Lab</Button></CardFooter></Card></section>; }
function TemplateTeaser() { return <section className="site-section"><h2>Templates with doors out.</h2><p className="site-section-intro">Live previews stay in the habitat. Take-home artifacts come next.</p><div className="site-grid">{templateCatalog.slice(0, 3).map((template) => <Card key={template.name} tone="paper"><CardHeader><CardTitle>{template.name}</CardTitle><CardDescription>{template.description}</CardDescription></CardHeader><CardFooter><Button tone="acid" onClick={() => navigate(`/templates/${slugify(template.name)}`)}>View template</Button></CardFooter></Card>)}</div><div className="site-section-action"><Button tone="pink" onClick={() => navigate("/templates")}>Browse all templates</Button></div></section>; }
function FieldReports() { const reports = [["The button bit me.", "The button is up to date on its shots."], ["My design system had a panic attack.", "We sent flowers. Beige ones. As a warning."], ["I pressed ⌘K and something FETCHED.", "Good palette. Best palette."]]; return <section className="site-section"><h2>Field Reports.</h2><p className="site-section-intro">Complaints from the facility. Official responses included because the goblin cannot be trusted with stationery.</p><div className="site-grid">{reports.map(([complaint, response]) => <Card key={complaint} tone="paper"><CardHeader><Badge tone="pink">★☆☆☆☆</Badge><CardTitle>{complaint}</CardTitle></CardHeader><CardContent><strong>Facility response:</strong> {response}</CardContent></Card>)}</div></section>; }
function FAQ() { return <section className="site-section"><h2>FAQ</h2><Accordion items={[{ title: "Is it accessible?", content: "Yes. The chaos is strictly visual. Keyboards are sacred ground, focus rings are non-negotiable, and the screen reader gets the boring version of the truth.", defaultOpen: true }, { title: "Can I use this in production?", content: "Legally, yes — MIT. Spiritually, that is between you and whoever approves your PRs." }, { title: "Why do some components tilt?", content: "They heard something." }, { title: "Can I make it match my brand?", content: "The Style Lab re-skins every creature from one set of tokens. Your brand, but feral." }]} /></section>; }
function CTA() { return <section className="site-section site-cta"><h2>Release one.</h2><p>Start with Button. If it behaves, try Dialog. Do not feed Card after midnight.</p><CodeBlock>{`npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json`}</CodeBlock></section>; }

function ComponentCard({ item }: { item: typeof componentCatalog[number] }) { const content = componentContent(item); return <Card><CardHeader><Badge tone={item.status === "built" ? "acid" : "tang"}>{statusLabel(item.status)}</Badge><CardTitle>{item.name}</CardTitle><CardDescription>{content.description}</CardDescription></CardHeader><CardFooter><Button tone="paper" onClick={() => navigate(`/components/${item.slug}`)}>Open</Button></CardFooter></Card>; }

/* ── content renderers (no page hero; the archetype shell frames them) ── */
function ComponentsIndex() { return <div className="route-card-grid">{componentCatalog.map((item) => <ComponentCard key={item.slug} item={item} />)}</div>; }
function ComponentDetailBody({ item }: { item: typeof componentCatalog[number] }) {
  const content = componentContent(item);
  const isPlayground = playgroundSlugs.has(item.slug);
  const specimen = isPlayground ? <ComponentPlayground slug={item.slug} /> : <ComponentShowcase slug={item.slug} />;
  return (
    <div className={isPlayground ? "site-stack" : "route-two-col"}>
      <Card><CardHeader><Badge tone={item.status === "built" ? "acid" : "tang"}>{statusLabel(item.status)}</Badge><CardTitle>{isPlayground ? "Live specimen" : "Specimen"}</CardTitle><CardDescription>{item.file}</CardDescription></CardHeader><CardContent>{specimen}</CardContent></Card>
      <CodeTabs tabs={[{ id: "usage", label: "Usage", code: content.usage }, { id: "install", label: "Install", code: `npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/${item.slug}.json` }, { id: "a11y", label: "Behavior", code: content.accessibility }]} />
    </div>
  );
}
function DocsIndex() { return <div className="route-card-grid">{navSections.flatMap((s) => s.links ?? []).filter((l) => l.href.startsWith("/docs/")).map((l) => <Card key={l.href}><CardHeader><CardTitle>{l.label}</CardTitle><CardDescription>{docPages[l.href.split("/")[2]]?.desc}</CardDescription></CardHeader><CardFooter><Button tone="acid" onClick={() => navigate(l.href)}>Open</Button></CardFooter></Card>)}</div>; }
function InstallationBody() { return <div className="route-two-col"><CodeTabs tabs={[{ id: "npm", label: "npm", code: "npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json" }, { id: "pnpm", label: "pnpm", code: "pnpm dlx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json" }, { id: "yarn", label: "yarn", code: "yarn dlx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json" }, { id: "bun", label: "bun", code: "bunx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json" }, { id: "manual", label: "Catch it by hand", code: "curl https://harrowhaus.github.io/feral-ui/r/button.json" }]} /><Card tone="pink"><CardHeader><CardTitle>Side effects include:</CardTitle><CardDescription>Visible focus rings, chromatic shadows, and your design lead asking to hop on a quick call.</CardDescription></CardHeader><CardContent><CodeBlock>{`npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/card.json
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/dialog.json
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/data-table.json`}</CodeBlock></CardContent></Card></div>; }
function ThemingBody() { return <div className="site-stack"><Card tone="acid" radius="none"><CardHeader><CardTitle>The muzzle is one file</CardTitle><CardDescription>tokens.css holds every color and the dark-scheme remap. feral.css and pages.css consume roles only — they never declare a literal.</CardDescription></CardHeader><CardContent className="feral-token-grid">{["--feral-ink", "--feral-surface", "--feral-on-signal", "--feral-shadow-tone", "--feral-pink", "--feral-acid", "--feral-ultra"].map((token) => <Badge key={token} tone="paper">{token}</Badge>)}</CardContent></Card><CodeTabs tabs={[{ id: "css", label: "tokens.css", code: `:root {\n  --feral-ink: #0a0a0a;\n  --feral-cream: #fff4e0;\n  --feral-pink: #ff2d9b;\n  --feral-border-md: 4px;\n  --feral-pressure-md: 5px;\n}` }]} /><Callout tone="ultra"><CalloutTitle>Re-skin from the Lab</CalloutTitle><CalloutDescription>The Style Lab writes these variables live. Pick a preset, then take the CSS home.</CalloutDescription></Callout></div>; }
const distemperAnatomy: { tone: "acid" | "pink" | "ultra" | "tang" | "paper"; term: string; body: string }[] = [
  { tone: "acid", term: "The muzzle", body: "Every axis of wildness is a named token. Re-tint the entire habitat from one file. If you can't re-skin it in one move, it isn't Distemper — it's just loud." },
  { tone: "pink", term: "Bitework", body: "The interaction layer is trained, not tame. Keyboard-perfect, focus-visible, screen-reader boring. Controlled aggression is still control." },
  { tone: "ultra", term: "The zoomies", body: "Motion is press physics: things depress, lift, and settle like objects with mass. Respect reduced-motion. The zoomies are optional; the mass is not." },
  { tone: "tang", term: "Shedding", body: "Stickers, bursts, stamps, and scribbles are components, not decoration. The sticker sheet has a changelog." },
  { tone: "paper", term: "One broken rule per creature", body: "The whole doctrine in six words." },
];
const distemperFieldTest = [
  "Hard borders — no gradient pretending to be an edge.",
  "Hard offset shadows, zero blur. Shadows may have a color and an opinion.",
  "Exactly one convention violated per component.",
  "Tokens govern every axis of variance; the whole surface re-tints from one file.",
  "Focus states are the clearest states.",
  "Paper backgrounds with visible grain or pattern.",
  "Loud display type over workmanlike body type.",
  "Ornaments shipped as first-class components.",
  "Interaction behavior that would pass in a payroll portal.",
  "Not Beige. Not even ironically.",
];
function DistemperBody() {
  return (
    <article className="distemper-manifesto">
      <p className="distemper-def"><b>dis·tem·per</b> <i>(n.)</i> — 1. A disease of undomesticated animals. 2. What your design system has now.</p>
      <p className="distemper-lede">Distemper is what happens when formalism gets bitten. Every surface obeys a strict grammar — the borders are real, the shadows are honest, the focus ring is the loudest thing in the room — and inside that fence, every component is allowed exactly one act of violence. A tilt. A clash. A chromatic shadow. Never two.</p>
      <p>This is not chaos. Chaos is cheap and Beige loves it, because chaos discredits the alternative. Distemper is a leash long enough to be interesting.</p>

      <h2>The anatomy</h2>
      <div className="route-card-grid">
        {distemperAnatomy.map((item) => (
          <Card key={item.term} tone={item.tone} radius={item.tone === "acid" || item.tone === "ultra" ? "none" : undefined}>
            <CardHeader><CardTitle>{item.term}</CardTitle><CardDescription>{item.body}</CardDescription></CardHeader>
          </Card>
        ))}
      </div>

      <h2>Is it Distemper? The field test</h2>
      <ol className="distemper-test">
        {distemperFieldTest.map((line) => <li key={line}>{line}</li>)}
      </ol>
      <Callout tone="pink"><CalloutTitle>Scoring</CalloutTitle><CalloutDescription>Score eight or better and you may call it Distemper. Score ten and the facility will send a collectible sticker.</CalloutDescription></Callout>

      <p className="distemper-colophon"><em>Reference implementation: feral/ui. MIT licensed. Raised under duress.</em></p>
    </article>
  );
}
function ChangelogBody() { return <div className="site-stack">{[["v0.7", "Calendar range mode, toast provider, carousel controls, sidebar behavior."], ["v0.6", "Routed pages, Style Lab route, ornaments, template routes."], ["v0.5", "Registry basis and docs product shell."]].map(([version, body]) => <Card key={version}><CardHeader><CardTitle>{version}</CardTitle><CardDescription>{body}</CardDescription></CardHeader></Card>)}</div>; }
function AccessibilityBody() { return <div className="route-card-grid"><Card><CardHeader><CardTitle>Focus rings</CardTitle><CardDescription>Visible, loud, and not optional.</CardDescription></CardHeader></Card><Card><CardHeader><CardTitle>Keyboard ground</CardTitle><CardDescription>Keyboards are sacred ground. The goblin removes its shoes.</CardDescription></CardHeader></Card><Card><CardHeader><CardTitle>Radix where it matters</CardTitle><CardDescription>Dialogs and menus inherit the boring adult behavior.</CardDescription></CardHeader></Card></div>; }
function docBody(slug: string) { if (slug === "installation") return <InstallationBody />; if (slug === "theming") return <ThemingBody />; if (slug === "accessibility") return <AccessibilityBody />; if (slug === "changelog") return <ChangelogBody />; if (slug === "distemper") return <DistemperBody />; return null; }
function BlocksIndex() { return <div className="route-card-grid">{["Marketing", "Dashboard", "Auth", "Content", "Commerce"].map((name) => <Card key={name}><CardHeader><Badge tone="tang">IN THE ENCLOSURE</Badge><CardTitle>{name}</CardTitle><CardDescription>{name} block family gets expanded next.</CardDescription></CardHeader></Card>)}</div>; }
function TemplatesIndex() { return <div className="route-card-grid">{templateCatalog.map((template) => <Card key={template.name}><CardHeader><Badge tone="acid">LOOSE</Badge><CardTitle>{template.name}</CardTitle><CardDescription>{template.description}</CardDescription></CardHeader><CardFooter><Button tone="pink" onClick={() => navigate(`/templates/${slugify(template.name)}`)}>Open</Button></CardFooter></Card>)}</div>; }
function TemplateDetailBody({ template }: { template: typeof templateCatalog[number] }) { return <div className="site-stack">{template.component}<Card tone="acid" radius="none"><CardHeader><CardTitle>Take it home</CardTitle><CardDescription>Template exit ramps are next: installable template item or generated zip, then fresh-app smoke.</CardDescription></CardHeader></Card></div>; }
function RoadmapBody() { return <div className="site-stack">{["Charts route", "Sidebar/Form/Toast depth", "Block families", "Template exit ramps", "Distemper manifesto", "SEO/OG pass"].map((item) => <Card key={item}><CardHeader><CardTitle>{item}</CardTitle><CardDescription>Queued by the competitive dossier.</CardDescription></CardHeader></Card>)}</div>; }
function NotFoundBody() { return <Button tone="acid" onClick={() => navigate("/")}>Go home</Button>; }

/* ── three layout archetypes, declared per route ── */
type Resolved = { archetype: Archetype; title: string; desc: string; content: React.ReactNode; crumbs: Crumb[]; navHref: string; ownHeader?: boolean; metaTitle?: string };
const HOME_CRUMB: Crumb = { label: "Home", href: "#/" };
const marketing = (content: React.ReactNode): Resolved => ({ archetype: "marketing", title: "", desc: "", content, crumbs: [], navHref: "/" });
const catalog = (navHref: string, title: string, desc: string, content: React.ReactNode, crumbs: Crumb[]): Resolved => ({ archetype: "catalog", title, desc, content, crumbs, navHref });
const tool = (navHref: string, title: string, desc: string, content: React.ReactNode, crumbs: Crumb[], ownHeader = false): Resolved => ({ archetype: "tool-doc", title, desc, content, crumbs, navHref, ownHeader });
const notFound = (route: string): Resolved => ({ archetype: "tool-doc", title: "This route escaped into the vents.", desc: "No page exists here. The raccoon denies involvement.", content: <NotFoundBody />, crumbs: [HOME_CRUMB, { label: "404" }], navHref: route });

function resolveRoute(route: string): Resolved {
  const parts = route.split("/").filter(Boolean);
  if (route === "/" || route === "") return marketing(<HomePage />);
  if (parts[0] === "docs") {
    if (!parts[1]) return catalog("/docs", "Documentation with fewer trap doors.", "Install, theme, browse the creatures, and keep Beige outside the fence.", <DocsIndex />, [HOME_CRUMB, { label: "Docs" }]);
    const page = docPages[parts[1]];
    if (!page || parts[2]) return notFound(route);
    return { ...tool(`/docs/${parts[1]}`, page.title, page.desc, docBody(parts[1]), [HOME_CRUMB, { label: "Docs", href: "#/docs" }, { label: page.title.split(":")[0].split(".")[0] }]), metaTitle: page.metaTitle };
  }
  if (parts[0] === "components") {
    if (!parts[1]) return catalog("/components", "Browse the enclosures.", "Every creature gets its own page. Tap the glass — they like it.", <ComponentsIndex />, [HOME_CRUMB, { label: "Components" }]);
    const item = componentCatalog.find((c) => c.slug === parts[1]);
    if (!item || parts[2]) return notFound(route);
    return tool(`/components/${item.slug}`, item.name, componentContent(item).description, <ComponentDetailBody item={item} />, [HOME_CRUMB, { label: "Components", href: "#/components" }, { label: item.name }]);
  }
  if (parts[0] === "blocks" && !parts[1]) return catalog("/blocks", "Page sections with bite marks.", "The block library is the forcing function for deeper components.", <BlocksIndex />, [HOME_CRUMB, { label: "Blocks" }]);
  if (parts[0] === "templates") {
    if (!parts[1]) return catalog("/templates", "Live habitats.", "Whole surfaces, not just button zoos.", <TemplatesIndex />, [HOME_CRUMB, { label: "Templates" }]);
    const template = templateCatalog.find((t) => slugify(t.name) === parts[1]);
    if (!template || parts[2]) return notFound(route);
    return tool(`/templates/${parts[1]}`, template.name, template.description, <TemplateDetailBody template={template} />, [HOME_CRUMB, { label: "Templates", href: "#/templates" }, { label: template.name }]);
  }
  if (parts[0] === "style-lab" && !parts[1]) return tool("/style-lab", "Style Lab", "Pick a preset, tweak the token leash, preview real components, then take the CSS home.", <StyleLab />, [HOME_CRUMB, { label: "Style Lab" }], true);
  if (parts[0] === "ornaments" && !parts[1]) return tool("/ornaments", "Ornaments", "Every exported ornament renders from one paired name/component catalog.", <OrnamentsRoute />, [HOME_CRUMB, { label: "Ornaments" }], true);
  if (parts[0] === "roadmap" && !parts[1]) return tool("/roadmap", "Build gates, not timeline theater.", "The public homepage no longer carries the project log. This route does.", <RoadmapBody />, [HOME_CRUMB, { label: "Roadmap" }]);
  return notFound(route);
}

function SidebarLink({ link, current }: { link: NavLink; current: string }) {
  const active = current === link.href;
  return (
    <a className="doc-nav-link" href={`#${link.href}`} data-active={active || undefined} aria-current={active ? "page" : undefined}>
      <span>{link.label}</span>
      {link.status ? <span className={`doc-nav-status doc-nav-status-${link.status}`} title={statusLabel(link.status)} aria-label={statusLabel(link.status)} /> : null}
    </a>
  );
}
function Sidebar({ current }: { current: string }) {
  return (
    <nav className="doc-nav" aria-label="Sections">
      {navSections.map((section) => (
        <div key={section.title} className="doc-nav-group">
          <h4>{section.title}</h4>
          {section.links?.map((link) => <SidebarLink key={link.href} link={link} current={current} />)}
          {section.subgroups?.map((group) => (
            <div key={group.label} className="doc-nav-sub">
              <h5>{group.label}</h5>
              {group.links.map((link) => <SidebarLink key={link.href} link={link} current={current} />)}
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}
function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  if (!crumbs.length) return null;
  return (
    <nav className="feral-breadcrumb" aria-label="Breadcrumb">
      <ol className="feral-breadcrumb-list">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={index} className="feral-breadcrumb-item">
              {crumb.href && !last ? <a className="feral-breadcrumb-link" href={crumb.href}>{crumb.label}</a> : <span className="feral-breadcrumb-page" aria-current={last ? "page" : undefined}>{crumb.label}</span>}
              {!last ? <span className="feral-breadcrumb-separator" aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
function Pager({ current }: { current: string }) {
  const index = flatNav.findIndex((link) => link.href === current);
  if (index === -1) return null;
  const prev = flatNav[index - 1];
  const next = flatNav[index + 1];
  return <div className="route-pager">{prev ? <Button tone="paper" onClick={() => navigate(prev.href)}>← {prev.label}</Button> : <span />}{next ? <Button tone="paper" onClick={() => navigate(next.href)}>{next.label} →</Button> : <span />}</div>;
}
function ArchetypeShell({ resolved }: { resolved: Resolved }) {
  const { archetype, title, desc, content, crumbs, navHref, ownHeader } = resolved;
  if (archetype === "marketing") return <>{content}</>;
  return (
    <div className="doc-layout">
      <aside className="doc-sidebar"><Sidebar current={navHref} /></aside>
      <div className="doc-main">
        <Breadcrumb crumbs={crumbs} />
        {archetype === "catalog"
          ? <div className="route-hero"><h1>{title}</h1><p>{desc}</p></div>
          : ownHeader ? null : <header className="doc-page-header"><h1>{title}</h1><p>{desc}</p></header>}
        {content}
        {archetype === "tool-doc" ? <Pager current={navHref} /> : null}
      </div>
    </div>
  );
}

export default function App() { const route = useHashRoute(); return <AppShell route={route} />; }
