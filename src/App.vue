<template>
    <v-app>
        <v-content>
            <router-view/>
        </v-content>
        <v-bottom-navigation
                v-if="this.$route.meta.requiresAuth"
                app
                height="8%"
        >
            <v-btn link to="/newEntry" height="100%">
                <span>New Entry</span>
                <v-icon>create</v-icon>
            </v-btn>

            <v-btn link to="/browseEntries" height="100%">
                <span>Browse</span>
                <v-icon>book</v-icon>
            </v-btn>
            <v-btn @click="onLogout" height="100%">
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
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
