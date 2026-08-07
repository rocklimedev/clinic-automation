import { MessageCircle, Star } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { StatusBadge } from '@/components/common/StatusBadge'

export function TemplateCard({ template }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-2 border-b border-[rgb(var(--border))] p-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-[rgb(var(--fg))]">{template.name}</p>
            {template.isDefault && (
              <Badge variant="brand">
                <Star className="h-3 w-3" /> Default
              </Badge>
            )}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-[rgb(var(--muted-fg))]">
            <span>{template.category}</span>
            <span>·</span>
            <span>{template.language}</span>
          </div>
        </div>
        <StatusBadge status={template.status} />
      </div>

      <div className="flex-1 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--muted-fg))]">Preview</p>
        <div className="rounded-2xl rounded-tl-sm bg-[#e7ffdb] p-3.5 text-[13px] leading-relaxed text-[#111b21] shadow-soft dark:bg-brand-950/40 dark:text-brand-100">
          {template.body.split('\n').map((line, i) => (
            <p key={i} className={line.trim() === '' ? 'h-2' : ''}>
              {line.split(/(\{\{[^}]+\}\})/g).map((part, j) =>
                part.startsWith('{{') ? (
                  <span key={j} className="rounded bg-black/10 px-1 font-medium dark:bg-white/10">
                    {part}
                  </span>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </p>
          ))}
          <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-[#111b21]/50 dark:text-brand-100/50">
            <MessageCircle className="h-2.5 w-2.5" /> WhatsApp Business
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-[rgb(var(--border))] px-4 py-3">
        {template.variables.map((v) => (
          <span
            key={v}
            className="rounded-md bg-[rgb(var(--border))]/60 px-2 py-0.5 font-mono text-[11px] text-[rgb(var(--muted-fg))]"
          >
            {'{{' + v + '}}'}
          </span>
        ))}
      </div>
    </Card>
  )
}
