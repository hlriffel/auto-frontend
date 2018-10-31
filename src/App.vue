<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import MainComponent from '@/components/main/MainComponent';
import Login from '@/components/login/Login';

import userData from '@/shared/user.js';

export default {
  name: 'app',
  components: {
    MainComponent,
    Login
  },
  data() {
    return {
      userSignedIn: false
    }
  },
  mounted() {
    const userDataCookie = this.$cookies.get('userData');

    if (userDataCookie) {
      this.userSignedIn = true;

      for (const key in userDataCookie) {
        if (userDataCookie.hasOwnProperty(key)) {
          userData[key] = userDataCookie[key];
        }
      }

      this.$router.push({
        path: '/main'
      });
    } else {
      this.$router.push({
        path: '/login'
      });
    }
  }
}
</script>

<style>

</style>
