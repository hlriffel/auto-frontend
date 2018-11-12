<template>
  <div id="cadastro-categoria">
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{enabled: true}"
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
    <modal-categoria v-show="showForm"
            :categoriaEditar="categoriaAtual"
            @close="showForm = false"
            @save="salvar">
    </modal-categoria>
  </div>
</template>

<script>
import axios from "axios";

import toastFactory from "@/shared/toastFactory.js";

import ModalCategoria from "./ModalCategoria";

export default {
  components: {
    ModalCategoria
  },
  data() {
    return {
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
      categoriaAtual: null,
      showForm: false,
      columns: [
        {
          label: "Informar Categoria",
          field: "nome"
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
    this.loadCategories();
  },
  methods: {
    loadCategories() {
      axios.get(ENDPOINT_URL + "/categoria").then(response => {
        this.rows = response.data;
      });
    },
    salvar(categoria) {
      this.showForm = false;

      axios.post(ENDPOINT_URL + "/categoria", categoria).then(() => {
        this.loadCategories();
      });
    },
    editar(row) {
      this.showForm = true;
      this.categoriaAtual = row;
    },
    excluir(row) {
      const positiveCallback = (e, toast) => {
        axios.delete(ENDPOINT_URL + "/categoria/" + row.id).then(
          () => {
            this.rows.splice(row.originalIndex, 1);
            toast.goAway(0);
          },
          () => {
            toast.goAway(0);
            toastFactory.showPrimaryToast(
              "Não é possível excluir esta categoria. Ela está sendo utilizada pelos usuários."
            );
          }
        );
      };
      const negativeCallback = (e, toast) => {
        toast.goAway(0);
      };

      toastFactory.showConfirmToast(
        "Deseja excluir a categoria?",
        positiveCallback,
        negativeCallback
      );
    },
    novo() {
      this.categoriaAtual = {
        nome: ""
      };
      this.showForm = true;
    }
  }
};
</script>

<style>
</style>
