import { delay } from './client'
import { patients as MOCK_PATIENTS, doctors, coordinators } from '@/utils/mockData'

let store = [...MOCK_PATIENTS]

export const patientsApi = {
  list: async ({ search = '', status, visitType, page = 1, pageSize = 10, sortBy, sortDir } = {}) => {
    let rows = [...store]
    if (search) {
      const q = search.toLowerCase()
      rows = rows.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.mobile.includes(q) ||
          p.doctorName.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      )
    }
    if (status && status !== 'all') rows = rows.filter((p) => p.status === status)
    if (visitType && visitType !== 'all') rows = rows.filter((p) => p.visitType === visitType)
    if (sortBy) {
      rows.sort((a, b) => {
        const av = a[sortBy]
        const bv = b[sortBy]
        if (av === bv) return 0
        const dir = sortDir === 'desc' ? -1 : 1
        return av > bv ? dir : -dir
      })
    }
    const total = rows.length
    const start = (page - 1) * pageSize
    const pageRows = rows.slice(start, start + pageSize)
    return delay({ rows: pageRows, total, page, pageSize })
  },

  getById: async (id) => delay(store.find((p) => p.id === id) ?? null),

  create: async (payload) => {
    const newPatient = {
      id: `PT-${1000 + store.length + Math.floor(Math.random() * 1000)}`,
      status: 'active',
      whatsappStatus: 'pending',
      feedbackReceived: false,
      feedbackRating: null,
      feedbackText: null,
      googleReviewSubmitted: false,
      automationStage: 'scheduled',
      ...payload,
    }
    store = [newPatient, ...store]
    return delay(newPatient, 500)
  },

  bulkImport: async (rows) => {
    const created = rows.map((r, i) => ({
      id: `PT-${2000 + store.length + i}`,
      status: 'active',
      whatsappStatus: 'pending',
      feedbackReceived: false,
      automationStage: 'scheduled',
      ...r,
    }))
    store = [...created, ...store]
    return delay({ imported: created.length }, 700)
  },

  remove: async (id) => {
    store = store.filter((p) => p.id !== id)
    return delay({ ok: true })
  },

  getDoctors: () => delay(doctors),
  getCoordinators: () => delay(coordinators),
}
