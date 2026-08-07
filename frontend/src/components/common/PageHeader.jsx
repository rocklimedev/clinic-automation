export function PageHeader({ title, description, actions }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight text-[rgb(var(--fg))]">{title}</h1>
        {description && <p className="mt-1 text-sm text-[rgb(var(--muted-fg))]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
