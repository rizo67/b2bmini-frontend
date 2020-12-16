// import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueRouter from "vue-router";
import GullKit from "./plugins/gull.kit";
// import "babel-polyfill";
// import es6Promise from "es6-promise";
// es6Promise.polyfill();
import store from "./store";
import Breadcumb from "./components/breadcumb";
//import firebase from "firebase/app";
//import "firebase/auth";
//import {firebaseSettings} from "@/data/config";
import i18n from "./lang/lang";
import VueGoodTablePlugin from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";

Vue.component("breadcumb", Breadcumb);
Vue.component('uzenet', require('./views/app/uzenetek/uzenet'));
Vue.component('bemenet1', require('./views/app/bemenet/bemenet1'));
Vue.component('kimenet1', require('./views/app/kimenet/kimenet1'));
Vue.component('productlist', require('./views/app/products/productlist'));
Vue.component('productadmin', require('./views/app/products/productadmin'));
Vue.component('supplierslist', require('./views/app/suppliers/supplierslist'));
Vue.use(VueGoodTablePlugin);
Vue.use(VueRouter);

Vue.use(GullKit);
//firebase.initializeApp(firebaseSettings);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
