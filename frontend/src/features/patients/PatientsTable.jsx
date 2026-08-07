import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { patientsApi } from '@/services/patients.api'
import { DataTable } from '@/components/common/DataTable'
import { buildColumns } from './columns'
import { useDebounce } from '@/hooks/useDebounce'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

export function PatientsTable({
  search,
  status,
  visitType,
  onView,
  onNotify,
  registerExport,
}) {
  const [page, setPage] = useState(1)
  const [sorting, setSorting] = useState([{ id: 'visitDate', desc: true }])
  const [selectedIds, setSelectedIds] = useState([])
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const pageSize = 10
  const debouncedSearch = useDebounce(search, 300)
  const queryClient = useQueryClient()

  const sortBy = sorting[0]?.id
  const sortDir = sorting[0]?.desc ? 'desc' : 'asc'

  const { data, isLoading } = useQuery({
    queryKey: ['patients', { search: debouncedSearch, status, visitType, page, sortBy, sortDir }],
    queryFn: () => patientsApi.list({ search: debouncedSearch, status, visitType, page, pageSize, sortBy, sortDir }),
    placeholderData: (prev) => prev,
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => patientsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      setDeleteTarget(null)
      onNotify?.('Patient deleted')
    },
  })

  const bulkDeleteMutation = useMutation({
    mutationFn: async () => {
      await Promise.all(selectedIds.map((id) => patientsApi.remove(id)))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      setSelectedIds([])
      setBulkDeleteOpen(false)
      onNotify?.('Selected patients deleted')
    },
  })

  const rows = data?.rows ?? []
  const total = data?.total ?? 0

  const allSelected = rows.length > 0 && rows.every((r) => selectedIds.includes(r.id))

  const columns = useMemo(
    () =>
      buildColumns({
        selectedIds,
        onToggleRow: (id) =>
          setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
        onToggleAll: () =>
          setSelectedIds((prev) =>
            allSelected ? prev.filter((id) => !rows.some((r) => r.id === id)) : [...new Set([...prev, ...rows.map((r) => r.id)])]
          ),
        allSelected,
        onView,
        onDelete: (row) => setDeleteTarget(row),
        onResend: () => onNotify?.('WhatsApp message re-queued'),
      }),
    [selectedIds, allSelected, rows, onView, onNotify]
  )

  return (
    <>
      <PatientsTableExports data={rows} total={total} registerExport={registerExport} />
      <div className="space-y-3">
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm dark:border-brand-800 dark:bg-brand-900/20">
            <span className="text-brand-800 dark:text-brand-300">{selectedIds.length} selected</span>
            <button
              className="font-medium text-brand-700 hover:underline dark:text-brand-300"
              onClick={() => setBulkDeleteOpen(true)}
            >
              Delete selected
            </button>
          </div>
        )}
        <DataTable
          columns={columns}
          data={rows}
          loading={isLoading}
          sorting={sorting}
          onSortingChange={(id) =>
            setSorting((prev) => {
              const existing = prev.find((s) => s.id === id)
              if (!existing) return [{ id, desc: false }]
              return [{ id, desc: !existing.desc }]
            })
          }
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          onRowClick={onView}
          emptyTitle="No patients found"
          emptyDescription="Try a different search term or clear your filters."
        />
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
        title="Delete patient?"
        description={`This will permanently remove ${deleteTarget?.name ?? 'this patient'} and their automation history.`}
        confirmLabel="Delete patient"
        loading={deleteMutation.isPending}
      />
      <ConfirmDialog
        open={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={() => bulkDeleteMutation.mutate()}
        title={`Delete ${selectedIds.length} patients?`}
        description="This will permanently remove the selected patients and their automation history."
        confirmLabel="Delete selected"
        loading={bulkDeleteMutation.isPending}
      />
    </>
  )
}

// Registers a CSV export callback with the parent toolbar without lifting all table state up.
function PatientsTableExports({ data, total, registerExport }) {
  useMemo(() => {
    registerExport?.(() => {
      const headers = ['ID', 'Name', 'Mobile', 'Doctor', 'Visit Date', 'Visit Type', 'Status', 'WhatsApp Status']
      const csvRows = data.map((p) =>
        [p.id, p.name, p.mobile, p.doctorName, p.visitDate, p.visitType, p.status, p.whatsappStatus].join(',')
      )
      const csv = [headers.join(','), ...csvRows].join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'patients_export.csv'
      a.click()
      URL.revokeObjectURL(url)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return null
}
