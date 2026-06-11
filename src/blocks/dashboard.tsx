import { Badge, BarChart, Button, Card, CardContent, CardHeader, CardTitle, DataTable, Progress, Sidebar, SidebarLayout, SidebarLink, SidebarMain, StatCard } from "../components/ui";

const rows = [
  { project: "Docs shell", status: "Built", owner: "feral" },
  { project: "Registry", status: "Parked", owner: "receipts" },
  { project: "Templates", status: "Growing", owner: "goblin" },
];

export function DashboardShellBlock() {
  return (
    <SidebarLayout>
      <Sidebar>
        <strong>feral/ui</strong>
        <SidebarLink href="#" active>Overview</SidebarLink>
        <SidebarLink href="#">Components</SidebarLink>
        <SidebarLink href="#">Blocks</SidebarLink>
        <SidebarLink href="#">Settings</SidebarLink>
      </Sidebar>
      <SidebarMain>
        <div className="block-dashboard-head"><div><Badge tone="acid">Dashboard block</Badge><h2>Control room for the chaos.</h2></div><Button tone="pink">Ship it</Button></div>
        <div className="block-dashboard-stats"><StatCard title="Coverage" value="72%" delta="+18" tone="acid" /><StatCard title="Regrets" value="0" delta="audited" /><StatCard title="Variance" value="High" delta="tokenized" tone="pink" /></div>
        <Card><CardHeader><CardTitle>Build telemetry</CardTitle></CardHeader><CardContent><BarChart data={[{label:"UI",value:48,tone:"acid"},{label:"Blocks",value:14,tone:"pink"},{label:"Docs",value:18,tone:"ultra"}]} /></CardContent></Card>
        <Progress value={72} />
        <DataTable data={rows} columns={[{key:"project",header:"Project"},{key:"status",header:"Status"},{key:"owner",header:"Owner"}]} />
      </SidebarMain>
    </SidebarLayout>
  );
}
