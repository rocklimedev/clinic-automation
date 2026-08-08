import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Skeleton } from "../../components/ui/Skeleton";
import { EmptyState } from "../../components/common/EmptyState";
import { Inbox } from "lucide-react";

export function DataTable({
  columns,
  data,
  loading,
  sorting,
  onSortingChange,
  manualSorting = false,
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
  emptyTitle = "No results found",
  emptyDescription = "Try adjusting your search or filters.",
  onRowClick,
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting,
    state: sorting ? { sorting } : undefined,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const rangeStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, total);

  return (
    <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr
                key={hg.id}
                className="border-b border-[rgb(var(--border))] bg-[rgb(var(--border))]/20"
              >
                {hg.headers.map((header) => {
                  const canSort = header.column.columnDef.enableSorting;
                  const sortDir = sorting?.find(
                    (s) => s.id === header.column.id,
                  )?.desc;
                  const isSorted = sorting?.some(
                    (s) => s.id === header.column.id,
                  );
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        "whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[rgb(var(--muted-fg))]",
                        canSort &&
                          "cursor-pointer select-none hover:text-[rgb(var(--fg))]",
                      )}
                      onClick={() =>
                        canSort && onSortingChange?.(header.column.id)
                      }
                    >
                      <span className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {canSort &&
                          (isSorted ? (
                            sortDir ? (
                              <ArrowDown className="h-3 w-3" />
                            ) : (
                              <ArrowUp className="h-3 w-3" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-3 w-3 opacity-40" />
                          ))}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-[rgb(var(--border))] last:border-0"
                >
                  {columns.map((_, j) => (
                    <td key={j} className="px-4 py-3.5">
                      <Skeleton className="h-4 w-full max-w-[140px]" />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10">
                  <EmptyState
                    icon={Inbox}
                    title={emptyTitle}
                    description={emptyDescription}
                  />
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    "border-b border-[rgb(var(--border))] last:border-0 transition-colors",
                    onRowClick &&
                      "cursor-pointer hover:bg-[rgb(var(--border))]/25",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && total > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[rgb(var(--border))] px-4 py-3 sm:flex-row">
          <p className="text-xs text-[rgb(var(--muted-fg))]">
            Showing{" "}
            <span className="font-medium text-[rgb(var(--fg))]">
              {rangeStart}–{rangeEnd}
            </span>{" "}
            of{" "}
            <span className="font-medium text-[rgb(var(--fg))]">{total}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--muted-fg))] hover:bg-[rgb(var(--border))]/50 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-xs font-medium text-[rgb(var(--fg))]">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--muted-fg))] hover:bg-[rgb(var(--border))]/50 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
