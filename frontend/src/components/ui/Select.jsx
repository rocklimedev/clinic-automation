import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = forwardRef(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        "flex h-9 w-full appearance-none rounded-lg border bg-[rgb(var(--card))] pl-3 pr-8 text-sm text-[rgb(var(--fg))] transition-colors",
        "border-[rgb(var(--border))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]/40 focus-visible:border-brand-500",
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted))]" />
  </div>
));
Select.displayName = "Select";

export { Select };
