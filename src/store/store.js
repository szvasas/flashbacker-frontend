import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import axios from 'axios'
import {backendUrl} from "@/env-config";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storyEndpointUrl: null
  },
  mutations: {
    storeStoryEndpointUrl(state, storyEndpointUrl) {
      state.storyEndpointUrl = storyEndpointUrl
    }
  },
  getters: {
    storyEndpoint(state) {
      return state.storyEndpoint
    }
  },
  actions: {
    initUserHandling() {
      Vue.prototype.$Amplify.Hub.listen("auth", ({payload: {event}}) => {
        if (event === "signIn") {
          router.push('/newEntry')
        }
      });
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
