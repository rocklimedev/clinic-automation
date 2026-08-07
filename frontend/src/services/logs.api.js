import { delay } from './client'
import { messageLogs } from '@/utils/mockData'

let store = [...messageLogs]

export const logsApi = {
  list: async ({ search = '', status, page = 1, pageSize = 10 } = {}) => {
    let rows = [...store]
    if (search) {
      const q = search.toLowerCase()
      rows = rows.filter((l) => l.patientName.toLowerCase().includes(q) || l.mobile.includes(q))
    }
    if (status && status !== 'all') rows = rows.filter((l) => l.status === status)
    rows.sort((a, b) => new Date(b.sentTime) - new Date(a.sentTime))
    const total = rows.length
    const start = (page - 1) * pageSize
    return delay({ rows: rows.slice(start, start + pageSize), total, page, pageSize })
  },
  retry: async (id) => {
    store = store.map((l) => (l.id === id ? { ...l, status: 'sent', failReason: null } : l))
    return delay({ ok: true }, 600)
  },
}
