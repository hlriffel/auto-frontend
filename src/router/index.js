import Vue from 'vue';
import VueRouter from 'vue-router';

import user from '@/shared/user.js';

import Login from '@/components/login/Login';
import MainComponent from '@/components/main/MainComponent';
import SelecionarCategorias from '@/components/main/selecionar-categorias/SelecionarCategorias';
import Autoavaliacao from '@/components/main/autoavaliacao/Autoavaliacao';

import Cadastros from '@/components/main/cadastros/Cadastros';
import CadastrarCategoria from '@/components/main/cadastros/categoria/CadastrarCategoria';
import CadastrarConteudo from '@/components/main/cadastros/conteudo/CadastrarConteudo';
import CadastrarCaracteristica from '@/components/main/cadastros/caracteristica/CadastrarCaracteristica';
import CadastrarLicao from '@/components/main/cadastros/licao/CadastrarLicao';
import CadastrarAutoavaliacao from '@/components/main/cadastros/autoavaliacao/CadastrarAutoavaliacao';
import Introducao from '@/components/intro/introducao';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/main' },
  { name: 'login', path: '/login', component: Login },
  { name: 'main', path: '/main', component: MainComponent,
    children: [
      { name: 'selecionar-categorias', path: 'selecionar-categorias', component: SelecionarCategorias },
      { name: 'autoavaliacao', path: 'autoavaliacao', component: Autoavaliacao },
      { name: 'resultados', path: 'resultados' },
      { name: 'introducao', path: 'introducao', component: Introducao },
      { name: 'cadastros', path: 'cadastros', component: Cadastros,
        children: [
          { name: 'categoria', path: 'categoria', component: CadastrarCategoria },
          { name: 'caracteristica', path: 'caracteristica', component: CadastrarCaracteristica },
          { name: 'questionario', path: 'questionario', component: CadastrarAutoavaliacao},
          { name: 'licao', path: 'licao', component: CadastrarLicao },
          { name: 'conteudo', path: 'conteudo', component: CadastrarConteudo }
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
