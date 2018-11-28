<template>
  <div>
    <div class="columns tile">
      <div v-for="(grafico, index) in graficos" :key="grafico.id" class="column mini-chart">
        <a @click="selectChart(index)">
          <highcharts :options="grafico"></highcharts>
        </a>
      </div>
    </div>
    <hr>
    <div v-if="graficoSelecionado">
      <highcharts :options="graficoSelecionado" ref="mainchart"></highcharts>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

import user from '@/shared/user.js';

const standardChartProperties = {
  chart: {
    polar: true,
    type: 'line',
    height: '30%'
  },
  pane: {
    size: '80%'
  },
  yAxis: {
    gridLineInterpolation: 'polygon',
    lineWidth: 0,
    min: 0
  },
  tooltip: {
    enabled: false,
    shared: true,
    pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    y: 70,
    layout: 'vertical'
  },
  credits: {
    enabled: false
  }
};

export default {
  data() {
    return {
      graficos: [],
      graficoSelecionado: null
    }
  },
  mounted() {
    this.index();
  },  
  methods: {
    index() {
      axios.get(ENDPOINT_URL + '/resposta/' + user.id).then(
        response => {
          const graficosResponse = response.data;
          
          if (graficosResponse) {
            graficosResponse.forEach(
              graficoResponse => {

                const grafico = {
                  ...standardChartProperties,
                  id: graficoResponse.id,
                  title: {
                    text: graficoResponse.usuarioCategoria.categoria.nome
                  },
                  xAxis: {
                    categories: graficoResponse.respostas.map(
                      resposta => resposta.caracteristica.nome
                    ),
                    tickmarkPlacement: 'on',
                    lineWidth: 1
                  },
                  series: [
                    {
                      type: 'area',
                      cursor: 'pointer',
                      name: 'Desempenho',
                      data: graficoResponse.respostas.map(
                        resposta => {
                          return {
                            y: resposta.valor,
                            categoria: graficoResponse.usuarioCategoria.categoria.id,
                            caracteristica: resposta.caracteristica.id
                          }
                        }
                      ),
                      pointPlacement: 'on',
                      color: '#3273dc'
                    }
                  ]
                };

                this.graficos.push(grafico);
              }
            );
          }
        }
      );
    },
    selectChart(index) {
      this.graficoSelecionado = this.graficos[index];

      this.$nextTick(
        () => {
          const onPointClick = event => {
            console.log(event);
          };
          const chart = this.$refs.mainchart.chart;

          chart.update({
            tooltip: {
              enabled: true,
              shared: true,
              pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
            },
            series: {
              ...this.graficoSelecionado.series,
              events: {
                click: onPointClick
              }
            }
          });
        }
      );
    }
  }
}
</script>

<style>
  .mini-chart {
    border: 2px solid #fff;
  }

  .mini-chart:hover {
    border-color: #3273dc;
    border-radius: 5px;
  }
</style>
