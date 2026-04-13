import { createRouter, createWebHistory } from 'vue-router'

/**
 * Route definitions.
 *
 * Each top-level section of the payroll BI panel is a separate lazy-loaded view.
 * To add a new section:
 *   1. Create a new view file under src/views/
 *   2. Add a route entry here
 *   3. Add a navigation item in src/components/common/AppSidebar.vue
 */
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          group: 'principal',
        },
      },
      {
        path: 'folha-pagamento',
        name: 'FolhaPagamento',
        component: () => import('@/views/FolhaPagamentoView.vue'),
        meta: {
          title: 'Folha de Pagamento',
          icon: 'mdi-file-document-multiple',
          group: 'pagamento',
        },
      },
      {
        path: 'analise-posto',
        name: 'AnalisePostoGraduacao',
        component: () => import('@/views/AnalisePostoView.vue'),
        meta: {
          title: 'Análise por Posto/Graduação',
          icon: 'mdi-shield-star',
          group: 'analises',
        },
      },
      {
        path: 'analise-unidade',
        name: 'AnaliseUnidade',
        component: () => import('@/views/AnaliseUnidadeView.vue'),
        meta: {
          title: 'Análise por Unidade',
          icon: 'mdi-office-building',
          group: 'analises',
        },
      },
      {
        path: 'comparativos',
        name: 'Comparativos',
        component: () => import('@/views/ComparativosView.vue'),
        meta: {
          title: 'Comparativos',
          icon: 'mdi-chart-bar',
          group: 'analises',
        },
      },
      {
        path: 'relatorios',
        name: 'Relatorios',
        component: () => import('@/views/RelatoriosView.vue'),
        meta: {
          title: 'Relatórios',
          icon: 'mdi-file-chart',
          group: 'relatorios',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// Update document title on navigation
router.afterEach((to) => {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'SISPAGAER'
  document.title = to.meta?.title ? `${to.meta.title} | ${appTitle}` : appTitle
})

export default router
