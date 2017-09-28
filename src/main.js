class Main{
	updateChart(chart, label, data){
		chart.data.labels.push(label);
		chart.data.datasets.forEach((dataset) => {
		    dataset.data.push(data);
		});
		chart.data.datasets.push({
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
	    	    });
		chart.update();
	}
	removeData(chart,index) {
	    chart.data.labels.splice(index,1);
	    chart.data.datasets.forEach((dataset) => {
	        dataset.data.splice(index,1);
	    });
	    chart.update();
	}
	ajax(text,id){
		var response;
		if(id=='')id='113';
		$.ajax({
		    url : "https://api.hh.ru/vacancies",
		    type : "GET",
		    jsonp: "callback",
		    async: false,
		    data:{
		    	'area':id,
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
	    console.log('-------------------------------------');
	    console.log(response);
		return response;
	}
	getRegion(id){
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
	getCountry(){
	
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
	treatment(response,title,regionName){
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
			'title':title,
			'regionName':regionName
		};
		return data;
	}
	chart(){
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
}
module.exports = Main;
