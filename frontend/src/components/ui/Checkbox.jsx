import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Checkbox({ checked, indeterminate, onChange, className, ...props }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      onClick={(e) => {
        e.stopPropagation()
        onChange?.(!checked)
      }}
      className={cn(
        'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]/40',
        checked || indeterminate
          ? 'bg-brand-600 border-brand-600 text-white'
          : 'border-[rgb(var(--border-strong))] bg-[rgb(var(--card))]',
        className
      )}
      {...props}
    >
      {indeterminate ? <Minus className="h-3 w-3" /> : checked ? <Check className="h-3 w-3" /> : null}
    </button>
  )
}
