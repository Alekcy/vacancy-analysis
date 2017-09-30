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
		searchField:'',
		see:true,
		values:[],
		chart:null,
		idRegion:'',
		regionName:'',
		searchParams:[],
		isFirst:true
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
			var response = main.ajax(this.searchParams);
			var data = main.treatment(response,this.searchParams);
			this.values.push(data);
			main.updateChart(this.chart,data,this.isFirst);
			this.isFirst = false;
		},
		press:function(searchParams){
			this.searchField = searchParams['searchField'];
			
			this.idRegion = searchParams['regions'][0]['idRegion'];
			//this.regionName = ['regionName'];
			this.searchParams = searchParams;
			this.addValue();
			this.isHide = false;
		},
		del:function(index){
			
			this.values.splice(index,1);
			main.removeData(this.chart,index);
		}
	}
});

