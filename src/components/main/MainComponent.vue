<template>
  <div id="main">
    <div class="columns">
      <div class="column is-2">
        <section class="section">
          <side-menu></side-menu>
        </section>
      </div>
      <div class="is-divider-vertical"></div>
      <div class="column" id="content">
        <section class="section">
          <router-view></router-view>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from './side-menu/SideMenu';
import CadastrarCategoria from './cadastrarCategoria/CadastrarCategoria';
import BreadCrumb from './breadCrumb/BreadCrumb';

export default {
  components: {
    SideMenu,
    CadastrarCategoria,
    BreadCrumb
    
  }
}
</script>

<style>

</style>
