import * as React from "react";
import { cn } from "../../lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "paper" | "acid" | "pink" | "ultra" | "tang";
  radius?: "default" | "none" | "pill";
  press?: boolean;
  tilt?: "left" | "right" | "none";
};

export function Card({ className, tone = "paper", radius = "default", press = true, tilt = "none", style, ...props }: CardProps) {
  const tiltStyle: React.CSSProperties = {
    ...style,
    ...(tilt === "left" ? { "--feral-tilt": "-1.5deg" } as React.CSSProperties : {}),
    ...(tilt === "right" ? { "--feral-tilt": "1.5deg" } as React.CSSProperties : {}),
  };
  return <div className={cn("feral-card", press && "feral-press", className)} data-tone={tone} data-radius={radius} style={tiltStyle} {...props} />;
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-card-header", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("feral-card-title", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("feral-card-description", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-card-content", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-card-footer", className)} {...props} />;
}
