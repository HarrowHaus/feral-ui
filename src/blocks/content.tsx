import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, EmptyState, Separator } from "../components/ui";

export function BlogIndexBlock() {
  const posts = ["Controlled variance is not random", "How to write jokes without lying", "The registry becomes real after the receipts"];
  return (
    <section className="block block-blog">
      <div><Badge tone="ultra">Journal block</Badge><h2>Dispatches from the CSS animal shelter.</h2></div>
      <div className="block-blog-list">
        {posts.map((post, index) => <Card key={post} tone={index === 1 ? "acid" : "paper"}><CardHeader><CardTitle>{post}</CardTitle><CardDescription>June {11 + index}, 2026 · 4 min read</CardDescription></CardHeader><CardContent><Button tone="paper">Read</Button></CardContent></Card>)}
      </div>
    </section>
  );
}

export function ChangelogBlock() {
  return (
    <Card className="block-changelog" tone="paper">
      <CardHeader><Badge tone="pink">Changelog</Badge><CardTitle>v0.3: the goblin got a clipboard.</CardTitle></CardHeader>
      <CardContent>
        <p>Added docs shell, blocks, templates, parity components, and an honest path toward registry distribution.</p>
        <Separator />
        <p><strong>Known crime:</strong> this is still a local source package until registry item files are generated and tested.</p>
      </CardContent>
    </Card>
  );
}

export function EmptyStateBlock() {
  return <EmptyState title="No beige cards found" description="The system searched the premises and only found loud, accountable interface objects." />;
}
