import { delay } from './client'

let settings = {
  clinicName: 'Sunrise Multispeciality Clinic',
  googleReviewLink: 'https://g.page/r/sunrise-clinic/review',
  whatsappBusinessNumber: '+91 98765 43210',
  timezone: 'Asia/Kolkata',
  defaultDoctorId: 'doc-1',
  metaApiToken: '',
  metaPhoneNumberId: '',
  metaWabaId: '',
}

export const settingsApi = {
  get: () => delay(settings),
  update: async (payload) => {
    settings = { ...settings, ...payload }
    return delay(settings, 500)
  },
}
