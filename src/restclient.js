import axios from 'axios'
import Vue from 'vue'
import {backendUrl} from "./env-config";

const flashbackerBackendClient = axios.create({
  baseURL: backendUrl
})

flashbackerBackendClient.interceptors.request.use(async (config) => {
  const currentSession = await Vue.prototype.$Amplify.Auth.currentSession();
  config.headers['Authorization'] = `Bearer ${currentSession.getAccessToken().getJwtToken()}`;
  return config;
});

export default flashbackerBackendClient
