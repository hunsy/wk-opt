import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import {
  Login,
  Page404,
  Dashboard,
  NavSelPage
} from '../views/common'
import Layout from '../views/layout/layout'
import {
  AppsManager,
  AdminsManager,
  RolesManager,
  ResourcesManager
} from '../views/sm'
import {
  WkDashboard,
  WkMediaResources,
  WkCoursesManager
} from '../views/wk'

import {
  UsmsAdmins,
  UsmsMechant,
  UsmsMerchantWithdrawal,
  UsmsProduct,
  UsmsProductInventory
} from '../views/usms'

/**
 * 路由映射
 */
export default new Router({
  mode: 'history',
  routes: [{
      "path": '/',
      redirect: '/navSel'
    },
    {
      path: '/login',
      component: Login,
      hidden: true
    },
    {
      path: '/navSel',
      name: 'navSel',
      component: NavSelPage,
      hidden: true
    },
    {
      path: '/404',
      name: '404',
      component: Page404,
      hidden: true
    },
    {
      path: '/dashboard',
      component: Layout,
      children: [{
        path: '/',
        name: 'dashboard',
        component: Dashboard
      }]
    },
    {
      path: '/appsManager',
      component: Layout,
      children: [{
        path: '/',
        name: 'appsManager',
        component: AppsManager
      }]
    },
    {
      path: '/auth',
      component: Layout,
      children: [{
          path: '/adminsManager',
          name: 'adminsManager',
          component: AdminsManager
        },
        {
          path: '/rolesManager',
          name: 'rolesManager',
          component: RolesManager
        },
        {
          path: '/resourcesManager',
          name: 'resourcesManager',
          component: ResourcesManager
        },
      ]
    },
    {
      path: 'wk',
      component: Layout,
      children: [{
          path: '/wkDashboard',
          name: 'wkDashboard',
          component: WkDashboard
        },
        {
          path: '/wkMediaResources',
          name: 'wkMediaResources',
          component: WkMediaResources
        },
        {
          path: '/wkCourses',
          name: 'wkCourses',
          component: WkCoursesManager
        },
      ]
    },
    {
      path: 'usms',
      component: Layout,
      children: [{
          path: '/usmsAdmins',
          name: 'usmsAdmins',
          component: UsmsAdmins
        },
        {
          path: '/usmsMerchant',
          name: 'usmsMerchant',
          component: UsmsMechant
        },
        {
          path: '/usmsMerchantWithdrawal',
          name: 'usmsMerchantWithdrawal',
          component: UsmsMerchantWithdrawal
        },
        {
          path: '/usmsProduct',
          name: 'usmsProduct',
          component: UsmsProduct
        },
        {
          path: '/usmsProductInventory',
          name: 'usmsProductInventory',
          component: UsmsProductInventory
        }

      ]
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
})
