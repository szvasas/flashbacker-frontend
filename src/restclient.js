import axios from 'axios'
import Vue from 'vue'

const flashbackerBackendClient = axios.create({
  baseURL: "http://localhost:8081"
})

flashbackerBackendClient.interceptors.request.use(async (config) => {
  const currentSession = await Vue.prototype.$Amplify.Auth.currentSession();
  config.headers['Authorization'] = `Bearer ${currentSession.getAccessToken().getJwtToken()}`;
  return config;
});

export default flashbackerBackendClient
