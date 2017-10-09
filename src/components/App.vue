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
    	    <canvas id="chart" width="400" height="400"></canvas>
    	  </div>
    	</div>
    	<div class="row" :class="{secondChart:secondType}">
    		<canvas id="secondChart" width="400" height="400"></canvas>
    	</div>
  	</div>
</template>
<script>
import Cards from './cards.vue';
import Search from './search.vue';
import Main from '../main.js'
import Vue from 'vue';


 //var Vue = new Vue();
var main = new Main();
export default{
	data:function(){
		return{
			secondType:true,
			progress:0,
			isHide:true,
			spinnerIsHide:true,
			searchField:'',
			values:null,
			chart:null,
			secondChart:null,
			searchParams:[],
			isFirst:true,
			regions:[]
		}
	},
	mounted:function(){
		
		console.log(this.count);
		this.chart = main.chart();
		this.secondChart = main.createSecondChart();	
	},
	computed: {
 	  count () {
 	    return this.$store.state.counts
 	  }
 	},
	components:{
		Cards,
		Search
	},
	methods:{
		changeType:function(){
			this.isHide = true;
			this.searchParams = [];
			this.regions = [];	
			this.values = [];
		},
		addValue:function(){
			var data = [];
			var searchParams = this.searchParams;
			if(searchParams.length!==0){
				this.regions.forEach(function(item){
					var response = main.ajax(item,searchParams);
					data.push(main.treatment(response,item,searchParams));
				});
				var values = main.dataToValues(data);
				this.values = values.vacancies;
				main.updateChart(this.chart,data,this.regions);
				this.isFirst = false;
			}
		},
		addedReg:function(regions){
			if(regions.length!==0){
				this.regions = regions;
				this.addValue();
			}
		},
		tr: function(){
			main.check(this.secondChart,this.regions[0],this.searchParams[0],this,function(t){
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
			}else{
				console.log(this.regions);
				this.tr();
				this.searchParams = [];
			}
		},
		del:function(index){
			Vue.delete(this.values,index);
			this.searchParams.splice(index,1);
			main.removeData(this.chart,index);
		}
	}
}
</script>