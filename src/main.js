// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import App from './App';
import Vuetify from 'vuetify'

import router from './router'
import store from './store'

// import external stylesheets
import fontAwesome from '../node_modules/font-awesome/css/font-awesome.css';

// import the rich text editor plugin
import VueQuillEditor from 'vue-quill-editor';

import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false;

Vue.use(VueFire);
Vue.use(VueQuillEditor);
Vue.use(Vuetify)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
