import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  variant = "destructive",
  loading = false,
}) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-[rgb(var(--muted-fg))]">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant={variant} onClick={onConfirm} disabled={loading}>
          {loading ? "Please wait…" : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
