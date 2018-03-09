import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'
import dynamicRoutes from './dynamic-routes'

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  routes
})

dynamicRoutes.addDynamicRoutesTo(router)

export default router
