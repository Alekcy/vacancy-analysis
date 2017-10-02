class Main{
	dataToValues(data){
		console.log('data:----------------------------------------');
		console.log(data);
		var values = {'vacancies':{}};
		var length = data.length;
		for (var i = 0 ; i < data[0].length; i++) {
			for (var j = 0 ; j < data.length; j++) {
				if(j==0)values.vacancies[i] = ({'title':data[j][i].title,
									  'regions':{}});
				values.vacancies[i].regions[j] = ({'regionName':data[j][i].regionName,
										 'mid':data[j][i].mid,
										 'countVacancies':data[j][i].countVacancies});
				console.log('i='+i+'j='+j);
				console.log(data[j][i].title);
			}
		};
		
		console.log(values);
		return values;
	}
	updateChart(chart, data,regions){
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
       	chart.data.datasets = [];
       	chart.data.labels =[];
       	regions.forEach(function(region,i){
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
       	 console.log(chart);
        console.log('data:1111111111111111111111111111111111111');
        console.log(data);
        
        data.forEach(function(arr,j){
        	console.log(arr);
        		
			arr.forEach(function(item,i){
				chart.data.datasets[j].data.push(item['mid']);
				if(j==0)chart.data.labels.push(item['title']);
			});
			
				
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
	getChangeRate(){
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
	}
	ajax(region,searchParams){
		var response=[];
		searchParams.forEach(function(item,i,arr){
			var dat;
			$.ajax({
		    	url : "https://api.hh.ru/vacancies",
		    	type : "GET",
		    	jsonp: "callback",
		    	async: false,
		    	data:{
		    		'area':region['idRegion'],
		    		'text':item,
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
	    //response = this.otherСurrenciesToRUR(response);
		return response;
	}
	otherСurrenciesToRUR(salary,changeRate){
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
		    data:{},
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
	treatment(response,region,searchParams){
		var data = [];
		//Main->otherСurrenciesToRUR('100');
		var changeRate = this.getChangeRate();
		console.log('changeRate'+'-----------'+changeRate);
		searchParams.forEach(function(item,i){
			
			var countVacanciesWithSalaryFrom = 0;
			var salaryArray=[];
			var sum = 0;
			
			response[i].forEach(function(r, j, vacancie) {
				//console.log(vacancie);
					try {
				  		if(vacancie[j]['salary']['from']!==null){
				  			if(vacancie[j]['salary']['currency']=='USD'){
				  				console.log('changeRate'+'-----------'+changeRate);
				  				var main = new Main();
				  				sum += main.otherСurrenciesToRUR(vacancie[j]['salary']['from'],changeRate);
				  			}else{
				  				sum += vacancie[j]['salary']['from'];
				  			}
				  			countVacanciesWithSalaryFrom++;
				  			salaryArray.push(vacancie[j]['salary']['from']);
				  		}
					
					} catch (err) {
					
					  // обработка ошибки
					
					}

			});	
			var mid = sum/countVacanciesWithSalaryFrom;
			console.log(item+'-----------'+mid);
			//mid = Math.round(mid);
				//var math = require('mathjs');
				//console.log(math.median(salaryArray));
			
				data.push({
					'mid':mid,
					'countVacancies':countVacanciesWithSalaryFrom,
					'title':item,
					'regionName':region['regionName']
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
