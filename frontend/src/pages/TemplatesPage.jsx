import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { TemplatesGrid } from '@/features/templates/TemplatesGrid'

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="WhatsApp Templates"
        description="Manage message templates approved for the Meta WhatsApp Cloud API"
        actions={
          <Button size="md">
            <Plus className="h-4 w-4" />
            New template
          </Button>
        }
      />
      <TemplatesGrid />
    </div>
  )
}
