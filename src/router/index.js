import Vue from 'vue';
import VueRouter from 'vue-router';

import requestService from '@/shared/requestService.js';
import user from '@/shared/user.js';

import Login from '@/components/login/Login';
import MainComponent from '@/components/main/MainComponent';
import Introducao from '@/components/intro/Introducao';
import VisualizarConteudo from '@/components/main/visualizar-conteudo/VisualizarConteudo';
import SelecionarCategorias from '@/components/main/selecionar-categorias/SelecionarCategorias';
import Autoavaliacao from '@/components/main/autoavaliacao/Autoavaliacao';
import Resultados from '@/components/main/resultados/Resultados';
import AcessarLicao from '@/components/main/licao/AcessarLicao';

import Cadastros from '@/components/main/cadastros/Cadastros';
import CadastrarCategoria from '@/components/main/cadastros/categoria/CadastrarCategoria';
import CadastrarConteudo from '@/components/main/cadastros/conteudo/CadastrarConteudo';
import CadastrarCaracteristica from '@/components/main/cadastros/caracteristica/CadastrarCaracteristica';
import CadastrarLicao from '@/components/main/cadastros/licao/CadastrarLicao';
import CadastrarAutoavaliacao from '@/components/main/cadastros/autoavaliacao/CadastrarAutoavaliacao';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/main' },
  { name: 'login', path: '/login', component: Login },
  { name: 'main', path: '/main', component: MainComponent,
    children: [
      { name: 'selecionar-categorias', path: 'selecionar-categorias', component: SelecionarCategorias },
      { name: 'autoavaliacao', path: 'autoavaliacao', component: Autoavaliacao },
      { name: 'resultados', path: 'resultados', component: Resultados },
      { name: 'licoes', path: 'licoes/:categoria/:caracteristica', component: AcessarLicao, props: true },
      { name: 'introducao', path: 'introducao', component: Introducao },
      { name: 'visualizar-conteudo', path: 'visualizarConteudo', component: VisualizarConteudo },
      { name: 'cadastros', path: 'cadastros', component: Cadastros, redirect: '/main/cadastros/categoria',
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
        if (requestService.isAuthorized()) {
          user.setUserData(userData);

          next();
        } else {
          requestService.login(userData.idToken).then(
            () => {
              user.setUserData(userData);

              next();
            },
            () => {
              next('/login');
            }
          );
        }
      } else {
        next('/login');
      }
    }
  }
);

export default router;
