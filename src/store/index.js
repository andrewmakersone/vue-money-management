import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth.module'
import info from './info.module'

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
      // const key = process.env.VUE_APP_API_KEY;
      const res = await fetch(`https://api.ratesapi.io/api/latest?base=RUB&symbols=RUB,USD,EUR`);
      return await res.json()
    }
  },
  modules: {
    auth,
    info
  }
})
