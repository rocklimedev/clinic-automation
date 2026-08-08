import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  footer,
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

  const widths = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-10 my-8 w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-soft-lg",
              widths[size],
            )}
            role="dialog"
            aria-modal="true"
          >
            {(title || description) && (
              <div className="flex items-start justify-between border-b border-[rgb(var(--border))] px-6 py-4">
                <div>
                  {title && (
                    <h2 className="text-base font-semibold tracking-tight">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-1 text-sm text-[rgb(var(--muted-fg))]">
                      {description}
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
            )}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
              {children}
            </div>
            {footer && (
              <div className="flex items-center justify-end gap-2 border-t border-[rgb(var(--border))] px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
