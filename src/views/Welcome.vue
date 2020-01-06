<template>
    <v-container fluid class="fill-height wallpaper">
        <v-container>
            <v-row class="mt-12">
                <v-col cols="12" align="center">
                    <p class=" display-1 font-weight-bold">Flashbacker.</p>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" align="center">
                    <v-btn class="darken-2" x-large color="success" rounded @click="onLogin">Login</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
  export default {
    name: "Welcome",
    methods: {
      onLogin() {
        this.$store.dispatch('login')
      }
    }
  }
</script>

<style scoped>
    .wallpaper {
        background-image: url("../../public/welcome.jpg");
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
    }

</style>
