import jquery from 'jquery';
import materializecss from 'materialize-css';
import Vue from 'vue';
import mathjs from 'mathjs';
import Chart from 'chart.js';
import App from './components/App.vue'

var VueMaterial = require('vue-material');
Vue.use(VueMaterial);

new Vue ({
	el:'#app',
	render: h => h(App)
})

