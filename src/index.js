import jquery from 'jquery';
import materializecss from 'materialize-css';
import Vue from 'vue';
import mathjs from 'mathjs';
import Chart from 'chart.js';
import Cards from './components/cards.vue';
import Search from './components/search.vue';
import Main from './main.js'
//var Vue = require('vue');
var VueMaterial = require('vue-material');
Vue.use(VueMaterial);
//var Main = require('./main.js');
var main = new Main();
Vue.use(main);

var app = new Vue ({
	el:'#app',
	data:{
		searchField:'',
		see:true,
		values:[],
		chart:null,
		idRegion:''
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
			//console.log('sf'+this.searchField);
			var response = main.ajax(this.searchField,this.idRegion);
			var data = main.treatment(response,this.searchField);
			this.values.push(data);
			//console.log(this.values);

			main.updateChart(this.chart,data['title'],data['mid']);
		},
		press:function(searchParams){
			this.searchField = searchParams['searchField'];
			if(searchParams['idRegion']!==''){
				this.idRegion = searchParams['idRegion'];
			}
			this.addValue();
		},
		del:function(index){
			
			this.values.splice(index,1);
			main.removeData(this.chart,index);
		}
	}
});

