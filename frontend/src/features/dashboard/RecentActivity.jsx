import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '@/services/dashboard.api'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { Avatar } from '@/components/ui/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Star } from 'lucide-react'
import { Tabs } from '@/components/ui/Tabs'
import { useState } from 'react'
import { format } from 'date-fns'

export function RecentActivity() {
  const [tab, setTab] = useState('patients')
  const { data: recentPatients, isLoading: loadingPatients } = useQuery({
    queryKey: ['dashboard', 'recent-patients'],
    queryFn: dashboardApi.getRecentPatients,
  })
  const { data: recentFeedback, isLoading: loadingFeedback } = useQuery({
    queryKey: ['dashboard', 'recent-feedback'],
    queryFn: dashboardApi.getRecentFeedback,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Latest activity</CardTitle>
          <CardDescription>Newest visits and feedback</CardDescription>
        </div>
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { value: 'patients', label: 'Patients' },
            { value: 'feedback', label: 'Feedback' },
          ]}
        />
      </CardHeader>
      <CardContent>
        {tab === 'patients' ? (
          loadingPatients ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <ul className="divide-y divide-[rgb(var(--border))]">
              {recentPatients.map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <Avatar name={p.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[rgb(var(--fg))]">{p.name}</p>
                    <p className="truncate text-xs text-[rgb(var(--muted-fg))]">
                      {p.doctorName} · {format(new Date(p.visitDate), 'dd MMM, h:mm a')}
                    </p>
                  </div>
                  <StatusBadge status={p.whatsappStatus} />
                </li>
              ))}
            </ul>
          )
        ) : loadingFeedback ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-[rgb(var(--border))]">
            {recentFeedback.map((f) => (
              <li key={f.id} className="py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[rgb(var(--fg))]">{f.patientName}</p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < f.rating ? 'fill-amber-400 text-amber-400' : 'text-[rgb(var(--border-strong))]'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-[rgb(var(--muted-fg))]">{f.text}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
