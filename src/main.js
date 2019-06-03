import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueFire from 'vuefire'
import VueQuillEditor from 'vue-quill-editor'
import Notifications from 'vue-notification'

// import external stylesheets
import 'font-awesome/css/font-awesome.min.css'

// import vue-quill-editor styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from '@/admin/store'

Vue.use(VueFire)
Vue.use(VueQuillEditor)
Vue.use(Notifications)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
