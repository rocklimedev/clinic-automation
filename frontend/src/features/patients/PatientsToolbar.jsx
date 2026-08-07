import { Plus, Upload, Download, Trash2 } from 'lucide-react'
import { SearchInput } from '@/components/common/SearchInput'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

export function PatientsToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  visitType,
  onVisitTypeChange,
  selectedCount,
  onAddPatient,
  onImport,
  onExport,
  onBulkDelete,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="sm:w-72">
          <SearchInput value={search} onChange={onSearchChange} placeholder="Search by name, mobile, doctor…" />
        </div>
        <div className="flex gap-2">
          <div className="w-36">
            <Select value={status} onChange={(e) => onStatusChange(e.target.value)}>
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </div>
          <div className="w-36">
            <Select value={visitType} onChange={(e) => onVisitTypeChange(e.target.value)}>
              <option value="all">All visit types</option>
              <option value="New">New</option>
              <option value="Follow-up">Follow-up</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {selectedCount > 0 && (
          <Button variant="destructive" size="sm" onClick={onBulkDelete}>
            <Trash2 className="h-3.5 w-3.5" />
            Delete ({selectedCount})
          </Button>
        )}
        <Button variant="secondary" size="sm" onClick={onImport}>
          <Upload className="h-3.5 w-3.5" />
          Import
        </Button>
        <Button variant="secondary" size="sm" onClick={onExport}>
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
        <Button size="sm" onClick={onAddPatient}>
          <Plus className="h-3.5 w-3.5" />
          Add Patient
        </Button>
      </div>
    </div>
  )
}
