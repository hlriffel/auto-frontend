<template>
  <div id="cadastro-conteudo">
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
      <a class="button is-link is-pulled-right" @click="save()" v-show="!uploading">Salvar</a>
      <a class="button is-link is-pulled-right is-loading" v-show="uploading">Salvar</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const APPLICATION_PDF = 'application/pdf';

export default {
  props: {
    lecture: Number
  },
  data() {
    return {
      contents: [],
      selectedContent: 0,
      uploading: false
    }
  },
  mounted() {
    this.loadContents();
  },
  methods: {
    addContent(event) {
      const file = event.target.files[0];
      const filename = file.name.substring(0, file.name.indexOf('.'));
      const fileExt = file.name.substring(file.name.indexOf('.'));
      const ordem = this.selectedContent * 10;
      let intro;
      let tipo;
      let key;
      let caminho;

      if (this.lecture) {
        intro = 'N';
        key = `${filename}_${this.lecture.id}_${ordem}${fileExt}`;
      } else {
        intro = 'S';
        key = `${filename}_${ordem}${fileExt}`;
      }

      if (file.type === APPLICATION_PDF) {
        tipo = 'P';
        // caminho = `${ENDPOINT_URL}/conteudo/pdf/${key}`;
        caminho = `http://localhost:8090/conteudo/pdf/${key}`;
      } else {
        tipo = 'V';
        // caminho = `${ENDPOINT_URL}/conteudo/video/${key}`;
        caminho = `http://localhost:8090/conteudo/video/${key}`;
      }

      const content = {
        intro,
        tipo,
        ordem,
        key,
        caminho: encodeURI(caminho),
        fileMetadata: file
      };

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
      const removed = this.contents.splice(this.selectedContent, 1);
      this.clearFile();
    },
    clearFile() {
      this.$refs.file.value = '';
    },
    save() {
      this.uploading = true;

      const contentData = {
        licao: this.lecture,
        conteudos: this.contents
      };

      // axios.post(ENDPOINT_URL + '/conteudo', contentData);
      axios.post('http://localhost:8090/conteudo', contentData).then(
        () => {
          const formData = new FormData();
          this.contents.forEach(
            content => {
              formData.append('file', content.fileMetadata, content.key);
            }
          );

          // axios.post(ENDPOINT_URL + '/conteudo/upload', this.formData, {
          axios.post('http://localhost:8090/conteudo/upload', formData, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          }).then(
            () => {
              this.loadContents();
              this.selectedContent = 0;
              this.uploading = false;
            }
          );
        }
      );
    },
    loadContents() {
      if (this.lecture) {
        // axios.get(ENDPOINT_URL + '/conteudo/' + this.lecture.id).then(
        axios.get('http://localhost:8090/conteudo/' + this.lecture.id).then(
          response => {
            this.contents = response.data;
          }
        );
      } else {
        // axios.get(ENDPOINT_URL + '/conteudo').then(
        axios.get('http://localhost:8090/conteudo').then(
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
