import * as React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CodeTabs,
  PreviewFrame,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ButtonGroup,
  Callout,
  CalloutDescription,
  CalloutTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Field,
} from "../components/ui";
import { componentCatalog } from "../docs/component-catalog";

const routes = [
  { id: "installation", label: "Installation", kind: "docs" },
  { id: "styling", label: "Styling", kind: "docs" },
  { id: "button", label: "Button", kind: "component" },
  { id: "card", label: "Card", kind: "component" },
  { id: "dialog", label: "Dialog", kind: "component" },
  { id: "data-table", label: "Data Table", kind: "component" },
  { id: "blocks", label: "Blocks", kind: "catalog" },
  { id: "templates", label: "Templates", kind: "catalog" },
];

type RouteId = typeof routes[number]["id"];

function installTruth() {
  return `# local truth for v0.5\nnpm install\nnpm run registry:build\nnpm run smoke:registry\nnpm run smoke:fresh-app\n\n# public command appears only after hosted registry install passes\n# no imaginary npx spell, no CLI cosplay, no beige lies`;
}

function componentCode(id: RouteId) {
  if (id === "button") return `<Button tone="pink" tilt="left">Do the thing</Button>\n<Button tone="paper" shape="pill">Secondary</Button>`;
  if (id === "card") return `<Card tone="acid" radius="none" tilt="right">\n  <CardHeader>\n    <CardTitle>Controlled variance</CardTitle>\n  </CardHeader>\n</Card>`;
  if (id === "dialog") return `<Dialog>\n  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>\n  <DialogContent>\n    <DialogHeader><DialogTitle>Modal with receipts</DialogTitle></DialogHeader>\n  </DialogContent>\n</Dialog>`;
  if (id === "data-table") return `<DataTable columns={columns} data={rows} />`;
  return installTruth();
}

function ComponentPreview({ id }: { id: RouteId }) {
  if (id === "button") {
    return <ButtonGroup><Button tone="pink" tilt="left">Do the thing</Button><Button tone="paper" shape="pill">Secondary</Button><Button tone="ultra">Unsupervised</Button></ButtonGroup>;
  }
  if (id === "card") {
    return <Card tone="acid" radius="none" tilt="right"><CardHeader><CardTitle>Controlled variance</CardTitle><CardDescription>The card has opinions and a border width.</CardDescription></CardHeader><CardContent>Still readable. Horrifyingly.</CardContent></Card>;
  }
  if (id === "dialog") {
    return <Dialog><DialogTrigger asChild><Button tone="pink">Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Modal with receipts</DialogTitle><DialogDescription>Radix behavior under feral styling. The focus trap is not a vibes-based initiative.</DialogDescription></DialogHeader><DialogFooter><Button tone="acid">Fine</Button></DialogFooter></DialogContent></Dialog>;
  }
  if (id === "data-table") {
    return (
      <Table>
        <TableHeader><TableRow><TableHead>Item</TableHead><TableHead>Status</TableHead><TableHead>Receipt</TableHead></TableRow></TableHeader>
        <TableBody>
          <TableRow><TableCell>Button</TableCell><TableCell>Built</TableCell><TableCell>Variants + press</TableCell></TableRow>
          <TableRow><TableCell>Dialog</TableCell><TableCell>Built</TableCell><TableCell>Radix primitive</TableCell></TableRow>
          <TableRow><TableCell>DataTable</TableCell><TableCell>Basis</TableCell><TableCell>Sorting next</TableCell></TableRow>
        </TableBody>
      </Table>
    );
  }
  return null;
}

function RouteBody({ route }: { route: RouteId }) {
  const catalogItem = componentCatalog.find((item) => item.name.toLowerCase().split(" ").join("-") === route);

  if (route === "installation") {
    return (
      <div className="feral-doc-page">
        <h3>Installation truth</h3>
        <p>The public install command is intentionally withheld until fresh-app registry tests pass. This is called honesty. It is rare and legally cheaper.</p>
        <CodeTabs tabs={[{ id: "local", label: "Local", code: installTruth() }]} />
        <Callout tone="danger"><CalloutTitle>Receipt rule</CalloutTitle><CalloutDescription>Docs may joke. Installation instructions may not improvise.</CalloutDescription></Callout>
      </div>
    );
  }

  if (route === "styling") {
    return (
      <div className="feral-doc-page">
        <h3>Controlled variance tokens</h3>
        <p>Ink, pressure, radius collision, signal color, pattern, tilt, and density are the public axes. Randomness is just laziness wearing glitter.</p>
        <div className="feral-token-grid">
          {["--feral-ink", "--feral-border-md", "--feral-pressure-md", "--feral-pink", "--feral-acid", "--feral-ultra"].map((token) => <Badge key={token} tone="paper">{token}</Badge>)}
        </div>
        <CodeTabs tabs={[{ id: "css", label: "CSS", code: `:root {\n  --feral-border-md: 4px;\n  --feral-pressure-md: 5px;\n  --feral-pink: #ff2d9b;\n}` }]} />
      </div>
    );
  }

  if (route === "blocks" || route === "templates") {
    return (
      <div className="feral-doc-page">
        <h3>{route === "blocks" ? "Block catalog" : "Template catalog"}</h3>
        <p>{route === "blocks" ? "Blocks are conversion surfaces, not decoration trays." : "Templates must render as real pages, not fake screenshots wearing a varsity jacket."}</p>
        <PreviewFrame title="Catalog preview">
          <Card tone="tang"><CardHeader><CardTitle>{route === "blocks" ? "Marketing Hero" : "Feral SaaS"}</CardTitle><CardDescription>Preview, code, dependencies, registry item, mobile state.</CardDescription></CardHeader><CardContent><Button tone="ink">Open preview</Button></CardContent></Card>
        </PreviewFrame>
      </div>
    );
  }

  return (
    <div className="feral-doc-page">
      <div className="feral-doc-title-row">
        <div>
          <h3>{catalogItem?.name ?? route}</h3>
          <p>{catalogItem?.notes ?? "Component page generated from local source inventory."}</p>
        </div>
        <Badge tone={catalogItem?.status === "built" ? "acid" : "tang"}>{catalogItem?.status ?? "basis"}</Badge>
      </div>
      <PreviewFrame title={`${catalogItem?.name ?? route} preview`}><ComponentPreview id={route} /></PreviewFrame>
      <CodeTabs tabs={[{ id: "usage", label: "Usage", code: componentCode(route) }, { id: "file", label: "Source path", code: catalogItem?.file ?? `src/components/ui/${route}.tsx` }]} />
      <Callout tone="ultra"><CalloutTitle>Accessibility receipt</CalloutTitle><CalloutDescription>{route === "dialog" ? "Radix Dialog owns focus management; feral styling owns the clown shoes." : "Native semantics first. Custom visuals second. Funny copy a distant third, but very loud."}</CalloutDescription></Callout>
    </div>
  );
}

export function DocsProductShell() {
  const [route, setRoute] = React.useState<RouteId>("installation");

  return (
    <section className="site-section" id="route-docs">
      <h2>Route-backed docs shell seed.</h2>
      <p className="site-section-intro">v0.5 starts turning the scroll demo into a real product shell: docs nav, generated component pages, preview/code split, receipt callouts, and catalog routes. The site is no longer one long yell.</p>
      <div className="feral-docs-shell">
        <aside className="feral-docs-nav" aria-label="Documentation routes">
          {routes.map((item) => (
            <button key={item.id} type="button" data-active={route === item.id} onClick={() => setRoute(item.id)}>
              <span>{item.label}</span>
              <small>{item.kind}</small>
            </button>
          ))}
        </aside>
        <main className="feral-docs-main">
          <RouteBody route={route} />
        </main>
      </div>
    </section>
  );
}
