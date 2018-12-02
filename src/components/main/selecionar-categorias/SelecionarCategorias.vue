<template>
  <div id="selecionar-categorias">
    <h1 class="title">Selecionar categorias</h1>
    <section id="categories" class="section">
      <table class="table">
        <thead>
          <tr>
            <th>Selecionar</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          <tr class="field" v-for="category in categories" :key="category.id">
            <td>
              <label class="checkbox">
                <input type="checkbox" name="selected" id="selected" v-model="category.selected">
              </label>
            </td>
            <td>{{ category.nome }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <div id="salvar">
      <button class="button is-link is-pulled-right" @click="save()">Salvar</button>
    </div>
  </div>
</template>

<script>
import requestService from '@/shared/requestService.js';
import user from '@/shared/user.js';
import toastFactory from '@/shared/toastFactory.js';

export default {
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    requestService.get('/categoria').then(
      categoriesResponse => {
        categoriesResponse.data.forEach(
          category => {
            this.categories.push(Object.assign(category, { selected: false }));
          }
        );

        requestService.get('/usuario-categoria/' + user.id).then(
          userCategoriesResponse => {

            userCategoriesResponse.data.forEach(
              userCategory => {

                const categoryToSelect = this.categories.find(
                  category => {
                    return category.id === userCategory.categoria.id;
                  }
                );

                categoryToSelect.selected = true;
              }
            );
          }
        );
      }
    );
  },
  methods: {
    save() {
      const selectedCategories = this.categories.filter(
        category => {
          return category.selected;
        }
      );

      if (selectedCategories.length) {
        const data = {
          usuario: user.getUserAsBackendObject(),
          categorias: selectedCategories
        };

        requestService.post('/usuario-categoria', data).then(
          () => {
            this.$router.push({
              path: '/main/autoavaliacao'
            });
          }
        );
      } else {
        toastFactory.showPrimaryToast('É necessário selecionar pelo menos uma categoria!');
      }
    }
  }
}
</script>

<style>

</style>

