<template>
  <div id="cadastro-licao">
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
    <modal-licao v-show="showForm"
            :licaoEditar="licaoAtual"
            @close="showForm = false"
            @save="salvar">
    </modal-licao>
  </div>
</template>

<script>
import axios from "axios";

import toastFactory from "@/shared/toastFactory.js";

import ModalLicao from "./ModalLicao";

export default {
  components: {
    ModalLicao
  },
  data() {
    return {
      searchOptions: {
        enabled: true,
        placeholder: "Procurar lição"
      },
      paginationOptions: {
        enabled: true,
        nextLabel: "Próximo",
        prevLabel: "Voltar",
        rowsPerPageLabel: "Registros por página",
        ofLabel: "de",
        pageLabel: "página",
        allLabel: "Todos",
        enabled: true,
        perPage: 10
      },
      licaoAtual: null,
      showForm: false,
      columns: [
        {
          label: "Nome",
          field: "nome"
        },
        {
          label: "Categoria",
          field: "categoria.nome"
        },
        {
          label: "Característica",
          field: "caracteristica.nome"
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
      axios.get(ENDPOINT_URL + "/licao").then(response => {
        this.rows = response.data;
      });
    },
    salvar(licao) {
      this.showForm = false;

      axios.post(ENDPOINT_URL + "/licao", licao).then(() => {
        this.index();
      });
    },
    editar(row) {
      this.showForm = true;

      //Montando e moldando o objeto para mandar pro modal quando editar
      this.licaoAtual = {
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
        axios.delete(ENDPOINT_URL + "/licao/" + row).then(
          () => {
            toast.goAway(0);
            this.index();
          },
          () => {
            toast.goAway(0);
            toastFactory.showPrimaryToast(
              "Não é possível excluir essa lição. Ela está sendo usada para outros cadastros."
            );
          }
        );
      };
      const negativeCallback = (e, toast) => {
        toast.goAway(0);
      };

      toastFactory.showConfirmToast(
        "Deseja excluir a lição?",
        positiveCallback,
        negativeCallback
      );
    },
    novo() {
      this.licaoAtual = {
        id: null,
        nome: "",
        categoria: null,
        caracteristica: null
      };

      this.showForm = true;
    }
  }
};
</script>

<style>
</style>
