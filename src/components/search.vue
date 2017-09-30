<template>
  <div>
        <RegionSearch v-on:regionAdded="regionAdded" :disSearch="disSearch"></RegionSearch>
        <div class="row">
          <RegionsList :regions="regions" v-on:remove="removeRegion"></RegionsList>
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
  import RegionSearch from './regionSearch.vue'

  var main = new Main();

  export default{
    data:function(){
      return{
        searchParams:[],
        disSearch:true,
        dis:true,
        searchField:'',
        regions:[]
      }
    },
    components:{
      RegionSearch,
      RegionsList
    },
    methods:{
      removeRegion:function(index){
        console.log(this.regions);
        console.log(index);
        this.regions.splice(index,1);
        console.log(this.regions);
        if(this.regions.length==0)this.disSearch = true;
        this.$emit('add',this.regions);
      },
      regionAdded:function(regions){
        this.regions = regions;
        this.disSearch = false;
        this.search();
        this.$emit('add',this.regions);
      },
      search:function(){
        var searchParams =[];
        if(this.searchField!==''){
          
          this.$emit('press',this.searchField);
          this.searchField = '';
          this.dis = true;
        }
      }
    }
  }
</script>