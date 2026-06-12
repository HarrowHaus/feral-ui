import * as React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CodeTabs,
  CopyButton,
  Field,
  FeralArrow,
  FeralBurst,
  FeralSplat,
  FeralStamp,
  Input,
  Label,
  PreviewFrame,
  Select,
  Slider,
} from "../components/ui";

const presets = {
  default: { label: "Default Feral", ink: "#0a0a0a", cream: "#fff4e0", pink: "#ff2d9b", acid: "#bfff00", ultra: "#3d2bff", cyan: "#00e5ff", tang: "#ff8a00", border: 4, pressure: 5, radius: 10, tilt: 1.5, pattern: 45, density: 52, motion: 80, contrast: "standard" },
  officeGoblin: { label: "Office Goblin", ink: "#111111", cream: "#f6f1e6", pink: "#ff4f9f", acid: "#d7ff2f", ultra: "#4338ca", cyan: "#22d3ee", tang: "#ff9f1c", border: 3, pressure: 4, radius: 8, tilt: 1, pattern: 30, density: 46, motion: 70, contrast: "standard" },
  birthdayLawsuit: { label: "Birthday Lawsuit", ink: "#050505", cream: "#fff1d6", pink: "#ff1493", acid: "#c8ff00", ultra: "#2f1bff", cyan: "#00e5ff", tang: "#ff6b00", border: 6, pressure: 8, radius: 16, tilt: 2.5, pattern: 70, density: 62, motion: 60, contrast: "standard" },
  basementPoster: { label: "Basement Poster", ink: "#130f0f", cream: "#f3dfb7", pink: "#fb3f7f", acid: "#a6ff00", ultra: "#4b2cff", cyan: "#00c7ff", tang: "#f47b20", border: 5, pressure: 7, radius: 2, tilt: 2, pattern: 75, density: 70, motion: 90, contrast: "grit" },
  acidInvoice: { label: "Acid Invoice", ink: "#050505", cream: "#fbffe6", pink: "#ff2277", acid: "#d7ff00", ultra: "#0022ff", cyan: "#00f0ff", tang: "#ff9500", border: 3, pressure: 6, radius: 0, tilt: .8, pattern: 52, density: 42, motion: 50, contrast: "high" },
  kindergartenRiot: { label: "Kindergarten Riot", ink: "#111111", cream: "#fff7cc", pink: "#ff4dad", acid: "#caff25", ultra: "#5a31ff", cyan: "#35e7ff", tang: "#ffb000", border: 5, pressure: 6, radius: 18, tilt: 2.8, pattern: 64, density: 58, motion: 75, contrast: "standard" },
  courtOrderedMinimal: { label: "Court-Ordered Minimal", ink: "#111111", cream: "#fbf7ef", pink: "#d93682", acid: "#d2f55f", ultra: "#4f46e5", cyan: "#67e8f9", tang: "#f59e0b", border: 2, pressure: 3, radius: 6, tilt: 0, pattern: 8, density: 34, motion: 120, contrast: "quiet" },
  hrWatching: { label: "Feral But HR Is Watching", ink: "#161616", cream: "#fffaf0", pink: "#e24493", acid: "#c9f52f", ultra: "#4750d8", cyan: "#38d4ee", tang: "#f49a25", border: 3, pressure: 4, radius: 12, tilt: .5, pattern: 20, density: 40, motion: 90, contrast: "standard" },
  taxSeasonClown: { label: "Tax Season Clown", ink: "#080808", cream: "#fff4d7", pink: "#ff007a", acid: "#ceff00", ultra: "#2922ff", cyan: "#0ce6ff", tang: "#ff7a00", border: 5, pressure: 8, radius: 4, tilt: 1.7, pattern: 58, density: 64, motion: 65, contrast: "high" },
  mallKiosk: { label: "Mall Kiosk Apocalypse", ink: "#0c0c12", cream: "#fff0ec", pink: "#ff2bbd", acid: "#caff00", ultra: "#3319ff", cyan: "#00d9ff", tang: "#ff8c00", border: 4, pressure: 7, radius: 999, tilt: 2.2, pattern: 80, density: 54, motion: 55, contrast: "standard" },
  printerJam: { label: "Printer Jam Ritual", ink: "#0f0f0f", cream: "#f7efe0", pink: "#f33688", acid: "#b8ff1d", ultra: "#4636e8", cyan: "#09cfe8", tang: "#ff8f12", border: 4, pressure: 5, radius: 0, tilt: -1.2, pattern: 68, density: 48, motion: 80, contrast: "grit" },
} as const;

type PresetKey = keyof typeof presets;
type ContrastMode = "standard" | "high" | "quiet" | "grit";

type LabState = {
  label: string;
  ink: string;
  cream: string;
  pink: string;
  acid: string;
  ultra: string;
  cyan: string;
  tang: string;
  border: number;
  pressure: number;
  radius: number;
  tilt: number;
  pattern: number;
  density: number;
  motion: number;
  contrast: ContrastMode | string;
};

function cssFor(state: LabState) {
  return `:root {
  --feral-ink: ${state.ink};
  --feral-cream: ${state.cream};
  --feral-pink: ${state.pink};
  --feral-acid: ${state.acid};
  --feral-ultra: ${state.ultra};
  --feral-cyan: ${state.cyan};
  --feral-tang: ${state.tang};
  --feral-border-md: ${state.border}px;
  --feral-border-lg: ${Math.max(state.border + 1, 3)}px;
  --feral-pressure-md: ${state.pressure}px;
  --feral-shadow-x: ${state.pressure}px;
  --feral-shadow-y: ${state.pressure}px;
  --feral-radius-md: ${state.radius}px;
  --feral-radius-lg: ${state.radius + 6}px;
  --feral-tilt-max: ${state.tilt}deg;
  --feral-pattern-intensity: ${state.pattern}%;
  --feral-density: ${state.density};
  --feral-speed: ${state.motion}ms;
}`;
}

function tailwindFor(state: LabState) {
  return `theme: {
  extend: {
    colors: {
      feral: {
        ink: "${state.ink}",
        cream: "${state.cream}",
        pink: "${state.pink}",
        acid: "${state.acid}",
        ultra: "${state.ultra}",
        cyan: "${state.cyan}",
        tang: "${state.tang}",
      }
    },
    borderWidth: { feral: "${state.border}px" },
    boxShadow: { feral: "${state.pressure}px ${state.pressure}px 0 ${state.ink}" },
    borderRadius: { feral: "${state.radius}px" }
  }
}`;
}

function registryFor(state: LabState) {
  return JSON.stringify({
    name: `feral-theme-${state.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
    type: "registry:style",
    description: `${state.label} controlled-variance CSS variables. The goblin is on a leash.`,
    cssVars: { light: {
      ink: state.ink,
      cream: state.cream,
      pink: state.pink,
      acid: state.acid,
      ultra: state.ultra,
      cyan: state.cyan,
      tang: state.tang,
      border: `${state.border}px`,
      pressure: `${state.pressure}px`,
      radius: `${state.radius}px`,
    } }
  }, null, 2);
}

export function StyleLab() {
  const [presetKey, setPresetKey] = React.useState<PresetKey>("default");
  const [state, setState] = React.useState<LabState>({ ...presets.default });
  const css = cssFor(state);
  const tailwind = tailwindFor(state);
  const registry = registryFor(state);

  function setPreset(key: PresetKey) {
    setPresetKey(key);
    setState({ ...presets[key] });
  }

  function update<K extends keyof LabState>(key: K, value: LabState[K]) {
    setState((current) => ({ ...current, [key]: value }));
  }

  function downloadTheme() {
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${state.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.css`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const vars = {
    "--feral-ink": state.ink,
    "--feral-cream": state.cream,
    "--feral-pink": state.pink,
    "--feral-acid": state.acid,
    "--feral-ultra": state.ultra,
    "--feral-cyan": state.cyan,
    "--feral-tang": state.tang,
    "--feral-border-md": `${state.border}px`,
    "--feral-border-lg": `${Math.max(state.border + 1, 3)}px`,
    "--feral-pressure-md": `${state.pressure}px`,
    "--feral-shadow-x": `${state.pressure}px`,
    "--feral-shadow-y": `${state.pressure}px`,
    "--feral-radius-md": `${state.radius}px`,
    "--feral-radius-lg": `${state.radius + 6}px`,
    "--feral-speed": `${state.motion}ms`,
  } as React.CSSProperties;

  return (
    <section className="site-section" id="style-lab">
      <div className="site-section-head">
        <div>
          <h2>Style Lab: build a look without letting the goblin drive.</h2>
          <p className="site-section-intro">Pick a preset, tweak the palette roles, preview real components, then copy the CSS. Same family, different jobs: docs, dashboards, shops, warnings, forms, and tiny product disasters.</p>
        </div>
        <FeralStamp tone="pink">v0.6 theme generator</FeralStamp>
      </div>

      <div className="feral-style-lab" style={vars} data-contrast={state.contrast}>
        <Card tone="paper" press={false} className="feral-style-lab-controls">
          <CardHeader>
            <CardTitle>Presets</CardTitle>
            <CardDescription>Each preset changes color roles, density, radius, and visual temperature. The names are jokes. The combinations are not.</CardDescription>
          </CardHeader>
          <CardContent className="site-stack">
            <div className="feral-preset-grid" role="list" aria-label="Style presets">
              {(Object.keys(presets) as PresetKey[]).map((key) => (
                <Button key={key} type="button" tone={presetKey === key ? "pink" : "paper"} size="sm" onClick={() => setPreset(key)}>
                  {presets[key].label}
                </Button>
              ))}
            </div>

            <div className="feral-lab-color-grid">
              {(["ink", "cream", "pink", "acid", "ultra", "cyan", "tang"] as const).map((key) => (
                <Field key={key}>
                  <Label htmlFor={`lab-${key}`}>{key}</Label>
                  <Input id={`lab-${key}`} type="color" value={state[key]} onChange={(event) => update(key, event.target.value)} />
                </Field>
              ))}
            </div>

            <Field><Label>Border mass: {state.border}px</Label><Slider value={[state.border]} min={2} max={8} step={1} onValueChange={([value]) => update("border", value)} aria-label="Border mass" /></Field>
            <Field><Label>Press depth: {state.pressure}px</Label><Slider value={[state.pressure]} min={2} max={10} step={1} onValueChange={([value]) => update("pressure", value)} aria-label="Press depth" /></Field>
            <Field><Label>Radius collision: {state.radius === 999 ? "pill outbreak" : `${state.radius}px`}</Label><Slider value={[state.radius === 999 ? 32 : state.radius]} min={0} max={32} step={2} onValueChange={([value]) => update("radius", value >= 32 ? 999 : value)} aria-label="Radius collision" /></Field>
            <Field><Label>Tilt intensity: {state.tilt}°</Label><Slider value={[state.tilt]} min={-3} max={3} step={0.1} onValueChange={([value]) => update("tilt", value)} aria-label="Tilt intensity" /></Field>
            <Field><Label>Pattern intensity: {state.pattern}%</Label><Slider value={[state.pattern]} min={0} max={100} step={1} onValueChange={([value]) => update("pattern", value)} aria-label="Pattern intensity" /></Field>
            <Field><Label>Density: {state.density}</Label><Slider value={[state.density]} min={24} max={80} step={2} onValueChange={([value]) => update("density", value)} aria-label="Density" /></Field>
            <Field><Label>Motion: {state.motion}ms</Label><Slider value={[state.motion]} min={0} max={180} step={10} onValueChange={([value]) => update("motion", value)} aria-label="Motion level" /></Field>
            <Field><Label htmlFor="lab-contrast">Contrast mode</Label><Select id="lab-contrast" value={state.contrast} onChange={(event) => update("contrast", event.target.value)}><option value="standard">standard</option><option value="high">high</option><option value="quiet">quiet</option><option value="grit">grit</option></Select></Field>
            <div className="feral-lab-actions"><CopyButton value={css} tone="acid">Copy CSS</CopyButton><Button type="button" tone="paper" onClick={downloadTheme}>Download CSS</Button><Button type="button" tone="pink" onClick={() => setPreset("default")}>Reset</Button></div>
          </CardContent>
        </Card>

        <PreviewFrame title="Live variance preview">
          <div className="feral-style-lab-preview">
            <FeralBurst tone="acid" />
            <FeralSplat tone="pink" />
            <FeralArrow tone="ultra" />
            <Card tone="acid" radius="none" tilt="left">
              <CardHeader>
                <CardTitle>{state.label}</CardTitle>
                <CardDescription>Same components, different outfit. The goblin has been asked to stand still.</CardDescription>
              </CardHeader>
              <CardContent className="site-stack">
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Button tone="pink">Primary</Button>
                  <Button tone="paper">Secondary</Button>
                  <Badge tone="ultra">Mode</Badge>
                </div>
                <Field>
                  <Label htmlFor="lab-demo-input">Demo input</Label>
                  <Input id="lab-demo-input" placeholder="The form is fine. The form has seen things." />
                </Field>
              </CardContent>
            </Card>
          </div>
        </PreviewFrame>

        <CodeTabs tabs={[{ id: "css", label: "CSS", code: css }, { id: "tailwind", label: "Tailwind", code: tailwind }, { id: "registry", label: "Registry item", code: registry }]} />
      </div>
    </section>
  );
}
