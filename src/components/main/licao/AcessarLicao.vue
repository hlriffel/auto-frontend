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
                <button class="button is-link" >
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
import axios from 'axios';

import toastFactory from '@/shared/toastFactory.js';


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
      
    
      let endpoint = ENDPOINT_URL + '/licao';
  
      
      endpoint += '/'+this.$route.params.categoria;
      endpoint += '/'+this.$route.params.caracteristica;

      axios.get(endpoint).then(response => {
        this.rows = response.data;
      });
    }
  }
};
</script>

<style>
</style>
