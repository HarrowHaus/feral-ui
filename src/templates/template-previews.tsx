import { Bot, CalendarDays, ChevronRight, FileText, Flame, MessageSquare, Package, Search, ShoppingBag, Sparkles, Zap } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
  Input,
  Kbd,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Toast,
} from "../components/ui";

const stats = [
  { label: "Invoices bullied", value: "1,284" },
  { label: "Approvals dodged", value: "38%" },
  { label: "Meetings prevented", value: "74" },
];

export function SaasTemplatePreview() {
  return (
    <div className="template-preview template-saas">
      <header className="template-hero-row">
        <div>
          <Badge tone="pink">Invoice ops for people with enemies</Badge>
          <h3>Close the month before the month notices.</h3>
          <p>Wrangle approvals, receipts, and the one PDF named FINAL-final-v6 without forming a committee or crying into a spreadsheet.</p>
          <div className="template-actions"><Button tone="ink">Start free</Button><Button tone="paper">Watch the 90-second panic reducer</Button></div>
        </div>
        <Card tone="acid" radius="none" className="template-hero-card">
          <CardHeader><CardTitle>Today&apos;s nonsense</CardTitle><CardDescription>Sorted by financial smell.</CardDescription></CardHeader>
          <CardContent className="template-stack">
            <div className="template-row"><span>Vendor limbo</span><b>$18,420</b></div>
            <Progress value={74} />
            <div className="template-row"><span>Receipts with attitude</span><b>12</b></div>
            <Toast title="Approved" description="Karen from procurement blinked first." tone="pink" />
          </CardContent>
        </Card>
      </header>
      <section className="template-stat-grid">{stats.map((item) => <Card key={item.label}><CardHeader><CardTitle>{item.value}</CardTitle><CardDescription>{item.label}</CardDescription></CardHeader></Card>)}</section>
      <section className="template-feature-grid">
        <Card tone="pink"><CardHeader><CardTitle>Approval chase</CardTitle><CardDescription>Automatic nudges, professionally annoying.</CardDescription></CardHeader></Card>
        <Card tone="ultra" radius="none"><CardHeader><CardTitle>Receipt rescue</CardTitle><CardDescription>Finds the attachment your inbox swore did not exist.</CardDescription></CardHeader></Card>
        <Card tone="tang"><CardHeader><CardTitle>Month-end war room</CardTitle><CardDescription>Everyone sees the same mess. Revolutionary.</CardDescription></CardHeader></Card>
      </section>
    </div>
  );
}

export function DashboardTemplatePreview() {
  const rows = [
    { queue: "Refunds", owner: "Mia", risk: "Medium", eta: "Today" },
    { queue: "Chargebacks", owner: "Dev", risk: "High", eta: "2h" },
    { queue: "Mystery CSV", owner: "Nobody", risk: "Cursed", eta: "Never" },
  ];
  return (
    <div className="template-preview template-dashboard">
      <aside className="template-sidebar"><b>feral desk</b><a>Overview</a><a>Queues</a><a>Reports</a><a>Settings</a><span>Logged in as: responsible goblin</span></aside>
      <main className="template-main">
        <div className="template-toolbar"><div><Badge tone="acid">Ops dashboard</Badge><h3>The queue is angry. Good thing it is sortable.</h3></div><Button tone="pink">Escalate politely</Button></div>
        <section className="template-stat-grid"><Card><CardHeader><CardTitle>247</CardTitle><CardDescription>Open items</CardDescription></CardHeader></Card><Card tone="acid" radius="none"><CardHeader><CardTitle>91%</CardTitle><CardDescription>SLA intact</CardDescription></CardHeader></Card><Card tone="ultra" radius="none"><CardHeader><CardTitle>14</CardTitle><CardDescription>Things on fire</CardDescription></CardHeader></Card></section>
        <Card><CardHeader><CardTitle>Work queue</CardTitle><CardDescription>Now with fewer mystery tabs and more public accountability.</CardDescription></CardHeader><CardContent><DataTable data={rows} columns={[{ key: "queue", header: "Queue" }, { key: "owner", header: "Owner" }, { key: "risk", header: "Risk" }, { key: "eta", header: "ETA" }]} /></CardContent></Card>
      </main>
    </div>
  );
}

export function DocsTemplatePreview() {
  const items = ["Install", "Button", "Dialog", "Data Table", "Style Lab"];
  return (
    <div className="template-preview template-docs">
      <aside className="template-doc-nav"><b>Docs</b>{items.map((item) => <a key={item}>{item}</a>)}</aside>
      <article className="template-doc-page">
        <Badge tone="paper">Component docs</Badge>
        <h3>Button</h3>
        <p>For doing the thing, canceling the thing, and pretending the thing was always in scope.</p>
        <div className="template-actions"><Button tone="acid">Primary</Button><Button tone="paper">Secondary</Button><Button tone="pink">Regret</Button></div>
        <Card tone="ultra" radius="none"><CardHeader><CardTitle>Usage</CardTitle><CardDescription>Copy the file. Keep the source. Stop asking a theme provider to raise your children.</CardDescription></CardHeader><CardContent><code>{`<Button tone="acid">Ship it</Button>`}</code></CardContent></Card>
      </article>
      <aside className="template-doc-toc"><b>On this page</b><a>Preview</a><a>Variants</a><a>Accessibility</a><a>Source</a></aside>
    </div>
  );
}

export function BlogTemplatePreview() {
  const posts = [
    ["Your onboarding flow is a haunted hallway", "Design notes for forms that stop losing people in the vents."],
    ["We replaced the roadmap with a sandwich board", "A changelog strategy for teams with no remaining innocence."],
    ["Small buttons, big consequences", "Why destructive actions need more than a red shrug."],
  ];
  return (
    <div className="template-preview template-blog">
      <section className="template-blog-hero"><Badge tone="tang">Field notes</Badge><h3>Articles for people who have opened a Jira ticket and aged.</h3><p>Readable editorial surfaces, featured posts, and archive cards without turning into a Medium clone wearing a lanyard.</p></section>
      <div className="template-post-grid">{posts.map(([title, desc], index) => <Card key={title} tone={index === 0 ? "acid" : index === 1 ? "pink" : "paper"} radius={index === 0 ? "none" : undefined}><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{desc}</CardDescription></CardHeader><CardContent><Button tone="paper">Read <ChevronRight size={16} /></Button></CardContent></Card>)}</div>
    </div>
  );
}

export function EcommerceTemplatePreview() {
  const products = ["Panic Tote", "Invoice Hammer", "Goblin Mug", "Desk Siren"];
  return (
    <div className="template-preview template-shop">
      <section className="template-shop-hero"><div><Badge tone="pink">Shop drop</Badge><h3>Merch for teams that survived Q4 and kept the receipts.</h3><p>Product grids, detail cards, cart summaries, and checkout panels with enough personality to avoid becoming beige commerce paste.</p></div><Card tone="acid" radius="none"><CardHeader><CardTitle>Cart</CardTitle><CardDescription>3 questionable decisions</CardDescription></CardHeader><CardContent><div className="template-row"><span>Subtotal</span><b>$84</b></div><Button tone="ink">Checkout</Button></CardContent></Card></section>
      <div className="template-product-grid">{products.map((name, index) => <Card key={name} className="template-product-card" tone={index === 1 ? "tang" : undefined}><CardContent><div className="template-product-art"><ShoppingBag /></div><b>{name}</b><span>${(index + 2) * 13}</span></CardContent></Card>)}</div>
    </div>
  );
}

export function AgencyTemplatePreview() {
  return (
    <div className="template-preview template-agency">
      <section className="template-split"><div><Badge tone="ultra">Agency / studio</Badge><h3>We make websites that do not look assembled during a hostage negotiation.</h3><p>Portfolio surfaces, case-study cards, service menus, and contact blocks with enough bite to get remembered.</p><Button tone="pink">Book the uncomfortable meeting</Button></div><Card tone="acid" radius="none"><CardHeader><CardTitle>Selected work</CardTitle></CardHeader><CardContent className="template-stack"><div className="template-row"><span>Clinic site</span><b>+38% bookings</b></div><div className="template-row"><span>Tool launch</span><b>1.8k signups</b></div><div className="template-row"><span>Brand rescue</span><b>less beige</b></div></CardContent></Card></section>
      <section className="template-feature-grid"><Card><CardHeader><CardTitle>Strategy</CardTitle><CardDescription>We ask why until the room sweats.</CardDescription></CardHeader></Card><Card tone="pink"><CardHeader><CardTitle>Build</CardTitle><CardDescription>Design that survives implementation.</CardDescription></CardHeader></Card><Card tone="tang"><CardHeader><CardTitle>Launch</CardTitle><CardDescription>Ship it with receipts, not vibes in a trench coat.</CardDescription></CardHeader></Card></section>
    </div>
  );
}

export function AiChatTemplatePreview() {
  return (
    <div className="template-preview template-chat">
      <aside className="template-sidebar"><b>Thread pile</b><a>Launch copy</a><a>Bug autopsy</a><a>Template ideas</a><a>Existential CSS</a></aside>
      <main className="template-chat-main"><div className="template-toolbar"><div><Badge tone="acid">AI workspace</Badge><h3>Ask the machine. Make it show its work.</h3></div><Kbd>Ctrl K</Kbd></div><div className="template-chat-log"><Card><CardContent><b>You</b><p>Rewrite this homepage so it stops sounding like a committee learned adjectives.</p></CardContent></Card><Card tone="ultra" radius="none"><CardContent><b>Assistant</b><p>Absolutely. First we remove “seamless,” then we wash our hands.</p></CardContent></Card></div><div className="template-chat-input"><Input placeholder="Ask for the useful version..." /><Button tone="pink"><MessageSquare size={16} /> Send</Button></div></main>
    </div>
  );
}

export function ChangelogTemplatePreview() {
  const rows = [
    ["v0.8", "Template previews stopped being cardboard."],
    ["v0.7", "Calendar, toast, carousel, and sidebar grew usable limbs."],
    ["v0.6", "Routed docs arrived and immediately judged the furniture."],
  ];
  return (
    <div className="template-preview template-changelog">
      <section className="template-split"><div><Badge tone="acid">Product updates</Badge><h3>A changelog that does not read like a printer manual.</h3><p>Release notes, upgrade warnings, roadmap crumbs, and “we fixed the weird thing” updates people can actually scan.</p></div><Card tone="pink"><CardHeader><CardTitle>Latest</CardTitle><CardDescription>Template depth pass</CardDescription></CardHeader><CardContent><Progress value={86} /></CardContent></Card></section>
      <Card><CardContent><Table><TableHeader><TableRow><TableHead>Version</TableHead><TableHead>What changed</TableHead></TableRow></TableHeader><TableBody>{rows.map(([version, change]) => <TableRow key={version}><TableCell><b>{version}</b></TableCell><TableCell>{change}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
    </div>
  );
}
