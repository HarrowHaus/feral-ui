import * as React from "react";
import { Code2, FileText, Image, Trash2, Zap } from "lucide-react";
// Voice Law rule 7: component-voice.json is the single source of component
// descriptions for BOTH the registry generator and this site catalog.
import componentVoice from "./component-voice.json";
import {
  Accordion,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertIcon,
  AlertTitle,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  Badge,
  Banner,
  BarChart,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Calendar,
  Callout,
  CalloutDescription,
  CalloutTitle,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselControls,
  CarouselDots,
  CarouselItem,
  CarouselTrack,
  Checkbox,
  CheckboxRow,
  CodeBlock,
  CodeTabs,
  Combobox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  CopyButton,
  DataTable,
  DatePicker,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  ErrorSummary,
  Field,
  FieldHelp,
  FileUpload,
  FeralBurst,
  FeralSplat,
  FeralStamp,
  FormLegend,
  FormSection,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  ImageCard,
  InlineCode,
  Input,
  InputAddon,
  InputGroup,
  Kbd,
  Label,
  Marquee,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  Meter,
  OtpInput,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PreviewFrame,
  Progress,
  Radio,
  RadioRow,
  ResizablePanel,
  ResizablePanels,
  ScrollArea,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarCollapseButton,
  SidebarFooter,
  SidebarLayout,
  SidebarLink,
  SidebarMain,
  SidebarSection,
  SidebarToggle,
  Skeleton,
  Slider,
  Spinner,
  StatCard,
  Stepper,
  Switch,
  SwitchRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  ThemeSelector,
  Timeline,
  Toast,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui";
import type { ComponentCatalogItem } from "./component-catalog";

const rows = [
  { task: "Invoice goblin", owner: "Mara", status: "Loose" },
  { task: "Demo cleanup", owner: "Ike", status: "Contained" },
  { task: "Button audit", owner: "Nobody", status: "Suspicious" },
];

const copy: Record<string, { description: string; usage: string; accessibility: string }> = {
  accordion: { description: "Stacked disclosure panels for FAQs, settings, and all the little explanations hiding under the rug.", usage: "<Accordion items={items} />", accessibility: "Disclosure content stays keyboard reachable and visibly focused." },
  "alert-dialog": { description: "A hard stop for destructive choices, because some buttons should need adult supervision.", usage: "<AlertDialog>...</AlertDialog>", accessibility: "Radix handles focus management and escape behavior." },
  alert: { description: "Inline message block for good news, bad news, and news that arrived wearing a tiny helmet.", usage: "<Alert tone=\"acid\"><AlertTitle>Saved</AlertTitle></Alert>", accessibility: "Use clear text and icon support without relying on color alone." },
  "aspect-ratio": { description: "A media box that keeps its shape when the layout starts doing jazz hands.", usage: "<AspectRatio ratio={16 / 9}>...</AspectRatio>", accessibility: "Content inside keeps normal semantics." },
  avatar: { description: "A small identity blob for people, teams, bots, and accounts you may later regret inviting.", usage: "<Avatar><AvatarFallback>FU</AvatarFallback></Avatar>", accessibility: "Fallback initials remain visible when images fail." },
  "avatar-group": { description: "A tiny pile of people. Useful for teams, watchers, approvals, and blame distribution.", usage: "<AvatarGroup>...</AvatarGroup>", accessibility: "Each avatar can keep its own accessible label." },
  badge: { description: "Small status labels with enough volume to avoid becoming gray dashboard lint.", usage: "<Badge tone=\"pink\">Beta</Badge>", accessibility: "Text label carries the meaning." },
  banner: { description: "Page-wide announcement strip for warnings, launches, maintenance, and legal goblin activity.", usage: "<Banner tone=\"pink\">...</Banner>", accessibility: "Keep banner text concise and dismissible when persistent." },
  breadcrumb: { description: "Navigation crumbs for users who wandered too deep into the product cave.", usage: "<Breadcrumb>...</Breadcrumb>", accessibility: "Use a clear hierarchy of links." },
  button: { description: "The obvious one. Clickable, loud, and less emotionally fragile than most CTAs.", usage: "<Button tone=\"pink\">Do the thing</Button>", accessibility: "Native button behavior and visible focus styling." },
  "button-group": { description: "Related actions grouped together so the UI stops scattering buttons like dropped cereal.", usage: "<ButtonGroup><Button>Copy</Button><Button>Fork</Button></ButtonGroup>", accessibility: "Group related controls with clear labels." },
  calendar: { description: "Date picking surface for scheduling, booking, filtering, and pretending time is manageable.", usage: "<Calendar />", accessibility: "Keyboard movement and selected-date state are visible." },
  callout: { description: "A highlighted note that interrupts politely, then refuses to leave unnoticed.", usage: "<Callout><CalloutTitle>Heads up</CalloutTitle></Callout>", accessibility: "Use headings and descriptive text, not color alone." },
  card: { description: "The base surface for almost everything: pricing, forms, panels, goblin containment units.", usage: "<Card><CardHeader><CardTitle>Panel</CardTitle></CardHeader></Card>", accessibility: "Structural wrapper; content inside defines semantics." },
  carousel: { description: "Horizontal preview reel for testimonials, product screenshots, and slides with main-character syndrome.", usage: "<Carousel><CarouselTrack>...</CarouselTrack></Carousel>", accessibility: "Controls are keyboard reachable and labeled." },
  chart: { description: "Simple visual data blocks for dashboards that need a pulse before a full chart adapter arrives.", usage: "<BarChart data={data} />", accessibility: "Pair visual bars with readable labels and values." },
  checkbox: { description: "Binary form choice for remembering users, accepting terms, and other tiny bargains.", usage: "<CheckboxRow><Checkbox /> Remember me</CheckboxRow>", accessibility: "Native checkbox input and label pairing." },
  "code-block": { description: "Command and code display without making the page look like a terminal had a mattress sale.", usage: "<CodeBlock>npm run build</CodeBlock>", accessibility: "Readable monospace block with selectable text." },
  "code-tabs": { description: "Tabbed code examples for install commands, usage snippets, and alternate ways to make mistakes.", usage: "<CodeTabs tabs={tabs} />", accessibility: "Tab labels should describe each code variant." },
  combobox: { description: "Searchable select for long option lists and people who refuse to scroll like peasants.", usage: "<Combobox options={options} />", accessibility: "Command-style search with keyboard navigation." },
  command: { description: "Search palette for docs, app actions, and emergency keyboard goblin summoning.", usage: "<Command><CommandInput /></Command>", accessibility: "Built on cmdk patterns for keyboard-first action lists." },
  "context-menu": { description: "Right-click menu for secondary actions, advanced controls, and hidden little knives.", usage: "<ContextMenu>...</ContextMenu>", accessibility: "Radix menu behavior supports keyboard and pointer use." },
  "data-table": { description: "Searchable, sortable rows for app screens where the spreadsheet has escaped containment.", usage: "<DataTable data={rows} columns={columns} />", accessibility: "Table semantics and labeled controls." },
  "date-picker": { description: "Calendar-in-a-popover for forms, filters, and deadlines with bad vibes.", usage: "<DatePicker />", accessibility: "Date button and calendar remain keyboard reachable." },
  dialog: { description: "Modal surface for focused tasks, confirmations, and things the page cannot whisper.", usage: "<Dialog>...</Dialog>", accessibility: "Radix Dialog handles focus trapping and escape behavior." },
  "dropdown-menu": { description: "Compact action menu for settings, exports, account options, and tiny organized chaos.", usage: "<DropdownMenu>...</DropdownMenu>", accessibility: "Radix menu primitives handle keyboard behavior." },
  "empty-state": { description: "When there is nothing to show, at least let the nothing have stage presence.", usage: "<EmptyState title=\"No files\" />", accessibility: "Clear heading and recovery action." },
  field: { description: "Label, input, and help text arranged like a form section that has seen daylight.", usage: "<Field><Label>Email</Label><Input /></Field>", accessibility: "Pair labels and helper text with controls." },
  "file-upload": { description: "Drop zone for files, screenshots, PDFs, and other artifacts with suspicious filenames.", usage: "<FileUpload />", accessibility: "Input remains available to keyboard and screen-reader users." },
  form: { description: "Grouped form sections and error summaries for forms that stop blaming the user.", usage: "<FormSection>...</FormSection>", accessibility: "Error summaries make validation problems easy to find." },
  "hover-card": { description: "A little information card that appears before users commit to clicking the mystery meat.", usage: "<HoverCard>...</HoverCard>", accessibility: "Radix hover card behavior with readable content." },
  "input-group": { description: "Input with attached prefix or suffix, because lonely fields make bad choices.", usage: "<InputGroup><InputAddon>@</InputAddon><Input /></InputGroup>", accessibility: "Input label remains separate from decorative addon." },
  kbd: { description: "Keyboard hint pill for shortcuts, command palettes, and power-user bait.", usage: "<Kbd>Ctrl K</Kbd>", accessibility: "Text remains readable without relying on icon-only cues." },
  sheet: { description: "Side panel for carts, filters, settings, and things that enter from the edge with opinions.", usage: "<Sheet>...</Sheet>", accessibility: "Built on dialog behavior for focus handling." },
  sidebar: { description: "App shell navigation for dashboards, docs, and tools with more rooms than sense.", usage: "<SidebarLayout>...</SidebarLayout>", accessibility: "Links remain keyboard reachable and labeled." },
  tabs: { description: "Tabbed content for views, examples, settings, and product copy that needs compartments.", usage: "<Tabs items={items} />", accessibility: "Tabs expose labels and selected state." },
  tooltip: { description: "Short helper text for icons, abbreviations, and UI decisions that need a whisper.", usage: "<Tooltip>...</Tooltip>", accessibility: "Do not hide essential information only in a tooltip." },
};

const voiceDescriptions = componentVoice as Record<string, string>;

export function componentContent(item: ComponentCatalogItem) {
  const base = copy[item.slug] ?? {
    description: `${item.name} component preview. It gets its own page so users can inspect it without spelunking through the demo scroll.`,
    usage: item.snippet,
    accessibility: item.accessibility ?? "Use semantic labels and visible focus styles.",
  };
  // Description always comes from the voice catalog when present (single source).
  return { ...base, description: voiceDescriptions[item.slug] ?? base.description };
}

export function ComponentShowcase({ slug }: { slug: string }) {
  const [date, setDate] = React.useState<Date | undefined>();

  switch (slug) {
    case "accordion": return <Accordion items={[{ title: "Can this ship in a real FAQ?", content: "Yes. Add better questions than this one.", defaultOpen: true }, { title: "Will the goblin answer support tickets?", content: "No. It has been banned from Zendesk." }]} />;
    case "alert-dialog": return <AlertDialog><AlertDialogTrigger asChild><Button tone="pink"><Trash2 size={16} /> Delete demo</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete the suspicious draft?</AlertDialogTitle><AlertDialogDescription>This is a demo, but the hesitation is real.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Delete it</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>;
    case "alert": return <Alert tone="acid"><AlertIcon>!</AlertIcon><div><AlertTitle>Settings saved</AlertTitle><AlertDescription>The form survived. Nobody make eye contact.</AlertDescription></div></Alert>;
    case "aspect-ratio": return <AspectRatio><div className="demo-media-box"><Image /> Preview media</div></AspectRatio>;
    case "avatar": return <div className="demo-row"><Avatar><AvatarFallback>GB</AvatarFallback></Avatar><Avatar tone="pink"><AvatarFallback>UI</AvatarFallback></Avatar><Avatar tone="ultra"><AvatarFallback>404</AvatarFallback></Avatar></div>;
    case "avatar-group": return <AvatarGroup><Avatar><AvatarFallback>AL</AvatarFallback></Avatar><Avatar tone="pink"><AvatarFallback>BB</AvatarFallback></Avatar><Avatar tone="ultra"><AvatarFallback>CG</AvatarFallback></Avatar></AvatarGroup>;
    case "badge": return <div className="demo-row"><Badge>Stable</Badge><Badge tone="pink">Beta</Badge><Badge tone="ultra">Weird</Badge><Badge tone="paper">Tiny sign</Badge></div>;
    case "banner": return <Banner tone="pink">The demo goblin has entered the building. Keep snacks locked.</Banner>;
    case "breadcrumb": return <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#/docs">Docs</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="#/components">Components</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Button</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>;
    case "button": return <ButtonGroup><Button tone="pink">Primary</Button><Button tone="paper">Secondary</Button><Button tone="ultra">Loud option</Button></ButtonGroup>;
    case "button-group": return <ButtonGroup><Button tone="acid">Copy</Button><Button tone="paper">Fork</Button><Button tone="pink">Regret</Button></ButtonGroup>;
    case "calendar": return <Calendar />;
    case "callout": return <Callout tone="ultra"><CalloutTitle>Note from the goblin desk</CalloutTitle><CalloutDescription>This is important enough to interrupt the layout, but not important enough to be boring.</CalloutDescription></Callout>;
    case "card": return <Card tone="acid" radius="none"><CardHeader><CardTitle>Panel with a job</CardTitle><CardDescription>Not every card needs to look like enterprise oatmeal.</CardDescription></CardHeader><CardContent>Use it for pricing, forms, docs, dashboards, and mild public misbehavior.</CardContent></Card>;
    case "carousel": return <Carousel><CarouselTrack><CarouselItem>Slide one: product screenshot with confidence issues.</CarouselItem><CarouselItem>Slide two: suspiciously articulate customer.</CarouselItem><CarouselItem>Slide three: final goblin warning.</CarouselItem></CarouselTrack><CarouselControls /><CarouselDots /></Carousel>;
    case "chart": return <BarChart data={[{ label: "Docs", value: 46, tone: "acid" }, { label: "Apps", value: 72, tone: "pink" }, { label: "Panic", value: 91, tone: "ultra" }]} />;
    case "checkbox": return <div className="site-stack"><CheckboxRow><Checkbox defaultChecked /> Remember this device</CheckboxRow><CheckboxRow><Checkbox /> Send fewer onboarding poems</CheckboxRow></div>;
    case "code-block": return <CodeBlock>{"npm install\nnpm run dev -- --host 0.0.0.0"}</CodeBlock>;
    case "code-tabs": return <CodeTabs tabs={[{ id: "npm", label: "npm", code: "npm run build" }, { id: "termux", label: "Termux", code: "npm run dev -- --host 0.0.0.0" }]} />;
    case "combobox": return <Combobox options={[{ value: "goblin", label: "Goblin mode" }, { value: "office", label: "Office safe" }, { value: "lawsuit", label: "Birthday lawsuit" }]} />;
    case "command": return <Command><CommandInput placeholder="Search components..." /><CommandList><CommandEmpty>No tiny doors found.</CommandEmpty><CommandGroup heading="Components"><CommandItem>Dialog</CommandItem><CommandItem>Data Table</CommandItem><CommandItem>Toast</CommandItem></CommandGroup></CommandList></Command>;
    case "context-menu": return <ContextMenu><ContextMenuTrigger asChild><Button tone="paper">Right click the goblin</Button></ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>Goblin menu</ContextMenuLabel><ContextMenuSeparator /><ContextMenuItem>Copy</ContextMenuItem><ContextMenuItem>Rename</ContextMenuItem><ContextMenuItem>File complaint</ContextMenuItem></ContextMenuContent></ContextMenu>;
    case "copy-button": return <CopyButton value="npm run build" tone="acid">Copy build command</CopyButton>;
    case "data-table": return <DataTable data={rows} columns={[{ key: "task", header: "Task", sortable: true }, { key: "owner", header: "Owner", sortable: true }, { key: "status", header: "Status", sortable: true }]} enableSearch selectable />;
    case "date-picker": return <DatePicker value={date} onChange={setDate} />;
    case "dialog": return <Dialog><DialogTrigger asChild><Button tone="pink">Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Dialog with manners</DialogTitle><DialogDescription>It traps focus, opens cleanly, and still looks like it knows a guy.</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button tone="acid">Close</Button></DialogClose></DialogFooter></DialogContent></Dialog>;
    case "dropdown-menu": return <DropdownMenu><DropdownMenuTrigger asChild><Button tone="tang">Open menu</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Actions</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem>Duplicate</DropdownMenuItem><DropdownMenuItem>Export</DropdownMenuItem><DropdownMenuItem>Send to goblin</DropdownMenuItem></DropdownMenuContent></DropdownMenu>;
    case "empty-state": return <EmptyState title="Nothing here yet" description="The goblin checked under the rug. Mostly lint." />;
    case "field": return <Field><Label htmlFor="showcase-email">Email</Label><Input id="showcase-email" placeholder="you@example.com" /><FieldHelp>We will not send twelve onboarding poems.</FieldHelp></Field>;
    case "file-upload": return <FileUpload />;
    case "form": return <div className="site-stack"><ErrorSummary errors={["Name is required.", "Mood cannot be set to beige."]} /><FormSection><FormLegend>Project</FormLegend><Field><Label htmlFor="project-name">Name</Label><Input id="project-name" placeholder="Goblin CRM" /></Field></FormSection></div>;
    case "hover-card": return <HoverCard><HoverCardTrigger asChild><Button tone="paper">Hover for context</Button></HoverCardTrigger><HoverCardContent><strong>Small card, big opinions.</strong><p>Good for people, files, and preview snippets.</p></HoverCardContent></HoverCard>;
    case "image-card": return <ImageCard title="Launch poster" description="Media surface with text backup"><Zap /></ImageCard>;
    case "input-group": return <InputGroup><InputAddon>@</InputAddon><Input placeholder="handle" /></InputGroup>;
    case "kbd": return <div className="demo-row"><Kbd>Ctrl</Kbd><Kbd>K</Kbd><InlineCode>open command menu</InlineCode></div>;
    case "marquee": return <Marquee><span>NEW DROP</span><span>LESS BEIGE</span><span>MORE BUTTONS WITH JOBS</span></Marquee>;
    case "menubar": return <Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New goblin</MenubarItem><MenubarItem>Export</MenubarItem><MenubarSeparator /><MenubarItem>Quit dramatically</MenubarItem></MenubarContent></MenubarMenu></Menubar>;
    case "meter": return <Meter label="Goblin containment" value={68} tone="pink" />;
    case "ornaments": return <div className="demo-row"><FeralBurst tone="acid" /><FeralSplat tone="pink" /><FeralStamp tone="ultra">No beige</FeralStamp></div>;
    case "otp-input": return <OtpInput length={6} label="Demo verification code" />;
    case "pagination": return <Pagination />;
    case "popover": return <Popover><PopoverTrigger asChild><Button tone="paper">Open popover</Button></PopoverTrigger><PopoverContent><strong>Popover content</strong><p>Small surface. Medium goblin.</p></PopoverContent></Popover>;
    case "preview-frame": return <PreviewFrame title="Nested preview"><Button tone="pink">Inside the frame</Button></PreviewFrame>;
    case "progress": return <Progress value={67} />;
    case "radio": return <div className="site-stack"><RadioRow><Radio name="demo-radio" defaultChecked /> Standard chaos</RadioRow><RadioRow><Radio name="demo-radio" /> Premium chaos</RadioRow></div>;
    case "resizable": return <ResizablePanels><ResizablePanel>Left panel</ResizablePanel><ResizablePanel>Right panel</ResizablePanel></ResizablePanels>;
    case "scroll-area": return <ScrollArea style={{ height: 180 }}><div style={{ padding: 16 }}>Long content. The panel scrolls. The goblin remains technically inside the box.<br /><br />More content. More content. More content. More content.</div></ScrollArea>;
    case "separator": return <div><p>Before</p><Separator /><p>After</p></div>;
    case "sheet": return <Sheet><SheetTrigger asChild><Button tone="ultra">Open sheet</Button></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Side panel</SheetTitle><SheetDescription>Filters, carts, settings, and other edge-based drama.</SheetDescription></SheetHeader><SheetFooter><Button tone="acid">Apply</Button></SheetFooter></SheetContent></Sheet>;
    case "sidebar": return <SidebarLayout style={{ minHeight: 280 }}><SidebarToggle /><Sidebar><SidebarSection title="App"><SidebarLink active href="#">Dashboard</SidebarLink><SidebarLink href="#">Reports</SidebarLink><SidebarLink href="#">Settings</SidebarLink></SidebarSection><SidebarFooter><SidebarCollapseButton>Collapse</SidebarCollapseButton></SidebarFooter></Sidebar><SidebarMain>Content area with fewer excuses.</SidebarMain></SidebarLayout>;
    case "skeleton": return <div className="site-stack"><Skeleton /><Skeleton style={{ width: "72%" }} /><Skeleton style={{ width: "44%" }} /></div>;
    case "slider": return <Slider defaultValue={[42]} max={100} step={1} aria-label="Demo slider" />;
    case "sonner": return <Toast title="Saved" description="The tiny rectangle did its best." tone="pink" />;
    case "spinner": return <div className="demo-row"><Spinner /><span>Loading something suspicious...</span></div>;
    case "stat-card": return <StatCard title="Open tasks" value="247" delta="+14 today" tone="acid" />;
    case "stepper": return <Stepper steps={[{ label: "Choose", state: "complete" }, { label: "Configure", state: "current" }, { label: "Ship", state: "upcoming" }]} />;
    case "switch": return <div className="site-stack"><SwitchRow><Switch defaultChecked /> Enable goblin mode</SwitchRow><SwitchRow><Switch /> Notify accounting</SwitchRow></div>;
    case "table": return <Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Dialog</TableCell><TableCell>Ready</TableCell></TableRow><TableRow><TableCell>Calendar</TableCell><TableCell>Needs coffee</TableCell></TableRow></TableBody></Table>;
    case "tabs": return <Tabs items={[{ id: "one", label: "Overview", content: "The short version." }, { id: "two", label: "Details", content: "The goblin added footnotes." }]} />;
    case "theme-selector": return <ThemeSelector value="acid" />;
    case "timeline": return <Timeline items={[{ time: "09:00", title: "Build passed" }, { time: "09:05", title: "Design complained", tone: "pink" }, { time: "09:10", title: "Goblin blamed CSS", tone: "tang" }]} />;
    case "toggle": return <Toggle aria-label="Toggle code"><Code2 size={16} /> Code</Toggle>;
    case "toggle-group": return <ToggleGroup type="multiple" aria-label="Formatting"><ToggleGroupItem value="bold">B</ToggleGroupItem><ToggleGroupItem value="italic">I</ToggleGroupItem><ToggleGroupItem value="code"><Code2 size={16} /></ToggleGroupItem></ToggleGroup>;
    case "tooltip": return <TooltipProvider><Tooltip><TooltipTrigger asChild><Button tone="paper">Hover me</Button></TooltipTrigger><TooltipContent>Helpful little whisper goblin.</TooltipContent></Tooltip></TooltipProvider>;
    default: return <Card><CardHeader><CardTitle>{slug}</CardTitle><CardDescription>Preview coming soon. Not a button pretending to be useful.</CardDescription></CardHeader><CardContent><FileText /></CardContent></Card>;
  }
}
