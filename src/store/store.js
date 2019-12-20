import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    storeUser(state, user) {
      state.user = user
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.user !== null
    }
  },
  actions: {
    initUserHandling({commit}) {
      Vue.prototype.$Amplify.Hub.listen("auth", ({payload: {event, data}}) => {
        switch (event) {
          case "signIn":
            commit('storeUser', data)
            router.push('/newEntry')
            break;
          case "signOut":
            commit('storeUser', null)
        }
      });

      Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
        .then(user => commit('storeUser', user))
        .catch(() => commit('storeUser', null));
    },
    login() {
      Vue.prototype.$Amplify.Auth.federatedSignIn({provider: 'Google'})
    },
    logout() {
      Vue.prototype.$Amplify.Auth.signOut()
    }
  }
})
