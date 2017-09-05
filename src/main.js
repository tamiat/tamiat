// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import App from './App';
import router from './router';

// import external stylesheets
import fontAwesome from '../node_modules/font-awesome/css/font-awesome.css';
import bulma from '../node_modules/bulma/css/bulma.css';

// import the rich text editor plugin
import VueQuillEditor from 'vue-quill-editor';

Vue.config.productionTip = false;

Vue.use(VueFire);
Vue.use(VueQuillEditor);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
