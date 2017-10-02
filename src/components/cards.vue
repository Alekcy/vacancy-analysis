<template>
	<div>
		<div v-for="(data,index) in values">
		    <div  class="col s12 m6">
		      	<md-card class="md-primary">
			
			  		<md-card-header>
			  		  <div class="md-title">{{data.title}}</div>
			  		  
			  		</md-card-header>
					<div v-for="reg in data.regions">
						{{reg.regionName}}: {{reg.mid}}
					</div>
			  		<md-card-actions>
			  		  <md-button v-on:click='del(index)'>Remove</md-button>
			  		</md-card-actions>
					
			  		<md-card-content>
			  		Средняя зарплата: {{data['mid']}}Р<br>
		      		Всего вакансий с указанной зарплатой: {{data['countVacancies']}}
			  		</md-card-content>
				</md-card>
		    </div>
		</div>
	</div>
</template>

<script>
export default{
	props:[
		'values'
	],
	methods:{
		del:function(index){
			this.$emit('del',index);
		}
	}
}
</script>