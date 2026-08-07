import { cn } from "@/lib/utils";

export function Table({ className, ...props }) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className, ...props }) {
  return (
    <thead
      className={cn("border-b bg-zinc-50 text-zinc-600", className)}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  );
}

export function TableFooter({ className, ...props }) {
  return (
    <tfoot
      className={cn("border-t bg-zinc-50 font-medium", className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn("border-b transition-colors hover:bg-zinc-50", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        "h-12 px-6 text-left align-middle text-xs font-semibold uppercase tracking-wide text-zinc-500",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }) {
  return <td className={cn("px-6 py-4 align-middle", className)} {...props} />;
}

export function TableCaption({ className, ...props }) {
  return (
    <caption
      className={cn("mt-4 text-sm text-zinc-500", className)}
      {...props}
    />
  );
}
