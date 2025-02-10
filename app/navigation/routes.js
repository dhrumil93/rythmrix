export const ROUTES = {
  HOME: '/(app)/home',
  REPORTS: '/(app)/reports',
  ARTICLES: '/(app)/articles',
  SETTINGS: '/(app)/settings',
  TESTS: {
    TWELVE_LEAD_ECG: '/(app)/tests/12l-ecg',
    HEART_RISK: '/(app)/tests/heart-risk',
    HRV: '/(app)/tests/hrv',
    LIVE_MONITOR: '/(app)/tests/live-monitor',
    LEAD_TWO_ECG: '/(app)/tests/lead2-ecg',
    HYPERKALEMIA: '/(app)/tests/hyperkalemia',
    REPORTS: {
      INDEX: '/(app)/tests/reports',
      DETAILS: (id) => `/(app)/tests/reports/${id}`,
    },
    // Nested routes for each test type
    TWELVE_LEAD_ECG_REPORT: (id) => `/(app)/tests/12l-ecg/reports/${id}`,
    HEART_RISK_REPORT: (id) => `/(app)/tests/heart-risk/reports/${id}`,
    HRV_REPORT: (id) => `/(app)/tests/hrv/reports/${id}`,
    LIVE_MONITOR_REPORT: (id) => `/(app)/tests/live-monitor/reports/${id}`,
    LEAD_TWO_ECG_REPORT: (id) => `/(app)/tests/lead2-ecg/reports/${id}`,
    HYPERKALEMIA_REPORT: (id) => `/(app)/tests/hyperkalemia/reports/${id}`,
  },
}; 