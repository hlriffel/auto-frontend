<template>
  <div id="menu">
    <aside class="menu">
      <div id="user-data">
        <div class="has-text-centered">
          <figure class="avatar">
            <img :src="profileData.imageUrl" alt="User image">
          </figure>
          <p class="title">{{ profileData.name }}</p>
          <p>{{ profileData.email }}</p>
        </div>
      </div>
      <div class="is-divider"></div>
      <div id="action-bar">
        <p class="menu-label">
          Geral
        </p>
        <ul class="menu-list">
          <router-link tag="li" to="/main/selecionar-categorias" class="menu-item">
            <a :class="{ 'is-active': $route.name === 'selecionar-categorias' }">Selecionar categorias</a>
          </router-link>
          <router-link tag="li" to="/main/autoavaliacao" class="menu-item">
            <a :class="{ 'is-active': $route.name === 'autoavaliacao' }">Autoavaliação</a>
          </router-link>
          <router-link tag="li" to="/main/resultados" class="menu-item">
            <a :class="{ 'is-active': $route.name === 'resultados' }">Resultados</a>
          </router-link>
        </ul>

        <div id="admin-section" v-if="profileData.admin">
          <p class="menu-label" style="margin-top: 1em">
            Administração
          </p>
          <ul class="menu-list">
            <router-link tag="li" to="/main/cadastros" class="menu-item">
              <a :class="{ 'is-active': isRotaCadastros() }">Cadastros</a>
            </router-link>
          </ul>
        </div>

        <p class="menu-label">
          Outras ações
        </p>
        <ul class="menu-list">
          <router-link tag="li" to="/main/introducao" class="menu-item">
            <a :class="{ 'is-active': $route.name === 'introducao' }">Ver introdução</a>
          </router-link>
        </ul>
        <ul class="menu-list">
          <li><a @click="logout()">Sair</a></li>
        </ul>
      </div>
    </aside>
    <form-cpf
      v-if="!formCpfClosed"
      @close="formCpfClosed = true"
      @save="saveCpf"></form-cpf>
  </div>
</template>

<script>
import requestService from '@/shared/requestService.js';
import user from '@/shared/user.js';

import FormCpf from '../cpf/FormCpf';

export default {
  components: {
    FormCpf
  },
  data() {
    return {
      profileData: {
        name: null,
        email: null,
        imageUrl: null,
        admin: false
      },
      formCpfClosed: false
    }
  },
  mounted() {
    this.profileData.name = user.name;
    this.profileData.email = user.email;
    this.profileData.cpf = user.cpf;
    this.profileData.imageUrl = user.imageUrl;
    this.profileData.admin = user.admin;
    this.formCpfClosed = (this.profileData.cpf);

    if (!this.formCpfClosed) {
      this.$router.push({
        name: 'introducao'
      });
    }
  },
  methods: {
    logout() {
      user.clearUserData();
      this.$cookies.remove('userData');
      this.$router.push({
        path: '/login'
      });
    },
    saveCpf(cpf) {
      this.profileData.cpf = cpf;
      this.formCpfClosed = true;
      user.setCpf(cpf);
      this.$cookies.set('userData', user.getUserAsObject())
      requestService.post('/usuario', user.getUserAsBackendObject());
    },
    isRotaCadastros() {
      return this.$route.path.indexOf('cadastros') > -1;
    }
  }
}
</script>

<style>
  .avatar {
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
</style>