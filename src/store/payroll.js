import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from './app'
import { payrollService } from '@/services/payrollService'

/**
 * Payroll data store.
 * Fetches and caches payroll summaries, breakdowns, and comparison data
 * from the backend via payrollService.
 */
export const usePayrollStore = defineStore('payroll', () => {
  const appStore = useAppStore()

  // ─── State ────────────────────────────────────────────────────────────────
  const summary = ref(null)
  const monthlyEvolution = ref([])
  const byRank = ref([])
  const byUnit = ref([])
  const byCategory = ref([])
  const comparativeData = ref(null)

  // ─── Actions ──────────────────────────────────────────────────────────────
  async function fetchSummary(year, month) {
    appStore.startLoading()
    try {
      summary.value = await payrollService.getSummary(year, month)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar resumo da folha.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchMonthlyEvolution(year) {
    appStore.startLoading()
    try {
      monthlyEvolution.value = await payrollService.getMonthlyEvolution(year)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar evolução mensal.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchByRank(year, month) {
    appStore.startLoading()
    try {
      byRank.value = await payrollService.getByRank(year, month)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados por posto/graduação.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchByUnit(year, month) {
    appStore.startLoading()
    try {
      byUnit.value = await payrollService.getByUnit(year, month)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados por unidade.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchByCategory(year, month) {
    appStore.startLoading()
    try {
      byCategory.value = await payrollService.getByCategory(year, month)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados por categoria.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchComparative(yearA, yearB) {
    appStore.startLoading()
    try {
      comparativeData.value = await payrollService.getComparative(yearA, yearB)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados comparativos.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  return {
    summary,
    monthlyEvolution,
    byRank,
    byUnit,
    byCategory,
    comparativeData,
    fetchSummary,
    fetchMonthlyEvolution,
    fetchByRank,
    fetchByUnit,
    fetchByCategory,
    fetchComparative,
  }
})
