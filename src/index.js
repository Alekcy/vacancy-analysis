import jquery from 'jquery';
 import materializecss from 'materialize-css';
 import Vue from 'vue';
 import mathjs from 'mathjs';
 import Chart from 'chart.js';
 import Cards from './components/cards.vue';
 import Search from './components/search.vue';
 import Main from './main.js'

var VueMaterial = require('vue-material');
Vue.use(VueMaterial);
var main = new Main();
Vue.use(main);

var app = new Vue ({
	el:'#app',
	data:{
		isHide:true,
		spinnerIsHide:true,
		searchField:'',
		//see:true,
		values:[],
		chart:null,
		//idRegion:'',
		//regionName:'',
		searchParams:[],
		isFirst:true,
		regions:[]
	},
	mounted:function(){
		console.log('created');
		this.chart = main.chart();
		console.log(this.chart);	
	},
	components:{
		Cards,
		Search
	},
	methods:{
		addValue:function(){
			console.log('seathParams:=========');
			console.log(this.searchParams);
			var data = [];
			var searchParams = this.searchParams;
			this.regions.forEach(function(item){
				console.log(item);	
				var response = main.ajax(item,searchParams);
				data.push(main.treatment(response,item,searchParams));
			});
			console.log('dataaaaaaaaaaaaaaaa');
			console.log(data);
			this.values.push(data);
			main.updateChart(this.chart,data,this.regions);
			this.isFirst = false;
		},
		addedReg:function(regions){
			console.log('aaaaaaaaaaaaaaaaaasuka');

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
});

