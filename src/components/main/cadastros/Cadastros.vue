<template>
  <div id="cadastros">
    <h1 class="title">Cadastros</h1>
    <bread-crumb></bread-crumb>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import BreadCrumb from './breadcrumb/BreadCrumb';

export default {
  components: {
    BreadCrumb
  }
}
</script>

<style>

</style>
