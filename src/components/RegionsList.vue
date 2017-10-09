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
		computed:{
			regions(){
				return this.$store.state.regions
			}
		},
		methods:{
			remove:function(index){
				this.$store.commit('removeRegion',index);
				this.$emit('remove');
			}
		}
	}
</script>