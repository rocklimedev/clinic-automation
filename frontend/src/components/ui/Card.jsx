import { cn } from "@/lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-soft",
        className,
      )}
      {...props}
    />
  );
}
export function CardHeader({ className, ...props }) {
  return <div className={cn("px-5 pt-5", className)} {...props} />;
}
export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-[15px] font-semibold tracking-tight", className)}
      {...props}
    />
  );
}
export function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-[rgb(var(--muted-fg))] mt-0.5", className)}
      {...props}
    />
  );
}
export function CardContent({ className, ...props }) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}
