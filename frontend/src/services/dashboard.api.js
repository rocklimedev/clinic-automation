import { delay } from './client'
import {
  getDashboardStats,
  getFeedbackTrend,
  getMessagesSentTrend,
  getReviewConversion,
  getRecentPatients,
  getRecentFeedback,
} from '@/utils/mockData'

export const dashboardApi = {
  getStats: () => delay(getDashboardStats()),
  getFeedbackTrend: () => delay(getFeedbackTrend()),
  getMessagesTrend: () => delay(getMessagesSentTrend()),
  getReviewConversion: () => delay(getReviewConversion()),
  getRecentPatients: () => delay(getRecentPatients()),
  getRecentFeedback: () => delay(getRecentFeedback()),
}
