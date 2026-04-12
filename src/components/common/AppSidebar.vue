<template>
  <v-navigation-drawer
    v-model="appStore.sidebarOpen"
    :rail="appStore.sidebarRail"
    permanent
    color="primary"
    width="260"
  >
    <!-- Logo / Brand -->
    <v-list-item
      :prepend-avatar="brasaoUrl"
      :title="appStore.sidebarRail ? '' : 'PAG Eletrônico'"
      :subtitle="appStore.sidebarRail ? '' : 'Inteligência de Dados'"
      nav
      class="py-4 brand-item"
    >
      <template #append>
        <v-btn
          v-if="!appStore.sidebarRail"
          variant="text"
          :icon="appStore.sidebarRail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          color="white"
          density="compact"
          @click="appStore.toggleSidebarRail"
        />
      </template>
    </v-list-item>

    <v-divider color="rgba(255,255,255,0.15)" />

    <!-- Navigation items -->
    <v-list density="compact" nav class="mt-2">
      <!-- Principal group -->
      <v-list-subheader
        v-if="!appStore.sidebarRail"
        class="nav-subheader"
      >
        Principal
      </v-list-subheader>

      <v-list-item
        v-for="item in principalItems"
        :key="item.name"
        :prepend-icon="item.meta.icon"
        :title="item.meta.title"
        :to="item.path"
        active-class="nav-item--active"
        color="white"
        rounded="lg"
        class="nav-item mb-1"
      />

      <v-divider color="rgba(255,255,255,0.1)" class="my-2" />

      <!-- Análises group -->
      <v-list-subheader
        v-if="!appStore.sidebarRail"
        class="nav-subheader"
      >
        Análises
      </v-list-subheader>

      <v-list-item
        v-for="item in analiseItems"
        :key="item.name"
        :prepend-icon="item.meta.icon"
        :title="item.meta.title"
        :to="item.path"
        active-class="nav-item--active"
        color="white"
        rounded="lg"
        class="nav-item mb-1"
      />

      <v-divider color="rgba(255,255,255,0.1)" class="my-2" />

      <!-- Relatórios group -->
      <v-list-subheader
        v-if="!appStore.sidebarRail"
        class="nav-subheader"
      >
        Relatórios
      </v-list-subheader>

      <v-list-item
        v-for="item in relatorioItems"
        :key="item.name"
        :prepend-icon="item.meta.icon"
        :title="item.meta.title"
        :to="item.path"
        active-class="nav-item--active"
        color="white"
        rounded="lg"
        class="nav-item mb-1"
      />
    </v-list>

    <!-- Bottom collapse toggle -->
    <template #append>
      <v-divider color="rgba(255,255,255,0.15)" />
      <div class="d-flex justify-center pa-2">
        <v-btn
          variant="text"
          :icon="appStore.sidebarRail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          color="rgba(255,255,255,0.6)"
          density="compact"
          @click="appStore.toggleSidebarRail"
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const router = useRouter()

const brasaoUrl = '/brasao-fab.svg'

const allRoutes = computed(() =>
  router.getRoutes().filter((r) => r.meta?.group)
)

const principalItems = computed(() =>
  allRoutes.value.filter((r) => r.meta.group === 'principal' || r.meta.group === 'pagamento')
)

const analiseItems = computed(() =>
  allRoutes.value.filter((r) => r.meta.group === 'analises')
)

const relatorioItems = computed(() =>
  allRoutes.value.filter((r) => r.meta.group === 'relatorios')
)
</script>

<style scoped>
.brand-item {
  background: rgba(255, 255, 255, 0.05);
}

.brand-item :deep(.v-list-item-title) {
  color: #FFFFFF;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.5px;
}

.brand-item :deep(.v-list-item-subtitle) {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
}

.nav-subheader {
  color: rgba(255, 255, 255, 0.45) !important;
  font-size: 0.65rem !important;
  font-weight: 700 !important;
  letter-spacing: 1.5px !important;
  text-transform: uppercase !important;
  padding-left: 16px !important;
}

.nav-item {
  color: rgba(255, 255, 255, 0.75) !important;
  transition: background 0.2s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #FFFFFF !important;
}

.nav-item--active {
  background: rgba(25, 118, 210, 0.5) !important;
  color: #FFFFFF !important;
}

.nav-item--active :deep(.v-icon) {
  color: #FFFFFF !important;
}

.nav-item :deep(.v-list-item-title) {
  font-size: 0.875rem;
}
</style>
