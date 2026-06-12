import * as React from "react";
import { Search, Zap, Trash2, Type, Bold, Italic, Code2, CheckCircle2 } from "lucide-react";
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
  Callout,
  CalloutDescription,
  CalloutTitle,
  CodeBlock,
  CodeTabs,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselControls,
  CarouselDots,
  CarouselItem,
  CarouselTrack,
  Checkbox,
  CheckboxRow,
  Combobox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DataTable,
  DatePicker,
  DateRangePicker,
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
  FeralArrow,
  FeralBurst,
  FeralCensor,
  FeralPointer,
  FeralReceiptTag,
  FeralScribble,
  FeralSplat,
  FeralStamp,
  FeralStar,
  FeralTinyGoblin,
  FeralWarning,
  feralOrnamentCatalog,
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
  Meter,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  OtpInput,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  PreviewFrame,
  Radio,
  RadioRow,
  ResizablePanel,
  ResizablePanels,
  ScrollArea,
  Select,
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
  Stepper,
  Sparkline,
  StatCard,
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
  Textarea,
  Toast,
  ToastProvider,
  ToastStack,
  useToast,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui";
import { componentCatalog } from "./docs/component-catalog";
import { ComponentShowcase, componentContent } from "./docs/component-showcase";
import { templateCatalog } from "./templates/template-catalog";
import { DocsProductShell } from "./features/docs-shell";
import { StyleLab } from "./features/style-lab";
import { BlogIndexBlock, ChangelogBlock, DashboardShellBlock, DocsLayoutBlock, EmptyStateBlock, LoginBlock, MarketingHeroBlock, PricingBlock } from "./blocks";

function Nav() {
  return (
    <header className="site-nav">
      <a className="site-mark" href="#top" aria-label="feral/ui home"><span className="site-mark-dot" /> feral/ui</a>
      <a href="#doctrine">Build</a>
      <a href="#components">Components</a>
      <a href="#docs">Docs</a>
      <a href="#blocks">Blocks</a>
      <a href="#templates">Templates</a>
      <a href="#route-docs">Guides</a>
      <a href="#style-lab">Style Lab</a>
      <a href="#blueprint">Roadmap</a>
      <span className="site-nav-right">
        <span className="site-search"><Search size={13} /> Search soon. Panic now.</span>
        <Badge tone="paper">preview build</Badge>
      </span>
    </header>
  );
}

function Hero() {
  return (
    <section className="site-hero" id="top">
      <div className="site-eyebrow"><Badge tone="pink">Controlled variance UI</Badge><Badge tone="paper">No fake registry cosplay</Badge></div>
      <h1>Build pages<br />that do not<br /><span className="site-highlight pink">look sedated.</span></h1>
      <p>
        A React component kit for landing pages, dashboards, docs, forms, shops, blogs, and apps that need more personality than a compliance webinar.
      </p>
      <div className="site-hero-actions">
        <Button tone="ink" size="lg">See what it builds</Button>
        <Button tone="pink" size="lg" tilt="left">Browse components</Button>
        <Button tone="paper" size="lg">Copy the source</Button>
      </div>
      <div className="site-note">Pre-release truth label: the source is real, the preview is real, and the hosted install story is not getting a fake mustache until it passes clean-app tests.</div>
    </section>
  );
}

function ComponentCollage() {
  const rows = [
    { component: "Button", state: "built", receipt: "tone/shape/size/tilt" },
    { component: "Dialog", state: "built", receipt: "Radix focus management" },
    { component: "Calendar", state: "basis", receipt: "native date math" },
  ];

  return (
    <section className="site-collage" aria-label="Component collage" id="components">
      <Card tilt="left" radius="none">
        <CardHeader><CardTitle>Login to your account</CardTitle><CardDescription>Calmer than it looks. Still wearing the traffic cone.</CardDescription></CardHeader>
        <CardContent className="site-stack">
          <Field><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="you@feral.dev" /></Field>
          <Field><Label htmlFor="password">Password</Label><Input id="password" type="password" placeholder="••••••••" /><FieldHelp>Password managers welcome. We are loud, not foolish.</FieldHelp></Field>
          <CheckboxRow><Checkbox defaultChecked /> Remember me and this design decision</CheckboxRow>
        </CardContent>
        <CardFooter><Button tone="acid">Login</Button><Button tone="paper">Google</Button></CardFooter>
      </Card>

      <Alert tone="ultra"><AlertIcon>⚡</AlertIcon><div><AlertTitle>Saved.</AlertTitle><AlertDescription>Your settings are committed. The beige committee has been notified and is coping poorly.</AlertDescription></div></Alert>

      <Accordion items={[{ title: "Is it accessible?", content: "Behavior-heavy pieces use Radix/cmdk. Native pieces stay native. The visual layer gets jokes; the interaction layer gets receipts.", defaultOpen: true }, { title: "Is it random?", content: "No. Mutation is constrained to named axes: ink, pressure, collision, signal, pattern, tilt, density." }]} />

      <Card tone="acid" radius="none"><CardHeader><CardTitle>OTP code</CardTitle><CardDescription>Every box gets a costume. The group still gets a label.</CardDescription></CardHeader><CardContent><OtpInput length={6} label="Demo OTP code" /></CardContent></Card>

      <Tabs items={[{ id: "law", label: "Law", content: "Landing pages, pressure, focus rings, and semantic discipline are non-negotiable." }, { id: "crime", label: "Crime", content: "Radii clash. Patterns trespass. Shadows get louder than product strategy." }, { id: "alibi", label: "Alibi", content: "Every visual offense maps back to a token." }]} />

      <Card tone="pink"><CardContent className="site-stack"><SwitchRow><Switch defaultChecked /> Feral mode</SwitchRow><SwitchRow><Switch /> Domesticated</SwitchRow></CardContent></Card>

      <Card><CardContent style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><Badge>Shipped</Badge><Badge tone="pink">Beta</Badge><Badge tone="ultra">Radix</Badge><Badge tone="tang">Loud</Badge><Badge tone="paper">Dashed</Badge></CardContent></Card>

      <Card tone="acid" radius="none" tilt="right"><CardContent className="site-stack"><Field><Label htmlFor="project">Project name</Label><Input id="project" defaultValue="variance-machine-v3" /></Field><Field><Label htmlFor="mood">Mood</Label><Select id="mood" defaultValue="barely"><option value="unhinged">Unhinged</option><option value="barely">Barely contained</option><option value="committee">Committee-proof</option></Select></Field></CardContent></Card>

      <Card><CardContent><Pagination /></CardContent></Card>

      <Card tone="ultra" radius="none"><CardHeader><CardTitle>Data table</CardTitle><CardDescription>Apps and forms in little bordered cells.</CardDescription></CardHeader><CardContent><DataTable data={rows} columns={[{ key: "component", header: "Component" }, { key: "state", header: "State" }, { key: "receipt", header: "Receipt" }]} /></CardContent></Card>

      <Card tone="tang"><CardHeader><CardTitle>Combobox</CardTitle><CardDescription>Popover plus command. Tiny menu goblin.</CardDescription></CardHeader><CardContent><Combobox options={[{ value: "acid", label: "Acid" }, { value: "pink", label: "Pink" }, { value: "ultra", label: "Ultra" }]} /></CardContent></Card>

      <Card><CardHeader><CardTitle>Calendar</CardTitle></CardHeader><CardContent><Calendar /></CardContent></Card>
    </section>
  );
}

function Doctrine() {
  return (
    <section className="site-section" id="doctrine">
      <h2>What you can build without looking like everyone else.</h2>
      <p className="site-section-intro">Use it for product pages, internal tools, docs, dashboards, forms, and marketing surfaces that need to be memorable without becoming a usability crime scene.</p>
      <div className="site-grid">
        <Card tone="acid" radius="none"><CardHeader><CardTitle>Landing pages</CardTitle><CardDescription>Hero sections, pricing, FAQs, testimonials, and CTAs with enough presence to survive a crowded tab bar.</CardDescription></CardHeader><CardContent>Build the front door of a product without sanding off every interesting corner.</CardContent></Card>
        <Card tone="pink"><CardHeader><CardTitle>Dashboards</CardTitle><CardDescription>Stats, queues, filters, tables, panels, and charts for teams that need to see the mess before it grows teeth.</CardDescription></CardHeader><CardContent>Useful for admin screens, customer portals, ops boards, and anywhere data needs a little backbone.</CardContent></Card>
        <Card tone="ultra" radius="none"><CardHeader><CardTitle>Docs and guides</CardTitle><CardDescription>Component pages, code examples, callouts, sidebars, changelogs, and searchable documentation.</CardDescription></CardHeader><CardContent>Keep the docs readable. Let the callouts yell. Everyone wins except beige.</CardContent></Card>
        <Card tone="tang"><CardHeader><CardTitle>Apps and forms</CardTitle><CardDescription>Inputs, dialogs, date pickers, tables, command menus, toasts, sidebars, and stateful app surfaces.</CardDescription></CardHeader><CardContent>The jokes live in the copy. The interaction layer still has to pay rent.</CardContent></Card>
      </div>
    </section>
  );
}

function BehaviorLab() {
  return (
    <TooltipProvider>
      <section className="site-section" id="behavior">
        <h2>Interactive components that do the annoying parts correctly.</h2>
        <p className="site-section-intro">Dialogs, sheets, menus, hover cards, tooltips, command search, and popovers are included so your app can move without falling down the stairs.</p>
        <div className="site-kitchen">
          <Card tone="acid" radius="none"><CardHeader><CardTitle>Overlays, menus, and panels</CardTitle><CardDescription>The behavior layer stays boring on purpose. The wrapper gets to wear the loud jacket.</CardDescription></CardHeader><CardContent><div className="site-mini-grid">
            <Dialog><DialogTrigger asChild><Button tone="pink">Dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Modal with receipts</DialogTitle><DialogDescription>Radix Dialog under a feral shell. Focus trap: not held together with gum.</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button tone="ink">Close</Button></DialogClose></DialogFooter></DialogContent></Dialog>
            <Sheet><SheetTrigger asChild><Button tone="ultra">Sheet</Button></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Side panel</SheetTitle><SheetDescription>Settings, filters, carts, and other drawers where product managers put guilt.</SheetDescription></SheetHeader><SheetFooter><Button tone="acid">Save</Button></SheetFooter></SheetContent></Sheet>
            <Popover><PopoverTrigger asChild><Button tone="paper">Popover</Button></PopoverTrigger><PopoverContent><strong>Popover panel.</strong><p>Small contextual goblin. Useful, against all odds.</p></PopoverContent></Popover>
            <DropdownMenu><DropdownMenuTrigger asChild><Button tone="tang">Dropdown</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Feral settings</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem>Dial variance up</DropdownMenuItem><DropdownMenuItem>Dial variance down</DropdownMenuItem><DropdownMenuItem>Print apology</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
            <Tooltip><TooltipTrigger asChild><Button tone="acid">Tooltip</Button></TooltipTrigger><TooltipContent>Pointy little explanation gremlin.</TooltipContent></Tooltip>
            <HoverCard><HoverCardTrigger asChild><Button tone="ink">Hover card</Button></HoverCardTrigger><HoverCardContent><strong>@feral-ui</strong><p>Controlled variance, public embarrassment, private semantic discipline.</p></HoverCardContent></HoverCard>
            <AlertDialog><AlertDialogTrigger asChild><Button tone="pink"><Trash2 size={16} /> Alert dialog</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete the beige card?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. The beige card had it coming, but still: confirm like an adult.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Delete it</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
            <ContextMenu><ContextMenuTrigger asChild><Button tone="paper">Right click me</Button></ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>Context crime</ContextMenuLabel><ContextMenuSeparator /><ContextMenuItem>Copy token</ContextMenuItem><ContextMenuCheckboxItem checked>Keep pressure</ContextMenuCheckboxItem><ContextMenuItem>Report to design police</ContextMenuItem></ContextMenuContent></ContextMenu>
          </div></CardContent></Card>
          <div className="site-stack">
            <Command><CommandInput placeholder="Search the future docs..." /><CommandList><CommandEmpty>No result. The index fell into the sauce.</CommandEmpty><CommandGroup heading="Components"><CommandItem>Dialog</CommandItem><CommandItem>Context Menu</CommandItem><CommandItem>Data Table</CommandItem></CommandGroup><CommandSeparator /><CommandGroup heading="Doctrine"><CommandItem>Controlled variance</CommandItem><CommandItem>No fake CLI cult</CommandItem></CommandGroup></CommandList></Command>
            <Card><CardHeader><CardTitle>Progress, slider, toggles</CardTitle></CardHeader><CardContent className="site-stack"><Progress value={67} /><Slider defaultValue={[42]} max={100} step={1} aria-label="Variance amount" /><ToggleGroup type="multiple" aria-label="Formatting"><ToggleGroupItem value="bold" aria-label="Bold"><Bold size={16} /></ToggleGroupItem><ToggleGroupItem value="italic" aria-label="Italic"><Italic size={16} /></ToggleGroupItem><ToggleGroupItem value="code" aria-label="Code"><Code2 size={16} /></ToggleGroupItem></ToggleGroup><Toggle aria-label="Toggle large type"><Type size={16} /> Big Type</Toggle></CardContent></Card>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}

function FormsAndData() {
  const [date, setDate] = React.useState<Date | undefined>();
  return (
    <section className="site-section" id="forms-data">
      <h2>App screens need more than buttons.</h2>
      <p className="site-section-intro">Forms, uploads, validation, date picking, tables, charts, and content panels are the parts people actually ship after the homepage gets applause.</p>
      <div className="site-grid">
        <Card><CardHeader><CardTitle>Input group + date picker</CardTitle></CardHeader><CardContent className="site-stack"><InputGroup><InputAddon>@</InputAddon><Input placeholder="handle" /></InputGroup><DatePicker value={date} onChange={setDate} />
          <DateRangePicker /></CardContent></Card>
        <Card tone="acid" radius="none"><CardHeader><CardTitle>Form section</CardTitle></CardHeader><CardContent className="site-stack"><ErrorSummary errors={["Project name is too beige.", "Variance needs a declared axis."]} /><FormSection><FormLegend>Project</FormLegend><Field><Label htmlFor="bio">Notes</Label><Textarea id="bio" placeholder="Explain the goblin..." /></Field></FormSection></CardContent></Card>
        <Card tone="paper"><CardHeader><CardTitle>Upload</CardTitle></CardHeader><CardContent><FileUpload /></CardContent></Card>
        <Card tone="ultra" radius="none"><CardHeader><CardTitle>Chart</CardTitle><CardDescription>CSS chart basis, real chart adapters later.</CardDescription></CardHeader><CardContent><BarChart data={[{ label: "UI", value: 48, tone: "acid" }, { label: "Blocks", value: 14, tone: "pink" }, { label: "Docs", value: 18, tone: "ultra" }]} /><Separator /><Sparkline data={[2, 7, 4, 9, 12, 8, 16, 10]} /></CardContent></Card>
      </div>
    </section>
  );
}

function ComponentDocs() {
  const [active, setActive] = React.useState(componentCatalog[0]);
  return (
    <section className="site-section" id="docs">
      <h2>Component pages with previews and source notes.</h2>
      <p className="site-section-intro">Browse components by name, preview the behavior, check the source path, and see what is ready versus what still needs a stronger coffee.</p>
      <div className="docs-frame">
        <nav className="docs-sidebar" aria-label="Component documentation">
          {componentCatalog.map((item) => <Button key={item.name} type="button" tone={item.name === active.name ? "pink" : "paper"} className="template-button" onClick={() => setActive(item)}>{item.name}</Button>)}
        </nav>
        <div className="docs-main">
          <div className="docs-page-card"><Badge tone={active.status === "built" ? "acid" : "tang"}>{active.status}</Badge><h3>{active.name}</h3><p>{active.notes}</p><p><strong>File:</strong> <code>{active.file}</code></p></div>
          <div className="docs-preview-code"><div className="docs-preview"><DocsPreview name={active.name} /></div><pre className="docs-code">{active.snippet}</pre></div>
        </div>
      </div>
    </section>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return <Button tone="acid" onClick={() => toast({ title: "Saved", description: "Tiny yelling rectangle deployed.", tone: "pink", action: { label: "Undo", onClick: () => undefined } })}>Trigger toast</Button>;
}

function DocsPreview({ name }: { name: string }) {
  if (name === "Dialog") return <Dialog><DialogTrigger asChild><Button tone="pink">Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Dialog</DialogTitle><DialogDescription>Preview from docs data.</DialogDescription></DialogHeader></DialogContent></Dialog>;
  if (name === "Alert Dialog") return <AlertDialog><AlertDialogTrigger asChild><Button tone="pink">Delete</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Sure?</AlertDialogTitle><AlertDialogDescription>Confirmation preview.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>;
  if (name === "Context Menu") return <ContextMenu><ContextMenuTrigger asChild><Button tone="paper">Right click</Button></ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Copy</ContextMenuItem><ContextMenuItem>Paste</ContextMenuItem></ContextMenuContent></ContextMenu>;
  if (name === "Command") return <Command style={{ width: "100%" }}><CommandInput placeholder="Search..." /><CommandList><CommandGroup><CommandItem>Button</CommandItem><CommandItem>Card</CommandItem></CommandGroup></CommandList></Command>;
  if (name === "Calendar") return <Calendar />;
  if (name === "Combobox") return <Combobox options={[{ value: "feral", label: "Feral" }, { value: "calm", label: "Calm" }]} />;
  if (name === "Data Table") return <DataTable data={[{ name: "Button", state: "built" }]} columns={[{ key: "name", header: "Name" }, { key: "state", header: "State" }]} />;
  if (name === "Chart") return <BarChart data={[{ label: "A", value: 10 }, { label: "B", value: 18, tone: "pink" }]} />;
  if (name === "Sidebar") return <SidebarLayout style={{ minHeight: 260 }}><SidebarToggle /><Sidebar><SidebarSection title="Library"><SidebarLink href="#" active>Docs</SidebarLink><SidebarLink href="#">Blocks</SidebarLink></SidebarSection><SidebarFooter>Goblin account</SidebarFooter></Sidebar><SidebarMain>Sidebar preview.</SidebarMain></SidebarLayout>;
  if (name === "Toast") return <div className="site-stack"><ToastDemo /><Toast title="Saved" description="Provider/hook basis with dismiss and action support." /></div>;
  if (name === "Breadcrumb") return <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Button</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>;
  if (name === "Button Group") return <ButtonGroup><Button tone="acid">Copy</Button><Button tone="paper">Fork</Button><Button tone="pink">Riot</Button></ButtonGroup>;
  if (name === "Callout") return <Callout tone="ultra"><CalloutTitle>Receipt rule</CalloutTitle><CalloutDescription>Show the source or sit down.</CalloutDescription></Callout>;
  if (name === "Code Block") return <CodeBlock>{`npm run build`}</CodeBlock>;
  if (name === "Kbd") return <Kbd>⌘K</Kbd>;
  if (name === "Meter") return <Meter label="Dashboards" value={72} />;
  if (name === "Stepper") return <Stepper steps={[{ label: "Tokenize", state: "complete" }, { label: "Preview", state: "current" }, { label: "Ship", state: "upcoming" }]} />;
  if (name === "Timeline") return <Timeline items={[{ time: "v0.2", title: "Radix layer" }, { time: "v0.4", title: "Registry scripts", tone: "pink" }]} />;
  if (name === "Theme Selector") return <ThemeSelector value="acid" />;
  if (name === "Image Card") return <ImageCard title="Preview" description="Template media"><Zap /></ImageCard>;
  if (name === "Spinner") return <Spinner />;
  if (name === "Card") return <Card tone="acid" radius="none"><CardHeader><CardTitle>Card</CardTitle></CardHeader><CardContent>Preview.</CardContent></Card>;
  return <Button tone="pink">Button</Button>;
}

function Blocks() {
  return (
    <section className="site-section" id="blocks">
      <h2>Blocks for real page sections.</h2>
      <p className="site-section-intro">Hero sections, pricing cards, auth panels, dashboards, docs layouts, blogs, changelogs, and empty states. The component zoo has learned architecture.</p>
      <MarketingHeroBlock />
      <PricingBlock />
      <div className="site-grid"><LoginBlock /><EmptyStateBlock /></div>
      <DashboardShellBlock />
      <DocsLayoutBlock />
      <div className="site-grid"><BlogIndexBlock /><ChangelogBlock /></div>
    </section>
  );
}

function TemplateBrowser() {
  const [active, setActive] = React.useState(templateCatalog[0]);
  return (
    <section className="site-section" id="templates">
      <h2>Templates you can judge with your eyes.</h2>
      <p className="site-section-intro">Pick a template and see a full surface, not a tiny placeholder dressed as a product. SaaS, dashboards, docs, blogs, shops, agencies, AI apps, and changelogs all get their own room.</p>
      <div className="template-browser">
        <div className="template-list">{templateCatalog.map((template) => <Button key={template.name} type="button" tone={template.name === active.name ? "pink" : "paper"} className="template-button" onClick={() => setActive(template)}>{template.name}</Button>)}</div>
        <div className="template-stage"><Card><CardHeader><Badge tone="acid">{active.status}</Badge><CardTitle>{active.name}</CardTitle><CardDescription>{active.description}</CardDescription></CardHeader><CardContent>{active.component}</CardContent></Card></div>
      </div>
    </section>
  );
}

function KitchenSink() {
  return (
    <section className="site-section" id="more">
      <h2>More pieces included.</h2>
      <div className="site-grid">
        <Card><CardHeader><CardTitle>Avatar</CardTitle></CardHeader><CardContent style={{ display: "flex", gap: 12 }}><Avatar><AvatarFallback>FU</AvatarFallback></Avatar><Avatar tone="pink"><AvatarFallback>UI</AvatarFallback></Avatar><Avatar tone="ultra"><AvatarFallback>V3</AvatarFallback></Avatar></CardContent></Card>
        <Card tone="acid" radius="none"><CardHeader><CardTitle>Carousel</CardTitle></CardHeader><CardContent><Carousel><CarouselTrack><CarouselItem>Slide one, legally a card.</CarouselItem><CarouselItem>Slide two, emotionally a warning.</CarouselItem><CarouselItem>Slide three, visually a tax audit.</CarouselItem></CarouselTrack><CarouselControls /><CarouselDots /></Carousel></CardContent></Card>
        <Card><CardHeader><CardTitle>Aspect ratio</CardTitle></CardHeader><CardContent><AspectRatio><div style={{ display: "grid", placeItems: "center", height: "100%" }}><Zap /> Media box</div></AspectRatio></CardContent></Card>
        <Card tone="tang"><CardHeader><CardTitle>Resizable basis</CardTitle></CardHeader><CardContent><ResizablePanels><ResizablePanel>Panel A. CSS resize basis.</ResizablePanel><ResizablePanel>Panel B. Real drag handles later.</ResizablePanel></ResizablePanels></CardContent></Card>
        <Card tone="paper"><CardHeader><CardTitle>Scroll area</CardTitle></CardHeader><CardContent><ScrollArea style={{ height: 160 }}><div style={{ padding: 16 }}>Long content. The scrollbars are Radix. The visual treatment is what happens when office supplies form a ska band.<br /><br />More content. More content. More content. More content. More content. More content.</div></ScrollArea></CardContent></Card>
        <Card tone="ultra" radius="none"><CardHeader><CardTitle>Toast stack</CardTitle></CardHeader><CardContent><Toast title="Saved" description="Static live-region basis until a Sonner adapter earns its snacks." /></CardContent></Card>
      </div>
      <ToastStack><Toast title="Build basis active" description="This is intentionally visible as a component demo." /></ToastStack>
    </section>
  );
}

function ProductizationLab() {
  const [accent, setAccent] = React.useState<"acid" | "pink" | "ultra" | "tang" | "cyan">("acid");
  return (
    <section className="site-section" id="productization">
      <h2>Customize the kit without opening a portal.</h2>
      <p className="site-section-intro">Tune the look, copy the source, inspect the registry work, and keep the funny parts in the UI instead of the install process.</p>
      <Banner tone="pink"><span>v0.4 truth label: local source + generated registry item files + smoke validation script.</span><Kbd>⌘K</Kbd></Banner>
      <div className="site-metric-strip" aria-label="v0.4 metrics">
        <div className="site-metric"><b>60+</b><span>source exports/components</span></div>
        <div className="site-metric"><b>8</b><span>block families</span></div>
        <div className="site-metric"><b>6</b><span>template previews</span></div>
        <div className="site-metric"><b>2</b><span>registry scripts</span></div>
      </div>
      <div className="site-product-panel">
        <Card tone="acid" radius="none"><CardHeader><CardTitle>Style lab</CardTitle><CardDescription>Make variance visible without making it mystical. Mysticism is for brand decks and people who say “synergy” without blinking.</CardDescription></CardHeader><CardContent className="site-stack"><ThemeSelector value={accent} onValueChange={setAccent} /><Meter label="Dashboards shadow" value={72} tone={accent} /><Meter label="Pattern trespass" value={44} tone="pink" /><Stepper steps={[{ label: "Tokenize", description: "Name the axis", state: "complete" }, { label: "Preview", description: "Dogfood it", state: "current" }, { label: "Registry", description: "Generate, test, then brag", state: "upcoming" }]} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Docs atoms</CardTitle><CardDescription>Small pieces needed for real documentation pages.</CardDescription></CardHeader><CardContent className="site-stack"><Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Button</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb><Callout tone="ultra"><CalloutTitle>Receipt rule</CalloutTitle><CalloutDescription>If a page says keyboard support, it points to the primitive or test. No “trust me, bro” aria cosplay.</CalloutDescription></Callout><CodeBlock>{`pnpm registry:build\npnpm smoke:registry`}</CodeBlock></CardContent></Card>
      </div>
    </section>
  );
}

function NthComponents() {
  return (
    <section className="site-section" id="nth-components">
      <h2>Small components that make the big pages work.</h2>
      <p className="site-section-intro">Keyboard hints, callouts, timelines, meters, image cards, avatar groups, code blocks, and loading states. Not glamorous. Very necessary. Like socks.</p>
      <div className="site-grid">
        <Card tone="paper"><CardHeader><CardTitle>Button group</CardTitle></CardHeader><CardContent><ButtonGroup><Button tone="acid">Copy</Button><Button tone="paper">Fork</Button><Button tone="pink">Riot</Button></ButtonGroup></CardContent></Card>
        <Card tone="acid" radius="none"><CardHeader><CardTitle>Avatar group</CardTitle></CardHeader><CardContent><AvatarGroup><Avatar><AvatarFallback>FU</AvatarFallback></Avatar><Avatar tone="pink"><AvatarFallback>UI</AvatarFallback></Avatar><Avatar tone="ultra"><AvatarFallback>V4</AvatarFallback></Avatar></AvatarGroup></CardContent></Card>
        <Card tone="ultra" radius="none"><CardHeader><CardTitle>Timeline</CardTitle></CardHeader><CardContent><Timeline items={[{ time: "v0.1", title: "Static seed", description: "Pretty goblin, no spine." }, { time: "v0.2", title: "Radix layer", description: "Behavior enters the room.", tone: "pink" }, { time: "v0.4", title: "Registry receipts", description: "Generated item files, still local.", tone: "tang" }]} /></CardContent></Card>
        <Card tone="tang"><CardHeader><CardTitle>Image card</CardTitle></CardHeader><CardContent><ImageCard title="Template preview" description="Media placeholder with real component chrome."><Zap size={42} /></ImageCard></CardContent></Card>
        <Card><CardHeader><CardTitle>Loading + keys</CardTitle></CardHeader><CardContent style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}><Spinner /><Kbd>Ctrl</Kbd><Kbd>K</Kbd><InlineCode>--feral-tilt</InlineCode></CardContent></Card>
        <Card tone="pink"><CardHeader><CardTitle>Callout</CardTitle></CardHeader><CardContent><Callout tone="danger"><CalloutTitle>Do not ship vibes as proof.</CalloutTitle><CalloutDescription>Funny copy is seasoning. Build receipts are dinner. Eat your dinner.</CalloutDescription></Callout></CardContent></Card>
      </div>
    </section>
  );
}

function CompetitiveAudit() {
  const rows = [
    { rival: "neobrutalism.dev", strength: "clear shadcn component parity and recognizable visual category", gap: "less actively maintained; narrow aesthetic grammar", feral: "match parity, exceed with controlled variance and blocks/templates" },
    { rival: "8bitcn", strength: "registry, blocks, docs, themes, sponsors, playful category ownership", gap: "8-bit theme is specific; less universal outside retro/game interfaces", feral: "needs trusted registry + theme editor + more blocks" },
    { rival: "pxlkit", strength: "icons, visual builder, templates, tests, toast system, monorepo depth", gap: "pixel/retro product scope is huge but style-specific", feral: "needs icon/ornament pack and builder-like style lab" },
  ];
  return (
    <section className="site-section" id="audit-compare">
      <h2>Why this exists.</h2>
      <p className="site-section-intro">Most UI kits are either very useful and very plain, or very loud and not useful enough. This is the attempt to be both useful and impossible to confuse for a payroll portal.</p>
      <Table className="audit-table"><TableHeader><TableRow><TableHead>Rival</TableHead><TableHead>Their actual edge</TableHead><TableHead>Opening</TableHead><TableHead>feral/ui response</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={row.rival}><TableCell>{row.rival}</TableCell><TableCell>{row.strength}</TableCell><TableCell>{row.gap}</TableCell><TableCell>{row.feral}</TableCell></TableRow>)}</TableBody></Table>
    </section>
  );
}

function Matrix() {
  return (
    <section className="site-section" id="matrix">
      <h2>What is included.</h2>
      <div style={{ overflowX: "auto", marginTop: 24 }}>
        <Table><TableHeader><TableRow><TableHead>Layer</TableHead><TableHead>Now in source</TableHead><TableHead>Still not pretending</TableHead></TableRow></TableHeader><TableBody>
          <TableRow><TableCell>Tokens</TableCell><TableCell>Landing pages, pressure, radius, color, pattern, tilt, density.</TableCell><TableCell>Theme generator and visual regression snapshots.</TableCell></TableRow>
          <TableRow><TableCell>Components</TableCell><TableCell>48+ source exports including Radix overlays, command, context menu, calendar/date picker basis, data table, chart basis, sidebar, carousel, scroll area, avatar, toggles.</TableCell><TableCell>Production-grade calendar, sortable data table, chart adapter, true resizable drag handles.</TableCell></TableRow>
          <TableRow><TableCell>Blocks</TableCell><TableCell>Marketing, pricing, auth, dashboard, docs, blog, changelog, empty state.</TableCell><TableCell>More industry templates and code extraction pages.</TableCell></TableRow>
          <TableRow><TableCell>Distribution</TableCell><TableCell>Local source repo, registry inventory docs.</TableCell><TableCell>Actual shadcn registry item JSON generated from stable source files.</TableCell></TableRow>
        </TableBody></Table>
      </div>
    </section>
  );
}

function Blueprint() {
  return (
    <section className="site-section" id="blueprint">
      <h2>Roadmap.</h2>
      <p className="site-section-intro">Next comes deeper templates, better docs pages, cleaner registry output, and enough testing that the public preview can stop wearing a helmet indoors.</p>
      <div className="site-grid">
        <Card tone="acid" radius="none"><CardHeader><CardTitle>Registry generator</CardTitle></CardHeader><CardContent>Generate real shadcn registry item files from source, validate paths/dependencies, and only then expose install commands.</CardContent></Card>
        <Card tone="pink"><CardHeader><CardTitle>Docs routing</CardTitle></CardHeader><CardContent>Promote the docs shell into route-backed pages: overview, installation truth, styling, components, blocks, templates, changelog.</CardContent></Card>
        <Card tone="ultra" radius="none"><CardHeader><CardTitle>Hard components</CardTitle></CardHeader><CardContent>Finish calendar, date picker, sortable data table, chart adapter, sonner adapter, carousel controls, resizable drag handles.</CardContent></Card>
        <Card tone="tang"><CardHeader><CardTitle>Release receipts</CardTitle></CardHeader><CardContent>Keyboard audit, axe pass, mobile pass, visual regression, README install truth, license, examples, package naming.</CardContent></Card>
      </div>
    </section>
  );
}

function Repo() {
  return (
    <section className="site-section" id="repo">
      <h2>Run it locally.</h2>
      <p className="site-section-intro">Clone it, install it, run it, and inspect the source. The package can be funny. The setup should not be.</p>
      <code className="site-code">npm install{"\n"}npm run dev -- --host 0.0.0.0</code>
      <div className="site-grid"><Card tone="acid" radius="none"><CardHeader><CardTitle>Source truth</CardTitle></CardHeader><CardContent>Components live in <strong>src/components/ui</strong>. Blocks live in <strong>src/blocks</strong>.</CardContent></Card><Card><CardHeader><CardTitle>Dogfood truth</CardTitle></CardHeader><CardContent>The website imports the same components it demonstrates. Broken preview means broken library. Beautifully humiliating.</CardContent></Card><Card tone="pink"><CardHeader><CardTitle>Registry truth</CardTitle></CardHeader><CardContent>Still parked. It becomes marketing only when generated files install cleanly.</CardContent></Card></div>
    </section>
  );
}

function HomePage() {
  return (
    <div className="feral-shell">
      <a className="feral-skip" href="#components">Skip to components</a>
      <Nav />
      <main>
        <Hero />
        <ComponentCollage />
        <Marquee><span style={{ color: "var(--feral-pink)" }}>FERAL/UI</span><span>×</span><span style={{ color: "var(--feral-acid)" }}>CONTROLLED VARIANCE</span><span>×</span><span style={{ color: "var(--feral-cyan)" }}>NO FAKE CLI</span><span>×</span><span style={{ color: "var(--feral-violet)" }}>RECEIPTS OR RIOT</span><span>×</span></Marquee>
        <Doctrine />
        <BehaviorLab />
        <FormsAndData />
        <ComponentDocs />
        <DocsProductShell />
        <StyleLab />
        <ProductizationLab />
        <NthComponents />
        <Blocks />
        <TemplateBrowser />
        <KitchenSink />
        <CompetitiveAudit />
        <Matrix />
        <Blueprint />
        <Repo />
      </main>
      <footer className="site-footer"><span>feral/ui v0.5 — controlled variance, now with a clipboard and several unresolved stickers.</span><span>MIT later. Remote registry later. Local registry receipts now.</span></footer>
    </div>
  );
}


type SiteRoute = { href: string; label: string; tone?: "acid" | "pink" | "ultra" | "paper" | "tang" };

const siteRoutes: SiteRoute[] = [
  { href: "#/", label: "Home", tone: "paper" },
  { href: "#/docs/installation", label: "Install truth", tone: "acid" },
  { href: "#/components", label: "Components", tone: "pink" },
  { href: "#/blocks", label: "Blocks", tone: "tang" },
  { href: "#/templates", label: "Templates", tone: "ultra" },
  { href: "#/style-lab", label: "Style Lab", tone: "acid" },
  { href: "#/ornaments", label: "Ornaments", tone: "pink" },
  { href: "#/docs/accessibility", label: "Apps and forms", tone: "paper" },
];

const docsRoutes = [
  ["installation", "Installation truth"],
  ["styling", "Styling"],
  ["theming", "Theming"],
  ["accessibility", "Accessibility"],
  ["controlled-variance", "Controlled variance"],
  ["changelog", "Changelog"],
] as const;

const templateRoutes = [
  { slug: "saas", name: "SaaS landing", description: "Marketing hero, pricing, testimonials, final CTA. The useful kind of loud.", component: <><MarketingHeroBlock /><PricingBlock /></> },
  { slug: "dashboard", name: "Dashboard app", description: "Sidebar, metrics, chart, data table, and settings surface.", component: <DashboardShellBlock /> },
  { slug: "docs", name: "Docs site", description: "Docs shell, component page, callouts, code, preview frames.", component: <DocsLayoutBlock /> },
  { slug: "blog", name: "Blog / magazine", description: "Article cards, index surface, changelog crumbs.", component: <BlogIndexBlock /> },
  { slug: "ecommerce", name: "Ecommerce product", description: "Product pitch, pricing card, cart-ish summary, proof badges.", component: <TemplateEcommerce /> },
  { slug: "agency", name: "Agency / portfolio", description: "Case-study hero, services grid, and suspiciously confident CTA.", component: <TemplateAgency /> },
  { slug: "ai-chat", name: "AI chat app", description: "Command surface, chat cards, prompt chips, and a sidebar that remembers shame.", component: <TemplateAiChat /> },
  { slug: "changelog", name: "Changelog / updates", description: "Timeline, release notes, badges, and public receipts.", component: <ChangelogBlock /> },
] as const;

function useHashRoute() {
  const read = () => window.location.hash.replace(/^#/, "") || "/";
  const [route, setRoute] = React.useState(read);
  React.useEffect(() => {
    const onHash = () => setRoute(read());
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

function ProductNav() {
  return (
    <header className="site-nav route-nav">
      <a className="site-mark" href="#/" aria-label="feral/ui home"><span className="site-mark-dot" /> feral/ui</a>
      {siteRoutes.slice(1).map((route) => <a key={route.href} href={route.href}>{route.label}</a>)}
      <span className="site-nav-right"><Badge tone="paper">v0.6 routed</Badge></span>
    </header>
  );
}

function RoutedShell({ children }: { children: React.ReactNode }) {
  return <div className="feral-shell route-shell"><a className="feral-skip" href="#route-main">Skip to page</a><ProductNav /><main id="route-main" className="route-main">{children}</main><footer className="site-footer"><span>feral/ui v0.6 — routes, pages, ornaments, theme output, and fewer fake doors.</span><span>Public registry still waits for hosted install receipts. Honesty: irritating but load-bearing.</span></footer></div>;
}

function RouteHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return <section className="route-hero"><Badge tone="pink">{eyebrow}</Badge><h1>{title}</h1><p>{description}</p>{children}</section>;
}

function DocsIndex() {
  return (
    <RoutedShell>
      <RouteHero eyebrow="Docs" title="The docs are now pages, not one long hallway with clown wallpaper." description="Direct routes exist for installation, styling, theming, accessibility, controlled variance, components, blocks, templates, ornaments, and the Style Lab." />
      <RouteGrid items={docsRoutes.map(([slug, label]) => ({ href: `#/docs/${slug}`, title: label, description: docsDescription(slug) }))} />
    </RoutedShell>
  );
}

function docsDescription(slug: string) {
  const map: Record<string, string> = {
    installation: "No fake CLI spells. Local commands, registry truth, fresh-app smoke receipts.",
    styling: "Landing pages, pressure, radius collision, pattern, tilt, density, and color tokens.",
    theming: "Use the Style Lab output, CSS variables, and controlled presets.",
    accessibility: "The interface looks bitten by a radioactive sticker sheet. The semantics are boring on purpose.",
    "controlled-variance": "The category thesis: chaos is allowed only when the axis is named.",
    changelog: "What changed, what broke, what the goblin is blaming on procurement.",
  };
  return map[slug] ?? "Docs page.";
}

function RouteGrid({ items }: { items: { href: string; title: string; description: string; tag?: string }[] }) {
  return <div className="route-card-grid">{items.map((item, index) => <a className="route-card feral-press" href={item.href} key={item.href} data-tone={index % 4 === 0 ? "acid" : index % 4 === 1 ? "pink" : index % 4 === 2 ? "ultra" : "paper"}><strong>{item.title}</strong><span>{item.description}</span>{item.tag ? <Badge tone="paper">{item.tag}</Badge> : null}</a>)}</div>;
}

function DocPage({ slug }: { slug: string }) {
  if (slug === "accessibility") return <AccessibilityPage />;
  if (slug === "theming") return <RoutedShell><RouteHero eyebrow="Theming" title="The goblin is on a leash." description="Use Style Lab presets or CSS variables. The style is not random; it has a spreadsheet wearing a fake nose." /><StyleLab /></RoutedShell>;
  if (slug === "styling") return <RoutedShell><RouteHero eyebrow="Styling" title="Controlled variance tokens." description="Landing pages, pressure, collision, signal, pattern, tilt, density. Randomness is just laziness with confetti." /><TokenReceiptPanel /></RoutedShell>;
  if (slug === "controlled-variance") return <RoutedShell><RouteHero eyebrow="Doctrine" title="Feral, not random." description="Every visual offense must map to a declared axis. If it cannot name its axis, it goes to the shame bucket." /><Doctrine /></RoutedShell>;
  if (slug === "changelog") return <RoutedShell><RouteHero eyebrow="Changelog" title="Release notes with receipts." description="Less vibe smoke, more exact surfaces shipped." /><ChangelogBlock /><CodeBlock>{`v0.6\n- hash-routed docs/pages\n- 65 generated component docs entries\n- DataTable hardening\n- Style Lab theme generator\n- 40+ ornament exports\n- 8 template routes`}</CodeBlock></RoutedShell>;
  return <RoutedShell><RouteHero eyebrow="Installation truth" title="No fake install theater." description="The local source and registry materialization tests exist. Public hosted shadcn commands appear only when hosted fresh-app install passes." /><div className="route-two-col"><CodeTabs tabs={[{ id: "local", label: "Local", code: `npm install\nnpm run registry:build\nnpm run smoke:registry\nnpm run smoke:fresh-app\nnpm run build` }, { id: "termux", label: "Termux", code: `pkg update -y\npkg install -y nodejs unzip\nunzip feral-ui-kit-v0.6.zip\ncd feral-ui-kit\nnpm install\nnpm run dev -- --host 0.0.0.0` }]} /><Callout tone="danger"><CalloutTitle>Receipt rule</CalloutTitle><CalloutDescription>Docs may be rude. Install commands may not hallucinate. The CLI goblin does not get creative writing privileges.</CalloutDescription></Callout></div></RoutedShell>;
}

function TokenReceiptPanel() {
  const tokens = ["--feral-ink", "--feral-cream", "--feral-border-md", "--feral-pressure-md", "--feral-radius-md", "--feral-pink", "--feral-acid", "--feral-ultra", "--feral-pattern-intensity", "--feral-density"];
  return <section className="site-section"><div className="feral-token-grid">{tokens.map((token) => <Badge key={token} tone="paper">{token}</Badge>)}</div><CodeTabs tabs={[{ id: "css", label: "CSS", code: `:root {\n  --feral-border-md: 4px;\n  --feral-pressure-md: 5px;\n  --feral-radius-md: 10px;\n  --feral-pink: #ff2d9b;\n}` }]} /></section>;
}

function ComponentsIndexPage() {
  return <RoutedShell><RouteHero eyebrow="Components" title={`${componentCatalog.length} registry UI records now have routes.`} description="Every source item gets a component page with status, preview, usage, source path, dependency notes, and accessibility receipt. Some are still basis-level. None are hidden in the shame closet." /><RouteGrid items={componentCatalog.map((item) => ({ href: `#/components/${item.slug}`, title: item.name, description: item.notes, tag: item.status }))} /></RoutedShell>;
}

function ComponentRoutePage({ slug }: { slug: string }) {
  const item = componentCatalog.find((entry) => entry.slug === slug) ?? componentCatalog[0];
  const content = componentContent(item);
  return (
    <RoutedShell>
      <RouteHero eyebrow={item.layer} title={item.name} description={content.description}><div className="route-hero-actions"><Badge tone={item.status === "built" ? "acid" : "tang"}>{item.status}</Badge><Badge tone="paper">{item.file}</Badge></div></RouteHero>
      <div className="route-two-col">
        <PreviewFrame title={`${item.name} preview`}><ComponentShowcase slug={item.slug} /></PreviewFrame>
        <div className="site-stack"><Callout tone="ultra"><CalloutTitle>Accessibility receipt</CalloutTitle><CalloutDescription>{content.accessibility}</CalloutDescription></Callout><Callout tone="acid"><CalloutTitle>Dependencies</CalloutTitle><CalloutDescription>{item.dependencies?.length ? item.dependencies.join(", ") : "No external dependency declared by this source item."}</CalloutDescription></Callout></div>
      </div>
      <CodeTabs tabs={[{ id: "usage", label: "Usage", code: content.usage }, { id: "source", label: "Source path", code: item.file }, { id: "registry", label: "Local registry", code: `public/r/${item.slug}.json\nregistry/items/${item.slug}.json` }]} />
    </RoutedShell>
  );
}

function BlocksIndexPage() {
  const blocks = [
    { href: "#/blocks/marketing", title: "Marketing", description: "Hero, pricing, CTA, testimonials direction." },
    { href: "#/blocks/auth", title: "Auth", description: "Login, OTP, invite, form cards." },
    { href: "#/blocks/dashboard", title: "Dashboard", description: "Shell, stats, charts, data table." },
    { href: "#/blocks/docs", title: "Docs/content", description: "Docs shell, blog, changelog." },
  ];
  return <RoutedShell><RouteHero eyebrow="Blocks" title="Whole surfaces, not buttons in jail." description="Blocks are the bridge from component library to template library. They prove the style can carry real pages." /><RouteGrid items={blocks} /></RoutedShell>;
}

function BlockPage({ slug }: { slug: string }) {
  const content = slug === "dashboard" ? <DashboardShellBlock /> : slug === "auth" ? <LoginBlock /> : slug === "docs" ? <DocsLayoutBlock /> : <><MarketingHeroBlock /><PricingBlock /></>;
  return <RoutedShell><RouteHero eyebrow="Block" title={`${slug[0]?.toUpperCase() + slug.slice(1)} blocks`} description="Preview, source path, dependencies, and eventual registry item. The block is allowed to be funny; the import graph is not." /><PreviewFrame title={`${slug} block preview`}>{content}</PreviewFrame><CodeTabs tabs={[{ id: "source", label: "Source", code: `src/blocks/${slug === "auth" ? "auth" : slug === "dashboard" ? "dashboard" : slug === "docs" ? "docs" : "marketing"}.tsx` }, { id: "registry", label: "Registry", code: `registry/items/block-${slug}.json` }]} /></RoutedShell>;
}

function TemplatesIndexPage() {
  return <RoutedShell><RouteHero eyebrow="Templates" title="Eight template routes. Real pages, not fake screenshots in a trench coat." description="Each template page has a full preview route, block/component dependency notes, and a source path. Still needs final production polish; now the architecture exists." /><RouteGrid items={templateRoutes.map((item) => ({ href: `#/templates/${item.slug}`, title: item.name, description: item.description, tag: "preview" }))} /></RoutedShell>;
}

function TemplatePage({ slug, previewOnly = false }: { slug: string; previewOnly?: boolean }) {
  const template = templateRoutes.find((entry) => entry.slug === slug) ?? templateRoutes[0];
  const preview = <div className="template-full-preview">{template.component}</div>;
  if (previewOnly) return <RoutedShell><RouteHero eyebrow="Isolated preview" title={template.name} description="Full template preview route. Swap content, not standards." />{preview}</RoutedShell>;
  return <RoutedShell><RouteHero eyebrow="Template" title={template.name} description={template.description}><div className="route-hero-actions"><Badge tone="pink">full preview</Badge><a className="feral-button feral-press" data-tone="paper" href={`#/templates/${template.slug}/preview`}>Open isolated preview</a></div></RouteHero><PreviewFrame title={`${template.name} preview`}>{preview}</PreviewFrame><CodeTabs tabs={[{ id: "route", label: "Preview route", code: `#/templates/${template.slug}/preview` }, { id: "deps", label: "Dependencies", code: `blocks: marketing/auth/dashboard/docs/content\ncomponents: button, card, badge, data-table, sidebar, chart, code-tabs` }]} /></RoutedShell>;
}

function TemplateEcommerce() {
  return <section className="block block-hero"><div><Badge tone="acid">Product</Badge><h2>Sticker pack for interfaces with outstanding warrants.</h2><p>Product detail, price, feature bullets, and cart action. Ecommerce doesn't need beige permission.</p><div className="block-actions"><Button tone="ink">Add to cart</Button><Button tone="paper">Read warnings</Button></div></div><Card tone="pink"><CardHeader><CardTitle>$29</CardTitle><CardDescription>Includes burst stickers, receipt tags, and emotional damages.</CardDescription></CardHeader><CardContent><DataTable data={[{ item: "Ornaments", qty: 40 }, { item: "Templates", qty: 8 }]} columns={[{ key: "item", header: "Item", sortable: true }, { key: "qty", header: "Qty", sortable: true }]} dense /></CardContent></Card></section>;
}
function TemplateAgency() {
  return <section className="block block-hero"><div><Badge tone="ultra">Agency</Badge><h2>We make interfaces that enter the room before your brand strategist does.</h2><p>Case studies, service cards, and CTA. The pitch deck is screaming, but the grid is aligned.</p><div className="block-actions"><Button tone="pink">View cases</Button><Button tone="paper">Hire the menace</Button></div></div><div className="block-card-stack"><StatCard title="Cases" value="12" delta="loud" tone="pink" /><StatCard title="Beige removed" value="98%" delta="verified" tone="acid" /></div></section>;
}
function TemplateAiChat() {
  return <SidebarLayout className="template-ai"><SidebarToggle /><Sidebar><SidebarSection title="AI"><SidebarLink active href="#">Chat</SidebarLink><SidebarLink href="#">Prompts</SidebarLink><SidebarLink href="#">Apps and forms</SidebarLink></SidebarSection><SidebarFooter><SidebarCollapseButton>Collapse</SidebarCollapseButton></SidebarFooter></Sidebar><SidebarMain><Card><CardHeader><CardTitle>AI Chat</CardTitle><CardDescription>Prompt chips, response cards, command search, and less corporate fog.</CardDescription></CardHeader><CardContent className="site-stack"><Command><CommandInput placeholder="Ask the goblin to format JSON..." /><CommandList><CommandGroup heading="Prompts"><CommandItem>Audit this component</CommandItem><CommandItem>Generate variants</CommandItem></CommandGroup></CommandList></Command><Alert tone="acid"><AlertIcon>✓</AlertIcon><div><AlertTitle>Response ready</AlertTitle><AlertDescription>The answer has citations, receipts, and only minor bite marks.</AlertDescription></div></Alert></CardContent></Card></SidebarMain></SidebarLayout>;
}

function OrnamentsPage() {
  const samples = [FeralBurst, FeralSplat, FeralArrow, FeralWarning, FeralPointer, FeralStar, FeralCensor, FeralReceiptTag, FeralScribble, FeralTinyGoblin];
  return <RoutedShell><RouteHero eyebrow="Ornament Pack" title={`${feralOrnamentCatalog.length} feral ornament exports.`} description="This is the visual moat: bursts, splats, arrows, scribbles, warning labels, receipt tags, pointers, censor bars, and several shapes that should probably be supervised." /><div className="ornament-grid">{samples.map((Item, index) => <Card key={index} tone={index % 2 ? "paper" : "acid"}><CardContent><Item tone={index % 4 === 0 ? "acid" : index % 4 === 1 ? "pink" : index % 4 === 2 ? "ultra" : "tang"} size="lg" /><Badge tone="paper">{feralOrnamentCatalog[index]}</Badge></CardContent></Card>)}</div><div className="feral-token-grid">{feralOrnamentCatalog.map((name) => <Badge key={name} tone="paper">{name}</Badge>)}</div><CodeTabs tabs={[{ id: "usage", label: "Usage", code: `<FeralBurst tone="acid" size="lg" />\n<FeralWarningLabel tone="pink">NO BEIGE</FeralWarningLabel>` }, { id: "props", label: "Props", code: `tone: ink | pink | acid | ultra | cyan | tang | verm | paper\nsize: sm | md | lg | xl\nlabel?: string` }]} /></RoutedShell>;
}

function StyleLabPage() { return <RoutedShell><StyleLab /></RoutedShell>; }

function AccessibilityPage() {
  return <RoutedShell><RouteHero eyebrow="Accessibility receipts" title="Boring semantics. Radioactive sticker sheet." description="The visual layer is allowed to act like it found a coupon for chaos. The interaction layer has to behave like a professional adult with a mortgage." /><div className="route-card-grid"><Card><CardHeader><CardTitle>Keyboard</CardTitle></CardHeader><CardContent>Radix-backed overlays and menus inherit keyboard/focus behavior. Native controls stay native.</CardContent></Card><Card tone="acid" radius="none"><CardHeader><CardTitle>Focus</CardTitle></CardHeader><CardContent>Visible dashed focus rings are global and intentionally unsubtle. The focus state is not hiding in witness protection.</CardContent></Card><Card tone="pink"><CardHeader><CardTitle>Reduced motion</CardTitle></CardHeader><CardContent>The CSS includes reduced-motion handling; Style Lab motion can be dropped to zero.</CardContent></Card><Card tone="ultra" radius="none"><CardHeader><CardTitle>Known caveat</CardTitle></CardHeader><CardContent>Some basis components still need deeper keyboard/ARIA audits before public registry bragging rights.</CardContent></Card></div><CodeTabs tabs={[{ id: "checklist", label: "Checklist", code: `- Dialog focus trap\n- Popover escape key\n- Menu keyboard navigation\n- Focus-visible rings\n- Reduced motion\n- Form error summaries\n- Live region toasts\n- Color contrast presets` }]} /></RoutedShell>;
}

function NotFoundRoute({ route }: { route: string }) {
  return <RoutedShell><RouteHero eyebrow="404" title="This route escaped into the vents." description={`No page exists for ${route}. Either the goblin ate it or the docs got ahead of the source.`} /><Button tone="acid" onClick={() => { window.location.hash = "#/"; }}>Go home</Button></RoutedShell>;
}

function AppRoutes() {
  const route = useHashRoute();
  if (route === "/" || route === "") return <HomePage />;
  if (route === "/docs") return <DocsIndex />;
  if (route.startsWith("/docs/")) return <DocPage slug={route.split("/")[2] || "installation"} />;
  if (route === "/components") return <ComponentsIndexPage />;
  if (route.startsWith("/components/")) return <ComponentRoutePage slug={route.split("/")[2] || "button"} />;
  if (route === "/blocks") return <BlocksIndexPage />;
  if (route.startsWith("/blocks/")) return <BlockPage slug={route.split("/")[2] || "marketing"} />;
  if (route === "/templates") return <TemplatesIndexPage />;
  if (route.startsWith("/templates/")) { const parts = route.split("/"); return <TemplatePage slug={parts[2] || "saas"} previewOnly={parts[3] === "preview"} />; }
  if (route === "/style-lab") return <StyleLabPage />;
  if (route === "/ornaments") return <OrnamentsPage />;
  if (route === "/showcase") return <RoutedShell><RouteHero eyebrow="Showcase" title="Showcase intake, not fake social proof." description="Real showcase submissions come later. Fake testimonials stay in the dumpster where they can network." /></RoutedShell>;
  if (route === "/changelog") return <DocPage slug="changelog" />;
  return <NotFoundRoute route={route} />;
}

export default function App() {
  return <ToastProvider><AppRoutes /></ToastProvider>;
}
