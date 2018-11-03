<template>
  <div id="login">
    <section class="hero is-fullheight is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <article class="card is-rounded">
              <div class="card-content">
                <h1 class="title has-text-dark">Login</h1>
                <button class="button is-primary is-fullwidth">
                  <g-signin-button
                    :params="params"
                    @success="signInSuccess"
                    @error="signInError">
                    Entrar com uma conta Google
                  </g-signin-button>
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

import user from '@/shared/user.js';

export default {
  data() {
    return {
      params: {
        client_id: '1098028247547-7up3gsvjcav1ahb4v2fg5rt6icmvk7kn.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    getUserByEmail(email) {
      return axios.get(ENDPOINT_URL + '/user/' + email);
    },
    signUserUp(user) {
      const userParam = {
        email: user.email,
        name: user.name,
        admin: false
      };

      return axios.post(ENDPOINT_URL + '/user', userParam);
    },
    signInSuccess(googleUser) {
      const profile = googleUser.getBasicProfile();

      user.setName(profile.getName());
      user.setEmail(profile.getEmail());
      user.setImageUrl(profile.getImageUrl());

      const proceedToMain = () => {
        this.$cookies.set('userData', user.getUserAsObject());

        this.$router.push({
          path: '/main'
        });
      }

      this.getUserByEmail(user.email).then(
        response => {
          const userData = response.data;

          if (userData) {
            user.setId(userData.id);
            user.setCpf(userData.cpf);
            user.setAdmin(userData.admin);

            proceedToMain();
          }
        },
        error => {
          this.signUserUp(user.getUserAsBackendObject()).then(
            response => {
              const userData = response.data;

              if (userData) {
                user.setId(userData.id);
                user.setCpf(userData.cpf);
                user.setAdmin(userData.admin);
              }

              proceedToMain();
            },
            () => {
              // TODO: Do something
            }
          );
        }
      );
    },
    signInError(error) {
      // TODO: Do something here also
      console.log(error);
    }
  }
}
</script>

<style>

</style>
