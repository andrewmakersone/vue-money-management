import Vue from 'vue'
import Vuelidate from "vuelidate";
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter';
import currencyFilter from "@/filters/currency.filter";
import messagePlugin from "@/utils/message.plugin"
import Loader from "@/components/Loader";
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase";
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.component('Loader', Loader);

const firebaseConfig = {
  apiKey: "AIzaSyB3aVKip8thibjEKDJopLs_TnZKidiQie8",
  authDomain: "vue-money-management.firebaseapp.com",
  databaseURL: "https://vue-money-management.firebaseio.com",
  projectId: "vue-money-management",
  storageBucket: "vue-money-management.appspot.com",
  messagingSenderId: "770940532084",
  appId: "1:770940532084:web:7d803e48f10025c921e821",
  measurementId: "G-L1NL24VFM6"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});

