<template>
	<div>
		  <div v-for="(data,index) in values">
		        <div v-on:click='del(index)' class="col s12 m6">
		          <md-card class="md-primary">
			
			  <md-card-header>
			    <div class="md-title">{{data['title']}}</div>
			    <div class="md-subhead">Subtitle here</div>
			  </md-card-header>
			
			  <md-card-actions>
			    <md-button>Action</md-button>
			    <md-button>Action</md-button>
			  </md-card-actions>
			
			  <md-card-content>
			  Средняя зарплата: {{data['mid']}}Р<br>
		      Всего вакансий: {{data['countVacancies']}}
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