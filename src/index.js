import $ from "jquery";
import Vue from 'vue';
import Chart from 'chart.js';
import App from './components/App.vue'
import Vuex from 'vuex'
import store from './vuex/store'

var VueMaterial = require('vue-material');
Vue.use(VueMaterial);
Vue.use(Vuex);


new Vue ({
	el:'#app',
	store,
	render: h => h(App)
})

