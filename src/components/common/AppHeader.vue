<template>
  <v-app-bar
    color="primary"
    elevation="0"
    border="b"
    :border-color="'rgba(255,255,255,0.1)'"
  >
    <!-- Mobile menu toggle -->
    <v-app-bar-nav-icon
      color="white"
      class="d-flex d-md-none"
      @click="appStore.toggleSidebar"
    />

    <!-- Breadcrumb / page title -->
    <v-app-bar-title>
      <span class="text-white font-weight-medium text-subtitle-1">
        {{ currentTitle }}
      </span>
    </v-app-bar-title>

    <template #append>
      <!-- Global date filter -->
      <div class="d-flex align-center gap-2 mr-3">
        <v-select
          v-model="appStore.selectedMonth"
          :items="months"
          item-title="label"
          item-value="value"
          density="compact"
          variant="outlined"
          hide-details
          style="width: 130px; background: rgba(255,255,255,0.1)"
          class="month-select"
        />

        <v-select
          v-model="appStore.selectedYear"
          :items="years"
          density="compact"
          variant="outlined"
          hide-details
          style="width: 100px; background: rgba(255,255,255,0.1)"
          class="month-select"
        />
      </div>

      <!-- User chip -->
      <v-chip
        prepend-icon="mdi-account-circle"
        color="rgba(255,255,255,0.15)"
        variant="flat"
        class="mr-3 text-white"
        size="small"
      >
        {{ userName }}
      </v-chip>
    </template>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import { fullMonth } from '@/utils/formatters'

const appStore = useAppStore()
const route = useRoute()

const currentTitle = computed(() => route.meta?.title ?? 'Painel BI')

// Build month list in pt-BR
const months = computed(() =>
  Array.from({ length: 12 }, (_, i) => ({
    label: fullMonth(i + 1).charAt(0).toUpperCase() + fullMonth(i + 1).slice(1),
    value: i + 1,
  }))
)

// Build year list: last 5 years + current + next
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 6 }, (_, i) => currentYear - 4 + i)

// In a real app this would come from the auth store
const userName = 'CP CHIPOLESCH DIRAD'
</script>

<style scoped>
.month-select :deep(.v-field__outline) {
  color: rgba(255, 255, 255, 0.3) !important;
}

.month-select :deep(.v-field__input),
.month-select :deep(.v-select__selection-text) {
  color: #FFFFFF !important;
  font-size: 0.813rem;
}

.month-select :deep(.v-icon) {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>
