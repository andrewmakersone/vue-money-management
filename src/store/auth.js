import firebase from 'firebase/app'

export default {
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async login({commit}, {email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e);
        throw new Error(e)
      }
    },
    async register({commit, dispatch}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        });
      } catch (e) {
        commit('setError', e);
        throw new Error(e)
      }
    },
    async logout() {
      await firebase.auth().signOut()
    }
  }
}
