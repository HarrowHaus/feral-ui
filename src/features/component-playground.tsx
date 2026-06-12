import * as React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CodeBlock,
  Field,
  Input,
  Label,
  type BadgeTone,
  type FeralButtonShape,
  type FeralButtonSize,
  type FeralButtonTone,
} from "../components/ui";
import { SpecimenToast } from "./specimen-toast";

type PlaygroundProps = { slug: string };
type CardTone = "paper" | "acid" | "pink" | "ultra" | "tang";
type CardRadius = "default" | "none" | "pill";
type Tilt = "none" | "left" | "right";

const buttonTones: FeralButtonTone[] = ["acid", "pink", "ultra", "ink", "paper", "tang"];
const buttonShapes: FeralButtonShape[] = ["default", "square", "pill"];
const buttonSizes: FeralButtonSize[] = ["sm", "md", "lg"];
const badgeTones: BadgeTone[] = ["acid", "pink", "ultra", "paper", "tang"];
const cardTones: CardTone[] = ["paper", "acid", "pink", "ultra", "tang"];
const cardRadii: CardRadius[] = ["default", "none", "pill"];
const tilts: Tilt[] = ["none", "left", "right"];

function jsProp(name: string, value: string, fallback: string) {
  return value === fallback ? "" : ` ${name}="${value}"`;
}

function escapeText(value: string) {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function PlaygroundShell({ title, description, children, code }: { title: string; description: string; children: React.ReactNode; code: string }) {
  const [copied, setCopied] = React.useState<string | null>(null);
  function copy() {
    void navigator.clipboard?.writeText(code);
    setCopied(code);
    window.setTimeout(() => setCopied(null), 1400);
  }

  return (
    <div className="playground-shell">
      <Card tone="acid" radius="none">
        <CardHeader>
          <Badge tone="pink">PLAYGROUND</Badge>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
      <div className="playground-code-panel">
        <div className="playground-code-head"><strong>Live JSX</strong><Button type="button" tone="acid" size="sm" onClick={copy}>{copied ? "Bagged" : "Copy"}</Button></div>
        <CodeBlock>{code}</CodeBlock>
      </div>
      <SpecimenToast value={copied} />
    </div>
  );
}

function ControlGroup<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: T[]; onChange: (value: T) => void }) {
  return (
    <div className="playground-control-group">
      <span>{label}</span>
      <div>
        {options.map((option) => <Button key={option} type="button" tone={value === option ? "pink" : "paper"} size="sm" onClick={() => onChange(option)}>{option}</Button>)}
      </div>
    </div>
  );
}

function ButtonPlayground() {
  const [tone, setTone] = React.useState<FeralButtonTone>("pink");
  const [shape, setShape] = React.useState<FeralButtonShape>("default");
  const [size, setSize] = React.useState<FeralButtonSize>("md");
  const [tilt, setTilt] = React.useState<Tilt>("none");
  const [label, setLabel] = React.useState("Open the cage");
  const safeLabel = escapeText(label || "Button");
  const code = `<Button${jsProp("tone", tone, "acid")}${jsProp("shape", shape, "default")}${jsProp("size", size, "md")}${jsProp("tilt", tilt, "none")}>${safeLabel}</Button>`;

  return (
    <PlaygroundShell title="Button specimen" description="Touch the axes, watch the button mutate, then bag the JSX." code={code}>
      <div className="playground-layout">
        <div className="playground-controls">
          <ControlGroup label="tone" value={tone} options={buttonTones} onChange={setTone} />
          <ControlGroup label="shape" value={shape} options={buttonShapes} onChange={setShape} />
          <ControlGroup label="size" value={size} options={buttonSizes} onChange={setSize} />
          <ControlGroup label="tilt" value={tilt} options={tilts} onChange={setTilt} />
          <Field><Label htmlFor="playground-button-label">label</Label><Input id="playground-button-label" value={label} onChange={(event) => setLabel(event.target.value)} /></Field>
        </div>
        <div className="playground-specimen"><Button tone={tone} shape={shape} size={size} tilt={tilt}>{label || "Button"}</Button></div>
      </div>
    </PlaygroundShell>
  );
}

function BadgePlayground() {
  const [tone, setTone] = React.useState<BadgeTone>("pink");
  const [label, setLabel] = React.useState("LOOSE");
  const safeLabel = escapeText(label || "BADGE");
  const code = `<Badge${jsProp("tone", tone, "acid")}>${safeLabel}</Badge>`;

  return (
    <PlaygroundShell title="Badge specimen" description="Small loud sticker. Pick the volume, change the label, then bag it." code={code}>
      <div className="playground-layout">
        <div className="playground-controls">
          <ControlGroup label="tone" value={tone} options={badgeTones} onChange={setTone} />
          <Field><Label htmlFor="playground-badge-label">label</Label><Input id="playground-badge-label" value={label} onChange={(event) => setLabel(event.target.value)} /></Field>
        </div>
        <div className="playground-specimen"><Badge tone={tone}>{label || "BADGE"}</Badge></div>
      </div>
    </PlaygroundShell>
  );
}

function CardPlayground() {
  const [tone, setTone] = React.useState<CardTone>("acid");
  const [radius, setRadius] = React.useState<CardRadius>("none");
  const [tilt, setTilt] = React.useState<Tilt>("left");
  const [title, setTitle] = React.useState("Containment unit");
  const safeTitle = escapeText(title || "Panel");
  const code = `<Card${jsProp("tone", tone, "paper")}${jsProp("radius", radius, "default")}${jsProp("tilt", tilt, "none")}>
  <CardHeader>
    <CardTitle>${safeTitle}</CardTitle>
    <CardDescription>Do not feed after midnight.</CardDescription>
  </CardHeader>
  <CardContent>Use it for pricing, forms, docs, and dashboards.</CardContent>
</Card>`;

  return (
    <PlaygroundShell title="Card specimen" description="Base surface with tone, radius, tilt, and title exposed." code={code}>
      <div className="playground-layout">
        <div className="playground-controls">
          <ControlGroup label="tone" value={tone} options={cardTones} onChange={setTone} />
          <ControlGroup label="radius" value={radius} options={cardRadii} onChange={setRadius} />
          <ControlGroup label="tilt" value={tilt} options={tilts} onChange={setTilt} />
          <Field><Label htmlFor="playground-card-title">title</Label><Input id="playground-card-title" value={title} onChange={(event) => setTitle(event.target.value)} /></Field>
        </div>
        <div className="playground-specimen">
          <Card tone={tone} radius={radius} tilt={tilt}>
            <CardHeader>
              <CardTitle>{title || "Panel"}</CardTitle>
              <CardDescription>Do not feed after midnight.</CardDescription>
            </CardHeader>
            <CardContent>Use it for pricing, forms, docs, and dashboards.</CardContent>
          </Card>
        </div>
      </div>
    </PlaygroundShell>
  );
}

export function ComponentPlayground({ slug }: PlaygroundProps) {
  if (slug === "button") return <ButtonPlayground />;
  if (slug === "badge") return <BadgePlayground />;
  if (slug === "card") return <CardPlayground />;
  return null;
}
