<template>
  <div id="cpf" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <form @submit.prevent="save">
        <header class="modal-card-head">
          <p class="modal-card-title">Informar CPF</p>
          <button class="delete" aria-label="close" @click="close()"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="cpf" class="label">CPF</label>
            <div class="control">
              <input type="text" name="cpf" id="cpf" class="input" v-model="cpf" v-mask="'###.###.###-##'" required>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot" style="justify-content: flex-end;">
          <button type="submit" class="button is-link is-pulled-right">Salvar</button>          
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cpf: null
    }
  },
  methods: {
    save() {
      this.$emit('save', this.cpf);
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style>

</style>
