<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Informar Característica</p>
        <button class="delete" aria-label="close" @click="close()"></button>
      </header>
      <form @submit.prevent="save">
        <section class="modal-card-body">
          <div class="field">
            <label for="nome" class="label">Característica</label>
            <input type="text" v-model="caracteristica.nome" required class="input" id="nome"/>  
          </div>
          <div class="field">
            <label for="descricao" class="label">Descrição</label>
            <textarea v-model="caracteristica.descricao" required class="textarea has-fixed-size" id="descricao"></textarea>       
          </div>
        </section>
        <footer class="modal-card-foot" style="justify-content: flex-end">
          <div class="level-right">
            <button type="submit" class="button is-link is-pulled-right">Salvar</button>
          </div>
        </footer>
      </form>
    </div>
  </div>    
</template>

<script>
export default {
  props: {
    caracteristicaEditar: Object
  },
  mounted() {},
  data() {
    return {
      caracteristica: {
        id: null,
        nome: '',
        descricao: ''
      }
    };
  },
  methods: {
    save() {
      this.$emit('save', this.caracteristica);
    },
    close() {
      this.$emit('close');
    }
  },
  watch: {
    caracteristicaEditar: function(val) {
      this.caracteristica = val;
    }
  }
}
</script>

<style>
</style>
