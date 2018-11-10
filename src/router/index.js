import Vue from 'vue';
import VueRouter from 'vue-router';

import user from '@/shared/user.js';

import Login from '@/components/login/Login';
import MainComponent from '@/components/main/MainComponent';
import SelecionarCategorias from '@/components/main/selecionar-categorias/SelecionarCategorias';

import Cadastros from '@/components/main/cadastros/Cadastros';
import CadastrarCategoria from '@/components/main/cadastros/categoria/CadastrarCategoria';
import CadastroConteudo from '@/components/main/cadastros/conteudo/CadastroConteudo';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/main' },
  { name: 'login', path: '/login', component: Login },
  { name: 'main', path: '/main', component: MainComponent,
    children: [
      { name: 'selecionar-categorias', path: 'selecionar-categorias', component: SelecionarCategorias },
      { name: 'autoavaliacao', path: 'autoavaliacao' },
      { name: 'resultados', path: 'resultados' },
      { name: 'introducao', path: 'introducao' },
      { name: 'cadastros', path: 'cadastros', component: Cadastros,
        children: [
          { name: 'categoria', path: 'categoria', component: CadastrarCategoria },
          { name: 'caracteristica', path: 'caracteristica' },
          { name: 'questionario', path: 'questionario' },
          { name: 'licao', path: 'licao' },
          { name: 'conteudo', path: 'conteudo', component: CadastroConteudo }
        ]
      }
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
