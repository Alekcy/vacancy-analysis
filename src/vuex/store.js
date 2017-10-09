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
	}
}
export default new Vuex.Store({
  state,
  mutations
})