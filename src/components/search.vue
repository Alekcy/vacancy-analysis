<template>
  <div>
        <div class="row">
          <div class="col-md-10">
            <md-input-container>
                <label>Search field</label>
                <md-input v-model="searchField"></md-input>
            </md-input-container>
          </div>
          <div class="col-md-2">
            <md-button v-on:click='search' class="md-primary md-raised">Primary</md-button>
            
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6">
            <form novalidate @submit.stop.prevent="submit">
               <md-input-container>
                <label>Choose a country</label>
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
            <div class="col-md-6">
              <form  novalidate @submit.stop.prevent="submit">
               <md-input-container>
                <label>Choose a rewqdwqdwqdwqdqwdwqdwqdgion</label>
                <md-autocomplete v-model="region" 
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
          </div>
          </div>
</template>
<script>
  import Main from '../main.js'
  var main = new Main();
  export default{
    data:function(){
      return{
        movie:'',
        searchField:'',
        country:'',
        region:'',
        countryList:[],
        idRegion:'',
        regionsList:[{'name':"none"}]
      }
    },
    mounted:function(){
      this.countryList = main.getCountry();
    },
    methods:{
      countryChange:function(item){
        console.log(item);
        
        console.log('ind: '+item['id']);
        console.log(this.countryList);
        this.idRegion = item['id'];
        this.getRegions(item['id']);
      },
      regionChange:function(item){

      },
      getRegions:function(id){
        this.regionsList = main.getRegion(id);
      },
      filter:function(list, query) {
        var arr = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].name.indexOf(query) !== -1)
                arr.push(list[i]);
            if (arr.length > 5)
                break;
        }
      return arr;
    },
      search:function(){
        var searchParams = [];
        if(this.searchField!==''){
          if(this.country!==''){
            searchParams = {'searchField':this.searchField,'idRegion':this.idRegion};
          }else{
            searchParams = {'searchField':this.searchField,'idRegion':''};
          }
          console.log(searchParams);
          this.$emit('press',searchParams);
          this.searchField = '';
        }
        
      }
    }
  }
</script>