import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = "max-w-md",
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-10 flex h-full w-full flex-col border-l border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-soft-lg",
              width,
            )}
          >
            <div className="flex items-start justify-between border-b border-[rgb(var(--border))] px-6 py-4">
              <div>
                {title && (
                  <h2 className="text-base font-semibold tracking-tight">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="mt-1 text-sm text-[rgb(var(--muted-fg))]">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-[rgb(var(--muted-fg))] hover:bg-[rgb(var(--border))]/60 hover:text-[rgb(var(--fg))]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
