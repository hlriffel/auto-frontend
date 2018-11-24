<template>
  <div id="cadastro-caracteristica">
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="searchOptions"
      :pagination-options="paginationOptions">
      <template slot="table-row" slot-scope="props" >
        {{ props.formattedRow[props.column.field] }}
        <div class="level-item" v-if="props.column.field === 'rota'">
          <button class="button is-link" @click="proximoCadastro(props.row.id)">
            <span class="icon is-medium">
              <i class="fas fa-angle-right"></i>
            </span>
          </button>
        </div>
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
    <modal-caracteristica v-show="showForm"
            :caracteristicaEditar="caracteristicaAtual"
            @close="showForm = false"
            @save="salvar">
    </modal-caracteristica>
  </div>
</template>

<script>
import axios from "axios";

import toastFactory from "@/shared/toastFactory.js";

import ModalCaracteristica from "./ModalCaracteristica";

export default {
  components: {
    ModalCaracteristica
  },
  data() {
    return {
      searchOptions: {
        enabled: true,
        placeholder: "Procurar características"
      },
      paginationOptions: {
        enabled: true,
        nextLabel: "Próximo",
        prevLabel: "Voltar",
        rowsPerPageLabel: "Registros por página",
        ofLabel: "de",
        pageLabel: "página",
        allLabel: "Todos",
        perPage: 10
      },
      caracteristicaAtual: null,
      showForm: false,
      columns: [
        {
          label: "Informar característica",
          field: "nome"
        },
        {
          label: "Observação",
          field: "observacao"
        },
        {
          label: "",
          field: "rota",
          type: "rota"
        },
        {
          label: "",
          field: "excluir",
          type: "excluir"
        },
        {
          label: "",
          field: "editar",
          type: "editar"
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
      axios.get(ENDPOINT_URL + "/caracteristica").then(response => {
        this.rows = response.data;
      });
    },
    salvar(caracteristica) {
      this.showForm = false;

      axios.post(ENDPOINT_URL + "/caracteristica", caracteristica).then(() => {
        this.index();
      });
    },
    editar(row) {
      this.showForm = true;
      this.caracteristicaAtual = row;
    },
    excluir(row) {
      const positiveCallback = (e, toast) => {
        axios.delete(ENDPOINT_URL + "/caracteristica/" + row).then(
          () => {
            toast.goAway(0);
            this.index();
          },
          () => {
            toast.goAway(0);
            toastFactory.showPrimaryToast(
              "Não é possível excluir essa característica. Ela está sendo usada para outros cadastros."
            );
          }
        );
      };
      const negativeCallback = (e, toast) => {
        toast.goAway(0);
      };

      toastFactory.showConfirmToast(
        "Deseja excluir a característica?",
        positiveCallback,
        negativeCallback
      );
    },
    novo() {
      this.caracteristicaAtual = {
        id: null,
        nome: "",
        observacao: ""
      };
      this.showForm = true;
    },
    proximoCadastro(caracteristicaId) {
      const customActions = [
        {
          text: 'AUTOAVALIAÇÃO',
          onClick: (e, toast) => {
            toast.goAway(0);

            this.$router.push({
              name: 'questionario',
              query: {
                ...this.$route.query,
                caracteristicaId
              }
            });
          }
        },
        {
          text: 'LIÇÃO',
          onClick: (e, toast) => {
            toast.goAway(0);

            this.$router.push({
              name: 'licao',
              query: {
                ...this.$route.query,
                caracteristicaId
              }
            });
          }
        }
      ];

      toastFactory.showToastWithCustomActions('Para qual cadastro você deseja prosseguir?', customActions);
    }
  }
};
</script>

<style>
</style>
