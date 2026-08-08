import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Textarea = forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[80px] w-full rounded-lg border bg-[rgb(var(--card))] px-3 py-2 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--muted))]",
      "border-[rgb(var(--border))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]/40 focus-visible:border-brand-500",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
