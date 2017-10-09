import jquery from 'jquery';
import materializecss from 'materialize-css';
import Vue from 'vue';
import mathjs from 'mathjs';
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

