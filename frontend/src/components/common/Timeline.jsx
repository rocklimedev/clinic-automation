import { cn } from '@/lib/utils'

export function Timeline({ items }) {
  return (
    <div className="relative">
      {items.map((item, idx) => {
        const Icon = item.icon
        const isLast = idx === items.length - 1
        return (
          <div key={idx} className="relative flex gap-3 pb-6 last:pb-0">
            {!isLast && (
              <span className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-[rgb(var(--border))]" />
            )}
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 z-10',
                item.done
                  ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-900/30'
                  : item.active
                    ? 'border-brand-500 bg-[rgb(var(--card))] text-brand-600 animate-pulse'
                    : 'border-[rgb(var(--border-strong))] bg-[rgb(var(--card))] text-[rgb(var(--muted))]'
              )}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
            </div>
            <div className="pt-1">
              <p className="text-sm font-medium text-[rgb(var(--fg))]">{item.title}</p>
              {item.description && (
                <p className="mt-0.5 text-xs text-[rgb(var(--muted-fg))]">{item.description}</p>
              )}
              {item.timestamp && (
                <p className="mt-0.5 text-[11px] text-[rgb(var(--muted))]">{item.timestamp}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
