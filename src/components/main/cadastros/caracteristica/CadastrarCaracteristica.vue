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
          label: 'Observação',
          field: 'observacao'
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
    this.index()
  },
  methods: {
    index(){
      axios.get(ENDPOINT_URL + '/caracteristica').then(response => {
        this.rows = response.data;
      })
    },
    salvar(caracteristica) {
      const c = Object.assign({}, caracteristica);
      
      axios.post(ENDPOINT_URL + '/caracteristica', c).then(() => {
        this.$router.push({
          path: '/main/cadastros/caracteristica'
        });
        
        this.showForm = false;
        this.index();
      });

    },
    editar(row) {
      this.showForm = true;
      this.caracteristicaAtual = row;    
    },
    excluir(row) {
      if (confirm('Deseja excluir a caracteristica?')) {
        axios
          .delete(ENDPOINT_URL + '/caracteristica/' + row)
          .then(Response => {
            this.index();
          })
          .catch(erro => {
            console.log(erro);
          });
      }
    },
    novo() {
      this.caracteristicaAtual = {
        id: null,
        nome: '', 
        observacao: ''
      };
      this.showForm = true;
    }
  }
}
</script>

<style>

</style>
