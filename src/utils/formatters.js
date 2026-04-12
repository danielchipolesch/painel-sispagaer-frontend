import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

/**
 * Format a numeric value as Brazilian currency (R$).
 * @param {number} value
 * @param {object} options - Intl.NumberFormat options overrides
 * @returns {string}
 */
export function formatCurrency(value, options = {}) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    ...options,
  }).format(value ?? 0)
}

/**
 * Format a number with thousand separators (no currency symbol).
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value ?? 0)
}

/**
 * Format a decimal ratio as percentage string.
 * @param {number} value  e.g. 0.1234
 * @param {number} decimals
 * @returns {string}  e.g. "12,34%"
 */
export function formatPercent(value, decimals = 2) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value ?? 0)
}

/**
 * Format a date using dayjs.
 * @param {string|Date} date
 * @param {string} format
 * @returns {string}
 */
export function formatDate(date, format = 'DD/MM/YYYY') {
  return dayjs(date).format(format)
}

/**
 * Returns a short month label (e.g. "Jan", "Fev").
 * @param {number} month  1–12
 * @returns {string}
 */
export function shortMonth(month) {
  return dayjs().month(month - 1).format('MMM')
}

/**
 * Returns a full month label in pt-BR (e.g. "Janeiro").
 * @param {number} month  1–12
 * @returns {string}
 */
export function fullMonth(month) {
  return dayjs().month(month - 1).format('MMMM')
}

/**
 * Abbreviates a large number with K/M/B suffix.
 * @param {number} value
 * @returns {string}
 */
export function abbreviateNumber(value) {
  if (Math.abs(value) >= 1_000_000_000) {
    return `${formatNumber(value / 1_000_000_000, 1)}B`
  }
  if (Math.abs(value) >= 1_000_000) {
    return `R$ ${formatNumber(value / 1_000_000, 1)}M`
  }
  if (Math.abs(value) >= 1_000) {
    return `R$ ${formatNumber(value / 1_000, 1)}K`
  }
  return formatCurrency(value)
}
