import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '../node_modules/bulma/css/bulma.min.css';
import '../node_modules/bulma-divider/dist/css/bulma-divider.min.css';
import VueCookies from 'vue-cookies';
import GSignInButton from 'vue-google-signin-button';
import Toasted from 'vue-toasted';
import { VueMaskDirective } from 'v-mask';

import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';

Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.use(GSignInButton);
Vue.use(Toasted);
Vue.use(VueGoodTablePlugin);

Vue.directive('mask', VueMaskDirective);

window.ENDPOINT_URL = 'https://auto-backend.herokuapp.com';
// window.ENDPOINT_URL = 'http://localhost:8090';

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
