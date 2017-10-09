import Vue from 'vue';

import Vuex from 'vuex'

Vue.use(Vuex)

const state={
	counts:0,
	regions:[]
}	
const mutations = {
	addRegion(state,newRegion){
		state.regions.push(newRegion);
	},
	removeRegion(state,index){
		state.regions.splice(index,1);
	}
}
export default new Vuex.Store({
  state,
  mutations
})      