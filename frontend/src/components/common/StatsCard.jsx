import { Card, CardContent } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export function StatsCard({ label, value, icon: Icon, trend, trendLabel, tone = 'default', loading }) {
  if (loading) {
    return (
      <Card className="p-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-3 h-7 w-16" />
        <Skeleton className="mt-3 h-3 w-20" />
      </Card>
    )
  }

  const toneStyles = {
    default: 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }

  return (
    <Card className="p-5 transition-shadow hover:shadow-soft-md">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-[rgb(var(--muted-fg))]">{label}</p>
        {Icon && (
          <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', toneStyles[tone])}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">{value}</p>
      {trend !== undefined && (
        <div className="mt-2 flex items-center gap-1 text-xs font-medium">
          <span
            className={cn(
              'flex items-center gap-0.5',
              trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            )}
          >
            {trend >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(trend)}%
          </span>
          <span className="text-[rgb(var(--muted-fg))]">{trendLabel}</span>
        </div>
      )}
    </Card>
  )
}
