import {
  AgencyTemplatePreview,
  AiChatTemplatePreview,
  BlogTemplatePreview,
  ChangelogTemplatePreview,
  DashboardTemplatePreview,
  DocsTemplatePreview,
  EcommerceTemplatePreview,
  SaasTemplatePreview,
} from "./template-previews";

export const templateCatalog = [
  {
    name: "SaaS Landing",
    status: "expanded",
    description: "Invoice-ops landing page with hero, proof cards, features, and a month-end panic reducer.",
    component: <SaasTemplatePreview />,
  },
  {
    name: "Dashboard App",
    status: "expanded",
    description: "Ops console with sidebar, metrics, table, and a queue that has clearly seen things.",
    component: <DashboardTemplatePreview />,
  },
  {
    name: "Docs Site",
    status: "expanded",
    description: "Component documentation layout with left nav, page body, TOC, preview, and usage copy.",
    component: <DocsTemplatePreview />,
  },
  {
    name: "Blog / Magazine",
    status: "expanded",
    description: "Editorial homepage for field notes, launch posts, and useful yelling in article form.",
    component: <BlogTemplatePreview />,
  },
  {
    name: "Ecommerce",
    status: "expanded",
    description: "Product grid, cart summary, and shop surfaces for merch with questionable emotional stability.",
    component: <EcommerceTemplatePreview />,
  },
  {
    name: "Agency / Portfolio",
    status: "expanded",
    description: "Studio page with service framing, selected work, and a contact CTA that does not whisper.",
    component: <AgencyTemplatePreview />,
  },
  {
    name: "AI Chat App",
    status: "expanded",
    description: "Threaded AI workspace with prompt input, chat log, and source-aware product tone.",
    component: <AiChatTemplatePreview />,
  },
  {
    name: "Changelog",
    status: "expanded",
    description: "Release notes that tell users what changed without embalming the sentence first.",
    component: <ChangelogTemplatePreview />,
  },
];
