<style>
	.chart{
		display: none;
	}
</style>
<template>
	<div class="container" >
    	<div class="row">
    	  <search v-on:add="addedReg" v-on:changeType="changeType" v-on:press="press"></search>
    	</div>
    	<div class="row" :class="{spinner:spinnerIsHide}">
    	  <div class="col-md-12">
    	   	<md-progress :md-progress="progress"></md-progress>
    	  </div>
    	</div>
    	<div class="row" :class="{hide:isHide}">
    	  <div class="col-md-4">
    	    <cards :values='values' v-on:del='del'></cards>
    	  </div>
    	  <div class="col-md-8">
    	  	<div class="row">
    	  		<div class="col-md-12">
    	  			<md-button-toggle md-single>
					  <md-button md-toogle v-on:click="changeChart('mid')">Средняя ЗП</md-button>
					  <md-button v-on:click="changeChart('median')">Медианная ЗП</md-button>
					  <md-button v-on:click="changeChart('count')"> Количество вакансий</md-button>
					</md-button-toggle>
    	  		</div>	
    	  	</div>
    	  	<div class="row" :class="{chart:chartMidIsHide}">
    	  		<canvas id="chart" width="100" height="50"></canvas>
    	  	</div>
    	  	<div class="row " :class="{chart:chartMedianIsHide}">
    	  		<canvas id="chartMedian" width="100" height="50"></canvas>
    	  	</div> 
    	  	<div class="row " :class="{chart:chartCountVacanciesIsHide}">
    	  		<canvas id="chartCountVacancies" width="100" height="50"></canvas>
    	  	</div>
    	  </div>
    	</div>
    	<div class="row" :class="{secondChart:secondType}">
    		<canvas id="secondChart" width="100" height="50"></canvas>
    	</div>
  	</div>
</template>
<script>
import Cards from './cards.vue';
import Search from './search.vue';
import Main from '../main.js'
import Vue from 'vue';

var main = new Main();

export default{
	data:function(){
		return{
			chartCountVacanciesIsHide:true,
			chartMidIsHide:false,
			chartMedianIsHide:true,
			secondType:true,
			progress:0,
			isHide:true,
			spinnerIsHide:true,
			searchField:'',
			values:null,
			chart:null,
			chartMedian:null,
			chartCountVacancies:null,
			secondChart:null,
			searchParams:[],
			isFirst:true,
			
		}
	},
	mounted:function(){
		this.chart = main.createMidChart();
		this.chartMedian  = main.createChartMedian();
		this.chartCountVacancies = main.createChartCountVacancies();
		this.secondChart = main.createSecondChart();	
	},
	components:{
		Cards,
		Search
	},
	methods:{
		changeChart:function(type){
			console.log('change type detected');
			if(type=="mid"){
				this.chartMidIsHide = false;
				this.chartMedianIsHide = true;
				this.chartCountVacanciesIsHide = true;
			}
			else if(type=="median") {
				this.chartMedianIsHide = false;
				this.chartMidIsHide = true;
				this.chartCountVacanciesIsHide = true;
			}else{
				this.chartMidIsHide = true;
				this.chartMedianIsHide = true;
				this.chartCountVacanciesIsHide = false;
			}
		},
		changeType:function(){
			this.isHide = true;
			this.searchParams = [];
			this.$store.state.regions = [];	
			this.values = [];
		},
		addValue:function(){
			var data = [];
			var searchParams = this.searchParams;
			if(searchParams.length!==0){
				this.$store.state.regions.forEach(function(item){
					var response = main.ajax(item,searchParams);
					data.push(main.treatment(response,item,searchParams));
				});
				var values = main.dataToValues(data);
				this.values = values.vacancies;
				var charts = [this.chart,this.chartMedian,this.chartCountVacancies];
				main.updateChart(charts,data,this.$store.state.regions);
				this.isFirst = false;
			}
		},
		addedReg:function(){
			if(this.$store.state.regions.length!==0){
				this.addValue();
			}
		},
		tr: function(){
			main.check(this.secondChart,this.$store.state.regions[0],this.searchParams[0],this,function(t){
				t.spinnerIsHide = true;
				t.secondType = false;
			});
		},
		press:function(searchField,id){
			this.searchField = searchField;
			this.searchParams.push(searchField);
			this.spinnerIsHide = false;
			if(id!=='2'){
				this.addValue();
				this.spinnerIsHide = true;
				this.isHide = false;
				this.secondType = true;
			}else{
				this.tr();
				this.searchParams = [];
			}
		},
		del:function(index){
			Vue.delete(this.values,index);
			this.searchParams.splice(index,1);
			var charts  = [this.chart,this.chartMedian,this.chartCountVacancies];
			main.removeData(charts,index);
		}
	}
}
</script>