import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import App from './App.vue'
import JwPagination from 'jw-vue-pagination'

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// register jw pagination component globally
Vue.component('jw-pagination', JwPagination);

new Vue({
  render: h => h(App),
}).$mount('#app')
