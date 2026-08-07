import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-none whitespace-nowrap',
  {
    variants: {
      variant: {
        neutral: 'bg-[rgb(var(--border))]/60 text-[rgb(var(--muted-fg))]',
        brand: 'bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-300',
        success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
        warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
        danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        info: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
      },
    },
    defaultVariants: { variant: 'neutral' },
  }
)

export function Badge({ className, variant, dot, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
