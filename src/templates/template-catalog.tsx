import { DashboardShellBlock, DocsLayoutBlock, MarketingHeroBlock, PricingBlock, BlogIndexBlock, ChangelogBlock, LoginBlock } from "../blocks";

export const templateCatalog = [
  { name: "SaaS Landing", status: "basis", description: "Hero + pricing + CTA surfaces.", component: <><MarketingHeroBlock /><PricingBlock /></> },
  { name: "Dashboard App", status: "basis", description: "Sidebar shell, stats, chart, table.", component: <DashboardShellBlock /> },
  { name: "Docs Site", status: "basis", description: "Sidebar docs page with preview/code split.", component: <DocsLayoutBlock /> },
  { name: "Blog / Changelog", status: "basis", description: "Article index and changelog card.", component: <><BlogIndexBlock /><ChangelogBlock /></> },
  { name: "Auth", status: "basis", description: "Login card and form controls.", component: <LoginBlock /> },
];
