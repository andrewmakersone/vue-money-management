import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth.module'
import info from './info.module'
import category from './category.module'
import record from './record.module'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    error: state => state.error
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_API_KEY;
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=RUB,USD,EUR`);

      return await res.json()
    }
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
