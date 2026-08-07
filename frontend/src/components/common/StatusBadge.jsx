import { Badge } from '@/components/ui/Badge'
import { CheckCheck, Check, Clock, XCircle, Send, CircleDot, Loader2 } from 'lucide-react'

const CONFIG = {
  delivered: { label: 'Delivered', variant: 'info', icon: CheckCheck },
  read: { label: 'Read', variant: 'success', icon: CheckCheck },
  sent: { label: 'Sent', variant: 'brand', icon: Check },
  pending: { label: 'Pending', variant: 'warning', icon: Clock },
  failed: { label: 'Failed', variant: 'danger', icon: XCircle },
  active: { label: 'Active', variant: 'success', icon: CircleDot },
  inactive: { label: 'Inactive', variant: 'neutral', icon: CircleDot },
  scheduled: { label: 'Scheduled', variant: 'neutral', icon: Clock },
  message_sent: { label: 'Message sent', variant: 'brand', icon: Send },
  awaiting_response: { label: 'Awaiting response', variant: 'warning', icon: Loader2 },
  completed: { label: 'Completed', variant: 'success', icon: CheckCheck },
  Approved: { label: 'Approved', variant: 'success', icon: CheckCheck },
  Draft: { label: 'Draft', variant: 'neutral', icon: Clock },
  'Pending Review': { label: 'Pending review', variant: 'warning', icon: Clock },
}

export function StatusBadge({ status, className }) {
  const cfg = CONFIG[status] || { label: status, variant: 'neutral', icon: CircleDot }
  const Icon = cfg.icon
  return (
    <Badge variant={cfg.variant} className={className}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </Badge>
  )
}
