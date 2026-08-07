import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Tooltip({ content, children, className }) {
  const [show, setShow] = useState(false)
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          className={cn(
            'absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[rgb(var(--fg))] px-2 py-1 text-[11px] font-medium text-[rgb(var(--bg))] shadow-soft-md z-50 animate-in',
            className
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}
