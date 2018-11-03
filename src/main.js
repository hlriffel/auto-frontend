import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '../node_modules/bulma/css/bulma.min.css';
import VueCookies from 'vue-cookies';
import GSignInButton from 'vue-google-signin-button';

import { VueMaskDirective } from 'v-mask';

Vue.config.productionTip = false;
Vue.use(GSignInButton);
Vue.use(VueCookies);

Vue.directive('mask', VueMaskDirective);

window.ENDPOINT_URL = 'https://auto-backend.herokuapp.com';

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
