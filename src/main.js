// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'

// import external stylesheets
import fontAwesome from '../node_modules/font-awesome/css/font-awesome.css'
import bulma from '../node_modules/bulma/css/bulma.css'

Vue.config.productionTip = false

Vue.use(VueFire);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
