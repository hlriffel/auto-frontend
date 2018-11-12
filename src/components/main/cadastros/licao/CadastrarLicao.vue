<template>
  <div id="cadastro-licao">
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
    <modal-licao v-show="showForm"
            :licaoEditar="licaoaAtual"
            @close="showForm = false"
            @save="salvar">
    </modal-licao>
  </div>
</template>

<script>
import axios from 'axios';

import toastFactory from '@/shared/toastFactory.js';

import ModalLicao from './ModalLicao';

export default {
  components: {
    ModalLicao
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
      licaoAtual: null,
      showForm: false,
      columns: [
        {
          label: 'Informar lição',
          field: 'nome'
        },
        {
          label: 'Observação',
          field: 'observacao'
        },
        {
          label: 'Categoria',
          field: 'categoria'
        },
        {
          label: 'Característica',
          field: 'caracteristica'
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
    this.index();
  },
  methods: {
    index() {
      axios.get(ENDPOINT_URL + '/licao').then(response => {
        this.rows = response.data;
      });
    },
    salvar(licao) {
      this.showForm = false;

      axios.post(ENDPOINT_URL + '/licao', licao).then(() => {
        this.index();
      });

    },
    editar(row) {
      this.showForm = true;
      this.licaoAtual = row;    
    },
    excluir(row) {
      const positiveCallback = (e, toast) => {
        axios.delete(ENDPOINT_URL + '/licao/' + row).then(
          () => {
            toast.goAway(0);
            this.index();
          },
          () => {
            toast.goAway(0);
            toastFactory.showPrimaryToast('Não é possível excluir essa lição. Ela está sendo usada para outros cadastros.');
          }
        );
      };
      const negativeCallback = (e, toast) => {
        toast.goAway(0);
      };

      toastFactory.showConfirmToast('Deseja excluir a lição?', positiveCallback, negativeCallback);
    },
    novo() {
      this.licaoAtual = {
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
