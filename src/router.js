import Vue from 'vue'
import Router from 'vue-router'
import NewEntry from "./views/NewEntry";
import Welcome from "./views/Welcome";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/newEntry',
      name: 'new-entry',
      component: NewEntry,
      meta: {requiresAuth: true}
    },
    {
      path: '/browseEntries',
      name: 'browse-entries',
      component: () => import('./views/BrowseEntries.vue'),
      meta: {requiresAuth: true}
    }
  ]
})

router.beforeResolve(async (to, from, next) => {
  if (to.path === '/') {
    try {
      await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser();
      next("/newEntry")
    } catch (e) {
      next("/welcome")
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser();
      next()
    } catch (e) {
      next("/welcome")
    }
  } else if (!to.matched || !to.matched.length) {
    next("/")
  } else {
    next()
  }
})

export default router
