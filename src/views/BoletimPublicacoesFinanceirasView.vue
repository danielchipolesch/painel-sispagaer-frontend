<template>
    <div>
        <div class="mb-5">
            <h1 class="text-h6 font-weight-bold">RCEG</h1>
            <p class="text-caption text-medium-emphasis mb-0">
                Consultar período escolhido.
            </p>
        </div>

        <PeriodFilter
            v-model:year="appStore.selectedYear"
            v-model:month="appStore.selectedMonth"
            class="mb-5"
            @search="fetchAllWrapper"
        />
    
        <v-row>
            <v-col cols="12" lg="15">
                <ChartCard
                    title="PUBLICAÇÕES DE BOLETIM FINANCEIRO."
                    :subtitle="`${yearA} X ${yearB}`"
                    :loading="!heatmapDataA.length || !heatmapDataB.length"
                >
                    <BaseChart :option="heatMapOptionPubliBolFin" :height="500" />
                </ChartCard>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { usePayrollData } from '@/composables/usePayrollData'

import ChartCard from '@/components/cards/ChartCard.vue'
import BaseChart from '@/components/charts/BaseChart.vue'
import PeriodFilter from '@/components/filters/PeriodFilter.vue'

const appStore = useAppStore()
const { fetchComparative, fetchAll } = usePayrollData()

const currentYear = new Date().getFullYear()
const yearA = ref(currentYear - 1)
const yearB = ref(currentYear)

// 🔥 estados
const heatmapDataA = ref([])
const heatmapDataB = ref([])

const colorPalettes = {
  red: ['#f8d7da', '#f1aeb5', '#842029'],
  blue: ['#e7f1ff', '#6ea8fe', '#084298']
}

// controle de cor (pode vir do filtro depois)
const selectedColor = ref('blue')

// 📊 comparativo existente
async function loadComparative() {
  await fetchComparative(yearA.value, yearB.value)
}

// 🎲 dados fake
function generateFakeData(year) {
  const date = +echarts.time.parse(year + '-01-01')
  const end = +echarts.time.parse(+year + 1 + '-01-01')
  const dayTime = 3600 * 24 * 1000
  const data = []

  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 100)
    ])
  }

  return data
}

// 🚀 carregar fake
function loadFakeHeatmap() {
  heatmapDataA.value = generateFakeData(yearA.value)
  heatmapDataB.value = generateFakeData(yearB.value)
}

// ⚙️ option
const heatMapOptionPubliBolFin = computed(() => {
  if (!heatmapDataA.value.length || !heatmapDataB.value.length) return {}

  const allValues = [
    ...heatmapDataA.value,
    ...heatmapDataB.value
  ].map(d => d[1])

  const maxValue = Math.max(...allValues)

  return {
    tooltip: {
      trigger: 'item', // 👈 ESSENCIAL
      confine: true, // 👈 evita sair da tela
      position: 'top',
      formatter: function (p) {
      if (!p.value) return ''

      const data = p.value[0]
      const valor = p.value[1]

      return `
        <div style="padding:4px">
          <div><strong>${data}</strong></div>
          <div>📊 ${valor} registros</div>
        </div>
      `
  }
    },

    visualMap: {
      min: 0,
      max: maxValue,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      top: 400,
      itemWidth: 20,
      itemHeight: 120,
      inRange: {
        color: colorPalettes[selectedColor.value] // 🔥 AQUI
      }
    },

    title: [
        {
            text: String(yearA.value),
            left: 'center',
            top: 20
        },
        {
            text: String(yearB.value),
            left: 'center',
            top: 180
        }
    ],

    calendar: [
        {
            top: 60,
            left: 'center',
            range: String(yearA.value),
            cellSize: ['auto', 16],
            orient: 'horizontal',
            dayLabel: { firstDay: 1 },
            monthLabel: { nameMap: 'pt' }
        },
        {
            top: 220, // 👈 abaixo do primeiro
            left: 'center',
            range: String(yearB.value),
            cellSize: ['auto', 16],
            orient: 'horizontal',
            dayLabel: { firstDay: 1 },
            monthLabel: { nameMap: 'pt' }
        }
    ],

    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: heatmapDataA.value
      },
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 1,
        data: heatmapDataB.value
      }
    ]
  }
})

// 🔄 filtro
async function fetchAllWrapper() {
  await fetchAll()
  loadFakeHeatmap()
}

// 🚀 lifecycle
onMounted(async () => {
  await loadComparative()
  loadFakeHeatmap()
})
</script>