<template>
  <div id="menu">
    <aside class="menu">
      <div id="user-data">
        <div class="has-text-centered">
          <figure class="avatar">
            <img :src="profileData.imageUrl" alt="User image">
          </figure>
          <p class="title">{{ profileData.name }}</p>
          <p class="sub-title">{{ profileData.email }}</p>
        </div>
      </div>
      <hr>  
      <div id="action-bar">
        <p class="menu-label">
          Geral
        </p>
        <ul class="menu-list">
          <router-link tag="li" to="trocar-categoria" class="menu-item" append>
            <a>Trocar categoria</a>
          </router-link>
          <router-link tag="li" to="autoavaliacao" class="menu-item" append>
            <a>Autoavaliação</a>
          </router-link>
          <router-link tag="li" to="resultados" class="menu-item" append>
            <a>Resultados</a>
          </router-link>
        </ul>

        <div id="admin-section" v-if="profileData.admin">
          <p class="menu-label" style="margin-top: 1em">
            Administração
          </p>
          <ul class="menu-list">
            <router-link tag="li" to="cadastros" class="menu-item" append>
              <a>Cadastros</a>
            </router-link>
          </ul>
        </div>

        <p class="menu-label">
          Outras ações
        </p>
        <ul class="menu-list">
          <router-link tag="li" to="introducao" class="menu-item" append>
            <a>Ver introdução</a>
          </router-link>
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
import axios from 'axios';

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

      axios.post(ENDPOINT_URL + '/user', user.getUserAsBackendObject());
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
