import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "../../lib/cn";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root ref={ref} className={cn("feral-navigation-menu", className)} {...props}>{children}<NavigationMenuViewport /></NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;
const NavigationMenuList = React.forwardRef<React.ElementRef<typeof NavigationMenuPrimitive.List>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>>(({ className, ...props }, ref) => <NavigationMenuPrimitive.List ref={ref} className={cn("feral-navigation-list", className)} {...props} />);
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = React.forwardRef<React.ElementRef<typeof NavigationMenuPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>>(({ className, ...props }, ref) => <NavigationMenuPrimitive.Trigger ref={ref} className={cn("feral-navigation-trigger", className)} {...props} />);
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;
const NavigationMenuContent = React.forwardRef<React.ElementRef<typeof NavigationMenuPrimitive.Content>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>>(({ className, ...props }, ref) => <NavigationMenuPrimitive.Content ref={ref} className={cn("feral-navigation-content", className)} {...props} />);
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;
const NavigationMenuLink = React.forwardRef<React.ElementRef<typeof NavigationMenuPrimitive.Link>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>>(({ className, ...props }, ref) => <NavigationMenuPrimitive.Link ref={ref} className={cn("feral-navigation-link", className)} {...props} />);
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;
const NavigationMenuViewport = React.forwardRef<React.ElementRef<typeof NavigationMenuPrimitive.Viewport>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>>(({ className, ...props }, ref) => <div className="feral-navigation-viewport-wrap"><NavigationMenuPrimitive.Viewport ref={ref} className={cn("feral-navigation-viewport", className)} {...props} /></div>);
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;
const NavigationMenuIndicator = React.forwardRef<React.ElementRef<typeof NavigationMenuPrimitive.Indicator>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>>(({ className, ...props }, ref) => <NavigationMenuPrimitive.Indicator ref={ref} className={cn("feral-navigation-indicator", className)} {...props} />);
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport };
