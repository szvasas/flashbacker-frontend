import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import axios from 'axios'
import {backendUrl} from "@/env-config";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storyEndpointUrl: null,
    HttpStatus: {
      OK : 200,
      CREATED : 201,
      NO_CONTENT: 204
    }
  },
  mutations: {
    storeStoryEndpointUrl(state, storyEndpointUrl) {
      state.storyEndpointUrl = storyEndpointUrl
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
    async retrieveStoryEndpointUrl({commit, state}) {
      if (state.storyEndpointUrl) {
        return state.storyEndpointUrl
      }

      let response = await axios.get(backendUrl)
      let url = response.data._links.stories.href.split("{")[0]
      commit('storeStoryEndpointUrl', url)
      return url
    }
  }
})
