// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

import '@/style/style.css' //global css

import App from './App'
import router from './router'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import { getToken } from '@/utils/auth'
import VueCodemirror from 'vue-codemirror'
// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/darcula.css'

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(ElementUI)
Vue.use(VueCodemirror)

import * as filters from './filters' // global filters
console.log("filters:", filters);

// register global utility filters.
Object.keys(filters).forEach(key => {
  console.log("key", key);
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

// //进行登录拦截
// router.beforeEach((to, from, next) => {
//   if (!getToken()) {
//     if (to.path != '/login') {
//       next('/login')
//     } else {
//       next()
//     }
//   } else {
//     if (to.path === '/login') {
//       next('/navSel')
//     } else {
//       // store.dispatch("GetAdminInfo").then(
//       //   d => {
//       //     console.log("获取管理员信息", d);
//       //   },
//       //   e => { }
//       // );
//       next()
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
