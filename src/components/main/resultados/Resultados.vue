<template>
	<div>
		<div class="columns tile is-vertical is-2">
			<div v-for="grafico in graficos" :key="grafico.id" class="column chart">
				<highcharts :options="grafico"></highcharts>
			</div>
			<div class="spacer"></div>
		</div>
		<div>
			<highcharts :options="graficos[graficoSelecionado]"></highcharts>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

const standardChartProperties = {
	chart: {
		polar: true,
		type: 'line'
	},
	title: {
		x: 0
	},
	xAxis: {
		categories: [],
		tickmarkPlacement: 'off',
		lineWidth: 0
	},
	yAxis: {
		gridLineInterpolation: 'polygon',
		lineWidth: 0,
		min: 0
	},
	tooltip: {
		shared: true,
		pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
	},
	legend: {
		align: 'right',
		verticalAlign: 'top',
		y: 70,
		layout: 'vertical'
	},
	pane: {
		size: '80%'
	}
};

export default {
	data() {
		return {
			graficos: [],
			graficoSelecionado: 0,
			chartOptions: {
				//	text: '',
				/* series: [{
					name: 'Allocated Budget',
					data: [43000, 19000, 60000, 35000, 17000, 10000],
					pointPlacement: 'off'
				}, {
					name: 'Actual Spending',
					data: [50000, 39000, 42000, 31000, 26000, 14000],
					pointPlacement: 'off'
				}]*/
			}	
		};
	},
	mounted(){
		this.index();
	},	
	methods: {
		index() {
			axios.get(ENDPOINT_URL + '/resposta/47').then(response => {
				const graficosResponse = response.data;
				
				if (graficosResponse) {
					graficosResponse.forEach(
						graficoResponse => {
							const grafico = {
								...standardChartProperties,
								id: graficoResponse.id,
								series: [
									{
										type: 'area',
										name: 'ASDF',
										/*data: graficoResponse.respostas.map(
											resposta => {
												return {
													name: resposta.caracteristica.nome,
													value: resposta.valor
												}
											}
										)*/
										data: graficoResponse.respostas.map(
											resposta => resposta.valor
										)
									}
								]
							};

							grafico.title.text = graficoResponse.usuarioCategoria.categoria.nome;

							// regra de construção do gráfico 	

							this.graficos.push(grafico);
							console.log(grafico);
						}
					);
				}
				//console.log(this.graficos);
			});
		}
	}
}
</script>

<style>
	.chart {
		height: 200px;
	}

	.spacer {
		height: 20px;
	}
</style>
