<template>
    <v-container fluid>
        <v-card v-if="this.loadedStories == null" :loading="this.isLoading">
            <v-card-title class="justify-center">{{ networkingMessage }}</v-card-title>
        </v-card>
        <v-col v-else v-for="story in this.loadedStories" :key="story.id" class="pb-0">
            <v-menu absolute>
                <template v-slot:activator="{ on }">
                    <v-card v-on="on">
                        <v-card-text class="font-weight-bold" style="font-size: 18px">
                            {{ story.text }}
                        </v-card-text>
                        <v-card-actions>
                            <v-container>{{ story.location }}</v-container>
                            <v-container>{{ story.dateHappened }}</v-container>
                        </v-card-actions>
                    </v-card>
                </template>

                <v-list>
                    <v-list-item @click="deleteStory(story)">
                        <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
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
      loadedStories: null,
      isLoading: true,
      nextLink: null,
      pageSizeLimit: 5,
      snackBarMessage: null,
      furtherStoryLoadingErrorMessage: "Error loading further stories!",
      deleteErrorMessage: "Failed to delete story!",
      connectionErrorMessage: "Connection Error",
      networkingMessage: "Loading stories..."
    }),
    methods: {
      async loadStories() {
        try {
          let endpointUrl = await this.$store.dispatch('retrieveStoryEndpointUrl')
          let response = await restClient.get(`${endpointUrl}?limit=${this.pageSizeLimit}`);
          if (response.status !== this.$store.state.HttpStatus.OK) {
            this.networkingMessage = this.connectionErrorMessage
            return
          }
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
        } finally {
          this.isLoading = false
        }
      },
      async loadMoreStories() {
        try {
          let response = await restClient.get(this.nextLink);
          if (response.status !== this.$store.state.HttpStatus.OK) {
            this.showError(this.furtherStoryLoadingErrorMessage)
            return
          }
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
          this.showError(this.furtherStoryLoadingErrorMessage)
        }
      },
      async deleteStory(story) {
        try {
          let response = await restClient.delete(story._links.self.href);
          if (response.status === this.$store.state.HttpStatus.NO_CONTENT) {
            this.loadedStories = this.loadedStories.filter((el) => { return el.id !== story.id })
          } else {
            this.showError(this.deleteErrorMessage)
          }
        } catch (e) {
          this.showError(this.deleteErrorMessage)
        }
      },
      showError(message) {
        this.snackbar = true
        this.snackBarMessage = message
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
