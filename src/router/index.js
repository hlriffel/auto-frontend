import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/components/login/Login';
import MainComponent from '@/components/main/MainComponent';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: Login },
  { path: '/main', component: MainComponent }
];

export default new VueRouter({
  routes
});