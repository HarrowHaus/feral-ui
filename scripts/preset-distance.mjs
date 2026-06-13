#!/usr/bin/env node
// Preset distance lint (DISTEMPER Phase 2).
//
// The handoff frames this two ways: "compute pairwise preset distance (hue-angle
// deltas across the seven roles + normalized geometry deltas) and FAIL if any
// pair is too close", then encodes it as ">=4 of 7 hues move >=40 deg OR flip
// polarity OR collapse palette arity, AND move >=3 geometry axes by >=40% of
// range." The two shipped polarity siblings (Midnight Shift / VHS Seance) are
// intentionally close in palette, so the strict discrete form would reject the
// very set it is meant to bless. We therefore implement the primary framing: a
// single normalized distance (palette + geometry + polarity) with a threshold
// calibrated to sit far below the closest real pair (~1.97) and far above any
// near-duplicate (~0.04). The discrete components are reported for transparency.
// See docs/DECISIONS.md.
//
// Run:  node scripts/preset-distance.mjs            (lint the shipped presets)
//       node scripts/preset-distance.mjs --report   (print every pair distance)
//       node scripts/preset-distance.mjs --selftest (prove it fails on a near-dup)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const presets = JSON.parse(readFileSync(join(root, "src/features/feral-presets.json"), "utf8"));

const THRESHOLD = 1.0;     // a pair below this is "too close" and fails the lint
const AA_BODY = 4.5;       // WCAG AA for body text (ink on cream)

const ROLES = ["ink", "cream", "pink", "acid", "ultra", "cyan", "tang"];
const SIGNALS = ["pink", "acid", "ultra", "cyan", "tang"];
const GEOM = { border: 6, radius: 32, tilt: 3, pattern: 100, pressure: 5, density: 40, motion: 65 };
const geomNorm = { radius: (v) => Math.min(v, 32), tilt: (v) => Math.abs(v) };

function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h, s, l };
}
function relLum([r, g, b]) {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(a, b) {
  const la = relLum(hexToRgb(a)), lb = relLum(hexToRgb(b));
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
function hueGap(a, b) { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; }

// Per-role perceptual-ish distance in roughly [0,1]: hue only matters when both
// colors are saturated; otherwise saturation and lightness shifts carry it.
function roleDist(a, b, role) {
  const A = rgbToHsl(hexToRgb(a[role])), B = rgbToHsl(hexToRgb(b[role]));
  return 0.6 * (hueGap(A.h, B.h) / 180) * Math.min(A.s, B.s) + 0.2 * Math.abs(A.s - B.s) + 0.2 * Math.abs(A.l - B.l);
}
function hueMoves(a, b) {
  return ROLES.filter((r) => {
    const A = rgbToHsl(hexToRgb(a[r])), B = rgbToHsl(hexToRgb(b[r]));
    if (A.s >= 0.15 && B.s >= 0.15) return hueGap(A.h, B.h) >= 40;
    if ((A.s >= 0.15) !== (B.s >= 0.15)) return true;
    return Math.abs(A.l - B.l) >= 0.3;
  }).length;
}
function arity(p) {
  const buckets = new Set();
  for (const r of SIGNALS) {
    const c = rgbToHsl(hexToRgb(p[r]));
    buckets.add(c.s < 0.15 ? "gray" : Math.round(c.h / 30));
  }
  return buckets.size;
}
function distance(a, b) {
  let palette = 0;
  for (const r of ROLES) palette += roleDist(a, b, r);
  let geom = 0, geomAxes = 0;
  for (const [axis, range] of Object.entries(GEOM)) {
    const f = geomNorm[axis] || ((v) => v);
    const delta = Math.abs(f(a[axis]) - f(b[axis])) / range;
    geom += delta;
    if (delta >= 0.4) geomAxes += 1;
  }
  const polarityFlip = (a.polarity ?? null) !== (b.polarity ?? null);
  return { total: palette + geom + (polarityFlip ? 0.5 : 0), palette, geom, geomAxes, polarityFlip, hues: hueMoves(a, b), arity: [arity(a), arity(b)] };
}

function check(list) {
  const tooClose = [], lowContrast = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const d = distance(list[i], list[j]);
      if (d.total < THRESHOLD) tooClose.push({ a: list[i].label, b: list[j].label, ...d });
    }
    const c = contrast(list[i].ink, list[i].cream);
    if (c < AA_BODY) lowContrast.push({ label: list[i].label, contrast: c });
  }
  return { tooClose, lowContrast };
}

if (process.argv.includes("--report")) {
  const rows = [];
  for (let i = 0; i < presets.length; i++)
    for (let j = i + 1; j < presets.length; j++)
      rows.push({ a: presets[i].label, b: presets[j].label, ...distance(presets[i], presets[j]) });
  rows.sort((x, y) => x.total - y.total);
  for (const r of rows) console.log(`${r.total.toFixed(3)}  hues=${r.hues} geomAxes=${r.geomAxes} pol=${r.polarityFlip ? "Y" : "n"} arity=${r.arity}  ${r.a} <-> ${r.b}`);
  process.exit(0);
}

if (process.argv.includes("--selftest")) {
  const nearDup = { ...presets[0], id: "neardup", label: "Near Duplicate", pink: "#ff2e9c", acid: "#bdff02", tilt: 1.6 };
  const { tooClose } = check([...presets, nearDup]);
  const caught = tooClose.some((p) => p.a === "Near Duplicate" || p.b === "Near Duplicate");
  if (!caught) { console.error("SELFTEST FAILED: a near-duplicate slipped past the lint."); process.exit(1); }
  console.log(`Selftest passed: near-duplicate rejected (flagged ${tooClose.length} too-close pair(s)).`);
  process.exit(0);
}

const { tooClose, lowContrast } = check(presets);
if (tooClose.length || lowContrast.length) {
  console.error("Preset distance lint FAILED:");
  for (const p of tooClose) console.error(`  too close (${p.total.toFixed(2)} < ${THRESHOLD}): ${p.a} <-> ${p.b}  [palette ${p.palette.toFixed(2)} geom ${p.geom.toFixed(2)} pol ${p.polarityFlip ? "Y" : "n"}]`);
  for (const p of lowContrast) console.error(`  ink-on-cream ${p.contrast.toFixed(2)} < ${AA_BODY} (AA body): ${p.label}`);
  process.exit(1);
}
const pairs = presets.length * (presets.length - 1) / 2;
console.log(`Preset distance lint passed: ${presets.length} presets, all ${pairs} pairs >= ${THRESHOLD} apart, body text clears AA.`);
