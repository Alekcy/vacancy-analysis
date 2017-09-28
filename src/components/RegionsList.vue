<template>
	<div>
	<div v-for="(data,index) in regions" >
		<div>{{data['regionName']}}</div>
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