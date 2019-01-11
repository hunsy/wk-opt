import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { Login, Page404, Dashboard, NavSelPage } from '../views/common'
import Layout from '../views/layout/layout'
import { AppsManager, AdminsManager } from '../views/sm'

/**
 * 路由映射
 */
export default new Router({
  mode: 'history',
  routes: [
    {
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
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/appsManager',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'appsManager',
          component: AppsManager
        }
      ]
    },
    {
      path: '/auth',
      component: Layout,
      children: [
        {
          path: '/adminsManager',
          name: 'adminsManager',
          component: AdminsManager
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
