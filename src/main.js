import $ from "jquery";

class Main{
	check(chart,region,searchText,t,callback){
		var response;
		var myVar = setInterval(this.inter.bind(null,t), 1000);
		$.ajax({
		    	url : "/3/vacancy-analysis/check",
		    	type : "GET",
		    	jsonp: "callback",
		    	data:{
		    		'region':region['idRegion'],
		    		'searchText':searchText
		    	},
		    	dataType : "text",
		    	success : function(data){
		    		var main = new Main();
		    		 main.succes(data,chart);
		    		 callback(t);
		    		 clearInterval(myVar);
		    	}
		});	
	}
	inter(t){
		var main = new Main();
        main.ajax_progress(t);
	}
	ajax_progress(t){
		$.ajax({
		    	url : "/3/vacancy-analysis/check/progress",
		    	type : "GET",
		    	jsonp: "callback",
		    	dataType : "text",
		    	success : function(data){
		    			data = parseInt(data);
		    			t.progress = data;
		    	}
		});	
	};
	succes(data,chart){
		var response = data;
		response = JSON.parse(response,true);
	    this.updateChartCheck(response,chart);
	}
	updateChartCheck(data,chart){
       	chart.data.datasets = [];
       	chart.data.labels =[];
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
	    var i = 0;
       	for(var d in data){
       		chart.data.datasets[0].data.push(data[d]);
			chart.data.labels.push(d);
			i++;
			if(i>10) break;
       	}
		chart.update();	
	}
	dataToValues(data){
		var values = {'vacancies':{}};
		var length = data.length;
		for (var i = 0 ; i < data[0].length; i++) {
			for (var j = 0 ; j < data.length; j++) {
				if(j==0)values.vacancies[i] = ({'title':data[j][i].title,
									  'regions':{}});
				values.vacancies[i].regions[j] = ({'regionName':data[j][i].regionName,
										 'medianSalary':data[j][i].medianSalary,
										 'mid':data[j][i].mid,
										 'countVacancies':data[j][i].countVacancies});
			}
		};
		return values;
	}
	updateChart(charts, data,regions){
		var backgroundColor = [
						'rgba(255, 99, 132, 0.2)',
	       		        'rgba(54, 162, 235, 0.2)',
	       		        'rgba(255, 206, 86, 0.2)',
	       		        'rgba(75, 192, 192, 0.2)',
	       		        'rgba(153, 102, 255, 0.2)',
	       		        'rgba(255, 159, 64, 0.2)'];
	    var borderColor = ['rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'];

        charts.forEach(function(chart){
        	console.log(chart);
			chart.data.datasets = [];
       		chart.data.labels =[];
        });	
       	regions.forEach(function(region,i){
       		charts.forEach(function(chart){
       			chart.data.datasets.push({
	       		label: region['regionName'],
	       		data: [],
	       		backgroundColor: [
	       		   backgroundColor[i],
	       		   backgroundColor[i],
	       		   backgroundColor[i],
	       		   backgroundColor[i],
	       		   backgroundColor[i],
	       		   backgroundColor[i]
	       		],
	       		borderColor: [
	       		   borderColor[i],
	       		   borderColor[i],
	       		   borderColor[i],
	       		   borderColor[i],
	       		   borderColor[i],
	       		   borderColor[i],
	       		   borderColor[i]
	       		],
	       		borderWidth: 1
	       	});
       		});
       		
       	});      
        data.forEach(function(arr,j){
			arr.forEach(function(item,i){
				charts[0].data.datasets[j].data.push(item['mid']);
				if(j==0)charts[0].data.labels.push(item['title']);
				charts[1].data.datasets[j].data.push(item['medianSalary']);
				if(j==0)charts[1].data.labels.push(item['title']);
				charts[2].data.datasets[j].data.push(item['countVacancies']);
				if(j==0)charts[2].data.labels.push(item['title']);
			});	
        });
		charts[0].update();	
		charts[1].update();	
		charts[2].update();

	}
	removeData(charts,index) {
		charts.forEach(function(chart){
			chart.data.labels.splice(index,1);
	    	chart.data.datasets.forEach((dataset) => {
	    	    dataset.data.splice(index,1);
	    	});
	    	chart.update();
		});
	}
	getChangeRate(){
		try{
			var response;
			$.ajax({
			    	url : "https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
			    	type : "GET",
			    	jsonp: "callback",
			    	async: false,
			    	dataType : "text",
			    	success : function(data){
			    	    response = data;
			    	}	
			});
			response = JSON.parse(response,true);
			var usdToRur = response.query.results.rate.Rate;
			return usdToRur;
		}catch($err){
			return 60;
		}
	}
	ajax(region,searchParams){
		var response=[];
		searchParams.forEach(function(item,i,arr){
			var dat = [];
			var check = 'true';
			var countPages = 0;
			while(countPages<20){
				var tempData;
				
				$.ajax({
		    		url : "https://api.hh.ru/vacancies",
		    		type : "GET",
		    		jsonp: "callback",
		    		async: false,
		    		data:{
		    			'area':region['idRegion'],
		    			'text':item,
		    			'per_page':100,
		    			'page':countPages,//first page is zero
		    			'only_with_salary':true
		    		},
		    		dataType : "text",
		    		success : function(data){  
		    		    tempData=data;
		    		}	
				});
				try{
					console.log(countPages);
					tempData = JSON.parse(tempData,true);
	    			tempData = tempData['items'];
	    			if(tempData.length==0)break;
	    			console.log(tempData);
	    			console.log(dat);
	    			tempData.forEach(function(d){
	    				dat.push(d);
	    			});
	    			countPages++;
	    		}catch($err){
	    			console.log($err);
	    			check = false;
	    			break;
	    		}
			}
			
	    	response.push(dat);
		});
		console.log('resoin');
		console.log(response);
		return response;
	}
	otherCurrenciesToRUR(salary,changeRate){
		salary = changeRate*salary;
		return salary;
	}
	getRegion(id){
		var response;
		$.ajax({
		    url : "https://api.hh.ru/areas/"+id,
		    type : "GET",
		    jsonp: "callback",
		    async: false,
		    data:{},
		    dataType : "text",
		    success : function(data){
		        response=data;
		    }	
		});
		response = JSON.parse(response,true);
		var array = [];
		response['areas'].forEach(function(item,i,arr){
			array.push({'id':item['id'],'name':item['name']});
		});
		return array;
	}
	getCountry(){
		var response;
		$.ajax({
		    url : "https://api.hh.ru/areas/countries",
		    type : "GET",
		    jsonp: "callback",
		    async: false,
		    data:{},
		    dataType : "text",
		    success : function(data){
		        response=data;
		    }	
		});
		response = JSON.parse(response,true);
		var array = [];
		response.forEach(function(item,i,arr){
			array.push({'id':item['id'],'name':item['name']});
		});
		return array;
	}
	treatment(response,region,searchParams){
		var data = [];
		var changeRate = this.getChangeRate();
		console.log('-------------------');
		console.log(response);

		searchParams.forEach(function(item,i){
			
			var countVacanciesWithSalaryFrom = 0;	
			var salaryArray=[];
			var sum = 0;
		
			response[i].forEach(function(r, j, vacancie) {
				
				  		console.log(vacancie[j]['salary']['from']);
				  		console.log(countVacanciesWithSalaryFrom);
				  			if(vacancie[j]['salary']['currency']=='USD'){
				  				var main = new Main();
				  				sum += main.otherCurrenciesToRUR(vacancie[j]['salary']['from'],changeRate);
				  			}else{
				  				sum += vacancie[j]['salary']['from'];
				  			}
				  			countVacanciesWithSalaryFrom = countVacanciesWithSalaryFrom + 1;
				  			salaryArray.push(vacancie[j]['salary']['from']);
				  		
				
			});	
			let main = new Main();
			let medianSalary = main.median(salaryArray);
			var mid = Math.round(sum/countVacanciesWithSalaryFrom);
			console.log('countVacanciesWithSalaryFrom'+countVacanciesWithSalaryFrom);
			data.push({
					'medianSalary':medianSalary,
					'mid':mid,
					'countVacancies':countVacanciesWithSalaryFrom,
					'title':item,
					'regionName':region['regionName']
			});
		});
		return data;
	}
	median(values) {
    	values.sort( function(a,b) {return a - b;} );
    	var half = Math.floor(values.length/2);
    	if(values.length % 2)
    	    return values[half];
    	else
        return (values[half-1] + values[half]) / 2.0;
	}
	createMidChart(){
		return this.chart('chart');
	}
	createChartMedian(){
		return this.chart('chartMedian');
	}
	createChartCountVacancies(){
		return this.chart('chartCountVacancies');
	}
	chart(ctx){
		//var ctx = document.getElementById("chart");
		var chart = new Chart(ctx, {
	    	type: 'bar',
	    	data: {
	    	    labels: [],
	    	    datasets: []
	    	},
	    	options: {
	    		responsive:true, 
	    		//maintainAspectRatio: true,
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
	createSecondChart(){
		var ctx = document.getElementById("secondChart");
		var schart = new Chart(ctx, {
	    	type: 'horizontalBar',
	    	data: {
	    	    labels: [],
	    	    datasets: []
	    	},
	    	options: {
	    		//responsive:false,
	    	    scales: {
	    	        yAxes: [{
	    	            ticks: {
	    	                beginAtZero:true
	    	            }
	    	        }]
	    	    }
	    	}
		});
		return schart;
	}
}
module.exports = Main;
