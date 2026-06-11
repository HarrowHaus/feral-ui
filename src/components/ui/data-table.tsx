import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Button } from "./button";
import { Input } from "./field";
import { cn } from "../../lib/cn";

export type DataTableColumn<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  hideOnMobile?: boolean;
};

export type DataTableProps<T extends Record<string, unknown>> = {
  columns: DataTableColumn<T>[];
  data: T[];
  pageSize?: number;
  enableSearch?: boolean;
  selectable?: boolean;
  loading?: boolean;
  dense?: boolean;
  emptyLabel?: string;
  getRowId?: (row: T, index: number) => string;
  onSelectionChange?: (ids: string[]) => void;
};

type Direction = "asc" | "desc";

function cellText<T extends Record<string, unknown>>(row: T, column: DataTableColumn<T>) {
  const value = row[column.key as keyof T];
  if (value == null) return "";
  return String(value);
}

function compare(a: string, b: string, direction: Direction) {
  const numericA = Number(a);
  const numericB = Number(b);
  const result = Number.isFinite(numericA) && Number.isFinite(numericB)
    ? numericA - numericB
    : a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
  return direction === "asc" ? result : -result;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 5,
  enableSearch = false,
  selectable = false,
  loading = false,
  dense = false,
  emptyLabel = "No rows. The table is empty and pretending it meant to do that.",
  getRowId = (_row, index) => String(index),
  onSelectionChange,
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<Direction>("asc");
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState<Set<string>>(() => new Set());

  React.useEffect(() => {
    onSelectionChange?.(Array.from(selected));
  }, [selected, onSelectionChange]);

  const filtered = React.useMemo(() => {
    const lower = query.trim().toLowerCase();
    const rows = lower
      ? data.filter((row) => columns.some((column) => cellText(row, column).toLowerCase().includes(lower)))
      : data;
    if (!sortKey) return rows;
    const column = columns.find((item) => String(item.key) === sortKey);
    if (!column) return rows;
    return [...rows].sort((a, b) => compare(cellText(a, column), cellText(b, column), sortDirection));
  }, [columns, data, query, sortDirection, sortKey]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * pageSize, safePage * pageSize + pageSize);

  React.useEffect(() => {
    setPage(0);
  }, [query, sortKey, sortDirection, data.length]);

  function toggleSort(column: DataTableColumn<T>) {
    if (!column.sortable) return;
    const key = String(column.key);
    if (sortKey === key) {
      setSortDirection((current) => current === "asc" ? "desc" : "asc");
      return;
    }
    setSortKey(key);
    setSortDirection("asc");
  }

  function toggleRow(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    const visibleIds = visible.map((row, index) => getRowId(row, safePage * pageSize + index));
    const everySelected = visibleIds.every((id) => selected.has(id));
    setSelected((current) => {
      const next = new Set(current);
      for (const id of visibleIds) {
        if (everySelected) next.delete(id); else next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn("feral-data-table-wrap", dense && "feral-data-table-dense")}>
      {enableSearch ? (
        <div className="feral-data-table-toolbar">
          <Input aria-label="Search table" placeholder="Filter rows before they unionize..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <span>{filtered.length} row{filtered.length === 1 ? "" : "s"}</span>
        </div>
      ) : null}

      <div className="feral-data-table-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable ? <TableHead className="feral-data-table-select"><input type="checkbox" aria-label="Select visible rows" checked={visible.length > 0 && visible.every((row, index) => selected.has(getRowId(row, safePage * pageSize + index)))} onChange={toggleAll} /></TableHead> : null}
              {columns.map((column) => {
                const key = String(column.key);
                const active = sortKey === key;
                return (
                  <TableHead key={key} data-hide-mobile={column.hideOnMobile || undefined}>
                    {column.sortable ? (
                      <button type="button" className="feral-data-table-sort" onClick={() => toggleSort(column)} aria-sort={active ? sortDirection === "asc" ? "ascending" : "descending" : "none"}>
                        {column.header}<span>{active ? sortDirection === "asc" ? "↑" : "↓" : "↕"}</span>
                      </button>
                    ) : column.header}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, index) => <TableRow key={`loading-${index}`}><TableCell colSpan={columns.length + (selectable ? 1 : 0)}><span className="feral-data-table-skeleton" /></TableCell></TableRow>)
            ) : visible.length ? (
              visible.map((row, rowIndex) => {
                const absoluteIndex = safePage * pageSize + rowIndex;
                const id = getRowId(row, absoluteIndex);
                return (
                  <TableRow key={id} data-selected={selected.has(id) || undefined}>
                    {selectable ? <TableCell className="feral-data-table-select"><input type="checkbox" aria-label={`Select row ${absoluteIndex + 1}`} checked={selected.has(id)} onChange={() => toggleRow(id)} /></TableCell> : null}
                    {columns.map((column) => <TableCell key={String(column.key)} data-hide-mobile={column.hideOnMobile || undefined}>{column.render ? column.render(row) : cellText(row, column)}</TableCell>)}
                  </TableRow>
                );
              })
            ) : (
              <TableRow><TableCell colSpan={columns.length + (selectable ? 1 : 0)}><div className="feral-data-table-empty">{emptyLabel}</div></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="feral-data-table-footer">
        <span>{selectable ? `${selected.size} selected · ` : ""}Page {safePage + 1} of {pageCount}</span>
        <div>
          <Button size="sm" tone="paper" type="button" disabled={safePage <= 0} onClick={() => setPage((current) => Math.max(0, current - 1))}>Previous</Button>
          <Button size="sm" tone="paper" type="button" disabled={safePage >= pageCount - 1} onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}>Next</Button>
        </div>
      </div>
    </div>
  );
}
