<template>
	<div>
	<div v-for="(data,index) in regions" >
		<div>{{data}}</div>
	</div>
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
		}
	}
</script>