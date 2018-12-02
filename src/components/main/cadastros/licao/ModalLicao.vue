<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Informar lição</p>
        <button class="delete" aria-label="close" @click="close()"></button>
      </header>

      <form @submit.prevent="save">
        <section class="modal-card-body">
          <div class="field">
            <label for="nome" class="label">Lição</label>
            <input type="text" v-model="licao.nome" required class="input" id="nome"/>  
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label for="categoria" class="label">Categoria</label>
                <div class="select is-fullwidth">
                  <select v-model="licao.categoria" required id="categoria" >
                    <option v-for="c in categoria" :key="c.id" :value="{id: c.id}" >
                      {{c.nome}}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label for="caracteristica" class="label">Característica</label>
                <div class="select is-fullwidth">
                  <select v-model="licao.caracteristica" required id="caracteristica" >
                    <option v-for="cr in caracteristica" :key="cr.id" :value="{id: cr.id}">
                      {{cr.nome}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
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
import requestService from '@/shared/requestService.js';

export default {
  props: {
    licaoEditar: Object
  },
  data() {
    return {
      licao: {
        id: null,
        nome: '',
        categoria: null,
        caracteristica: null
      },
      categoria: [],
      caracteristica: []
    };
  },
  mounted() {
      requestService.get('/categoria').then(response => {
        this.categoria = response.data
      });
      requestService.get('/caracteristica').then(response => {
        this.caracteristica = response.data;
      });
  },
  methods: {
    save() {
      this.$emit('save', this.licao);
    },
    close() {
      this.$emit('close');
    }
  },
  watch: {
    licaoEditar: function(val) {
      this.licao = {
        ...val
      };
    }
  }
}
</script>

<style>
</style>
