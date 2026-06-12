import * as React from "react";
import { Search, Menu, Moon } from "lucide-react";
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
import { StyleLab } from "./features/style-lab";
import { templateCatalog } from "./templates/template-catalog";

const VERSION = `v${pkg.version}`;

const navItems = [
  { label: "Docs", href: "#/docs" },
  { label: "Components", href: "#/components" },
  { label: "Install", href: "#/docs/installation" },
  { label: "Blocks", href: "#/blocks" },
  { label: "Templates", href: "#/templates" },
  { label: "Style Lab", href: "#/style-lab" },
  { label: "Ornaments", href: "#/ornaments" },
  { label: "Roadmap", href: "#/roadmap" },
];

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

function useDocumentTitle(route: string) {
  React.useEffect(() => {
    const clean = route === "/" ? "Home" : route.split("/").filter(Boolean).map((part) => part.replace(/-/g, " ")).join(" — ");
    document.title = `feral/ui — ${clean}`;
  }, [route]);
}

function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = React.useState(false);

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
          <a href="#/docs">Docs</a>
          <a href="#/components">Components</a>
          <a href="#/blocks">Blocks</a>
          <a href="#/templates">Templates</a>
          <a href="#/style-lab">Style Lab</a>
          <a href="#/ornaments">Ornaments</a>
        </nav>
        <span className="site-nav-right">
          <button className="site-search" type="button" onClick={() => setSearchOpen(true)}><Search size={13} /> Search <kbd>⌘K</kbd></button>
          <a className="site-search" href="https://github.com/HarrowHaus/feral-ui" aria-label="GitHub repository">GH GitHub</a>
          <button className="site-search" type="button" aria-label="Theme toggle"><Moon size={13} /> Lights out</button>
          <Badge tone="paper">{VERSION} — 66 loose</Badge>
          <Sheet>
            <SheetTrigger asChild><button className="site-menu-button" type="button"><Menu size={18} /> Menu</button></SheetTrigger>
            <SheetContent>
              <SheetHeader><SheetTitle>feral/ui</SheetTitle><SheetDescription>Pick an enclosure.</SheetDescription></SheetHeader>
              <div className="site-stack">
                {navItems.map((item) => <a key={item.href} className="site-sheet-link" href={item.href}>{item.label}</a>)}
              </div>
            </SheetContent>
          </Sheet>
        </span>
      </header>
      <main id="main" tabIndex={-1}>{children}</main>
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

function Footer() {
  return <footer className="site-footer"><p><strong>feral/ui</strong> — MIT licensed. Raised under duress. No animals were beiged in the making of this library.</p></footer>;
}

function HomePage() {
  return (
    <>
      <Hero />
      <ComponentCollage />
      <Doctrine />
      <BehaviorTeaser />
      <StyleLabTeaser />
      <TemplateTeaser />
      <FieldReports />
      <FAQ />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="site-hero">
      <div className="site-eyebrow"><Badge tone="pink">{VERSION} — 66 loose</Badge><Badge tone="paper">Controlled variance UI</Badge></div>
      <h1>Components raised<br />by <span className="site-highlight pink">wolves.</span></h1>
      <p>Housebroken by Radix. Leashed by tokens. Released into your codebase.</p>
      <div className="site-hero-actions">
        <Button tone="ink" size="lg" onClick={() => navigate("/components")}>Open the cages</Button>
        <Button tone="pink" size="lg" tilt="left" onClick={() => navigate("/templates")}>See the damage</Button>
        <Button tone="paper" size="lg" onClick={() => navigate("/docs/installation")}>Install one</Button>
      </div>
    </section>
  );
}

function ComponentCollage() {
  const rows = [
    { component: "Button", state: "LOOSE", mode: "press physics" },
    { component: "Dialog", state: "LOOSE", mode: "Radix" },
    { component: "Calendar", state: "IN THE ENCLOSURE", mode: "date math" },
  ];
  return (
    <section className="site-collage" aria-label="Component collage">
      <Card tilt="left" radius="none">
        <CardHeader><CardTitle>Login to your account</CardTitle><CardDescription>Calmer than it looks. Still wearing the traffic cone.</CardDescription></CardHeader>
        <CardContent className="site-stack">
          <Field><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="you@feral.dev" /></Field>
          <Field><Label htmlFor="password">Password</Label><Input id="password" type="password" placeholder="••••••••" /><FieldHelp>Password managers welcome. We are loud, not foolish.</FieldHelp></Field>
        </CardContent>
        <CardFooter><Button tone="acid">Login</Button><Button tone="paper">Google</Button></CardFooter>
      </Card>
      <Alert tone="ultra"><AlertIcon>⚡</AlertIcon><div><AlertTitle>Saved.</AlertTitle><AlertDescription>The beige committee has been notified and is coping poorly.</AlertDescription></div></Alert>
      <Accordion items={[{ title: "Is it accessible?", content: "Yes. The chaos is strictly visual. Keyboards are sacred ground.", defaultOpen: true }, { title: "Why does it tilt?", content: "It heard something." }]} />
      <Card tone="acid" radius="none"><CardHeader><CardTitle>OTP code</CardTitle><CardDescription>Six boxes. One tiny security ritual.</CardDescription></CardHeader><CardContent><OtpInput length={6} label="Demo OTP code" /></CardContent></Card>
      <Tabs items={[{ id: "law", label: "Law", content: "One broken rule per creature." }, { id: "leash", label: "Leash", content: "Every axis is a token." }, { id: "beige", label: "Beige", content: "Beige is a choice. So is this." }]} />
      <Card tone="pink"><CardContent className="site-stack"><SwitchRow><Switch defaultChecked /> Feral mode</SwitchRow><SwitchRow><Switch /> Domesticated</SwitchRow></CardContent></Card>
      <Card tone="ultra" radius="none"><CardHeader><CardTitle>Data table</CardTitle><CardDescription>Sorts, filters, paginates, selects rows, holds grudges.</CardDescription></CardHeader><CardContent><DataTable data={rows} columns={[{ key: "component", header: "Component" }, { key: "state", header: "State" }, { key: "mode", header: "Mode" }]} /></CardContent></Card>
      <Card tone="tang"><CardHeader><CardTitle>Combobox</CardTitle><CardDescription>A dropdown that went to grad school.</CardDescription></CardHeader><CardContent><Combobox options={[{ value: "acid", label: "Acid" }, { value: "pink", label: "Pink" }, { value: "ultra", label: "Ultra" }]} /></CardContent></Card>
      <Card><CardContent><Pagination /></CardContent></Card>
    </section>
  );
}

function Doctrine() {
  return (
    <section className="site-section">
      <h2>One broken rule per creature.</h2>
      <p className="site-section-intro">Every component violates exactly one settled convention — a tilt, a clash, a chromatic shadow. Variance with a leash.</p>
      <div className="site-grid">
        <Card tone="acid" radius="none"><CardHeader><CardTitle>The leash is a token.</CardTitle><CardDescription>Every axis of chaos is a named CSS variable.</CardDescription></CardHeader><CardContent>Re-tint the whole habitat from one file.</CardContent></Card>
        <Card tone="pink"><CardHeader><CardTitle>Loud face, quiet hands.</CardTitle><CardDescription>The visuals are off-leash.</CardDescription></CardHeader><CardContent>Keyboard, focus, and screen-reader behavior are trained professionals.</CardContent></Card>
        <Card tone="ultra" radius="none"><CardHeader><CardTitle>Beige is a choice.</CardTitle><CardDescription>So is this.</CardDescription></CardHeader><CardContent>Not every interface needs to dress like a payroll portal.</CardContent></Card>
        <Card tone="tang"><CardHeader><CardTitle>Take the source.</CardTitle><CardDescription>The registry is live.</CardDescription></CardHeader><CardContent><Button tone="paper" onClick={() => navigate("/docs/installation")}>Release one</Button></CardContent></Card>
      </div>
    </section>
  );
}

function BehaviorTeaser() {
  return (
    <section className="site-section">
      <h2>Raised by wolves. Housebroken by Radix.</h2>
      <p className="site-section-intro">Dialogs, sheets, menus, hover cards, tooltips, command search, and popovers are the grown-up bones under the loud jacket.</p>
      <div className="site-grid">
        {componentCatalog.filter((item) => ["dialog", "dropdown-menu", "command", "tooltip"].includes(item.slug)).map((item) => <ComponentCard key={item.slug} item={item} />)}
      </div>
    </section>
  );
}

function StyleLabTeaser() {
  return (
    <section className="site-section">
      <h2>Style Lab: let the tokens touch the furniture.</h2>
      <p className="site-section-intro">Same component family, different jobs: docs, dashboards, shops, warnings, forms, and tiny product disasters.</p>
      <Card tone="acid" radius="none">
        <CardHeader><CardTitle>Preview modes</CardTitle><CardDescription>Emergency Broadcast, Night Shift Docs, Sticker Shop, Spreadsheet Mutant.</CardDescription></CardHeader>
        <CardContent className="site-mini-grid">
          {["Emergency Broadcast", "Night Shift Docs", "Sticker Shop", "Spreadsheet Mutant"].map((label) => <Button key={label} tone="paper">{label}</Button>)}
        </CardContent>
        <CardFooter><Button tone="pink" onClick={() => navigate("/style-lab")}>Open the Lab</Button></CardFooter>
      </Card>
    </section>
  );
}

function TemplateTeaser() {
  return (
    <section className="site-section">
      <h2>Templates with doors out.</h2>
      <p className="site-section-intro">Live previews stay in the habitat. Take-home artifacts come next.</p>
      <div className="site-grid">
        {templateCatalog.slice(0, 3).map((template) => <Card key={template.name} tone="paper"><CardHeader><CardTitle>{template.name}</CardTitle><CardDescription>{template.description}</CardDescription></CardHeader><CardFooter><Button tone="acid" onClick={() => navigate(`/templates/${slugify(template.name)}`)}>View template</Button></CardFooter></Card>)}
      </div>
      <div className="site-section-action"><Button tone="pink" onClick={() => navigate("/templates")}>Browse all templates</Button></div>
    </section>
  );
}

function FieldReports() {
  const reports = [
    ["The button bit me.", "The button is up to date on its shots."],
    ["My design system had a panic attack.", "We sent flowers. Beige ones. As a warning."],
    ["I pressed ⌘K and something FETCHED.", "Good palette. Best palette."],
  ];
  return (
    <section className="site-section">
      <h2>Field Reports.</h2>
      <p className="site-section-intro">Complaints from the facility. Official responses included because the goblin cannot be trusted with stationery.</p>
      <div className="site-grid">
        {reports.map(([complaint, response]) => <Card key={complaint} tone="paper"><CardHeader><Badge tone="pink">★☆☆☆☆</Badge><CardTitle>{complaint}</CardTitle></CardHeader><CardContent><strong>Facility response:</strong> {response}</CardContent></Card>)}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="site-section">
      <h2>FAQ</h2>
      <Accordion items={[
        { title: "Is it accessible?", content: "Yes. The chaos is strictly visual. Keyboards are sacred ground, focus rings are non-negotiable, and the screen reader gets the boring version of the truth.", defaultOpen: true },
        { title: "Can I use this in production?", content: "Legally, yes — MIT. Spiritually, that is between you and whoever approves your PRs." },
        { title: "Why do some components tilt?", content: "They heard something." },
        { title: "Can I make it match my brand?", content: "The Style Lab re-skins every creature from one set of tokens. Your brand, but feral." },
      ]} />
    </section>
  );
}

function CTA() {
  return (
    <section className="site-section site-cta">
      <h2>Release one.</h2>
      <p>Start with Button. If it behaves, try Dialog. Do not feed Card after midnight.</p>
      <CodeBlock>{`npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json`}</CodeBlock>
    </section>
  );
}

function ComponentCard({ item }: { item: typeof componentCatalog[number] }) {
  const content = componentContent(item);
  return (
    <Card>
      <CardHeader><Badge tone={item.status === "built" ? "acid" : "tang"}>{statusLabel(item.status)}</Badge><CardTitle>{item.name}</CardTitle><CardDescription>{content.description}</CardDescription></CardHeader>
      <CardFooter><Button tone="paper" onClick={() => navigate(`/components/${item.slug}`)}>Open</Button></CardFooter>
    </Card>
  );
}

function ComponentsPage({ slug }: { slug?: string }) {
  if (slug) return <ComponentDetail slug={slug} />;
  return (
    <RoutePage eyebrow="Components" title="66 creatures. Browse the enclosures." description="Tap the glass — they like it.">
      <div className="route-grid">
        {componentCatalog.map((item) => <ComponentCard key={item.slug} item={item} />)}
      </div>
    </RoutePage>
  );
}

function ComponentDetail({ slug }: { slug: string }) {
  const item = componentCatalog.find((entry) => entry.slug === slug);
  if (!item) return <NotFound />;
  const content = componentContent(item);
  const index = componentCatalog.findIndex((entry) => entry.slug === slug);
  const prev = componentCatalog[index - 1];
  const next = componentCatalog[index + 1];
  return (
    <RoutePage eyebrow={item.layer} title={item.name} description={content.description}>
      <div className="route-two-col">
        <Card><CardHeader><Badge tone={item.status === "built" ? "acid" : "tang"}>{statusLabel(item.status)}</Badge><CardTitle>Specimen</CardTitle><CardDescription>{item.file}</CardDescription></CardHeader><CardContent><ComponentShowcase slug={item.slug} /></CardContent></Card>
        <CodeTabs tabs={[{ id: "usage", label: "Usage", code: content.usage }, { id: "install", label: "Install", code: `npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/${item.slug}.json` }, { id: "a11y", label: "Behavior", code: content.accessibility }]} />
      </div>
      <div className="route-pager">
        {prev ? <Button tone="paper" onClick={() => navigate(`/components/${prev.slug}`)}>← {prev.name}</Button> : <span />}
        {next ? <Button tone="paper" onClick={() => navigate(`/components/${next.slug}`)}>{next.name} →</Button> : <span />}
      </div>
    </RoutePage>
  );
}

function DocsPage({ slug }: { slug?: string }) {
  if (!slug) {
    return (
      <RoutePage eyebrow="Docs" title="Documentation with fewer trap doors." description="Install, customize, browse components, and keep Beige outside the fence.">
        <div className="route-grid">
          {[
            ["Installation", "Release a component into your codebase.", "/docs/installation"],
            ["Accessibility", "Boring semantics. Radioactive sticker sheet.", "/docs/accessibility"],
            ["Molt Log", "Release notes. Things grew limbs.", "/docs/changelog"],
          ].map(([title, desc, href]) => <Card key={title}><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{desc}</CardDescription></CardHeader><CardFooter><Button tone="acid" onClick={() => navigate(href)}>Open</Button></CardFooter></Card>)}
        </div>
      </RoutePage>
    );
  }
  if (slug === "installation") return <InstallationPage />;
  if (slug === "accessibility") return <AccessibilityPage />;
  if (slug === "changelog") return <ChangelogPage />;
  return <NotFound />;
}

function InstallationPage() {
  return (
    <RoutePage eyebrow="Installation" title="Releasing a component into your codebase." description="One command. It installs its own source. It knows the way home — the way home is your components/ui folder now.">
      <div className="route-two-col">
        <CodeTabs tabs={[{ id: "npm", label: "npm", code: "npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json" }, { id: "pnpm", label: "pnpm", code: "pnpm dlx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json" }, { id: "yarn", label: "yarn", code: "yarn dlx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json" }, { id: "bun", label: "bun", code: "bunx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/button.json" }, { id: "manual", label: "Catch it by hand", code: "curl https://harrowhaus.github.io/feral-ui/r/button.json" }]} />
        <Card tone="pink"><CardHeader><CardTitle>Side effects include:</CardTitle><CardDescription>Visible focus rings, chromatic shadows, and your design lead asking to hop on a quick call.</CardDescription></CardHeader><CardContent><CodeBlock>{`npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/card.json
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/dialog.json
npx shadcn@latest add https://harrowhaus.github.io/feral-ui/r/data-table.json`}</CodeBlock></CardContent></Card>
      </div>
    </RoutePage>
  );
}

function AccessibilityPage() {
  return (
    <RoutePage eyebrow="Policy" title="Boring semantics. Radioactive sticker sheet." description="The interaction layer behaves like a professional adult with a mortgage.">
      <div className="route-grid">
        <Card><CardHeader><CardTitle>Focus rings</CardTitle><CardDescription>Visible, loud, and not optional.</CardDescription></CardHeader></Card>
        <Card><CardHeader><CardTitle>Keyboard ground</CardTitle><CardDescription>Keyboards are sacred ground. The goblin removes its shoes.</CardDescription></CardHeader></Card>
        <Card><CardHeader><CardTitle>Radix where it matters</CardTitle><CardDescription>Dialogs and menus inherit the boring adult behavior.</CardDescription></CardHeader></Card>
      </div>
    </RoutePage>
  );
}

function ChangelogPage() {
  return (
    <RoutePage eyebrow="Molt Log" title="Things grew limbs." description="v0.7 — the calendar grew range selection. We do not know where it learned that.">
      <div className="site-stack">
        {[
          ["v0.7", "Calendar range mode, toast provider, carousel controls, sidebar behavior."],
          ["v0.6", "Routed pages, Style Lab route, ornaments, template routes."],
          ["v0.5", "Registry basis and docs product shell."],
        ].map(([version, body]) => <Card key={version}><CardHeader><CardTitle>{version}</CardTitle><CardDescription>{body}</CardDescription></CardHeader></Card>)}
      </div>
    </RoutePage>
  );
}

function BlocksPage() {
  return (
    <RoutePage eyebrow="Blocks" title="Page sections with bite marks." description="The block library is the forcing function for deeper components.">
      <div className="route-grid">
        {["Marketing", "Dashboard", "Auth", "Content", "Commerce"].map((name) => <Card key={name}><CardHeader><Badge tone="tang">IN THE ENCLOSURE</Badge><CardTitle>{name}</CardTitle><CardDescription>{name} block family gets expanded next.</CardDescription></CardHeader></Card>)}
      </div>
    </RoutePage>
  );
}

function TemplatesPage({ slug }: { slug?: string }) {
  const selected = slug ? templateCatalog.find((item) => slugify(item.name) === slug) : undefined;
  if (slug && !selected) return <NotFound />;
  if (selected) {
    return (
      <RoutePage eyebrow="Template" title={selected.name} description={selected.description}>
        {selected.component}
        <Card tone="acid" radius="none"><CardHeader><CardTitle>Take it home</CardTitle><CardDescription>Template exit ramps are next: installable template item or generated zip, then fresh-app smoke.</CardDescription></CardHeader></Card>
      </RoutePage>
    );
  }
  return (
    <RoutePage eyebrow="Templates" title="Live habitats." description="Eight routes prove the kit can build whole surfaces, not just button zoos.">
      <div className="route-grid">
        {templateCatalog.map((template) => <Card key={template.name}><CardHeader><Badge tone="acid">LOOSE</Badge><CardTitle>{template.name}</CardTitle><CardDescription>{template.description}</CardDescription></CardHeader><CardFooter><Button tone="pink" onClick={() => navigate(`/templates/${slugify(template.name)}`)}>Open</Button></CardFooter></Card>)}
      </div>
    </RoutePage>
  );
}

function StyleLabPage() {
  return (
    <RoutePage eyebrow="Style Lab" title="Build a look without letting the goblin drive." description="Pick a preset, tweak palette roles, preview real components, then copy CSS.">
      <StyleLab />
    </RoutePage>
  );
}

function OrnamentsPage() {
  return (
    <RoutePage eyebrow="Ornaments" title="The sticker sheet escaped containment." description="Full ornament grid and contact-sheet law are next; this route is now canonical.">
      <div className="route-grid">
        {["Burst", "Splat", "Arrow", "Warning", "Pointer", "Star", "Censor", "Tag", "Scribble", "Goblin"].map((name, index) => <Card key={name} tone={index % 2 ? "paper" : "acid"}><CardHeader><CardTitle>{name}</CardTitle><CardDescription>Specimen card. Full SVG grid lands in the ornament repair pass.</CardDescription></CardHeader></Card>)}
      </div>
    </RoutePage>
  );
}

function RoadmapPage() {
  return (
    <RoutePage eyebrow="Roadmap" title="Build gates, not timeline theater." description="The public homepage no longer carries the project log. This route does.">
      <div className="site-stack">
        {["One AppShell", "Ornament repair", "Component playgrounds", "Sidebar/Form/Toast depth", "Charts route", "Template exit ramps", "Dark mode"].map((item) => <Card key={item}><CardHeader><CardTitle>{item}</CardTitle><CardDescription>Queued by the competitive dossier.</CardDescription></CardHeader></Card>)}
      </div>
    </RoutePage>
  );
}

function RoutePage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="route-page">
      <div className="route-hero"><Badge tone="pink">{eyebrow}</Badge><h1>{title}</h1><p>{description}</p></div>
      {children}
    </section>
  );
}

function NotFound() {
  return (
    <RoutePage eyebrow="404" title="This route escaped into the vents." description="No page exists here. The raccoon denies involvement.">
      <Button tone="acid" onClick={() => navigate("/")}>Go home</Button>
    </RoutePage>
  );
}

function Router({ route }: { route: string }) {
  const parts = route.split("/").filter(Boolean);
  if (route === "/" || route === "") return <HomePage />;
  if (parts[0] === "docs") return <DocsPage slug={parts[1]} />;
  if (parts[0] === "components") return <ComponentsPage slug={parts[1]} />;
  if (parts[0] === "blocks") return <BlocksPage />;
  if (parts[0] === "templates") return <TemplatesPage slug={parts[1]} />;
  if (parts[0] === "style-lab") return <StyleLabPage />;
  if (parts[0] === "ornaments") return <OrnamentsPage />;
  if (parts[0] === "roadmap") return <RoadmapPage />;
  return <NotFound />;
}

export default function App() {
  const route = useHashRoute();
  useDocumentTitle(route);
  return <AppShell><Router route={route} /></AppShell>;
}
