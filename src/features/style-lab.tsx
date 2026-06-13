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
} as const satisfies Record<string, FeralThemeState>;

type PresetKey = keyof typeof presets;
type ContrastMode = "standard" | "high" | "quiet" | "grit";
type LabState = FeralThemeState & { contrast: ContrastMode | string };

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
  return loadFeralTheme() ?? { ...presets.default };
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
  const [presetKey, setPresetKey] = React.useState<PresetKey>("default");
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

  function setPreset(key: PresetKey) {
    setPresetKey(key);
    setState({ ...presets[key] });
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
              {(Object.keys(presets) as PresetKey[]).map((key) => (
                <button key={key} type="button" className="feral-preset-chip" data-active={presetKey === key} aria-pressed={presetKey === key} onClick={() => setPreset(key)}>
                  <span className="feral-preset-chip-label">{presets[key].label}</span>
                  <span className="feral-preset-chip-dots" aria-hidden="true">
                    <i style={{ background: presets[key].pink }} />
                    <i style={{ background: presets[key].acid }} />
                    <i style={{ background: presets[key].ultra }} />
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
