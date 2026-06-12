import * as React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  feralOrnamentCatalog,
  type FeralOrnamentSize,
  type FeralOrnamentTone,
} from "../components/ui";
import * as OrnamentExports from "../components/ui/ornaments";
import { SpecimenToast } from "./specimen-toast";

type OrnamentComponent = React.ComponentType<{ tone?: FeralOrnamentTone; size?: FeralOrnamentSize; label?: string; children?: React.ReactNode }>;

const ornamentMap = OrnamentExports as unknown as Record<string, OrnamentComponent>;
const tones: Array<"acid" | "pink" | "ultra" | "tang" | "paper"> = ["acid", "pink", "ultra", "tang", "paper"];
const sizes: FeralOrnamentSize[] = ["sm", "md", "lg", "xl"];

const notes: Record<string, string> = {
  FeralTag: "Renamed from the old receipt fossil. Shape stayed useful.",
  FeralStatic: "Noise square. Badge was the wrong noun.",
  FeralHand: "Open hand. Formerly mislabeled as pointer hand.",
  FeralGhost: "Ghost bubble. Formerly pretending to be a skull.",
  FeralSplatAlt: "Second splat silhouette. Size comes from props now.",
  FeralLooseStamp: "Stamp language now belongs to the creature lore.",
};

export function OrnamentsRoute() {
  const [tone, setTone] = React.useState<FeralOrnamentTone>("acid");
  const [size, setSize] = React.useState<FeralOrnamentSize>("lg");
  const [copied, setCopied] = React.useState<string | null>(null);

  function copy(name: string) {
    const jsx = `<${name} tone="${tone}" size="${size}" />`;
    void navigator.clipboard?.writeText(jsx);
    setCopied(jsx);
    window.setTimeout(() => setCopied(null), 1400);
  }

  return (
    <div className="site-stack">
      <Card tone="acid" radius="none">
        <CardHeader>
          <CardTitle>The sticker sheet escaped containment.</CardTitle>
          <CardDescription>Every exported ornament now renders from a paired name/component source. Tap a specimen bag to copy JSX.</CardDescription>
        </CardHeader>
        <CardContent className="site-stack">
          <div className="site-mini-grid">
            {tones.map((item) => <Button key={item} tone={item} onClick={() => setTone(item)}>{item}</Button>)}
          </div>
          <div className="site-mini-grid">
            {sizes.map((item) => <Button key={item} tone={size === item ? "pink" : "paper"} onClick={() => setSize(item)}>{item.toUpperCase()}</Button>)}
          </div>
        </CardContent>
      </Card>

      <SpecimenToast value={copied} />

      <div className="route-grid ornament-grid">
        {feralOrnamentCatalog.map((name, index) => {
          const Component = ornamentMap[name];
          if (!Component) return null;
          const isStamp = name.includes("Stamp") || name.includes("Label");
          return (
            <Card key={name} tone={index % 3 === 0 ? "paper" : index % 3 === 1 ? "acid" : "pink"}>
              <CardHeader>
                <Badge tone={isStamp ? "tang" : "ultra"}>{isStamp ? "STAMP" : "SVG"}</Badge>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{notes[name] ?? "Named specimen. Shape and label now travel together."}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="ornament-specimen">
                  <Component tone={tone} size={size} label={isStamp ? "DO NOT FEED" : undefined}>{isStamp ? "DO NOT FEED" : undefined}</Component>
                </div>
              </CardContent>
              <CardFooter>
                <Button tone="paper" onClick={() => copy(name)}>Copy JSX</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
