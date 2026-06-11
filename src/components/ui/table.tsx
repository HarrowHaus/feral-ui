import * as React from "react";
import { cn } from "../../lib/cn";

function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <div className="feral-table-wrap"><table className={cn("feral-table", className)} {...props} /></div>;
}
function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("feral-table-header", className)} {...props} />;
}
function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("feral-table-body", className)} {...props} />;
}
function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot className={cn("feral-table-footer", className)} {...props} />;
}
function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("feral-table-row", className)} {...props} />;
}
function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn("feral-table-head", className)} {...props} />;
}
function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("feral-table-cell", className)} {...props} />;
}
function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={cn("feral-table-caption", className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
