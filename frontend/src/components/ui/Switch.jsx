import { cn } from "@/lib/utils";

export function Switch({ checked, onCheckedChange, className, ...props }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]/40",
        checked ? "bg-brand-600" : "bg-[rgb(var(--border-strong))]",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-4.5" : "translate-x-1",
        )}
        style={{ transform: checked ? "translateX(18px)" : "translateX(4px)" }}
      />
    </button>
  );
}
