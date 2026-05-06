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
  const { summary, monthlyEvolution, byRank, byUnit, byCategory, comparativeData, byCategoryEfetivoPago, byAuxAlimentODGSA, byAuxTranspODGSA, byGratRepODGSA, byAuxFardODGSA, byQuantMilQuad, byCustMilQuad, byMorteFicta } =
    storeToRefs(payrollStore)

  async function fetchAll() {
    await Promise.all([
      payrollStore.fetchSummary(selectedYear.value, selectedMonth.value),
      payrollStore.fetchMonthlyEvolution(selectedYear.value),
      payrollStore.fetchByRank(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByUnit(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByCategory(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByCategoryEfetivoPago(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByAuxAlimentODGSA(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByAuxTranspODGSA(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByGratRepODGSA(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByAuxFardODGSA(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByQuantMilQuad(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByCustMilQuad(selectedYear.value, selectedMonth.value),
      payrollStore.fetchByMorteFicta(selectedYear.value, selectedMonth.value),
      payrollStore.fetchComparative(selectedYear.value),
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
    byCategoryEfetivoPago,
    byAuxAlimentODGSA,
    byAuxTranspODGSA,
    byGratRepODGSA,
    byAuxFardODGSA,
    byQuantMilQuad,
    byCustMilQuad,
    byMorteFicta,
    comparativeData,
    selectedYear,
    selectedMonth,
    // Actions
    fetchAll,
    fetchComparative: payrollStore.fetchComparative,
    fetchByCategoryEfetivoPago: payrollStore.fetchByCategoryEfetivoPago,
    fetchByAuxAlimentODGSA: payrollStore.fetchByAuxAlimentODGSA,
    fetchByAuxTranspODGSA: payrollStore.fetchByAuxTranspODGSA,
    fetchByGratRepODGSA: payrollStore.fetchByGratRepODGSA,
    fetchByAuxFardODGSA: payrollStore.fetchByAuxFardODGSA,
    fetchByQuantMilQuad: payrollStore.fetchByQuantMilQuad,
    fetchByCustMilQuad: payrollStore.fetchByCustMilQuad,
    fetchByMorteFicta: payrollStore.fetchByMorteFicta,
  }
}
