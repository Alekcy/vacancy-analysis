<template>
	<div class="container" >
    <div class="row">
      <search v-on:add="addedReg" v-on:press="press"></search>
    </div>
    <div class="row" :class="{spinner:spinnerIsHide}">
      <div class="col-md-12">
        <md-spinner :md-size="150" md-indeterminate></md-spinner>
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
			isHide:true,
			spinnerIsHide:true,
			searchField:'',
			values:null,
			chart:null,
			searchParams:[],
			isFirst:true,
			regions:[]
		}
	},
	mounted:function(){
		this.chart = main.chart();	
	},
	components:{
		Cards,
		Search
	},
	methods:{
		addValue:function(){
			var data = [];
			var searchParams = this.searchParams;
			console.log('params**************');
			console.log(searchParams);
			if(searchParams.length!==0){
				this.regions.forEach(function(item){
					var response = main.ajax(item,searchParams);
					data.push(main.treatment(response,item,searchParams));
				});
				var values = main.dataToValues(data);
				this.values = values.vacancies;
				console.log(this.values);
				main.updateChart(this.chart,data,this.regions);
				this.isFirst = false;
			}
		},
		addedReg:function(regions){
			this.regions = regions;
			this.addValue();
		},
		press:function(searchField){
			this.searchField = searchField;
			this.searchParams.push(searchField);
			this.spinnerIsHide = false;
			this.addValue();
			this.spinnerIsHide = true;
			this.isHide = false;
		},
		del:function(index){
			//this.searchParams.splice(index,1);
			console.log(this.values);
			Vue.delete(this.values,index)
			//delete this.values[index];
			main.removeData(this.chart,index);
		}
	}
}
</script>