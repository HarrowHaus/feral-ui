import * as React from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";

export type ComboboxOption = { value: string; label: string };

export function Combobox({ options, value, onValueChange, placeholder = "Select option", searchPlaceholder = "Search..." }: {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(value ?? "");
  const selected = options.find((option) => option.value === (value ?? internal));
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" tone="paper" aria-expanded={open}>
          {selected?.label ?? placeholder}
          <ChevronsUpDown size={16} aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>No option. Tiny bureaucrat shrugs.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(nextValue) => {
                    setInternal(nextValue);
                    onValueChange?.(nextValue);
                    setOpen(false);
                  }}
                >
                  <Check size={15} style={{ opacity: (value ?? internal) === option.value ? 1 : 0 }} aria-hidden="true" />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
