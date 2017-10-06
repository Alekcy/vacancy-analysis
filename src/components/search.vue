<template>
  <div>
    <RegionSearch v-bind:id="id" v-on:regionAdded="regionAdded" :disSearch="disSearch"></RegionSearch>
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
    <div class="row">
      <div class="col-md-12">
        <div>
          <md-radio v-model="radio1" md-value="1"  v-on:change="changeRadio('1')">Сравнить зарплаты</md-radio>
          <md-radio v-model="radio1" md-value="2"  v-on:change="changeRadio('2')">Требования</md-radio>
        </div>
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
        radio1:'1',
        id:'1',
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
      changeRadio:function(id){
        if(id!==this.id){
          this.id = id;
          this.$emit('changeType');
        }
        //

      },
      removeRegion:function(index){
        this.regions.splice(index,1);
        if(this.regions.length==0)this.disSearch = true;
        this.$emit('add',this.regions);
      },
      regionAdded:function(regions){
        this.regions = regions;
        this.disSearch = false;
        //this.search();
        this.$emit('add',this.regions);
      },
      search:function(){
        var searchParams =[];
        if(this.searchField!==''){
          
          this.$emit('press',this.searchField,this.id);
          this.searchField = '';
          this.dis = true;
        }
      }
    }
  }
</script>