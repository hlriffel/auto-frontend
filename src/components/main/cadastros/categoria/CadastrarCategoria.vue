<template>
  <div id="cadastro-categoria">
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{enabled: true}"
      :pagination-options="paginationOptions">
      <template slot="table-row" slot-scope="props" >
        {{ props.formattedRow[props.column.field] }}
        <div class="level-item" v-if="props.column.field === 'excluir/editar'">
          <button class="button is-link" @click="excluir(props.row.id)">Excluir</button> 
          <button class="button is-link" @click="editar(props.row)">Editar</button>  
        </div>
      </template>
    </vue-good-table>
    <br>
    <div class="level-right">
      <button class="button is-link" @click="novo()">Adicionar</button>     
    </div>
    <br>
    <modal-categoria v-show="showForm"
            :categoriaEditar="categoriaAtual"
            @close="showForm = false"
            @save="salvar">
    </modal-categoria>
  </div>
</template>

<script>
import axios from 'axios';

import ModalCategoria from './ModalCategoria';

export default {
  components: {
    ModalCategoria
  },
  data() {
    return {
      paginationOptions: {
        enabled: true,
        nextLabel: 'Próximo',
        prevLabel: 'Voltar',
        rowsPerPageLabel: 'Registros por página',
        ofLabel: 'de',
        pageLabel: 'página',
        allLabel: 'Todos',
        enabled: true,
        perPage: 10
      },
      categoriaAtual: null,
      showForm: false,
      columns: [
        {
          label: 'Informar Categoria',
          field: 'nome'
        },
        {
          label: '',
          field: 'rota',
          type: 'rota'
        },
        {
          label: '',
          field: 'excluir/editar',
          type: 'excluir/editar'
        }
      ],
      rows: []
    };
  },
  mounted() {
    axios.get(ENDPOINT_URL + '/categoria').then(response => {
      this.rows = response.data;
    });
  },
  methods: {
    salvar(categoria) {
      const c = Object.assign({}, categoria);
      this.rows.push(c);
      this.showForm = false;

      axios.post(ENDPOINT_URL + '/categoria', categoria).then(() => {
        this.$router.push({
          path: '/main/cadastrarCategoria'
        });
      });
    },
    editar(row) {
      this.showForm = true;
      this.categoriaAtual = row;

      if (row.id === null) {
        axios.post(ENDPOINT_URL + '/categoria', row);
      } else {
        //Update
        axios.put(ENDPOINT_URL + '/categoria', row.id);
      }
    },
    excluir(row) {
      if (confirm('Deseja excluir a categoria?')) {
        axios
          .delete(ENDPOINT_URL + '/categoria', row.id)
          .then(Response => {
            let rowId = this.rows.indexOf(row);
            this.rows.splice(idx, 1);
          })
          .catch(erro => {
            console.log(erro);
          });
      }
    },
    novo() {
      this.categoriaAtual = {
        nome: ''
      };
      this.showForm = true;
    }
  }
}
</script>

<style>

</style>
