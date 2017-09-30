class Main{
	updateChart(chart, data,isFirst){
		var backgroundColor = [
						'rgba(255, 99, 132, 0.2)',
	       		        'rgba(54, 162, 235, 0.2)',
	       		        'rgba(255, 206, 86, 0.2)',
	       		        'rgba(75, 192, 192, 0.2)',
	       		        'rgba(153, 102, 255, 0.2)',
	       		        'rgba(255, 159, 64, 0.2)'];
		data.forEach(function(item,i){
			console.log(backgroundColor[i]);
			if(isFirst===true){
				var backgroundColors=[];
				for (var j = 0; j < 10; j++) {
					backgroundColors.push(backgroundColor[i]);
				}
				chart.data.datasets.push({
	       		    label: item['regionName'],
	       		    data: [],
	       		    backgroundColor: [
	       		       backgroundColor[i],
	       		       backgroundColor[i],
	       		       backgroundColor[i],
	       		       backgroundColor[i],
	       		       backgroundColor[i],
	       		       backgroundColor[i],
	       		       backgroundColor[i],
	       		       backgroundColor[i],
	       		       backgroundColor[i],
	       		       backgroundColor[i],
	       		       backgroundColor[i],
	       		    ],
	       		    borderColor: [
	       		       backgroundColor[i+1],
	       		       backgroundColor[i+1],
	       		       backgroundColor[i+1],
	       		       backgroundColor[i+1],
	       		       backgroundColor[i+1],
	       		       backgroundColor[i+1],
	       		       backgroundColor[i+1],
	       		       backgroundColor[i+1],
	       		       backgroundColor[i+1]  
	       		    ],
	       		    borderWidth: 1
	       		});
			}
			chart.data.datasets[i].data.push(item['mid']);
			
		});
		chart.data.labels.push(data[0]['title']);
		console.log(chart);
		chart.update();
	}
	removeData(chart,index) {
	    chart.data.labels.splice(index,1);
	    chart.data.datasets.forEach((dataset) => {
	        dataset.data.splice(index,1);
	    });
	    chart.update();
	}
	ajax(params){
		var response=[];
		params['regions'].forEach(function(item,i,arr){
			var dat;
			$.ajax({
		    	url : "https://api.hh.ru/vacancies",
		    	type : "GET",
		    	jsonp: "callback",
		    	async: false,
		    	data:{
		    		'area':item['idRegion'],
		    		'text':params['searchField'],
		    		'per_page':500,
		    		'page':0,//first page is zero
		    		'only_with_salary':true
		    	},
		    	dataType : "text",
		    	success : function(data){
		    	    
		    	    dat=data;
		    	}	
			});
			dat = JSON.parse(dat,true);
	    	dat = dat['items'];
	    	response.push(dat);
		});
		
		
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
	treatment(response,searchParams){
		var data = [];
		response.forEach(function(item, i, arr) {
			var sum = 0;
	    	var countVacanciesWithSalaryFrom = 0;
	    	var salaryArray=[];
			item.forEach(function(item, i, vacancie) {
			  	if(vacancie[i]['salary']['from']!==null){
			  		sum += vacancie[i]['salary']['from'];
			  		countVacanciesWithSalaryFrom++;
			  		salaryArray.push(vacancie[i]['salary']['from']);
			  	}
			});
			var mid = sum/countVacanciesWithSalaryFrom;
			
			mid = Math.round(mid);
			//var math = require('mathjs');
			//console.log(math.median(salaryArray));
			data.push({
				'mid':mid,
				'countVacancies':countVacanciesWithSalaryFrom,
				'title':searchParams['searchField'],
				'regionName':searchParams['regions'][i]['regionName']
			});
		});
		console.log('data:================');
		console.log(data);
		return data;
	}
	chart(){
		var chart = new Chart('chart', {
	    	type: 'bar',
	    	data: {
	    	    labels: [],
	    	    datasets: []
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
