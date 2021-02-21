import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";

// var moment = require('moment');

import "./utils/fontawesome";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Flutterwave from  'flutterwave-vue-v3'
import FlashMessage from "@smartweb/vue-flash-message";

Vue.config.productionTip = false;



Vue.use(FlashMessage);

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(Flutterwave, { publicKey: 'FLWPUBK-0c829d67037c8c431685e19e78d58963-X' } )

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.filter("humanize", date => moment(date).format("MMMM Do YYYY"));

Vue.filter('numberFormat', num => {
  if (!num) {
    return '0.00';
  }
  const number = (num / 1).toFixed(2).replace(',', '.');
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

// Vue.filter('fdate', function(date: Date) {
//   return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
