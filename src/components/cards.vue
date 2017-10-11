<style>
	ul{
		list-style-type: none;
	}
	.regionName{
		font-size: 22px;
	}
</style>
<template>
	<div>
		<div v-for="(data,index) in values">
		    <div  class="col s12 m6">
		      	<md-card class="md-primary">
			  		<md-card-header>
			  		  <div class="md-title">{{data.title}}</div>
			  		</md-card-header>
					<div v-for="reg in data.regions">	 
						<ul>
							<li class="regionName">{{reg.regionName}}</li>
							<li>Средняя ЗП :{{reg.mid}} Р</li>
							<li>Медианная ЗП :{{reg.medianSalary}}</li>
							<li>Число вакансий : {{reg.countVacancies}}</li>
						</ul>
					</div>
			  		<md-card-actions>
			  		  <md-button v-on:click='del(index)'>Remove</md-button>
			  		</md-card-actions>
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