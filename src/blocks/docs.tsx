import { Badge, Card, CardContent, CardHeader, CardTitle, ScrollArea, Sidebar, SidebarLayout, SidebarLink, SidebarMain } from "../components/ui";

export function DocsLayoutBlock() {
  return (
    <SidebarLayout>
      <Sidebar>
        <strong>Docs</strong>
        <SidebarLink href="#" active>Button</SidebarLink>
        <SidebarLink href="#">Dialog</SidebarLink>
        <SidebarLink href="#">Table</SidebarLink>
        <SidebarLink href="#">Blocks</SidebarLink>
      </Sidebar>
      <SidebarMain>
        <Badge tone="paper">Docs block</Badge>
        <h2>Button</h2>
        <p>Buttons are pressure objects. They should feel stamped, not gently suggested by a committee wearing quarter-zips.</p>
        <Card tone="acid" radius="none"><CardHeader><CardTitle>Preview</CardTitle></CardHeader><CardContent><button className="feral-button feral-press" data-tone="pink">Button</button></CardContent></Card>
        <ScrollArea style={{ height: 160 }}><pre className="site-code">{`<Button tone="pink">Button</Button>`}</pre></ScrollArea>
      </SidebarMain>
    </SidebarLayout>
  );
}
