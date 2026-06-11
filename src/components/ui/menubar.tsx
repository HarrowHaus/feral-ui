import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/cn";

const Menubar = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Root>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>>(
  ({ className, ...props }, ref) => <MenubarPrimitive.Root ref={ref} className={cn("feral-menubar", className)} {...props} />,
);
Menubar.displayName = MenubarPrimitive.Root.displayName;
const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const MenubarTrigger = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>>(
  ({ className, ...props }, ref) => <MenubarPrimitive.Trigger ref={ref} className={cn("feral-menubar-trigger", className)} {...props} />,
);
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarContent = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Content>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>>(
  ({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
    <MenubarPrimitive.Portal><MenubarPrimitive.Content ref={ref} align={align} alignOffset={alignOffset} sideOffset={sideOffset} className={cn("feral-menu-content feral-press", className)} {...props} /></MenubarPrimitive.Portal>
  ),
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Item>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => <MenubarPrimitive.Item ref={ref} className={cn("feral-menu-item", inset && "feral-menu-inset", className)} {...props} />,
);
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.CheckboxItem>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>>(
  ({ className, children, checked, ...props }, ref) => (
    <MenubarPrimitive.CheckboxItem ref={ref} className={cn("feral-menu-item feral-menu-check", className)} checked={checked} {...props}>
      <span className="feral-menu-indicator"><MenubarPrimitive.ItemIndicator><Check size={14} /></MenubarPrimitive.ItemIndicator></span>{children}
    </MenubarPrimitive.CheckboxItem>
  ),
);
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.RadioItem>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>>(
  ({ className, children, ...props }, ref) => (
    <MenubarPrimitive.RadioItem ref={ref} className={cn("feral-menu-item feral-menu-check", className)} {...props}>
      <span className="feral-menu-indicator"><MenubarPrimitive.ItemIndicator><Circle size={9} fill="currentColor" /></MenubarPrimitive.ItemIndicator></span>{children}
    </MenubarPrimitive.RadioItem>
  ),
);
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Label>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => <MenubarPrimitive.Label ref={ref} className={cn("feral-menu-label", inset && "feral-menu-inset", className)} {...props} />,
);
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>>(
  ({ className, ...props }, ref) => <MenubarPrimitive.Separator ref={ref} className={cn("feral-menu-separator", className)} {...props} />,
);
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarSubTrigger = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.SubTrigger>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }>(
  ({ className, inset, children, ...props }, ref) => <MenubarPrimitive.SubTrigger ref={ref} className={cn("feral-menu-item", inset && "feral-menu-inset", className)} {...props}>{children}<ChevronRight className="feral-menu-chevron" size={14} /></MenubarPrimitive.SubTrigger>,
);
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.SubContent>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>>(
  ({ className, ...props }, ref) => <MenubarPrimitive.SubContent ref={ref} className={cn("feral-menu-content feral-press", className)} {...props} />,
);
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarCheckboxItem, MenubarRadioItem, MenubarGroup, MenubarPortal, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarRadioGroup };
