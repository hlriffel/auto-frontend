<template>
  <div id="autoavaliacao">
    <div v-if="evaluations.length">
      <div id="usuarioCategoria">
        <h1 class="title">Categoria: {{ evaluations[selectedEvaluation].usuarioCategoria.nome }}</h1>
      </div>
      <div id="perguntas">
        <form @submit.prevent="proceed()">
          <section class="section">
            <div v-for="pergunta in evaluations[selectedEvaluation].perguntas" :key="pergunta.id">
              <div class="question-desc">
                <p class="is-size-4">{{ pergunta.pergunta }}</p>
              </div>

              <div class="columns">
                <div class="column">
                  <label class="radio" :for="getIdentifier(pergunta)">
                    <input type="radio" :name="getIdentifier(pergunta)" value="1" v-model.number="pergunta.resposta">
                    Extremamente insatisfeito
                  </label>
                </div>
                <div class="column">
                  <label class="radio" :for="getIdentifier(pergunta)">
                    <input type="radio" :name="getIdentifier(pergunta)" value="2" v-model.number="pergunta.resposta">
                    Insatisfeito
                  </label>
                </div>
                <div class="column">
                  <label class="radio" :for="getIdentifier(pergunta)">
                    <input type="radio" :name="getIdentifier(pergunta)" value="3" v-model.number="pergunta.resposta">
                    Satisfeito
                  </label>
                </div>
                <div class="column">
                  <label class="radio" :for="getIdentifier(pergunta)">
                    <input type="radio" :name="getIdentifier(pergunta)" value="4" v-model.number="pergunta.resposta">
                    Muito satisfeito
                  </label>
                </div>
                <div class="column">
                  <label class="radio" :for="getIdentifier(pergunta)">
                    <input type="radio" :name="getIdentifier(pergunta)" value="5" v-model.number="pergunta.resposta">
                    Extremamente satisfeito
                  </label>
                </div>
              </div>
            </div>
          </section>

          <button type="submit" class="button is-link is-pulled-right">{{ getProceedText() }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import user from '@/shared/user.js';
import toastFactory from '@/shared/toastFactory.js';

export default {
  data() {
    return {
      evaluations: [],
      selectedEvaluation: 0
    }
  },
  mounted() {
    this.loadEvaluations();
  },
  methods: {
    loadEvaluations() {
      axios.get(ENDPOINT_URL + '/autoavaliacao/' + user.id).then(
        response => {
          this.evaluations = response.data;
        }
      );
    },
    isLastEvaluationSelected() {
      return (this.selectedEvaluation + 1) === this.evaluations.length;
    },
    getIdentifier(pergunta) {
      return `resposta_${pergunta.id}`;
    },
    getProceedText() {
      return this.isLastEvaluationSelected() ? 'Finalizar' : 'Prosseguir';
    },
    proceed() {
      let hasUnansweredQuestion = false;

      this.evaluations[this.selectedEvaluation].perguntas.some(
        pergunta => {
          if (pergunta.resposta === 0) {
            hasUnansweredQuestion = true;
            return true;
          }
        }
      );

      if (hasUnansweredQuestion) {
        toastFactory.showPrimaryToast('É necessário responder todas as perguntas antes de prosseguir!');
        return;
      }

      if (this.isLastEvaluationSelected()) {
        const resultData = [];

        this.evaluations.forEach(
          evaluation => {
            const result = {
              usuarioCategoria: evaluation.usuarioCategoria.id,
              respostaQuestionario: []
            };

            let caracteristicas = evaluation.perguntas.map(pergunta => pergunta.caracteristica);
            
            // Removendo as características duplicadas
            caracteristicas = caracteristicas.filter(
              (carac, index, self) => {
                return self.findIndex(
                  c => {
                    return c.id === carac.id
                  }
                ) === index;
              }
            );

            caracteristicas.forEach(
              caracteristica => {
                const perguntas = evaluation.perguntas.filter(
                  pergunta => {
                    return pergunta.caracteristica.id === caracteristica.id;
                  }
                );
                let mediaCaracteristica = 0;

                perguntas.forEach(
                  pergunta => {
                    mediaCaracteristica += pergunta.resposta;
                  }
                );

                mediaCaracteristica /= (perguntas.length || 1);

                result.respostaQuestionario.push({
                  caracteristica: caracteristica.id,
                  valor: mediaCaracteristica
                });
              }
            );

            resultData.push(result);
          }
        );

        axios.post(ENDPOINT_URL + '/autoavaliacao', resultData).then(
          () => {
            this.$router.push({
              path: '/main/resultados'
            });
          }
        );
      } else {
        this.selectedEvaluation++;
      }
    }
  }
}
</script>

<style>
  .question-desc {
    padding: 20px 0 20px 0;
  }
</style>
