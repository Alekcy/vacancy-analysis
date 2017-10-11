import Vue from 'vue';

import Vuex from 'vuex'

Vue.use(Vuex)

const state={
	counts:0,
	regions:[],
	disRegBtn:true
}	
const mutations = {
	addRegion(state,newRegion){
		state.regions.push(newRegion);
	},
	removeRegion(state,index){
		state.regions.splice(index,1);
	},
	disRegBtnIsFalse(state){
		state.disRegBtn = false;
	},
	disRegBtnIsTrue(state){
		state.disRegBtn = true;
	}
}
export default new Vuex.Store({
  state,
  mutations
})      