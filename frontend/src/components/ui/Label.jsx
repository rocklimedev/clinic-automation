import { cn } from '@/lib/utils'

export function Label({ className, required, children, ...props }) {
  return (
    <label className={cn('text-sm font-medium text-[rgb(var(--fg))] mb-1.5 block', className)} {...props}>
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )
}
