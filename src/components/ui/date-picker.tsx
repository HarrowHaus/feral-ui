import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Calendar, type DateRange } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

function formatDate(date?: Date) {
  return date ? date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "";
}

export function DatePicker({
  value: controlledValue,
  onChange,
  label = "Pick date",
  disabled,
}: {
  value?: Date;
  onChange?: (date: Date) => void;
  label?: string;
  disabled?: (date: Date) => boolean;
}) {
  const [internal, setInternal] = React.useState<Date | undefined>(controlledValue);
  const [open, setOpen] = React.useState(false);
  const value = controlledValue ?? internal;
  const text = value ? formatDate(value) : label;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" tone="paper" aria-label={value ? `Selected date ${text}` : label}><CalendarIcon size={16} aria-hidden="true" /> {text}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar value={value} defaultMonth={value} disabled={disabled} onSelect={(date) => { setInternal(date); onChange?.(date); setOpen(false); }} />
      </PopoverContent>
    </Popover>
  );
}

export function DateRangePicker({
  value,
  onChange,
  label = "Pick date range",
  disabled,
}: {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  label?: string;
  disabled?: (date: Date) => boolean;
}) {
  const [internal, setInternal] = React.useState<DateRange | undefined>(value);
  const range = value ?? internal;
  const text = range?.from && range?.to ? `${formatDate(range.from)} → ${formatDate(range.to)}` : range?.from ? `${formatDate(range.from)} → pick end` : label;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" tone="paper" aria-label={text}><CalendarIcon size={16} aria-hidden="true" /> {text}</Button>
      </PopoverTrigger>
      <PopoverContent className="feral-date-range-popover">
        <Calendar mode="range" range={range} defaultMonth={range?.from} disabled={disabled} onRangeChange={(next) => { setInternal(next); onChange?.(next); }} />
        <p className="feral-date-range-note">Range picker. Two clicks. Minimal drama. Calendar goblin restrained.</p>
      </PopoverContent>
    </Popover>
  );
}
