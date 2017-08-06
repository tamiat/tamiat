import Vue from 'vue'
import Router from 'vue-router'

import Home from '../Home'
import Admin from '../Admin'

import Settings from '../components/Settings'

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
      component: Admin,
      children: [
        {
          path: 'settings',
          component: Settings
        }
      ]
    },
    {
      path: '*',
      name: 'default',
      component: Home
    }
  ]
})
