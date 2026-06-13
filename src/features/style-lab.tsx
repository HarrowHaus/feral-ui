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
import {
  applyFeralTheme,
  clearFeralTheme,
  loadFeralTheme,
  saveFeralTheme,
  themeVarsFor,
  type FeralThemeState,
} from "./theme-session";
import { SpecimenToast } from "./specimen-toast";
import presetData from "./feral-presets.json";

type ContrastMode = "standard" | "high" | "quiet" | "grit";
type LabState = FeralThemeState & { contrast: ContrastMode | string };
type Preset = LabState & { id: string };

// The ten presets live in feral-presets.json — the single source shared with
// scripts/preset-distance.mjs (the distance lint).
const presetList = presetData as unknown as Preset[];
const presetsById: Record<string, Preset> = Object.fromEntries(presetList.map((preset) => [preset.id, preset]));

function presetState({ id: _id, ...rest }: Preset): LabState {
  return rest;
}

function cssFor(state: LabState) {
  const vars = themeVarsFor(state);
  return `:root {
${Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`).join("\n")}
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
    description: `${state.label}. A token leash for loud components.`,
    cssVars: { light: themeVarsFor(state) },
  }, null, 2);
}

function initialState(): LabState {
  return loadFeralTheme() ?? presetState(presetsById.default);
}

const colorRoles = ["ink", "cream", "pink", "acid", "ultra", "cyan", "tang"] as const;

// Slider value display: a plain reading mid-range, the bit rendered AS the
// value at the poles ("999 — pill outbreak", "0 — sedated").
function sliderReadout(key: "border" | "pressure" | "radius" | "tilt" | "pattern" | "density" | "motion", value: number): string {
  switch (key) {
    case "border": return value <= 2 ? "2 — hairline" : value >= 8 ? "8 — armored" : `${value}px`;
    case "pressure": return value <= 2 ? "2 — flat" : value >= 10 ? "10 — bottomless" : `${value}px`;
    case "radius": return value >= 999 ? "999 — pill outbreak" : value === 0 ? "0 — guillotine" : `${value}px`;
    case "tilt": return value === 0 ? "0 — sedated" : Math.abs(value) >= 3 ? `${value}° — off the leash` : `${value}°`;
    case "pattern": return value <= 0 ? "0 — blank" : value >= 100 ? "100 — infested" : `${value}%`;
    case "density": return value <= 24 ? "24 — sparse" : value >= 80 ? "80 — swarm" : `${value}`;
    case "motion": return value <= 0 ? "0 — frozen" : value >= 180 ? "180 — zoomies" : `${value}ms`;
  }
}

export function StyleLab() {
  const [presetKey, setPresetKey] = React.useState<string>("default");
  const [state, setState] = React.useState<LabState>(initialState);
  const [toast, setToast] = React.useState<string | null>(null);
  const css = cssFor(state);
  const tailwind = tailwindFor(state);
  const registry = registryFor(state);
  const vars = themeVarsFor(state) as React.CSSProperties;

  React.useEffect(() => {
    applyFeralTheme(state);
    saveFeralTheme(state);
  }, [state]);

  React.useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function setPreset(key: string) {
    setPresetKey(key);
    setState(presetState(presetsById[key]));
  }

  function update<K extends keyof LabState>(key: K, value: LabState[K]) {
    setState((current) => ({ ...current, [key]: value }));
  }

  function resetSiteTheme() {
    clearFeralTheme();
    setPreset("default");
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

  return (
    <section className="site-section" id="style-lab">
      <div className="site-section-head">
        <div>
          <h2>Style Lab: the whole site is the preview now.</h2>
          <p className="site-section-intro">Pick a preset, tweak the token leash, and watch the current session re-skin itself. Then take the CSS home.</p>
        </div>
        <FeralStamp tone="pink">SITE-WIDE</FeralStamp>
      </div>

      <div className="feral-style-lab" style={vars} data-contrast={state.contrast}>
        <Card tone="paper" press={false} className="feral-style-lab-controls">
          <CardHeader>
            <CardTitle>Presets</CardTitle>
            <CardDescription>The entire page responds, not just the petting zoo on the right.</CardDescription>
          </CardHeader>
          <CardContent className="site-stack">
            <div className="feral-preset-grid" role="list" aria-label="Style presets">
              {presetList.map((preset) => (
                <button key={preset.id} type="button" className="feral-preset-chip" data-active={presetKey === preset.id} aria-pressed={presetKey === preset.id} onClick={() => setPreset(preset.id)}>
                  <span className="feral-preset-chip-label">{preset.label}{preset.polarity ? " ◐" : ""}</span>
                  <span className="feral-preset-chip-dots" aria-hidden="true">
                    <i style={{ background: preset.pink }} />
                    <i style={{ background: preset.acid }} />
                    <i style={{ background: preset.ultra }} />
                  </span>
                </button>
              ))}
            </div>

            <div className="feral-lab-color-rows" role="group" aria-label="Palette roles">
              {colorRoles.map((key) => (
                <label key={key} className="feral-lab-color-row" htmlFor={`lab-${key}`}>
                  <span className="feral-lab-color-name">{key}</span>
                  <span className="feral-lab-color-hex">{state[key]}</span>
                  <input id={`lab-${key}`} className="feral-color-input" type="color" aria-label={`${key} color`} value={state[key]} onChange={(event) => update(key, event.target.value)} />
                </label>
              ))}
            </div>

            <div className="feral-lab-slider"><div className="feral-lab-slider-label"><span>border</span><b>{sliderReadout("border", state.border)}</b></div><Slider value={[state.border]} min={2} max={8} step={1} onValueChange={([value]) => update("border", value)} aria-label="Border mass" /></div>
            <div className="feral-lab-slider"><div className="feral-lab-slider-label"><span>pressure</span><b>{sliderReadout("pressure", state.pressure)}</b></div><Slider value={[state.pressure]} min={2} max={10} step={1} onValueChange={([value]) => update("pressure", value)} aria-label="Press depth" /></div>
            <div className="feral-lab-slider"><div className="feral-lab-slider-label"><span>radius</span><b>{sliderReadout("radius", state.radius)}</b></div><Slider value={[state.radius === 999 ? 32 : state.radius]} min={0} max={32} step={2} onValueChange={([value]) => update("radius", value >= 32 ? 999 : value)} aria-label="Radius collision" /></div>
            <div className="feral-lab-slider"><div className="feral-lab-slider-label"><span>tilt</span><b>{sliderReadout("tilt", state.tilt)}</b></div><Slider value={[state.tilt]} min={-3} max={3} step={0.1} onValueChange={([value]) => update("tilt", value)} aria-label="Tilt intensity" /></div>
            <div className="feral-lab-slider"><div className="feral-lab-slider-label"><span>pattern</span><b>{sliderReadout("pattern", state.pattern)}</b></div><Slider value={[state.pattern]} min={0} max={100} step={1} onValueChange={([value]) => update("pattern", value)} aria-label="Pattern intensity" /></div>
            <div className="feral-lab-slider"><div className="feral-lab-slider-label"><span>density</span><b>{sliderReadout("density", state.density)}</b></div><Slider value={[state.density]} min={24} max={80} step={2} onValueChange={([value]) => update("density", value)} aria-label="Density" /></div>
            <div className="feral-lab-slider"><div className="feral-lab-slider-label"><span>motion</span><b>{sliderReadout("motion", state.motion)}</b></div><Slider value={[state.motion]} min={0} max={180} step={10} onValueChange={([value]) => update("motion", value)} aria-label="Motion level" /></div>

            <Field><Label htmlFor="lab-contrast">Contrast mode</Label><Select id="lab-contrast" value={state.contrast} onChange={(event) => update("contrast", event.target.value)}><option value="standard">standard</option><option value="high">high</option><option value="quiet">quiet</option><option value="grit">grit</option></Select></Field>

            <div className="feral-lab-actions">
              <Button tone="acid" type="button" onClick={downloadTheme}>Download CSS</Button>
              <Button tone="pink" type="button" onClick={resetSiteTheme}>Reset to Default Feral</Button>
            </div>
          </CardContent>
        </Card>

        <div className="feral-style-lab-right">
          <PreviewFrame title="Live session card">
            <div className="feral-style-lab-preview">
              <FeralBurst tone="acid" />
              <FeralSplat tone="pink" />
              <FeralArrow tone="ultra" />
              <Card tone="acid" radius="none" tilt="left">
                <CardHeader>
                  <Badge tone="pink">SESSION THEME</Badge>
                  <CardTitle>{state.label}</CardTitle>
                  <CardDescription>Look around. The furniture changed.</CardDescription>
                </CardHeader>
                <CardContent className="site-stack">
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <Button tone="pink">Primary</Button>
                    <Button tone="paper">Secondary</Button>
                    <Badge tone="ultra">Mode</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </PreviewFrame>

          <div className="feral-lab-specimen-strip" aria-label="Operable specimens">
            <Button tone="ultra" type="button" onClick={() => setToast("Button fired. Nothing exploded.")}>Button</Button>
            <Input aria-label="Specimen input" placeholder="Type at me" />
            <Badge tone="tang">Badge</Badge>
            <Button tone="paper" type="button" onClick={() => setToast("Toast served. Pigeon dispatched.")}>Toast it</Button>
          </div>

          <CodeTabs tabs={[{ id: "css", label: "CSS", code: css }, { id: "tailwind", label: "Tailwind", code: tailwind }, { id: "registry", label: "Registry item", code: registry }]} />
        </div>
      </div>
      <SpecimenToast value={toast} />
    </section>
  );
}
