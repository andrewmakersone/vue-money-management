import firebase from "firebase";

export default {
  state: {
    info: {}
  },
  getters: {
    info: state => state.info
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async updateInfo({commit, dispatch, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUid');
        const updateData = {...getters.info, ...toUpdate};
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);
        commit('setInfo', updateData);
      } catch (e) {
        throw new Error(e);
      }
    },
    async fetchInfo({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('setInfo', info)
      } catch (e) {
        throw new Error(e);
      }
    }
  }
}
