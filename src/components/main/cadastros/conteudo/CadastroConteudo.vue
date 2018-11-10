<template>
  <div id="cadastro-conteudo">
    <section class="section" id="conteudo-main-section">
      <div class="columns is-vcentered">
        <div class="column is-1">
          <a class="button is-link is-large">
            <span class="icon is-medium">
              <i class="fas fa-angle-left"></i>
            </span>
          </a>
        </div>
        <div class="column is-10">
          <div class="hero is-light" id="cadastro-conteudo-main">
          </div>
        </div>
        <div class="column is-1">
          <a class="button is-link is-large">
            <span class="icon is-medium">
              <i class="fas fa-angle-right"></i>
            </span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conteudos: [],
      indexSelecionado: 0
    }
  },
  methods: {
    attachPdf() {

    },
    attachVideo() {

    }
  }
}
</script>

<style>
  #conteudo-main-section {
    height: 39em;
  }

  #cadastro-conteudo-main {
    height: 100%;
  }

  .columns {
    height: 100%;
  }

  .column.is-10 {
    height: 100%;
  }
</style>
