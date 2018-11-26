<template>
    <div id="introducao">
        <section class="hero is-fullheight is-bold"> 
            <div class="hero-body">
                <div class="container">
                <div class="is-centered">
                         <div class="columns">
                            <div class="column is-2">
                                <div class="card-content margin_top">
                                  <a class="button is-link is-large" v-on:click="previous()" v-bind:class="[index == 0 ? 'disabled' : 'able']">
                                    <span class="icon is-medium">
                                      <i class="fas fa-angle-left"></i>
                                    </span>
                                  </a> 
                                    <!-- <button class="button is-info disabled" v-on:click="previous()" v-bind:class="[index == 0 ? 'disabled' : 'able']"><</button> -->
                                </div>
                            </div>
                             <div class="column is-6">
                                <div class="card-content info_bk"><!--  v-if="this.selectedContent != null" -->
                                <!-- <div class="has-text-centered">
                                  <h2>{{selectedContent.key}}</h2>
                                </div> -->
                                <div v-if="selectedContent.tipo == 'V'">
                                    <vue-plyr>
                                      <video poster="intro.jpg" :src="selectedContent.caminho"> <!-- src="video/mp4" -->
                                          <source :src="selectedContent.caminho"  type="video/mp4" size="720"> <!-- -->
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
                                  <a class="button is-link is-large"  v-on:click="next()" v-bind:class="[index == (contents.length -1) ? 'disabled' : 'able']">
                                    <span class="icon is-medium">
                                      <i class="fas fa-angle-right"></i>
                                    </span>
                                  </a>                                 
                                    <!-- <button class="button is-info" v-on:click="next()" v-bind:class="[index == (contents.length -1) ? 'disabled' : 'able']">></button> -->
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
import Vue from 'vue'
import VuePlyr from 'vue-plyr'
import axios from 'axios'
import pdf from 'vue-pdf'

Vue.use(VuePlyr)
export default {
  name: 'Component',
   components: {
     pdf
   },
  mounted () {
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
    player () { return this.$refs.player.player }
  },
    methods: {
      loadContents() {
        axios.get(ENDPOINT_URL + '/conteudo').then(
          response => {
            this.contents = response.data;
            console.log(this.contents);
            if(this.contents.length > 0)
                this.selectedContent = this.contents[0];
          }
        );
    },
    next(){
      if((this.index + 1) <= this.contents.length){
        this.index++;
        this.selectedContent = this.contents[this.index];
      }
    }, 
    previous(){
      if((this.index - 1) >= 0){
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

.able{
  opacity: 1;
  cursor: default;
}
</style>
