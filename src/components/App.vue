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
var main = new Main();
export default{
	data:function(){
		return{
			isHide:true,
			spinnerIsHide:true,
			searchField:'',
			values:[],
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
				this.values.push(values[0]);
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
			
			this.values.splice(index,1);
			main.removeData(this.chart,index);
		}
	}
}
</script>