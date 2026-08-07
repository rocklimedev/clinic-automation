import { format } from 'date-fns'
import { Star, MoreHorizontal, Eye, Send, Trash2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/Checkbox'
import { Avatar } from '@/components/ui/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Badge } from '@/components/ui/Badge'
import { DropdownMenu, DropdownItem } from '@/components/ui/DropdownMenu'
import { formatPhone } from '@/lib/utils'

export function buildColumns({ selectedIds, onToggleRow, onToggleAll, allSelected, onView, onDelete, onResend }) {
  return [
    {
      id: 'select',
      enableSorting: false,
      header: () => <Checkbox checked={allSelected} onChange={onToggleAll} />,
      cell: ({ row }) => (
        <Checkbox checked={selectedIds.includes(row.original.id)} onChange={() => onToggleRow(row.original.id)} />
      ),
    },
    {
      id: 'name',
      accessorKey: 'name',
      enableSorting: true,
      header: 'Patient Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.original.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[rgb(var(--fg))]">{row.original.name}</p>
            <p className="text-[11px] text-[rgb(var(--muted-fg))]">{row.original.id}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'mobile',
      accessorKey: 'mobile',
      enableSorting: false,
      header: 'Mobile',
      cell: ({ row }) => <span className="text-[rgb(var(--fg))]">+91 {formatPhone(row.original.mobile)}</span>,
    },
    {
      id: 'doctorName',
      accessorKey: 'doctorName',
      enableSorting: true,
      header: 'Doctor',
      cell: ({ row }) => <span className="text-[rgb(var(--fg))]">{row.original.doctorName}</span>,
    },
    {
      id: 'visitDate',
      accessorKey: 'visitDate',
      enableSorting: true,
      header: 'Visit Date',
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-[rgb(var(--fg))]">
          {format(new Date(row.original.visitDate), 'dd MMM yyyy, h:mm a')}
        </span>
      ),
    },
    {
      id: 'visitType',
      accessorKey: 'visitType',
      enableSorting: false,
      header: 'Visit Type',
      cell: ({ row }) => (
        <Badge variant={row.original.visitType === 'New' ? 'brand' : 'neutral'}>{row.original.visitType}</Badge>
      ),
    },
    {
      id: 'status',
      accessorKey: 'status',
      enableSorting: false,
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: 'whatsappStatus',
      accessorKey: 'whatsappStatus',
      enableSorting: false,
      header: 'WhatsApp',
      cell: ({ row }) => <StatusBadge status={row.original.whatsappStatus} />,
    },
    {
      id: 'feedback',
      enableSorting: false,
      header: 'Feedback',
      cell: ({ row }) =>
        row.original.feedbackReceived ? (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < row.original.feedbackRating ? 'fill-amber-400 text-amber-400' : 'text-[rgb(var(--border-strong))]'}`}
              />
            ))}
          </div>
        ) : (
          <span className="text-xs text-[rgb(var(--muted))]">—</span>
        ),
    },
    {
      id: 'actions',
      enableSorting: false,
      header: '',
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu
            trigger={
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[rgb(var(--muted-fg))] hover:bg-[rgb(var(--border))]/60">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            }
          >
            <DropdownItem icon={Eye} onClick={() => onView(row.original)}>
              View details
            </DropdownItem>
            <DropdownItem icon={Send} onClick={() => onResend(row.original)}>
              Resend WhatsApp
            </DropdownItem>
            <DropdownItem icon={Trash2} className="text-red-600" onClick={() => onDelete(row.original)}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </div>
      ),
    },
  ]
}
