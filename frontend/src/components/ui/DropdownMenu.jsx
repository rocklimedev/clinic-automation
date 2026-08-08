import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function DropdownMenu({ trigger, children, align = "end" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            "absolute z-40 mt-1.5 min-w-[180px] rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-1 shadow-soft-lg animate-in",
            align === "end" ? "right-0" : "left-0",
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ className, icon: Icon, children, ...props }) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm text-[rgb(var(--fg))] hover:bg-[rgb(var(--border))]/60",
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 text-[rgb(var(--muted-fg))]" />}
      {children}
    </button>
  );
}
