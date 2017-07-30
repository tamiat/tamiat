import Vue from 'vue'
import Router from 'vue-router'

import Home from '../Home'
import Admin from '../Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '*',
      name: 'default',
      component: Home
    }
  ]
})
