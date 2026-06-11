import * as React from "react";
import { cn } from "../../lib/cn";

export function OtpInput({ length = 6, label = "One time code", className }: { length?: number; label?: string; className?: string }) {
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);

  return (
    <div className={cn("feral-otp", className)} role="group" aria-label={label}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(node) => { refs.current[index] = node; }}
          inputMode="text"
          maxLength={1}
          aria-label={`${label} character ${index + 1}`}
          onChange={(event) => {
            if (event.currentTarget.value && refs.current[index + 1]) refs.current[index + 1]?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !event.currentTarget.value && refs.current[index - 1]) refs.current[index - 1]?.focus();
          }}
        />
      ))}
    </div>
  );
}
