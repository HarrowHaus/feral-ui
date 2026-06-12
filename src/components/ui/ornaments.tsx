import * as React from "react";
import { cn } from "../../lib/cn";

export type FeralOrnamentTone = "ink" | "pink" | "acid" | "ultra" | "cyan" | "tang" | "verm" | "paper";
export type FeralOrnamentSize = "sm" | "md" | "lg" | "xl";
export type FeralOrnamentProps = React.SVGProps<SVGSVGElement> & {
  tone?: FeralOrnamentTone;
  size?: FeralOrnamentSize;
  label?: string;
};

type StampProps = React.HTMLAttributes<HTMLSpanElement> & { tone?: FeralOrnamentTone; size?: FeralOrnamentSize; label?: string };

function ornamentTone(tone: FeralOrnamentTone) {
  return `feral-ornament-${tone}`;
}
function ornamentSize(size: FeralOrnamentSize) {
  return `feral-ornament-${size}`;
}
function Svg({ className, tone = "acid", size = "md", label: _label, children, ...props }: FeralOrnamentProps & { children: React.ReactNode }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("feral-ornament", ornamentTone(tone), ornamentSize(size), className)} {...props}>{children}</svg>;
}
function StrokeSvg({ className, tone = "ultra", size = "md", label: _label, children, ...props }: FeralOrnamentProps & { children: React.ReactNode }) {
  return <svg viewBox="0 0 120 80" aria-hidden="true" className={cn("feral-ornament feral-ornament-stroke", ornamentTone(tone), ornamentSize(size), className)} {...props}>{children}</svg>;
}

export function FeralBurst(props: FeralOrnamentProps) { return <Svg {...props}><path d="M50 5 61 31 89 18 75 46 98 58 69 64 77 95 51 76 29 96 34 66 4 58 29 44 14 17 40 31Z" /></Svg>; }
export function FeralBurstRound(props: FeralOrnamentProps) { return <Svg {...props}><path d="M50 4c7 15 12 19 27 12-5 16-3 22 13 28-15 8-18 14-9 29-17-3-23 0-29 17-10-14-16-16-31-7 2-17-2-23-18-28 15-9 17-15 7-29 17 3 23 0 40-22Z" /></Svg>; }
export function FeralBurstSquare(props: FeralOrnamentProps) { return <Svg {...props}><path d="M9 9h31l10 15L60 9h31v31L76 50l15 10v31H60L50 76 40 91H9V60l15-10L9 40Z" /></Svg>; }
export function FeralSplat(props: FeralOrnamentProps) { return <Svg {...props}><path d="M49 5c9 2 8 17 16 20 10 4 24-9 29 2 5 10-12 15-9 25 3 11 19 13 13 25-6 12-21 0-30 7-8 6-4 20-17 21-12 1-12-16-22-19-11-4-22 10-29-1-7-12 13-18 10-29C7 45-7 38 2 28c8-10 20 4 29-2C40 20 37 3 49 5Z" /><circle cx="88" cy="88" r="6" /><circle cx="10" cy="83" r="4" /><circle cx="89" cy="12" r="3" /></Svg>; }
export function FeralSplatAlt(props: FeralOrnamentProps) { return <Svg {...props}><path d="M44 12c8-11 17 5 26 5 11 0 15-14 24-5s-8 15-5 26c3 10 16 13 10 24-7 12-18-4-29 2-9 5-8 20-22 18-11-1-7-16-17-21-8-5-21 7-27-5-6-13 11-14 12-25 1-9-14-15-6-25s20 8 34 6Z" /><circle cx="17" cy="83" r="5" /><circle cx="82" cy="83" r="4" /></Svg>; }
export function FeralSplatSmall(props: FeralOrnamentProps) { return <FeralSplatAlt {...props} />; }
export function FeralBlob(props: FeralOrnamentProps) { return <Svg {...props}><path d="M20 24c12-18 43-22 61-4 18 17 13 48-11 62-24 14-58 6-67-18-6-17 5-27 17-40Z" /></Svg>; }
export function FeralArrow(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M8 44c28-22 60-21 98 2" fill="none" /><path d="m89 18 24 30-38 7" fill="none" /></StrokeSvg>; }
export function FeralArrowLeft(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M112 44c-28-22-60-21-98 2" fill="none" /><path d="M31 18 7 48l38 7" fill="none" /></StrokeSvg>; }
export function FeralArrowLoop(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M23 55c-6-28 20-51 50-43 29 8 35 42 13 55-18 11-43 3-44-16" fill="none" /><path d="m39 59 2-25 23 12" fill="none" /></StrokeSvg>; }
export function FeralArrowWiggle(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M8 45c16-19 29 19 45 0s29 18 59-5" fill="none" /><path d="m93 20 20 22-30 10" fill="none" /></StrokeSvg>; }
export function FeralScribble(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M12 52c11-42 27 35 39-3s27 31 39-5 16 6 18 15" fill="none" /></StrokeSvg>; }
export function FeralScribbleCircle(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M60 15c33 0 50 25 35 47-17 25-74 24-84 0C1 38 28 12 63 19c28 6 36 29 18 45-17 15-56 13-63-6" fill="none" /></StrokeSvg>; }
export function FeralScribbleUnderline(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M9 55c24-7 39 8 59 0 18-7 29-7 43 2" fill="none" /></StrokeSvg>; }
export function FeralWarning(props: FeralOrnamentProps) { return <Svg {...props}><path d="M50 8 96 88H4Z" /><path d="M50 31v28" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" /><circle cx="50" cy="72" r="5" fill="currentColor" /></Svg>; }
export function FeralPointer(props: FeralOrnamentProps) { return <Svg {...props}><path d="M21 10 80 45 56 53 71 82 58 89 42 59 25 78Z" /></Svg>; }
export function FeralHand(props: FeralOrnamentProps) { return <Svg {...props}><path d="M30 49V17c0-7 10-7 10 0v24-29c0-7 10-7 10 0v31-25c0-7 10-7 10 0v30-18c0-7 10-7 10 0v34c0 20-12 31-30 31-13 0-22-8-28-23l-5-14c-3-8 8-13 13-5Z" /></Svg>; }
export function FeralPointerHand(props: FeralOrnamentProps) { return <FeralHand {...props} />; }
export function FeralStar(props: FeralOrnamentProps) { return <Svg {...props}><path d="M50 8 61 39l33 1-26 19 9 32-27-18-27 18 9-32L6 40l33-1Z" /></Svg>; }
export function FeralStarUgly(props: FeralOrnamentProps) { return <Svg {...props}><path d="m54 5 7 34 31-16-20 29 26 22-34-4-13 27-10-31-36 9 28-25L12 22l34 14Z" /></Svg>; }
export function FeralCheck(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="m16 45 25 23 63-55" fill="none" /></StrokeSvg>; }
export function FeralX(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M23 19 98 63M96 17 24 66" fill="none" /></StrokeSvg>; }
export function FeralLoop(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M15 43c0-25 38-34 57-15 21 21 9 49-21 49-23 0-41-17-31-36 9-17 45-8 87 18" fill="none" /></StrokeSvg>; }
export function FeralCensor(props: FeralOrnamentProps) { return <Svg {...props}><path d="M9 31h82v15H9zM15 57h70v15H15z" /></Svg>; }
export function FeralTag(props: FeralOrnamentProps) { return <Svg {...props}><path d="M9 17h67l15 16v50l-9-6-9 6-9-6-9 6-9-6-9 6-9-6-9 6Z" /><circle cx="71" cy="31" r="6" fill="currentColor" /></Svg>; }
export function FeralReceiptTag(props: FeralOrnamentProps) { return <FeralTag {...props} />; }
export function FeralStatic(props: FeralOrnamentProps) { return <Svg {...props}><path d="M17 17h66v66H17z" /><path d="M29 29h7v7h-7zM46 31h8v8h-8zM63 27h6v6h-6zM34 52h9v9h-9zM57 56h7v7h-7zM70 68h5v5h-5z" fill="currentColor" /></Svg>; }
export function FeralNoiseBadge(props: FeralOrnamentProps) { return <FeralStatic {...props} />; }
export function FeralCornerSticker(props: FeralOrnamentProps) { return <Svg {...props}><path d="M8 8h84v84L8 8Z" /><path d="M52 8h40v40Z" opacity=".35" /></Svg>; }
export function FeralSpeechScrap(props: FeralOrnamentProps) { return <Svg {...props}><path d="M10 20h80v45H50L28 84l6-19H10Z" /></Svg>; }
export function FeralCrown(props: FeralOrnamentProps) { return <Svg {...props}><path d="M14 78h72l5-49-24 18L50 14 33 47 9 29Z" /></Svg>; }
export function FeralLightning(props: FeralOrnamentProps) { return <Svg {...props}><path d="M58 5 17 57h27l-8 38 47-57H56Z" /></Svg>; }
export function FeralEye(props: FeralOrnamentProps) { return <Svg {...props}><path d="M5 50s17-30 45-30 45 30 45 30-17 30-45 30S5 50 5 50Z" /><circle cx="50" cy="50" r="13" fill="currentColor" /></Svg>; }
export function FeralFlame(props: FeralOrnamentProps) { return <Svg {...props}><path d="M52 94c25-11 34-34 21-55-9-15-21-18-17-34-24 12-10 34-28 45-18 11-12 35 24 44Z" /></Svg>; }
export function FeralDrip(props: FeralOrnamentProps) { return <Svg {...props}><path d="M10 17h80v27c-10 0-9 16-19 16S61 44 51 44s-8 31-21 31-9-31-20-31Z" /></Svg>; }
export function FeralBracket(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M45 12H20v56h25M75 12h25v56H75" fill="none" /></StrokeSvg>; }
export function FeralAsterisk(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M60 12v56M33 26l54 28M87 26 33 54" fill="none" /></StrokeSvg>; }
export function FeralSpiral(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M60 40c0 15-19 18-27 8-12-15 5-37 28-35 30 3 46 36 25 57-26 26-82 8-79-33" fill="none" /></StrokeSvg>; }
export function FeralGhost(props: FeralOrnamentProps) { return <Svg {...props}><path d="M50 10c26 0 43 17 43 38 0 17-10 31-27 37v10H34V85C17 79 7 65 7 48 7 27 24 10 50 10Z" /><circle cx="35" cy="47" r="8" fill="currentColor" /><circle cx="65" cy="47" r="8" fill="currentColor" /><path d="M42 66h16" stroke="currentColor" strokeWidth="8" strokeLinecap="round" /></Svg>; }
export function FeralSkullBubble(props: FeralOrnamentProps) { return <FeralGhost {...props} />; }
export function FeralTicket(props: FeralOrnamentProps) { return <Svg {...props}><path d="M12 25h76v18c-8 0-8 14 0 14v18H12V57c8 0 8-14 0-14Z" /></Svg>; }
export function FeralPaperclip(props: FeralOrnamentProps) { return <StrokeSvg {...props}><path d="M43 54 72 25c12-12 31 6 18 19L52 82C31 103-1 73 21 51L58 14" fill="none" /></StrokeSvg>; }
export function FeralMegaphone(props: FeralOrnamentProps) { return <Svg {...props}><path d="M8 42h19l55-24v64L27 58H8Z" /><path d="M31 60 43 89H28L16 58Z" /></Svg>; }
export function FeralRadioactive(props: FeralOrnamentProps) { return <Svg {...props}><path d="M50 8a42 42 0 1 0 0 84 42 42 0 0 0 0-84Zm0 28 11-20c13 5 21 16 23 29H61a12 12 0 0 0-11-9Zm-11 9H16c2-13 10-24 23-29l11 20a12 12 0 0 0-11 9Zm11 19a12 12 0 0 0 11-9h23c-2 13-10 24-23 29L50 64 39 84c-13-5-21-16-23-29h23a12 12 0 0 0 11 9Z" /></Svg>; }
export function FeralTinyGoblin(props: FeralOrnamentProps) { return <Svg {...props}><path d="M18 42 6 28l24 5c11-19 32-19 42 0l24-5-12 14c9 24-8 45-34 45S9 66 18 42Z" /><circle cx="37" cy="51" r="6" fill="currentColor" /><circle cx="63" cy="51" r="6" fill="currentColor" /><path d="M43 69h14" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></Svg>; }

export function FeralStamp({ children, className, tone = "tang", size = "md", label, ...props }: StampProps) { return <span className={cn("feral-stamp", ornamentTone(tone), ornamentSize(size), className)} {...props}>{children ?? label ?? "DO NOT FEED"}</span>; }
export function FeralWarningLabel(props: StampProps) { return <FeralStamp tone={props.tone ?? "pink"} {...props}>{props.children ?? props.label ?? "WARNING"}</FeralStamp>; }
export function FeralApprovedStamp(props: StampProps) { return <FeralStamp tone={props.tone ?? "acid"} {...props}>{props.children ?? props.label ?? "GOOD CREATURE"}</FeralStamp>; }
export function FeralBadIdeaStamp(props: StampProps) { return <FeralStamp tone={props.tone ?? "verm"} {...props}>{props.children ?? props.label ?? "BAD IDEA"}</FeralStamp>; }
export function FeralLooseStamp(props: StampProps) { return <FeralStamp tone={props.tone ?? "paper"} {...props}>{props.children ?? props.label ?? "LOOSE"}</FeralStamp>; }
export function FeralSightedStamp(props: StampProps) { return <FeralStamp tone={props.tone ?? "ultra"} {...props}>{props.children ?? props.label ?? "SIGHTED"}</FeralStamp>; }
export function FeralReceiptStamp(props: StampProps) { return <FeralLooseStamp {...props} />; }

export const feralOrnamentCatalog = [
  "FeralBurst", "FeralBurstRound", "FeralBurstSquare", "FeralSplat", "FeralSplatAlt", "FeralBlob", "FeralArrow", "FeralArrowLeft", "FeralArrowLoop", "FeralArrowWiggle", "FeralScribble", "FeralScribbleCircle", "FeralScribbleUnderline", "FeralWarning", "FeralPointer", "FeralHand", "FeralStar", "FeralStarUgly", "FeralCheck", "FeralX", "FeralLoop", "FeralCensor", "FeralTag", "FeralStatic", "FeralCornerSticker", "FeralSpeechScrap", "FeralCrown", "FeralLightning", "FeralEye", "FeralFlame", "FeralDrip", "FeralBracket", "FeralAsterisk", "FeralSpiral", "FeralGhost", "FeralTicket", "FeralPaperclip", "FeralMegaphone", "FeralRadioactive", "FeralTinyGoblin", "FeralStamp", "FeralWarningLabel", "FeralApprovedStamp", "FeralBadIdeaStamp", "FeralLooseStamp", "FeralSightedStamp"
] as const;
