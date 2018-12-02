<template>
  <div id="introducao">
    <section class="hero is-fullheight is-bold"> 
      <div class="hero-body">
        <div class="container">
          <div class="is-centered">
            <div class="columns">
              <div class="column is-2">
                <div class="card-content margin_top">
                  <a class="button is-link is-large" @click="previous()" :class="[index == 0 ? 'disabled' : 'able']">
                    <span class="icon is-medium">
                      <i class="fas fa-angle-left"></i>
                    </span>
                  </a>
                </div>
              </div>
              <div class="column is-6">
                <div class="card-content info_bk">
                  <div v-if="selectedContent.tipo == 'V'">
                    <vue-plyr>
                      <video :src="selectedContent.caminho">
                        <source :src="selectedContent.caminho"  type="video/mp4" size="720">
                        <track kind="captions" label="Português" srclang="pt-br" src="captions-en.vtt" default>
                      </video>
                    </vue-plyr>
                  </div>
                  <div v-else-if="selectedContent.tipo == 'P'">
                    <pdf :src="selectedContent.caminho"></pdf>
                  </div>
                </div>
              </div>
              <div class="column is-2">
                <div class="card-content margin_top"> 
                  <a class="button is-link is-large" @click="next()" :class="[index == (contents.length -1) ? 'disabled' : 'able']">
                    <span class="icon is-medium">
                      <i class="fas fa-angle-right"></i>
                    </span>
                  </a>
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
      selectedContent: null,
      index: 0
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

          if (this.contents.length > 0) {
            this.selectedContent = this.contents[0];
          }
        }
      );
    },
    next() {
      if (this.index + 1 <= this.contents.length) {
        this.index++;
        this.selectedContent = this.contents[this.index];
      }
    }, 
    previous() {
      if (this.index - 1 >= 0) {
        this.index--;
        this.selectedContent = this.contents[this.index];
      }
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
