import * as React from "react";
import { cn } from "../../lib/cn";
import { Button } from "./button";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export type DateRange = { from?: Date; to?: Date };

function sameDay(a?: Date, b?: Date) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function inRange(day: Date, range?: DateRange) {
  if (!range?.from || !range?.to) return false;
  const t = startOfDay(day);
  return t >= startOfDay(range.from) && t <= startOfDay(range.to);
}

function sortRange(a: Date, b: Date): DateRange {
  return startOfDay(a) <= startOfDay(b) ? { from: a, to: b } : { from: b, to: a };
}

export function Calendar({
  mode = "single",
  value,
  range,
  defaultMonth,
  disabled,
  onSelect,
  onRangeChange,
  className,
}: {
  mode?: "single" | "range";
  value?: Date;
  range?: DateRange;
  defaultMonth?: Date;
  disabled?: (date: Date) => boolean;
  onSelect?: (date: Date) => void;
  onRangeChange?: (range: DateRange) => void;
  className?: string;
}) {
  const today = React.useMemo(() => new Date(), []);
  const [cursor, setCursor] = React.useState(() => defaultMonth ?? value ?? range?.from ?? today);
  const [draftRange, setDraftRange] = React.useState<DateRange | undefined>(range);
  const activeRange = range ?? draftRange;

  React.useEffect(() => {
    if (value) setCursor(value);
    if (range?.from) setCursor(range.from);
  }, [value, range?.from]);

  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  const days = Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });

  const moveFocus = (from: Date, amount: number) => {
    const next = new Date(from);
    next.setDate(from.getDate() + amount);
    if (next.getMonth() !== cursor.getMonth() || next.getFullYear() !== cursor.getFullYear()) {
      setCursor(new Date(next.getFullYear(), next.getMonth(), 1));
    }
    window.requestAnimationFrame(() => {
      const node = document.querySelector<HTMLButtonElement>(`[data-feral-date="${dateKey(next)}"]`);
      node?.focus();
    });
  };

  const selectDay = (day: Date) => {
    if (disabled?.(day)) return;
    if (mode === "range") {
      let next: DateRange;
      if (!activeRange?.from || activeRange.to) next = { from: day, to: undefined };
      else next = sortRange(activeRange.from, day);
      setDraftRange(next);
      onRangeChange?.(next);
      return;
    }
    onSelect?.(day);
  };

  return (
    <div className={cn("feral-calendar", className)} data-mode={mode}>
      <div className="feral-calendar-head">
        <Button type="button" size="sm" tone="paper" aria-label="Previous month" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>‹</Button>
        <strong aria-live="polite">{MONTHS[cursor.getMonth()]} {cursor.getFullYear()}</strong>
        <Button type="button" size="sm" tone="paper" aria-label="Next month" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>›</Button>
      </div>
      <div className="feral-calendar-grid" role="grid" aria-label={`${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`}>
        {WEEKDAYS.map((day) => <span key={day} className="feral-calendar-weekday" role="columnheader">{day}</span>)}
        {days.map((day) => {
          const inMonth = day.getMonth() === cursor.getMonth();
          const isDisabled = disabled?.(day) ?? false;
          const selected = mode === "single" ? sameDay(day, value) : sameDay(day, activeRange?.from) || sameDay(day, activeRange?.to);
          const isToday = sameDay(day, today);
          const ranged = mode === "range" && inRange(day, activeRange);
          return (
            <button
              key={day.toISOString()}
              type="button"
              role="gridcell"
              className="feral-calendar-day feral-focus-ring"
              data-feral-date={dateKey(day)}
              data-outside={!inMonth || undefined}
              data-selected={selected || undefined}
              data-in-range={ranged || undefined}
              data-range-start={sameDay(day, activeRange?.from) || undefined}
              data-range-end={sameDay(day, activeRange?.to) || undefined}
              data-today={isToday || undefined}
              disabled={isDisabled}
              aria-selected={selected || ranged}
              aria-label={day.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              onClick={() => selectDay(day)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") { event.preventDefault(); moveFocus(day, 1); }
                if (event.key === "ArrowLeft") { event.preventDefault(); moveFocus(day, -1); }
                if (event.key === "ArrowDown") { event.preventDefault(); moveFocus(day, 7); }
                if (event.key === "ArrowUp") { event.preventDefault(); moveFocus(day, -7); }
              }}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
