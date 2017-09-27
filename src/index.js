import jquery from 'jquery';
import materializecss from 'materialize-css';
//import vue from 'vue';
import mathjs from 'mathjs';
import Chart from 'chart.js';



var Vue = require('vue');
var VueMaterial = require('vue-material');
Vue.use(VueMaterial);

Vue.component('search',{
	template:`<md-layout md-column>
				<md-layout md-row>
					<md-layout md-flex="80">
						<input v-model="searchField" type="text" name="">
					</md-layout>
					<md-layout md-flex="20">
						<div v-on:click='search' class="btn waves-effect waves-light">search</div>
					</md-layout>
				</md-layout>
				<md-layout md-row>

				<form novalidate @submit.stop.prevent="submit">
					 <md-input-container>
					 	<label>Choose a country</label>
						<md-autocomplete v-model="country" 
                    	    :list="countryList"
                    	     print-attribute="name"
                       		:min-chars="0"
                       		:max-height="6"
                       		:filter-list="countryFilter"
                       		:debounce="500"
                       		v-on:selected="countryChange">
   						 </md-autocomplete>
   					 </md-input-container>
   				</form>
   				
  				</md-layout>
  			  </md-layout>`,
  	data:function(){
  		return{
  			movie:'',
  			searchField:'',
  			country:'',
  			countryList:[]
  		}
  	},
  	mounted:function(){
  		this.countryList = getCountry();
  	},
  	methods:{
  		countryChange:function(item){
  			console.log(item);
  			
  			console.log('ind: '+item['id']);
  			console.log(this.countryList);
  			this.getRegions(item['id']);
  		},
  		getRegions:function(id){
  			getRegion(id);
  		},
  		countryFilter: function(list, query) {
    		var arr = [];
    		for (var i = 0; i < list.length; i++) {
    		    if (list[i].name.indexOf(query) !== -1)
    		        arr.push(list[i]);
    		    if (arr.length > 5)
    		        break;
    		}
			return arr;
		},
  		search:function(){
  			if(this.searchField!==''){
  				this.$emit('press',this.searchField);
  				this.searchField = '';
  			}
  			
  		}
  	}
});
Vue.component('cards',{
	template:`
		<div>
		  <div v-for="(data,index) in values">
		        <div v-on:click='del(index)' class="col s12 m6">
		          <div class="card blue-grey darken-1">
		            <div class="card-content white-text">
		              <span class="card-title">{{data['title']}}</span>
		              Средняя зарплата: {{data['mid']}}Р<br>
		              Всего вакансий: {{data['countVacancies']}}
		            </div>
		            <div class="card-action">
		              <a href="#">This is a link</a>
		              <a href="#">This is a link</a>
		            </div>
		          </div>
		        </div>
		  	</div>
		  </div>
	`,
	props:[
		'values'
	],
	methods:{
		del:function(index){
			this.$emit('del',index);
		}
	}
});
var app = new Vue ({
	el:'#app',
	data:{
		searchField:'',
		see:true,
		values:[],
		chart:null
	},
	mounted:function(){
			console.log('created');
			this.chart = chart();
			console.log(this.chart);	
	},
	methods:{
		addValue:function(){
			console.log('sf'+this.searchField);
			var response = ajax(this.searchField);
			var data = treatment(response,this.searchField);
			this.values.push(data);
			console.log(this.values);
			updateChart(this.chart,data['title'],data['mid']);
		},
		press:function(val){
			this.searchField = val;
			this.addValue();
		},
		del:function(index){
			console.log(index);
			this.values.splice(index,1);
			removeData(this.chart,index);
		}
	}
});

function updateChart(chart, label, data){
	chart.data.labels.push(label);
	chart.data.datasets.forEach((dataset) => {
	    dataset.data.push(data);
	});
	chart.update();
}
function removeData(chart,index) {
    chart.data.labels.splice(index,1);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.splice(index,1);
    });
    chart.update();
}
function ajax(text){
	var response;
	$.ajax({
	    url : "https://api.hh.ru/vacancies",
	    type : "GET",
	    jsonp: "callback",
	    async: false,
	    data:{
	    	'text':text,
	    	'per_page':500,
	    	'page':0,//first page is zero
	    	'only_with_salary':true
	    },
	    dataType : "text",
	    success : function(data){
	        
	        response=data;
	    }	
	});
	response = JSON.parse(response,true);
    response = response['items'];
	return response;
}
function getRegion(id){
	var response;
	$.ajax({
	    url : "https://api.hh.ru/areas/"+id,
	    type : "GET",
	    jsonp: "callback",
	    async: false,
	    data:{
	    },
	    dataType : "text",
	    success : function(data){
	        response=data;
	    }	
	});
	response = JSON.parse(response,true);
	console.log(response);
	var array = [];
	response['areas'].forEach(function(item,i,arr){
		//console.log(item);
		array.push({'id':item['id'],'name':item['name']});
	});
    //response = response['items'];
    console.log(array);
	return array;
}
function getCountry(){

	var response;
	$.ajax({
	    url : "https://api.hh.ru/areas/countries",
	    type : "GET",
	    jsonp: "callback",
	    async: false,
	    data:{
	    },
	    dataType : "text",
	    success : function(data){
	        response=data;
	    }	
	});
	response = JSON.parse(response,true);
	console.log(response);
	var array = [];
	response.forEach(function(item,i,arr){
		//console.log(item);
		array.push({'id':item['id'],'name':item['name']});
	});
    //response = response['items'];
    console.log(array);
	return array;
}
function treatment(response,title){
	var sum = 0;
    var countVacanciesWithSalaryFrom = 0;
    var salaryArray=[];
	response.forEach(function(item, i, vacancie) {
	  	if(vacancie[i]['salary']['from']!==null){
	  		sum += vacancie[i]['salary']['from'];
	  		countVacanciesWithSalaryFrom++;
	  		salaryArray.push(vacancie[i]['salary']['from']);
	  	}
	});
	var mid = sum/countVacanciesWithSalaryFrom;
	console.log(mid);
	mid = Math.round(mid);
	//var math = require('mathjs');
	//console.log(math.median(salaryArray));
	var data = {
		'mid':mid,
		'countVacancies':countVacanciesWithSalaryFrom,
		'title':title
	};
	return data;
}
function chart(){
	var chart = new Chart('chart', {
    	type: 'bar',
    	data: {
    	    labels: [],
    	    datasets: [{
    	        label: '',
    	        data: [],
    	        backgroundColor: [
    	            'rgba(255, 99, 132, 0.2)',
    	            'rgba(54, 162, 235, 0.2)',
    	            'rgba(255, 206, 86, 0.2)',
    	            'rgba(75, 192, 192, 0.2)',
    	            'rgba(153, 102, 255, 0.2)',
    	            'rgba(255, 159, 64, 0.2)'
    	        ],
    	        borderColor: [
    	            'rgba(255,99,132,1)',
    	            'rgba(54, 162, 235, 1)',
    	            'rgba(255, 206, 86, 1)',
    	            'rgba(75, 192, 192, 1)',
    	            'rgba(153, 102, 255, 1)',
    	            'rgba(255, 159, 64, 1)'
    	        ],
    	        borderWidth: 1
    	    }]
    	},
    	options: {
    		responsive:false,
    	    scales: {
    	        yAxes: [{
    	            ticks: {
    	                beginAtZero:true
    	            }
    	        }]
    	    }
    	}
	});
	return chart;
}

