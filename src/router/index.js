import Vue from 'vue';
import VueRouter from 'vue-router';

import user from '@/shared/user.js';

import Login from '@/components/login/Login';
import MainComponent from '@/components/main/MainComponent';
import SelecionarCategorias from '@/components/main/selecionar-categorias/SelecionarCategorias';
import CadastrarCategoria from '@/components/main/cadastrarCategoria/CadastrarCategoria';

Vue.use(VueRouter);


const routes = [
  { path: '/', redirect: '/main' },
  { name: 'login', path: '/login', component: Login },
  { name: 'main', path: '/main', component: MainComponent,
    children: [
      { name: 'selecionar-categorias', path: 'selecionar-categorias', component: SelecionarCategorias },
      { name: 'autoavaliacao', path: 'autoavaliacao' },
      { name: 'resultados', path: 'resultados' },
      { name: 'cadastros', path: 'cadastros' },
      { name: 'introducao', path: 'introducao' },
      { name: 'cadastrarCategoria', path: 'cadastrarCategoria', component: CadastrarCategoria }
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
