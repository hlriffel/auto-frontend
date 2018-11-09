<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Informar Categoria</p>
   <button class="delete" aria-label="close" @click="close()"></button>
    </header>
        <form @submit.prevent="save">
        <section class="modal-card-body">
            <!-- Content ... -->
            <div class="field">
               <label for="nomeCategoria" class="label">Categoria</label>
                <input type="text" v-model="categoria.name" required class="input" id="nomeCategoria"/>  
            </div>
        </section>
               <footer class="modal-card-foot" style="justify-content: flex-end" >
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
      categoriaEditar: Object
  },
  mounted() {},
  data() {
    return {
      categoria: {
        nomeCategoria: ''
      }
    }
  },
  methods: {
    save() {
      this.$emit('save', this.categoria);
      console.log(this.nomeCategoria)
    },
    close() {
      this.$emit('close');
    },
  },
  watch: {
    categoriaEditar: function (val) {
      this.categoria = val;
    }
  }

}
</script>

<style>

</style>
