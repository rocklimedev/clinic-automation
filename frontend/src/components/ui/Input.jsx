import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Input = forwardRef(({ className, type = 'text', error, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'flex h-9 w-full rounded-lg border bg-[rgb(var(--card))] px-3 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--muted))] transition-colors',
      'border-[rgb(var(--border))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]/40 focus-visible:border-brand-500',
      error && 'border-red-400 focus-visible:ring-red-300',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
))
Input.displayName = 'Input'

export { Input }
