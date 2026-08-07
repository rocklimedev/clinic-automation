import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-[rgb(var(--bg))]',
  {
    variants: {
      variant: {
        primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-soft',
        secondary:
          'bg-[rgb(var(--card))] text-[rgb(var(--fg))] border border-[rgb(var(--border))] hover:border-[rgb(var(--border-strong))] hover:bg-[rgb(var(--border))]/30 shadow-soft',
        ghost: 'text-[rgb(var(--fg))] hover:bg-[rgb(var(--border))]/50',
        outline: 'border border-[rgb(var(--border))] bg-transparent hover:bg-[rgb(var(--border))]/30',
        destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-soft',
        link: 'text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4',
        lg: 'h-11 px-5 text-[15px]',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

const Button = forwardRef(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
))
Button.displayName = 'Button'

export { Button, buttonVariants }
