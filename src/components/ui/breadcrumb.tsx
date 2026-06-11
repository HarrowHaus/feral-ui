import * as React from "react";
import { cn } from "../../lib/cn";

export function Breadcrumb({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Breadcrumb" className={cn("feral-breadcrumb", className)} {...props} />;
}

export function BreadcrumbList({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("feral-breadcrumb-list", className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("feral-breadcrumb-item", className)} {...props} />;
}

export function BreadcrumbLink({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn("feral-breadcrumb-link", className)} {...props} />;
}

export function BreadcrumbPage({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-current="page" className={cn("feral-breadcrumb-page", className)} {...props} />;
}

export function BreadcrumbSeparator({ className, children = "→", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden="true" className={cn("feral-breadcrumb-separator", className)} {...props}>{children}</span>;
}
