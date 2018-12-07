<template>
  <div id="acessar-licao">
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="searchOptions"
      :pagination-options="paginationOptions">
      <template slot="table-row" slot-scope="props" >
      {{ props.formattedRow[props.column.field] }}
        <div class="level-item" v-if="props.column.field === 'rota'">
          <button class="button is-link" @click="verConteudos(props.row.id)">
            <span class="icon is-medium">
              <i class="fas fa-angle-right"></i>
            </span>
          </button>   
        </div>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import requestService from '@/shared/requestService.js';

export default {
  data() {
    return {
      searchOptions: {
        enabled: true,
        placeholder: 'Procurar lição'
      },
      paginationOptions: {
        enabled: true,
        nextLabel: 'Próximo',
        prevLabel: 'Voltar',
        rowsPerPageLabel: 'Registros por página',
        ofLabel: 'de',
        pageLabel: 'página',
        allLabel: 'Todos',
        perPage: 10
      },
      showForm: false,
      columns: [
        {
          label: 'Nome',
          field: 'nome'
        },
        {
          label: '',
          field: 'rota',
          type: 'rota'
        }
      ],
      rows: []
    };
  },
  mounted() {
    this.index();
  },
  methods: {
    index() {
      let endpoint = '/licao';
      endpoint += '/' + this.$route.params.categoria;
      endpoint += '/' + this.$route.params.caracteristica;

      requestService.get(endpoint).then(response => {
        this.rows = response.data;
      });
    },
    verConteudos(licaoId) {
      this.$router.push({
        path: '/main/visualizar-conteudo/' + licaoId
      });
    }
  }
};
</script>

<style>
</style>
