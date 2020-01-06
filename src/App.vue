<template>
    <v-app>
        <v-content>
            <router-view/>
        </v-content>
        <v-bottom-navigation
                :shift="isAuthenticated"
                app
                height="8%"
        >
            <v-btn link to="/newEntry" height="100%" v-if="isAuthenticated">
                <span>New Entry</span>
                <v-icon>create</v-icon>
            </v-btn>

            <v-btn link to="/browseEntries" height="100%" v-if="isAuthenticated">
                <span>Browse</span>
                <v-icon>book</v-icon>
            </v-btn>
            <v-btn @click="onLogin" height="100%" v-if="!isAuthenticated">
                <span>Login</span>
                <v-icon>mdi-login</v-icon>
            </v-btn>
            <v-btn @click="onLogout" height="100%" v-if="isAuthenticated">
                <span>Logout</span>
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script>
  export default {
    name: "App",
    created() {
      this.$store.dispatch('initUserHandling')
      this.$store.dispatch('retrieveStoryEndpointUrl')
    },
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated
      }
    },
    methods: {
      onLogin() {
        this.$store.dispatch('login')
      },
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
