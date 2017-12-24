import Vue from 'vue'
import App from './App.vue'
import Uploader from './lib/index.js';
Vue.use(Uploader);
new Vue({
  el: '#app',
  render: h => h(App)
})
