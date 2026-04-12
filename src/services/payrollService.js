import api from './api'

/**
 * Payroll service — all endpoints related to folha de pagamento.
 *
 * Each method corresponds to one backend endpoint.
 * Replace the mock data blocks with the real `api.get(...)` calls
 * once the Java backend is available.
 */
export const payrollService = {
  /**
   * Overall payroll summary for a given year/month.
   * GET /payroll/summary?year={year}&month={month}
   */
  async getSummary(year, month) {
    // TODO: return api.get('/payroll/summary', { params: { year, month } })
    return mockSummary(year, month)
  },

  /**
   * Monthly payroll totals for an entire year (12 data points).
   * GET /payroll/evolution?year={year}
   */
  async getMonthlyEvolution(year) {
    // TODO: return api.get('/payroll/evolution', { params: { year } })
    return mockMonthlyEvolution(year)
  },

  /**
   * Payroll breakdown by military rank (Posto/Graduação).
   * GET /payroll/by-rank?year={year}&month={month}
   */
  async getByRank(year, month) {
    // TODO: return api.get('/payroll/by-rank', { params: { year, month } })
    return mockByRank()
  },

  /**
   * Payroll breakdown by organizational unit.
   * GET /payroll/by-unit?year={year}&month={month}
   */
  async getByUnit(year, month) {
    // TODO: return api.get('/payroll/by-unit', { params: { year, month } })
    return mockByUnit()
  },

  /**
   * Payroll breakdown by expenditure category (Vencimentos, Gratificações, etc.).
   * GET /payroll/by-category?year={year}&month={month}
   */
  async getByCategory(year, month) {
    // TODO: return api.get('/payroll/by-category', { params: { year, month } })
    return mockByCategory()
  },

  /**
   * Year-over-year comparison data.
   * GET /payroll/comparative?yearA={yearA}&yearB={yearB}
   */
  async getComparative(yearA, yearB) {
    // TODO: return api.get('/payroll/comparative', { params: { yearA, yearB } })
    return mockComparative(yearA, yearB)
  },
}

// ─── Mock data ────────────────────────────────────────────────────────────────
// Remove these functions when connecting to the real backend.

function mockSummary(year, month) {
  return {
    totalBruto: 48_750_320.5,
    totalDescontos: 9_540_210.0,
    totalLiquido: 39_210_110.5,
    totalPessoal: 1_243,
    variacaoMensal: 2.3,
    variacaoAnual: 5.7,
    competencia: `${String(month).padStart(2, '0')}/${year}`,
  }
}

function mockMonthlyEvolution(year) {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const base = 46_000_000
  return months.map((label, i) => ({
    label,
    month: i + 1,
    bruto: base + Math.random() * 4_000_000,
    liquido: (base + Math.random() * 4_000_000) * 0.8,
    pessoal: 1200 + Math.floor(Math.random() * 80),
  }))
}

function mockByRank() {
  return [
    { rank: 'Cel', total: 4_200_000, pessoal: 42 },
    { rank: 'TC', total: 5_800_000, pessoal: 63 },
    { rank: 'Maj', total: 6_100_000, pessoal: 78 },
    { rank: 'Cap', total: 7_400_000, pessoal: 110 },
    { rank: '1º Ten', total: 5_600_000, pessoal: 95 },
    { rank: '2º Ten', total: 3_200_000, pessoal: 68 },
    { rank: 'ST', total: 4_100_000, pessoal: 92 },
    { rank: '1º Sgt', total: 3_800_000, pessoal: 115 },
    { rank: '2º Sgt', total: 3_200_000, pessoal: 130 },
    { rank: '3º Sgt', total: 2_900_000, pessoal: 145 },
    { rank: 'Cb', total: 1_600_000, pessoal: 185 },
    { rank: 'Sd', total: 850_000, pessoal: 120 },
  ]
}

function mockByUnit() {
  return [
    { unit: 'COMGEP', total: 12_400_000, pessoal: 312 },
    { unit: 'DIRAD', total: 8_750_000, pessoal: 210 },
    { unit: 'SEFA', total: 7_200_000, pessoal: 175 },
    { unit: 'DIRSA', total: 6_800_000, pessoal: 165 },
    { unit: 'DIRENG', total: 5_900_000, pessoal: 148 },
    { unit: 'DIMAER', total: 4_200_000, pessoal: 105 },
    { unit: 'DECEA', total: 3_500_000, pessoal: 128 },
  ]
}

function mockByCategory() {
  return [
    { category: 'Vencimentos', value: 28_500_000 },
    { category: 'Gratificações', value: 8_200_000 },
    { category: 'Adicionais', value: 5_600_000 },
    { category: 'Indenizações', value: 3_400_000 },
    { category: 'Outros Créditos', value: 3_050_320 },
  ]
}

function mockComparative(yearA, yearB) {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const base = 45_000_000
  return {
    yearA,
    yearB,
    series: months.map((label, i) => ({
      label,
      [yearA]: base + i * 200_000 + Math.random() * 1_000_000,
      [yearB]: base * 1.05 + i * 220_000 + Math.random() * 1_000_000,
    })),
  }
}
