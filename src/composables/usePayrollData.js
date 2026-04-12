import { computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { usePayrollStore } from '@/store/payroll'

/**
 * Composable for consuming payroll data in views.
 *
 * Automatically re-fetches when the global year/month filter changes.
 * Views can call specific fetch methods or rely on the auto-fetch.
 *
 * Usage:
 *   const { summary, monthlyEvolution, fetchAll } = usePayrollData()
 */
export function usePayrollData() {
  const appStore = useAppStore()
  const payrollStore = usePayrollStore()

  const { selectedYear, selectedMonth } = storeToRefs(appStore)
  const { summary, monthlyEvolution, byRank, byUnit, byCategory, comparativeData } =
    storeToRefs(payrollStore)

  async function fetchAll() {
    await Promise.all([
      payrollStore.fetchSummary(selectedYear.value, selectedMonth.value),
      payrollStore.fetchMonthlyEvolution(selectedYear.value),
      payrollStore.fetchByRank(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByUnit(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByCategory(selectedYear.value, selectedMonth.value),
    ])
  }

  // Re-fetch when filters change
  watch([selectedYear, selectedMonth], () => fetchAll(), { immediate: false })

  onMounted(() => fetchAll())

  return {
    // State
    summary,
    monthlyEvolution,
    byRank,
    byUnit,
    byCategory,
    comparativeData,
    selectedYear,
    selectedMonth,
    // Actions
    fetchAll,
    fetchComparative: payrollStore.fetchComparative,
  }
}
