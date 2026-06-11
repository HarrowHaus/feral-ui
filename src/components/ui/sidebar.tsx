import * as React from "react";
import { Menu } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "./button";

type SidebarContextValue = {
  collapsed: boolean;
  mobileOpen: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  return React.useContext(SidebarContext);
}

export function SidebarLayout({ className, defaultCollapsed = false, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { defaultCollapsed?: boolean }) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const value = React.useMemo(() => ({ collapsed, mobileOpen, setCollapsed, setMobileOpen }), [collapsed, mobileOpen]);
  return <SidebarContext.Provider value={value}><div className={cn("feral-sidebar-layout", className)} data-collapsed={collapsed || undefined} data-mobile-open={mobileOpen || undefined} {...props}>{children}</div></SidebarContext.Provider>;
}

export function SidebarToggle({ className, children = "Menu" }: { className?: string; children?: React.ReactNode }) {
  const context = useSidebar();
  return <Button type="button" size="sm" tone="paper" className={cn("feral-sidebar-toggle", className)} aria-expanded={context?.mobileOpen} onClick={() => context?.setMobileOpen((open) => !open)}><Menu size={16} /> {children}</Button>;
}

export function SidebarCollapseButton({ className, children = "Collapse" }: { className?: string; children?: React.ReactNode }) {
  const context = useSidebar();
  return <Button type="button" size="sm" tone="paper" className={className} aria-pressed={context?.collapsed} onClick={() => context?.setCollapsed((collapsed) => !collapsed)}>{children}</Button>;
}

export function Sidebar({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <aside className={cn("feral-sidebar", className)} {...props}>{children}</aside>;
}

export function SidebarSection({ className, title, children }: { className?: string; title?: string; children: React.ReactNode }) {
  return <section className={cn("feral-sidebar-section", className)}>{title ? <h3>{title}</h3> : null}{children}</section>;
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-sidebar-footer", className)} {...props} />;
}

export function SidebarMain({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <main className={cn("feral-sidebar-main", className)} {...props} />;
}

export function SidebarLink({ className, active, icon, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean; icon?: React.ReactNode }) {
  return <a className={cn("feral-sidebar-link", className)} data-active={active || undefined} aria-current={active ? "page" : undefined} {...props}>{icon ? <span className="feral-sidebar-link-icon">{icon}</span> : null}<span className="feral-sidebar-link-label">{children}</span></a>;
}
