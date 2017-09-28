<template>
  <div>
        <div class="row">
          <div class="col-md-5">
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
            <div class="col-md-5">
              <form  novalidate @submit.stop.prevent="submit">
               <md-input-container>
                <label>Choose a region</label>
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
            <div class="col-md-2">
              <md-button :disabled="disAddReg" v-on:click='addReg' class="md-primary md-raised">Add Region</md-button>
            </div>
        </div>
        <div class="row">
          <RegionsList :regions="regions"></RegionsList>
        </div>
        <div class="row">
          <div class="col-md-10">
            <md-input-container>
                <label>Search field</label>
                <md-input v-model="searchField"></md-input>
            </md-input-container>
          </div>
          <div class="col-md-2">
            <md-button :disabled="disSearch" v-on:click='search' class="md-primary md-raised">Поиск</md-button>
          </div>
        </div>
    </div>
</template>
<script>
  import Main from '../main.js'
  import RegionsList from './RegionsList.vue'
  var main = new Main();
  export default{
    data:function(){
      return{
        disSearch:true,
        disAddReg:true,
        dis:true,
        movie:'',
        searchField:'',
        country:'',
        region:'',
        regionName:'',
        countryList:[],
        idRegion:'',
        regionsList:[{'name':"none"}],
        regions:[]
      }
    },
    components:{
      RegionsList
    },
    mounted:function(){
      this.countryList = main.getCountry();
    },
    methods:{
      addReg:function(){
        this.regions.push({'regionName':this.regionName,'idRegion':this.idRegion});
        this.disSearch = false;
      },
      countryChange:function(item){
        console.log(item);
        console.log('ind: '+item['id']);
        console.log(this.countryList);
        this.disAddReg = false;
        this.dis = false;
        this.idRegion = item['id'];
        this.regionName = item['name'];
        this.getRegions(item['id']);
      },
      regionChange:function(item){
        this.idRegion = item['id'];
         this.regionName = item['name'];

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
          
          searchParams = {'searchField':this.searchField,'regions':this.regions};
        
          console.log(searchParams);
          this.$emit('press',searchParams);
          this.searchField = '';
          this.dis = true;
          this.region = '';
          this.country = '';
        }
      }
    }
  }
</script>