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

  async getByCategoryEfetivoPago(year, month) {
    // TODO: return api.get('/payroll/by-category', { params: { year, month } })
    return mockByCategoryEfetivoPago()
  },

  async getByAuxAlimentODGSA(year, month) {
    // TODO: return api.get('/payroll/by-category', { params: { year, month } })
    return mockByAuxAlimentODGSA()
  },

  async getByAuxTranspODGSA(year, month) {
    // TODO: return api.get('/payroll/by-category', { params: { year, month } })
    return mockByAuxTranspODGSA()
  },

  async getByGratRepODGSA(year, month) {
    // TODO: return api.get('/payroll/by-category', { params: { year, month } })
    return mockByGratRepODGSA()
  },

  async getByAuxFardODGSA(year, month) {
    // TODO: return api.get('/payroll/by-category', { params: { year, month } })
    return mockByAuxFardODGSA()
  },

  async getByQuantMilQuad(year, month) {
    // TODO: return api.get('/payroll/by-category', { params: { year, month } })
    return mockByQuantMilQuad()
  },

  async getByCustMilQuad(year, month) {
    // TODO: return api.get('/payroll/by-category', { params: { year, month } })
    return mockByCustMilQuad()
  },

  async getByMorteFicta(year, month) {
    // TODO: return api.get('/payroll/by-category', { params: { year, month } })
    return mockByMorteFicta()
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

function mockByCategoryEfetivoPago() {
  return [
    { category: 'Anistiados', value: 28_500_000 },
    { category: 'Ativos', value: 8_200_000 },
    { category: 'Pensionistas', value: 5_600_000 },
    { category: 'Veteranos', value: 3_400_000 },
    { category: 'Outros Créditos', value: 3_050_320 },
  ]
}

function mockByAuxAlimentODGSA() {
  return [
    { category: 'ASOCEA', value: 28_500_000 },
    { category: 'ASPAER', value: 8_200_000 },
    { category: 'CENCIAR', value: 5_600_000 },
    { category: 'CENIPA', value: 3_400_000 },
    { category: 'CIAER', value: 3_050_320 },
    { category: 'COMAE', value: 3_050_320 },
    { category: 'COMGAP', value: 3_050_320 },
    { category: 'COMGEP', value: 3_050_320 },
    { category: 'COMPREP', value: 3_050_320 },
    { category: 'DCTA', value: 3_050_320 },
    { category: 'DECEA', value: 3_050_320 },
    { category: 'EMAER', value: 3_050_320 },
    { category: 'GABAER', value: 3_050_320 },
    { category: 'INCAER', value: 3_050_320 },
    { category: 'SECPROM', value: 3_050_320 },
    { category: 'SEFA', value: 3_050_320 },
    { category: 'CECOMSAER', value: 3_050_320 },
    { category: 'COMEXER', value: 3_050_320 },
    { category: 'MDEFESA', value: 3_050_320 },
    { category: 'ORGEXT', value: 3_050_320 },
  ]
}

function mockByAuxTranspODGSA() {
  return [
    { category: 'ASOCEA', value: 28_500_000 },
    { category: 'ASPAER', value: 8_200_000 },
    { category: 'CENCIAR', value: 5_600_000 },
    { category: 'CENIPA', value: 3_400_000 },
    { category: 'CIAER', value: 3_050_320 },
    { category: 'COMAE', value: 3_050_320 },
    { category: 'COMGAP', value: 3_050_320 },
    { category: 'COMGEP', value: 3_050_320 },
    { category: 'COMPREP', value: 3_050_320 },
    { category: 'DCTA', value: 3_050_320 },
    { category: 'DECEA', value: 3_050_320 },
    { category: 'EMAER', value: 3_050_320 },
    { category: 'GABAER', value: 3_050_320 },
    { category: 'INCAER', value: 3_050_320 },
    { category: 'SECPROM', value: 3_050_320 },
    { category: 'SEFA', value: 3_050_320 },
    { category: 'CECOMSAER', value: 3_050_320 },
    { category: 'COMEXER', value: 3_050_320 },
    { category: 'MDEFESA', value: 3_050_320 },
    { category: 'ORGEXT', value: 3_050_320 },
  ]
}

function mockByGratRepODGSA() {
  return [
    { category: 'ASPAER', value: 8_200_000 },
    { category: 'CENIPA', value: 3_400_000 },
    { category: 'CIAER', value: 3_050_320 },
    { category: 'COMAE', value: 3_050_320 },
    { category: 'COMGAP', value: 3_050_320 },
    { category: 'COMGEP', value: 3_050_320 },
    { category: 'COMPREP', value: 3_050_320 },
    { category: 'DCTA', value: 3_050_320 },
    { category: 'DECEA', value: 3_050_320 },
    { category: 'EMAER', value: 3_050_320 },
    { category: 'GABAER', value: 3_050_320 },
    { category: 'INCAER', value: 3_050_320 },
    { category: 'SECPROM', value: 3_050_320 },
    { category: 'SEFA', value: 3_050_320 },
    { category: 'CECOMSAER', value: 3_050_320 },
    { category: 'COMEXER', value: 3_050_320 },
    { category: 'MDEFESA', value: 3_050_320 },
    { category: 'ORGEXT', value: 3_050_320 },
  ]
}

function mockByAuxFardODGSA() {
  return [
    { category: 'ASOCEA', value: 28_500_000 },
    { category: 'ASPAER', value: 8_200_000 },
    { category: 'CENCIAR', value: 5_600_000 },
    { category: 'CENIPA', value: 3_400_000 },
    { category: 'CIAER', value: 3_050_320 },
    { category: 'COMAE', value: 3_050_320 },
    { category: 'COMGAP', value: 3_050_320 },
    { category: 'COMGEP', value: 3_050_320 },
    { category: 'COMPREP', value: 3_050_320 },
    { category: 'DCTA', value: 3_050_320 },
    { category: 'DECEA', value: 3_050_320 },
    { category: 'EMAER', value: 3_050_320 },
    { category: 'GABAER', value: 3_050_320 },
    { category: 'INCAER', value: 3_050_320 },
    { category: 'SECPROM', value: 3_050_320 },
    { category: 'SEFA', value: 3_050_320 },
    { category: 'CECOMSAER', value: 3_050_320 },
    { category: 'COMEXER', value: 3_050_320 },
    { category: 'MDEFESA', value: 3_050_320 },
    { category: 'ORGEXT', value: 3_050_320 },
  ]
}

function mockByQuantMilQuad() {
  return [
    { category: 'QOAV', value: 700 },
    { category: 'QOENG', value: 300 },
    { category: 'QOINT', value: 500 },
    { category: 'QOMED', value: 600 },
    { category: 'QOFARM', value: 1000 },
    { category: 'QODENT', value: 2000 },
    { category: 'QOINF', value: 550 },
    { category: 'QOEAV', value: 800 },
    { category: 'QOECOM', value: 350 },
    { category: 'QOEARM', value: 600 },
    { category: 'QOEFOT', value: 750 },
    { category: 'QOEMET', value: 755 },
    { category: 'QOECTA', value: 856 },
    { category: 'QOESUP', value: 796 },
    { category: 'QOEA', value: 1052 },
    { category: 'QOCAPL', value: 200 },
    { category: 'QOAP', value: 302 },
    { category: 'QCOA', value: 401 },
    { category: 'QOCON3', value: 408 },
    { category: 'QOCON', value: 326 },
    { category: 'NTQ', value: 400 },
    { category: 'QSS', value: 600 },
    { category: 'QFG', value: 601 },
    { category: 'QESA', value: 630 },
    { category: 'QTA', value: 789 },
    { category: 'QSCON', value: 456 },
    { category: 'QCB', value: 201 },
    { category: 'QCBCON', value: 360 },
    { category: 'QSD', value: 180 },
    { category: 'QEST', value: 100 },
  ]
}

function mockByCustMilQuad() {
  return [
    { category: 'QOAV', value: 3_050_320 },
    { category: 'QOENG', value: 3_050_320 },
    { category: 'QOINT', value: 3_050_320 },
    { category: 'QOMED', value: 3_050_320 },
    { category: 'QOFARM', value: 3_050_320 },
    { category: 'QODENT', value: 3_050_320 },
    { category: 'QOINF', value: 3_050_320 },
    { category: 'QOEAV', value: 3_050_320 },
    { category: 'QOECOM', value: 3_050_320 },
    { category: 'QOEARM', value: 3_050_320 },
    { category: 'QOEFOT', value: 3_050_320 },
    { category: 'QOEMET', value: 3_050_320 },
    { category: 'QOECTA', value: 3_050_320 },
    { category: 'QOESUP', value: 3_050_320 },
    { category: 'QOEA', value: 3_050_320 },
    { category: 'QOCAPL', value: 3_050_320 },
    { category: 'QOAP', value: 3_050_320 },
    { category: 'QCOA', value: 3_050_320 },
    { category: 'QOCON3', value: 3_050_320 },
    { category: 'QOCON', value: 3_050_320 },
    { category: 'NTQ', value: 3_050_320 },
    { category: 'QSS', value: 3_050_320 },
    { category: 'QFG', value: 3_050_320 },
    { category: 'QESA', value: 3_050_320 },
    { category: 'QTA', value: 3_050_320 },
    { category: 'QSCON', value: 3_050_320 },
    { category: 'QCB', value: 3_050_320 },
    { category: 'QCBCON', value: 3_050_320 },
    { category: 'QSD', value: 3_050_320 },
    { category: 'QEST', value: 3_050_320 },
  ]
}

function mockByMorteFicta() {
  return [
    { category: 'AP', value: 15 },
    { category: 'BR', value: 30 },
    { category: 'CB', value: 80 },
    { category: 'CL', value: 40 },
    { category: 'CP', value: 25 },
    { category: 'MA', value: 24 },
    { category: 'MJ', value: 63 },
    { category: 'SD', value: 27 },
    { category: 'SO', value: 81 },
    { category: 'S2', value: 100 },
    { category: 'TB', value: 63 },
    { category: 'TC', value: 96 },
    { category: 'TM', value: 12 },
    { category: 'T1', value: 10 },
    { category: 'T2', value: 52 },
    { category: '1S', value: 36 },
    { category: '1T', value: 41 },
    { category: '2S', value: 24 },
    { category: '2T', value: 56 },
    { category: '3S', value: 67 },
    { category: 'S1', value: 5 },
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
