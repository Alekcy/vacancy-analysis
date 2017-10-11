<template>
  <div>
    <RegionSearch v-bind:id="id"  v-on:disReg="disReg" v-on:regionAdded="regionAdded" :disSearch="disSearch"></RegionSearch>
    <div class="row">
      <RegionsList :regions="regions" v-on:remove="removeRegion"></RegionsList>
    </div>
    <div class="row">
      <div class="col-md-9">
        <md-input-container>
            <label>Поисковый запрос</label>
            <md-input v-model="searchField"></md-input>
        </md-input-container>
      </div>
      <div class="col-md-3">
        <md-button :disabled="disSearch" v-on:click='search' class="md-primary md-raised col-md-12">Поиск</md-button>
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
      disReg:function(disRegBtn){
        if(disRegBtn===true)this.disRegBtn = false;
        else this.disRegBtn = true;
      },
      changeRadio:function(id){
        if(id!==this.id){
          this.id = id;
          this.disSearch = true;
          this.regions = [];
          this.$emit('changeType');
        }
      },  
      removeRegion:function(){
        if(this.id=='2'){
          this.$store.commit('disRegBtnIsFalse');
        }else{
          if(this.$store.state.regions.length==0){
            this.$store.commit('disRegBtnIsTrue');
          }
        }
        
        if(this.regions.length==0)this.disSearch = true;
        this.$emit('add');
      },
      regionAdded:function(regions){
        this.disSearch = false;
        this.$emit('add');
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