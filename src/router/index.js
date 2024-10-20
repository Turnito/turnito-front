import BrandingCustomerPage from '@/pages/companyPages/brandingCustomerPage.vue'
import DashboardPage from '@/pages/companyPages/dashboardPage.vue'
import EmployeesPage from '@/pages/companyPages/employeesPage.vue'
import LoginPage from '@/pages/companyPages/loginPage.vue'
import PromotionPage from '@/pages/companyPages/promotionPage.vue'
import SchedulesPage from '@/pages/companyPages/schedulesPage.vue'
import ServicesPage from '@/pages/companyPages/servicesPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import UserManagementPage from '@/pages/companyPages/userManagementPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login-company',
      component: LoginPage
    },
    {
      path: '/dashboard/company',
      name: 'dashboard-company',
      component: DashboardPage
    },
    {
      path: '/branding-customer',
      name: 'branding-customer',
      component: BrandingCustomerPage
    },
    {
      path: '/clientes',
      name: 'client-management',
      component: UserManagementPage
    },
    {
      path: '/empleados',
      name: 'employees',
      component: EmployeesPage
    },
    {
      path: '/promociones',
      name: 'promotion',
      component: PromotionPage
    },
    {
      path: '/agendas',
      name: 'schedules',
      component: SchedulesPage
    },
    {
      path: '/servicios',
      name: 'services',
      component: ServicesPage
    }
  ]
})

export default router
