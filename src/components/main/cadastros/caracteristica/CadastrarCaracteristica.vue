<template>
  <div id="cadastro-caracteristica">
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
    <modal-caracteristica v-show="showForm"
            :caracteristicaEditar="caracteristicaAtual"
            @close="showForm = false"
            @save="salvar">
    </modal-caracteristica>
  </div>
</template>

<script>
import axios from 'axios';

import ModalCaracteristica from './ModalCaracteristica';

export default {
  components: {
    ModalCaracteristica
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
      caracteristicaAtual: null,
      showForm: false,
      columns: [
        {
          label: 'Informar Característica',
          field: 'nome'
        },
        {
          label: 'Descricao',
          field: 'descricao'
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
    axios.get(ENDPOINT_URL + '/caracteristica').then(response => {
      this.rows = response.data;
    });
  },
  methods: {
    salvar(caracteristica) {
      const c = Object.assign({}, caracteristica);
      this.rows.push(c);
      this.showForm = false;

      axios.post(ENDPOINT_URL + '/caracteristica', caracteristica).then(() => {
        this.$router.push({
          path: '/main/cadastros/caracteristica'
        });
      });
    },
    editar(row) {
      this.showForm = true;
      this.caracteristicaAtual = row;

      if (row.id === null) {
        axios.post(ENDPOINT_URL + '/caracteristica', row);
      } else {
        //Update
        axios.put(ENDPOINT_URL + '/caracteristica', row.id);
         this.$router.push({
          path: '/main/cadastros/caracteristica'
        });
      }
    },
    excluir(row) {
      if (confirm('Deseja excluir a caracteristica?')) {
        axios
          .delete(ENDPOINT_URL + '/caracteristica', row.id)
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
      this.caracteristicaAtual = {
        nome: ''
      };
      this.showForm = true;
    }
  }
}
</script>

<style>

</style>
