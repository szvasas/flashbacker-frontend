import Vue from 'vue'
import Router from 'vue-router'
import NewEntry from "./views/NewEntry";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'new-entry',
      component: NewEntry
    },
    {
      path: '/allEntries',
      name: 'all-entries',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/AllEntries.vue')
    }
  ]
})
