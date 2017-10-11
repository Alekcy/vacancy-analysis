<template>
	<div class="row">
          <div class="col-md-3">
            <form novalidate @submit.stop.prevent="submit">
                <md-input-container>
                  <label>Страна</label>
                  <md-autocomplete v-model="country" 
                                :list="countryList"
                                 print-attribute="name"
                                :min-chars="0"
                                :max-height="6"
                                :filter-list="filter"
                                :debounce="500"
                                v-on:selected="countryChange">
                  </md-autocomplete>
                </md-input-container>
            </form>
            </div>
            <div class="col-md-3">
              <form  novalidate @submit.stop.prevent="submit">
               <md-input-container>
                <label>Регион</label>
                <md-autocomplete  v-model="region" 
                              :disabled="dis"
                              :list="regionsList"
                               print-attribute="name"
                              :min-chars="0"
                              :max-height="60"
                              :maxlength="100"
                              :filter-list="filter"
                              :debounce="500"
                              v-on:selected="regionChange">
                </md-autocomplete>
                </md-input-container>
              </form>
            </div>
            <div class="col-md-3">
              <form  novalidate @submit.stop.prevent="submit">
               <md-input-container>
                <label>Город</label>
                <md-autocomplete  v-model="city" 
                              :disabled="dis"
                              :list="citiesList"
                               print-attribute="name"
                              :min-chars="0"
                              :max-height="60"
                              :maxlength="100"
                              :filter-list="filter"
                              :debounce="500"
                              v-on:selected="cityChange">
                </md-autocomplete>
                </md-input-container>
              </form>
            </div>
            <div class="col-md-3">
              <md-button :disabled="disRegBtn" v-on:click='addReg' class="md-primary md-raised col-md-12">Добавить</md-button>
            </div>
        </div>
</template>
<script>
	import Main from '../main.js'
	var main = new Main();
	export default{
		data:function(){
   		  return{   
   		    disAddReg:true,
   		    dis:true,
   		    country:'',
   		    region:'',
          city:'',
   		    regionName:'',
   		    countryList:[],
          citiesList:[{'name':"none"}],
   		    idRegion:'',
   		    regionsList:[{'name':"none"}],
   		  }
   	},
    props:['id'],
    computed:{
      disRegBtn(){
        return this.$store.state.disRegBtn;
      }
    },
		mounted:function(){
   		  this.countryList = main.getCountry();
   	},
    methods:{

      addReg:function(){
        this.country = '';
        this.region = '';
        this.city = '';
        if((this.idRegion!=='')&&(this.regionName!=='')){
          if(this.id!=='2'){
             this.$store.commit('addRegion',{'regionName':this.regionName,'idRegion':this.idRegion});
    	     this.$emit('regionAdded');
           
          }else{
            if(this.$store.state.regions>=1){
              this.$store.commit('disRegBtnIsFalse');
            }else{
             this.$store.commit('addRegion',{'regionName':this.regionName,'idRegion':this.idRegion});
              this.$emit('regionAdded');
            }
          }
        }
        this.regionName = '';
        this.idRegion = '';
        this.$store.commit('disRegBtnIsTrue');
    	},
    	countryChange:function(item){
        if((this.id!=='2')||(this.$store.state.regions.length<1)){
          this.$store.commit('disRegBtnIsFalse');
        }
    	  this.dis = false;
    	  this.idRegion = item['id'];
    	  this.regionName = item['name'];
    	  this.getRegions(item['id']);
    	},
    	regionChange:function(item){
        // this.$emit('disReg',this.disRegBtn);
    	  this.idRegion = item['id'];
    	  this.regionName = item['name'];
        this.getCities(item['id']);
    	},
    	getRegions:function(id){
    	  this.regionsList = main.getRegion(id);
    	},
      cityChange:function(item){
        this.idRegion = item['id'];
        this.regionName = item['name'];
      },
      getCities:function(id){
        this.citiesList = main.getRegion(id);
      },
    	filter:function(list, query) {
    	  var arr = [];
    	  for (var i = 0; i < list.length; i++) {
    	      if ((list[i].name.toLowerCase().indexOf(query) !== -1)||(list[i].name.indexOf(query)!==-1))
    	          arr.push(list[i]);
    	      if (arr.length > 5)
    	          break;
    	  }
    	  return arr;
    	}
    }
	}
</script>