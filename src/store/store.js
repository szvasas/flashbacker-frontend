import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import axios from 'axios'
import {backendUrl} from "@/env-config";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    storyEndpointUrl: null
  },
  mutations: {
    storeUser(state, user) {
      state.user = user
    },
    storeStoryEndpointUrl(state, storyEndpointUrl) {
      state.storyEndpointUrl = storyEndpointUrl
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.user !== null
    },
    storyEndpoint(state) {
      return state.storyEndpoint
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
    },
    async retrieveStoryEndpointUrl({commit}) {
      try {
        let response = await axios.get(backendUrl)
        let url = response.data._links.stories.href
        commit('storeStoryEndpointUrl', url)
      } catch(e) {
        console.error("Cannot retrieve endpoint URL from the server", e)
      }
    }
  }
})
