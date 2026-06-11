import * as React from "react";
import { cn } from "../../lib/cn";

export type FeralButtonTone = "acid" | "pink" | "ultra" | "ink" | "paper" | "tang";
export type FeralButtonShape = "default" | "square" | "pill";
export type FeralButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: FeralButtonTone;
  shape?: FeralButtonShape;
  size?: FeralButtonSize;
  tilt?: "left" | "right" | "none";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, tone = "acid", shape = "default", size = "md", tilt = "none", style, ...props }, ref) => {
    const tiltStyle: React.CSSProperties = {
      ...style,
      ...(tilt === "left" ? { "--feral-tilt": "-1.5deg" } as React.CSSProperties : {}),
      ...(tilt === "right" ? { "--feral-tilt": "1.5deg" } as React.CSSProperties : {}),
    };

    return (
      <button
        ref={ref}
        className={cn("feral-button feral-press feral-focus-ring", className)}
        data-tone={tone}
        data-shape={shape}
        data-size={size}
        style={tiltStyle}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
