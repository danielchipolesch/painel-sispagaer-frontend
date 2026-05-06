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
  const byCategoryEfetivoPago = ref([])
  const byAuxAlimentODGSA = ref([])
  const byAuxTranspODGSA = ref([])
  const byGratRepODGSA = ref([])
  const byAuxFardODGSA = ref([])
  const byQuantMilQuad = ref([])
  const byCustMilQuad = ref([])
  const byMorteFicta = ref([])
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

  async function fetchByCategoryEfetivoPago(year, month) {
    appStore.startLoading()
    try {
      byCategoryEfetivoPago.value = await payrollService.getByCategoryEfetivoPago(year, month)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados por categoria de efetivo pago.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchByAuxAlimentODGSA(yearA, yearB) {
    appStore.startLoading()
    try {
      byAuxAlimentODGSA.value = await payrollService.getByAuxAlimentODGSA(yearA, yearB)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados comparativos por AUXÍLIO ALIMENTAÇÃO ODGSA.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchByAuxTranspODGSA(yearA, yearB) {
    appStore.startLoading()
    try {
      byAuxTranspODGSA.value = await payrollService.getByAuxTranspODGSA(yearA, yearB)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados comparativos por AUXÍLIO DE TRANSPORTE ODGSA.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchByGratRepODGSA(yearA, yearB) {
    appStore.startLoading()
    try {
      byGratRepODGSA.value = await payrollService.getByGratRepODGSA(yearA, yearB)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados comparativos por GRATIFICAÇÃO POR REPRESENTAÇÃO ODGSA.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchByAuxFardODGSA(yearA, yearB) {
    appStore.startLoading()
    try {
      byAuxFardODGSA.value = await payrollService.getByAuxFardODGSA(yearA, yearB)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados comparativos por AUXÍLIO DE FARDAMENTO ODGSA.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchByQuantMilQuad(year, month) {
    appStore.startLoading()
    try {
      byQuantMilQuad.value = await payrollService.getByQuantMilQuad(year, month)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados comparativos por MILITARES POR QUADRO.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchByCustMilQuad(year, month) {
    appStore.startLoading()
    try {
      byCustMilQuad.value = await payrollService.getByCustMilQuad(year, month)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados comparativos por CUSTO POR QUADRO DE MILITARES.', type: 'error' })
      console.error(err)
    } finally {
      appStore.stopLoading()
    }
  }

  async function fetchByMorteFicta(yearA, yearB) {
    appStore.startLoading()
    try {
      byMorteFicta.value = await payrollService.getByMorteFicta(yearA, yearB)
    } catch (err) {
      appStore.notify({ message: 'Erro ao carregar dados de Morte Ficta.', type: 'error' })
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
    byCategoryEfetivoPago,
    byAuxAlimentODGSA,
    byAuxTranspODGSA,
    byGratRepODGSA,
    byAuxFardODGSA,
    byQuantMilQuad,
    byCustMilQuad,
    byMorteFicta,
    comparativeData,
    fetchSummary,
    fetchMonthlyEvolution,
    fetchByRank,
    fetchByUnit,
    fetchByCategory,
    fetchByCategoryEfetivoPago,
    fetchByAuxAlimentODGSA,
    fetchByAuxTranspODGSA,
    fetchByGratRepODGSA,
    fetchByAuxFardODGSA,
    fetchByQuantMilQuad,
    fetchByCustMilQuad,
    fetchByMorteFicta,
    fetchComparative,
  }
})
