export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[rgb(var(--border-strong))] px-6 py-14 text-center">
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(var(--border))]/60">
          <Icon className="h-5 w-5 text-[rgb(var(--muted-fg))]" />
        </div>
      )}
      <p className="text-[15px] font-semibold text-[rgb(var(--fg))]">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-[rgb(var(--muted-fg))]">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
