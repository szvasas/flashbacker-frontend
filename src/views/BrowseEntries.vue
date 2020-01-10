<template>
    <v-container fluid>
        <v-card v-if="this.loadedStories == null">
            <v-card-title class="justify-center">{{ networkingMessage }}</v-card-title>
        </v-card>
        <v-col v-else v-for="story in this.loadedStories" :key="story.id" class="pb-0">
            <v-card>
                <v-card-title>{{ story.text }}</v-card-title>
                <v-card-actions>
                    <v-container>{{ story.location }}</v-container>
                    <v-container>{{ story.dateHappened }}</v-container>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-snackbar v-model="snackbar" :timeout="1000" bottom>
            {{ snackBarMessage }}
        </v-snackbar>
    </v-container>
</template>

<script>
  import restClient from '@/restclient'

  export default {
    name: "BrowseEntries",
    mounted() {
      this.loadStories()
      this.setUpLoadOnScroll();
    },
    destroyed() {
      this.loadedStories = null
    },
    data: () => ({
      snackbar: false,
      snackBarMessage: "Error loading further stories!",
      loadedStories: null,
      nextLink: null,
      pageSizeLimit: 5,
      connectionErrorMessage: "Connection Error",
      networkingMessage: "Loading stories..."
    }),
    methods: {
      async loadStories() {
        try {
          let endpointUrl = await this.$store.dispatch('retrieveStoryEndpointUrl')
          let response = await restClient.get(`${endpointUrl}?limit=${this.pageSizeLimit}`);
          let embeddedData = response.data._embedded
          if (response.data._links.next) {
            this.nextLink = response.data._links.next.href
          }
          if (embeddedData) {
            this.loadedStories = [...embeddedData.stories]
          } else {
            this.loadedStories = []
          }
        } catch (e) {
          this.networkingMessage = this.connectionErrorMessage
        }
      },
      async loadMoreStories() {
        try {
          let response = await restClient.get(this.nextLink);
          let embeddedData = response.data._embedded
          if (response.data._links.next) {
            this.nextLink = response.data._links.next.href
          } else {
            this.nextLink = null
          }
          if (embeddedData) {
            this.loadedStories = this.loadedStories.concat(embeddedData.stories)
          }
        } catch (e) {
          this.snackbar = true
        }
      },
      setUpLoadOnScroll () {
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

          if (bottomOfWindow && this.nextLink) {
            this.loadMoreStories()
          }
        };
      }
    }
  }
</script>

<style scoped>

</style>
