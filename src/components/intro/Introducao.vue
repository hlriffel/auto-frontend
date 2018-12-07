<template>
  <div id="introducao">
    <section class="hero is-fullheight is-bold"> 
      <div class="hero-body">
        <div class="container">
          <div class="is-centered">
            <div class="columns">
              <div class="column is-2">
                <div class="card-content margin_top">
                  <button class="button is-link is-large" @click="previous()" :disabled="currentPage === 1 && index === 0">
                    <span class="icon is-medium">
                      <i class="fas fa-angle-left"></i>
                    </span>
                  </button>
                </div>
              </div>
              <div class="column is-6">
                <div class="card-content info_bk" v-if="contents[index]">
                  <div v-if="contents[index].tipo === 'V'">
                    <vue-plyr>
                      <video :src="contents[index].caminho">
                        <source :src="contents[index].caminho"  type="video/mp4" size="720">
                        <track kind="captions" label="Português" srclang="pt-br" src="captions-en.vtt" default>
                      </video>
                    </vue-plyr>
                  </div>
                  <div v-else-if="contents[index].tipo === 'P'">
                  <div class="has-text-right">
                    Página {{ currentPage }} de {{ pageCount }}
                  </div>
                    <pdf :src="contents[index].caminho" :page="currentPage" @num-pages="setPageNumber($event)" @page-loaded="pageLoaded($event)"></pdf>
                  </div>
                </div>
              </div>
              <div class="column is-2">
                <div class="card-content margin_top"> 
                  <button class="button is-link is-large" @click="next()" :disabled="currentPage === pageCount && index === (contents.length - 1)">
                    <span class="icon is-medium">
                      <i class="fas fa-angle-right"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>                
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import pdf from 'vue-pdf';

import requestService from '@/shared/requestService.js';

export default {
  components: {
    pdf
  },
  mounted() {
    this.loadContents(); 
  },
  data() {
    return {
      contents: [],
      index: 0,
      currentPage: 1,
      pageCount: 0,
      gettingBackFromAnotherContent: false
    }
  },
  computed: {
    player() {
      return this.$refs.player.player
    }
  },
  methods: {
    loadContents() {
      requestService.get('/conteudo').then(
        response => {
          this.contents = response.data;
        }
      );
    },
    next() {
      const tipo = this.contents[this.index].tipo;

      this.gettingBackFromAnotherContent = false;

      if (tipo === 'P') {
        if (this.currentPage === this.pageCount
            && this.index < this.contents.length) {
          this.index++;
          this.currentPage = 1;
        } else {
          this.currentPage++;
        }
      } else if (tipo === 'V') {
        this.index++;
        this.currentPage = 1;
      }
    }, 
    previous() {
      const tipo = this.contents[this.index].tipo;

      if (tipo === 'P') {
        if (this.currentPage > 1) {
          this.currentPage--;
        } else if (this.index > 0) {
          this.index--;
          this.currentPage = this.pageCount;
          this.gettingBackFromAnotherContent = true;
        }
      } else if (tipo === 'V') {
        this.index--;
        this.currentPage = this.pageCount;
        this.gettingBackFromAnotherContent = true;
      }
    },
    setPageNumber($event) {
      this.pageCount = $event;

      if (this.gettingBackFromAnotherContent) {
        this.currentPage = this.pageCount;
      }
    },
    pageLoaded($event) {
      this.currentPage = $event;
    }
  }
}
</script>

<style>
  .margin_top {
    margin-top: 65%;
  }

  .info_bk {
    background-color: #1496ed;
  }

  .disabled {
    opacity: 0.4;
    cursor: no-drop;
  }

  .able {
    opacity: 1;
    cursor: default;
  }
</style>
