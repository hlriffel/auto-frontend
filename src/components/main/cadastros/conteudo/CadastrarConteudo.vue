<template>
  <div id="cadastro-conteudo">
    <div id="titulo">
      <p class="is-size-3" v-if="nomeLicao">Conteúdos da lição {{ nomeLicao }}</p>
      <p class="is-size-3" v-else>Conteúdos da introdução</p>
    </div>
    <section class="section" id="conteudo-main-section">
      <div class="columns is-vcentered">
        <div class="column is-1">
          <a class="button is-link is-large" @click="previousContent()">
            <span class="icon is-medium">
              <i class="fas fa-angle-left"></i>
            </span>
          </a>
        </div>
        <div class="column is-10">
          <div class="hero is-light" id="cadastro-conteudo-main">
            <input type="file" ref="file" accept=".pdf,.mpeg,.mp4" @change="addContent($event)" hidden>
            <a
              class="button is-large is-link"
              v-show="!contents[selectedContent] || !contents[selectedContent].key"
              @click="$refs.file.click()">Clique aqui para selecionar um vídeo ou PDF</a>

            <div v-if="contents[selectedContent] && contents[selectedContent].key">
              <h2 class="subtitle">{{ contents[selectedContent].key }}</h2>
              <a class="button is-danger" @click="removeContent()">Remover</a>
              <a class="button is-link" @click="downloadFile()" v-show="!contents[selectedContent].fileMetadata">Fazer download</a>
            </div>
          </div>
        </div>
        <div class="column is-1">
          <a class="button is-link is-large" @click="nextContent()">
            <span class="icon is-medium">
              <i class="fas fa-angle-right"></i>
            </span>
          </a>
        </div>
      </div>
    </section>
    <div>
      <p>Item {{ contents.length ? selectedContent + 1 : 0 }} de {{ contents.length }}</p>
    </div>
    <div id="salvar">
      <button
        class="button is-link is-pulled-right"
        @click="save()"
        v-show="!uploading"
        :disabled="!addedContents.length && !removedContents.length">Salvar</button>
      <a class="button is-link is-pulled-right is-loading" v-show="uploading">Salvar</a>
    </div>
  </div>
</template>

<script>
import requestService from '@/shared/requestService.js';

const APPLICATION_PDF = 'application/pdf';

export default {
  data() {
    return {
      contents: [],
      selectedContent: 0,
      uploading: false,
      addedContents: [],
      removedContents: [],
      licaoId: null,
      nomeLicao: null
    }
  },
  mounted() {
    if (this.$route.query.licaoId) {
      this.licaoId = this.$route.query.licaoId;
    }

    this.loadContents();
  },
  methods: {
    addContent(event) {
      const file = event.target.files[0];
      const filename = file.name.substring(0, file.name.indexOf('.'));
      const fileExt = file.name.substring(file.name.indexOf('.'));
      let ordem;
      let intro;
      let tipo;
      let key;
      let caminho;

      if (this.contents.length) {
        const orders = this.contents.map(content => content.ordem);
        ordem = Math.max(...orders) + 10;
      } else {
        ordem = 10;
      }

      if (this.licaoId) {
        intro = 'N';
        key = `${filename}_${this.licaoId}_${ordem}${fileExt}`;
      } else {
        intro = 'S';
        key = `${filename}_${ordem}${fileExt}`;
      }

      if (file.type === APPLICATION_PDF) {
        tipo = 'P';
        caminho = `${requestService.getEndpointUrl()}/conteudo/pdf/${key}`;
      } else {
        tipo = 'V';
        caminho = `${requestService.getEndpointUrl()}/conteudo/video/${key}`;
      }

      const content = {
        intro,
        tipo,
        ordem,
        key,
        caminho: encodeURI(caminho),
        fileMetadata: file
      };

      if (this.licaoId) {
        content.licao = {
          id: this.licaoId
        };
      }

      this.addedContents.push(content);
      this.contents.push(content);
    },
    previousContent() {
      if (this.contents[this.selectedContent - 1]) {
        this.selectedContent--;
        this.clearFile();
      }
    },
    nextContent() {
      if (this.contents[this.selectedContent]) {
        this.selectedContent++;
        this.clearFile();
      }
    },
    removeContent() {
      this.addedContents.splice(this.selectedContent, 1);
      const removed = this.contents.splice(this.selectedContent, 1);

      if (removed[0].id) {
        this.removedContents.push(removed[0]);
      }

      this.clearFile();
    },
    clearFile() {
      this.$refs.file.value = '';
    },
    save() {
      this.uploading = true;

      const contentData = {
        addedContents: this.addedContents,
        removedContents: this.removedContents
      };

      requestService.post('/conteudo', contentData).then(
        () => {
          const formData = new FormData();
          this.addedContents.forEach(
            content => {
              formData.append('file', content.fileMetadata, content.key);
            }
          );

          requestService.post('/conteudo/upload', formData, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          }).then(
            () => {
              this.loadContents();
              this.selectedContent = 0;
              this.uploading = false;
              this.addedContents = [];
              this.removedContents = [];
            }
          );
        }
      );
    },
    loadContents() {
      if (this.licaoId) {
        requestService.get('/conteudo/' + this.licaoId).then(
          response => {
            this.contents = response.data;

            requestService.get('/licao/' + this.licaoId).then(
              response => {
                this.nomeLicao = response.data.nome;
              }
            );
          }
        );
      } else {
        requestService.get('/conteudo').then(
          response => {
            this.contents = response.data;
          }
        );
      }
    },
    downloadFile() {
      window.open(this.contents[this.selectedContent].caminho);
    }
  }
}
</script>

<style>
  #conteudo-main-section {
    height: 39em;
  }

  #cadastro-conteudo-main {
    height: 100%;
  }

  .columns {
    height: 100%;
  }

  .column.is-10 {
    height: 100%;
  }
</style>
