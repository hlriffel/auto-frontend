<template>
  <div>
      <div id="cadastros">
    <h1 class="title">Cadastros</h1>
    <bread-crumb></bread-crumb>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{enabled: true}"
      :pagination-options="{
      enabled: true,
      nextLabel: 'Próximo',
      prevLabel: 'Voltar',
      rowsPerPageLabel: 'Registros por página',
      ofLabel: 'de',
      pageLabel: 'page', // for 'pages' mode
      allLabel: 'All',
      enabled: true, perPage: 10
  }">
      <template slot="table-row" slot-scope="props" >
        {{props.formattedRow[props.column.field]}} 
        <div class="level-item" v-if="props.column.field === 'excluir/editar'">
            <button class="button is-link" @click="excluir(props.row.id)">Excluir</button>
            <button class="button is-link" @click="editar(props.row)">Editar </button>  
        </div>
        </template>
    </vue-good-table>

  <br>
    <div class="level-right">
      <button class="button is-link" @click="novo()">Adicionar</button>     
    </div>
  <br/>
   <modal-categoria v-show="showForm"
            :categoriaEditar="categoriaAtual"
            @close="showForm = false"
            @save="salvar">
     </modal-categoria>
  </div>
  </div>
  
</template>

<script>
import ModalCategoria from "../modal/ModalCategoria";
import BreadCrumb from '../breadCrumb/BreadCrumb';
import axios from 'axios';

export default {
  components: {
    ModalCategoria,
    BreadCrumb
  },
  name: "my-component",
  data() {
    return {
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
          field: "excluir/editar",
          type: "excluir/editar"
        }
      ],
      rows: [
       
      ]
    };
  },
   mounted() {


  },
  methods: {
    salvar(categoria) {
      let c = Object.assign({}, categoria)
      this.rows.push(c)
      this.showForm = false

      axios.post(ENDPOINT_URL + '/categoria', categoria).then(
          () => {
            this.$router.push({
              path: '/main/selecionar-categorias'
            });
          }
        );
    },
    
    excluir(id) {
      if (confirm("Deseja excluir a categoria?")) {
        const rowId = this.rows.indexOf(id);
        this.rows.splice(rowId, 1);
      }
    },
    editar(row){
      this.showForm = true
      this.categoriaAtual = row
    },
    novo() {
      this.categoriaAtual = {
        nome: ''
      }
      this.showForm = true
    }
  }
};
</script>