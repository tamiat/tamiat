// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import VueQuillEditor from 'vue-quill-editor'

// import external stylesheets
import '../node_modules/font-awesome/css/font-awesome.css'
import '../node_modules/bulma/css/bulma.css'

// import vue-quill-editor styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from './admin/store'

Vue.use(VueFire) // activate vuefire plugin
Vue.use(VueQuillEditor) // activate vue-quill-editor
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
