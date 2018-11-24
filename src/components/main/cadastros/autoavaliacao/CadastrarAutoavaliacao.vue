<template>
  <div id="cadastro-categoria">
    <vue-good-table
      :columns="columns"
      :rows="rows"
         :search-options="searchOptions"
      :pagination-options="paginationOptions">
      <template slot="table-row" slot-scope="props" >
        {{ props.formattedRow[props.column.field] }}
        <div class="level-item" v-if="props.column.field === 'excluir'">
          <button class="button is-link" @click="excluir(props.row)">Excluir</button>   
        </div>
        <div class="level-item" v-if="props.column.field === 'editar'">
          <button class="button is-link" @click="editar(props.row)">Editar</button> 
        </div>
      </template>
    </vue-good-table>
    <br>
    <div class="level-right">
      <button class="button is-link" @click="novo()">Adicionar</button>     
    </div>
    <br>
    <modal-autoavaliacao v-show="showForm"
            :questionarioEditar="questionarioAtual"
            @close="showForm = false"
            @save="salvar">
    </modal-autoavaliacao>
  </div>
</template>

<script>
import axios from 'axios';
import toastFactory from '@/shared/toastFactory.js';
import ModalAutoavaliacao from "./ModalAutoavaliacao";

export default {
  components: {
    ModalAutoavaliacao
  },
  data() {
    return {
      searchOptions: {
        enabled: true,
        placeholder: 'Procurar autoavaliação'
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
      questionarioAtual: null,
      showForm: false,
      columns: [
        {
          label: 'Pergunta',
          field: 'nome'
        },
        {
          label: 'Categoria',
          field: 'categoria.nome'
        },
        {
          label: 'Característica',
          field: 'caracteristica.nome'
        },
        {
          label: '',
          field: 'excluir',
          type: 'excluir'
        },
        {
          label: '',
          field: 'editar',
          type: 'editar'
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
      let endpoint = ENDPOINT_URL + '/questionario';

      if (Object.keys(this.$route.query).length) {
        endpoint += this.$route.fullPath.substring(this.$route.fullPath.indexOf('?'));
      }

      axios.get(endpoint).then(response => {
        this.rows = response.data;
      });
    },
    salvar(autoavaliacao) {
      this.showForm = false;

      axios.post(ENDPOINT_URL + '/questionario', autoavaliacao).then(() => {
        this.index();
      });

    },
    editar(row) {
      this.showForm = true;      
      //Montando e moldando o objeto para mandar pro modal quando editar 
      this.questionarioAtual = {
        id: row.id,
        nome: row.nome,
        caracteristica: {
          id: row.caracteristica.id
        },
        categoria: {
          id: row.categoria.id
        }
      };

    },
    excluir(row) {
      const positiveCallback = (e, toast) => {
        axios.delete(ENDPOINT_URL + '/questionario/' + row.id).then(
          () => {
            toast.goAway(0);
            this.index();
          },
          () => {
            toast.goAway(0);
            toastFactory.showPrimaryToast('Não é possível excluir essa autoavaliação. Ela está sendo usada para outros cadastros.');
          }
        );
      };
      const negativeCallback = (e, toast) => {
        toast.goAway(0);
      };

      toastFactory.showConfirmToast('Deseja excluir a autoavaliação?', positiveCallback, negativeCallback);
    },
    novo() {
      this.questionarioAtual = {
        id: null,
        nome: '',
        caracteristica: null,
        categoria: null
      };

      if (this.$route.query.categoriaId) {
        this.questionarioAtual.categoria = {
          id: this.$route.query.categoriaId
        }
      }

      if (this.$route.query.caracteristicaId) {
        this.questionarioAtual.caracteristica = {
          id: this.$route.query.caracteristicaId
        }
      }

      this.showForm = true;
    }
  }
}
</script>

<style>

</style>
