<template>
  <div id="main" class="container">
    <div class="columns">
      <div class="column is-2">
        <side-menu></side-menu>
      </div>
      <div class="column" id="content">

      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/main/side-menu/SideMenu';

export default {
  components: {
    SideMenu
  }
}
</script>

<style>

</style>
