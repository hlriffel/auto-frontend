import Vue from 'vue';
import VueRouter from 'vue-router';

import user from '@/shared/user.js';

import Login from '@/components/login/Login';
import MainComponent from '@/components/main/MainComponent';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/main' },
  { path: '/login', component: Login },
  { path: '/main', component: MainComponent,
    children: [
      { path: 'trocar-categoria' },
      { path: 'autoavaliacao' },
      { path: 'resultados' },
      { path: 'cadastros' },
      { path: 'introducao' }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(
  (to, from, next) => {
    if (to.path === '/login') {
      next();
    }
    if (user.email) {
      next();
    } else {
      const userData = window.$cookies.get('userData');

      if (userData) {
        user.setUserData(userData);

        next();
      } else {
        next('/login');
      }
    }
  }
);

export default router;
