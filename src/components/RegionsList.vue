<template>
	<div class="col-md-5">
		<md-list>
			<div v-for="(data,index) in regions" >
				<md-list-item v-on:click="remove(index)">
			     <span >{{data['regionName']}}</span>
			   	 <md-divider ></md-divider>
			    </md-list-item>		 
			</div>
		</md-list>
	</div>
</template>
<script>
	export default{
		props:[
			'regions'
		],
		data:function(){
			return{

			}
		},
		methods:{
			remove:function(index){
				console.log('remove');
				this.$emit('remove',index);
			}
		}
	}
</script>