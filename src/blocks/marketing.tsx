import { Badge, Button, Card, CardContent, CardHeader, CardTitle, StatCard } from "../components/ui";

export function MarketingHeroBlock() {
  return (
    <section className="block block-hero">
      <div>
        <Badge tone="pink">Marketing block</Badge>
        <h2>Launch pages that look like they have a pulse.</h2>
        <p>Hero copy, CTA cluster, stat cards, and one deliberately loud proof surface. Useful enough for production, feral enough to upset a template marketplace.</p>
        <div className="block-actions"><Button tone="ink">Start building</Button><Button tone="paper">View code</Button></div>
      </div>
      <div className="block-card-stack">
        <StatCard title="Components" value="48+" delta="basis" tone="acid" />
        <Card tone="pink"><CardHeader><CardTitle>No beige lobby music.</CardTitle></CardHeader><CardContent>Design system discipline with comedy elbows.</CardContent></Card>
      </div>
    </section>
  );
}

export function PricingBlock() {
  const tiers = [
    ["Starter Goblin", "$0", "Source repo, docs, and emotionally supervised chaos."],
    ["Pro Menace", "$19", "Blocks, templates, registry later, fewer apologies."],
    ["Enterprise Circus", "Call", "For teams with procurement and unresolved design trauma."],
  ];
  return (
    <section className="block block-pricing">
      {tiers.map(([name, price, description], index) => (
        <Card key={name} tone={index === 1 ? "pink" : index === 2 ? "ultra" : "paper"} radius={index === 2 ? "none" : "default"}>
          <CardHeader><CardTitle>{name}</CardTitle></CardHeader>
          <CardContent><div className="block-price">{price}</div><p>{description}</p><Button tone={index === 1 ? "acid" : "paper"}>Choose poorly</Button></CardContent>
        </Card>
      ))}
    </section>
  );
}
